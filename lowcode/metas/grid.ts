import {
  IPublicModelNode,
  IPublicModelSettingPropEntry,
  IPublicTypeComponentMetadata,
} from '@alilc/lowcode-types';
import { CELL, GRID, BLOCK, ROW, COL } from '../names';
import { createCellSnippet, createPSnippet } from '../default-schema';
import widthSetter from './setter/width';
import heightSetter from './setter/min-height';
import {
  onNodeRemoveSelfWhileNoChildren,
  onNodeReplaceSelfWithChildrenCell,
} from './enhance/callbacks';

const config: IPublicTypeComponentMetadata = {
  componentName: GRID,
  title: '网格容器',
  category: '容器',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Grid',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: 'style',
      propType: 'object',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: (node: IPublicModelNode) => {
          return node.componentName !== GRID;
        },
      },
    },
    supports: { style: true },
    props: [
      {
        name: 'cols',
        title: '列数',
        defaultValue: 2,
        setter: {
          componentName: 'NumberSetter',
          props: {
            min: 2,
          },
        },
      },
      {
        title: '宽度控制',
        type: 'group',
        display: 'block',
        condition: (target: IPublicModelSettingPropEntry) => {
          return (
            target.node?.parent?.componentName &&
            [BLOCK, ROW].indexOf(target.node?.parent?.componentName) !== -1
          );
        },
        items: [...widthSetter],
      },
      {
        title: '高度控制',
        type: 'group',
        display: 'block',
        condition: (target: IPublicModelSettingPropEntry) => {
          return (
            target.node?.parent?.componentName &&
            [BLOCK, COL].indexOf(target.node?.parent?.componentName) !== -1
          );
        },
        items: [...heightSetter],
      },
      // {
      //   name: 'minWidth',
      //   title: '单元格最小宽度',
      //   setter: {
      //     componentName: 'NumberSetter',
      //     props: {
      //       min: 0,
      //       units: ['px'],
      //     },
      //   },
      // },
      {
        name: 'rowGap',
        title: '水平间隙',
        defaultValue: 4,
        setter: {
          componentName: 'NumberSetter',
          props: {
            min: 0,
            step: 4,
            units: ['px'],
          },
        },
      },
      {
        name: 'colGap',
        title: '垂直间隙',
        defaultValue: 4,
        initialValue: 4,
        setter: {
          componentName: 'NumberSetter',
          props: {
            min: 0,
            step: 4,
            units: ['px'],
          },
        },
      },
    ],
    advanced: {
      callbacks: {
        onNodeRemove: (removedNode: IPublicModelNode, currentNode: IPublicModelNode) => {
          onNodeRemoveSelfWhileNoChildren(removedNode, currentNode);
        },
        onSubtreeModified: (currentNode: IPublicModelNode, options: any) => {
          onNodeReplaceSelfWithChildrenCell(currentNode, options);
        },
        /**
         * 组件拖入回调逐层向上触发，需要做好判断。
         * 组件拖入间隙的的时候包裹 CELL+P, 每一层父节点都会触发
         * @param {*} draggedNode 被拖入的组件
         * @param {*} currentNode 被拖入到 CELL
         */
        onNodeAdd: (draggedNode: IPublicModelNode, currentNode: IPublicModelNode) => {
          if (!draggedNode || draggedNode.componentName !== CELL) {
            const dropLocation = draggedNode.document?.dropLocation;
            if (!dropLocation) {
              // 没有 dropLocation 一般是 slot, slot 元素不用特殊处理 不做任何包裹
              return;
            }
            const dropTarget = dropLocation.target;
            // 自动包裹 CELL + P
            if (dropTarget === currentNode) {
              const cellNode = currentNode.document?.createNode(createCellSnippet());
              const pNode = currentNode.document?.createNode(createPSnippet());
              pNode && cellNode?.insertAfter(pNode);
              cellNode && currentNode.insertAfter(cellNode, draggedNode, false);
              pNode?.insertAfter(draggedNode, pNode, false);
            }
          }
        },
      },
      initialChildren: [],
    },
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};

export default config;
