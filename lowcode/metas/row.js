const { CELL, ROW } = require('../names');
const { createCellSnippet, createPSnippet } = require('../default-schema');
const {
  onNodeRemoveSelfWhileNoChildren,
  onNodeReplaceSelfWithChildrenCell,
  onDrageResize,
} = require('./enhance/callbacks');
const { getResizingHandlers } = require('./enhance/experimentals');
const minHeight = require('./setter/min-height');

module.exports = {
  componentName: ROW,
  title: '行容器',
  category: '容器',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Row',
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
      name: 'minHeight',
      propType: 'number',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: (node) => {
          // 不能 ROW 套 ROW
          // 做了自动包裹 CELL 的处理，所以不需要强制 CELL
          return node.componentName !== ROW;
        },
      },
    },
    supports: { style: true },
    props: [
      ...minHeight,
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
  },
  experimental: {
    getResizingHandlers,
    callbacks: {
      onNodeRemove: (removedNode, currentNode) => {
        onNodeRemoveSelfWhileNoChildren(removedNode, currentNode);
      },
      onSubtreeModified: (currentNode, e) => {
        onNodeReplaceSelfWithChildrenCell(currentNode, e);
      },
      /**
       * 组件拖入回调逐层向上触发，需要做好判断。
       * 组件拖入的时候包裹 CELL+P, 每一层父节点都会触发
       * @param {*} draggedNode 被拖入的组件
       * @param {*} currentNode 被拖入到 CELL
       */
      onNodeAdd: (draggedNode, currentNode) => {
        if (!draggedNode || draggedNode.componentName !== CELL) {
          const { dropLocation } = draggedNode.document.designer;
          if (!dropLocation) {
            // 没有 dropLocation 一般是 slot, slot 元素不用特殊处理 不做任何包裹
            return;
          }

          const dropTarget = dropLocation.target;

          // 自动包裹 CELL + P
          if (dropTarget === currentNode) {
            const cellNode = currentNode.document.createNode(createCellSnippet());
            const pNode = currentNode.document.createNode(createPSnippet());
            cellNode.insertAfter(pNode);

            currentNode.insertAfter(cellNode, draggedNode, false);
            pNode.insertAfter(draggedNode, pNode, false);
          }
        }
      },
      ...onDrageResize,
    },
  },
  icon: 'https://img.alicdn.com/imgextra/i1/O1CN01AQZw941ZgdfVtjsDO_!!6000000003224-55-tps-128-128.svg',
};
