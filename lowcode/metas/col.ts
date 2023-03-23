import { IPublicModelNode } from "@alilc/lowcode-types";
import { CELL, COL } from '../names';
import { createCellSnippet, createPSnippet } from '../default-schema';
import { getResizingHandlers } from './enhance/experimentals';
import {
  onNodeRemoveSelfWhileNoChildren,
  onNodeReplaceSelfWithChildrenCell,
  onDrageResize,
} from './enhance/callbacks';
import widthSetter from './setter/width';

export default {
  componentName: COL,
  title: '列容器',
  category: '容器',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Col',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: 'style',
      propType: 'object',
    },
    {
      name: 'width',
      title: '固定宽度',
      display: 'inline',
      setter: {
        componentName: 'NumberSetter',
        props: {
          min: 0,
          units: ['px'],
        },
      },
    },
    {
      name: 'height',
      title: '固定高度',
      display: 'inline',
      setter: {
        componentName: 'NumberSetter',
        props: {
          min: 0,
          units: ['px'],
        },
      },
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: (node: IPublicModelNode) => {
          // 不能 COL 套 COL
          // 做了自动包裹 CELL 的处理，所以不需要强制 CELL
          return node.componentName !== COL;
        },
      },
    },
    supports: { style: true },
    props: [
      ...widthSetter,
      {
        name: 'gap',
        title: '间距',
        defaultValue: 4,
        initialValue: 4,
        setter: {
          componentName: 'NumberSetter',
          props: {
            step: 4,
            min: 0,
          },
        },
      },
    ],
    advanced: {
      getResizingHandlers,
      callbacks: {
        onNodeRemove: (removedNode: IPublicModelNode, currentNode: IPublicModelNode) => {
          onNodeRemoveSelfWhileNoChildren(removedNode, currentNode);
        },
        onSubtreeModified: (currentNode: IPublicModelNode, e: MouseEvent) => {
          onNodeReplaceSelfWithChildrenCell(currentNode, e);
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
        ...onDrageResize,
      },
      initialChildren: [],
    },
  },

  icon: 'https://img.alicdn.com/imgextra/i1/O1CN01AQZw941ZgdfVtjsDO_!!6000000003224-55-tps-128-128.svg',
};
