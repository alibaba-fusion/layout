const { CELL, ROW, COL, P, BLOCK } = require('../names');
const widthSetter = require('./setter/width');
const heightSetter = require('./setter/min-height');
const backgroundSetter = require('./setter/background');
const flexColumn = require('./setter/flex-column');
const { getResizingHandlers } = require('./enhance/experimentals');
const { onNodeReplaceSelfWithChildrenCell, onDrageResize } = require('./enhance/callbacks');
const { createPSnippet, createFixedContainerSnippet } = require('../default-schema');
const { changeCellToGrid } = require('../common/split/auto-cell');

const flexSetter = flexColumn();
const shortcutsStyle = { display: 'flex', gap: 5, flexDirection: 'column' };
const codeStyle = {
  background: '#333',
  borderRadius: '2px',
  color: '#fff',
  display: 'inline-block',
  height: '16px',
  lineHeight: '16px',
  padding: '0 5px',
  textAlign: 'center',
};

window.parent?.AliLowCodeEngine?.designerCabin?.addBuiltinComponentAction?.({
  name: 'change to Grid',
  content: {
    icon: (
      <svg viewBox="0 0 1024 1024" width="16">
        <path
          d="M179.712 501.28896l264.47872 0c11.32544 0 20.48-9.15456 20.48-20.48L464.67072 216.33024c0-11.32544-9.15456-20.48-20.48-20.48L179.712 195.85024c-11.32544 0-20.48 9.15456-20.48 20.48l0 264.47872C159.232 492.11392 168.40704 501.28896 179.712 501.28896zM200.192 236.81024l223.51872 0 0 223.51872L200.192 460.32896 200.192 236.81024zM529.63328 501.28896l264.47872 0c11.32544 0 20.48-9.15456 20.48-20.48L814.592 216.33024c0-11.32544-9.15456-20.48-20.48-20.48L529.63328 195.85024c-11.32544 0-20.48 9.15456-20.48 20.48l0 264.47872C509.15328 492.11392 518.32832 501.28896 529.63328 501.28896zM550.11328 236.81024l223.51872 0 0 223.51872L550.11328 460.32896 550.11328 236.81024zM179.712 851.21024l264.47872 0c11.32544 0 20.48-9.15456 20.48-20.48L464.67072 566.23104c0-11.32544-9.15456-20.48-20.48-20.48L179.712 545.75104c-11.32544 0-20.48 9.15456-20.48 20.48l0 264.47872C159.232 842.0352 168.40704 851.21024 179.712 851.21024zM200.192 586.71104l223.51872 0 0 223.51872L200.192 810.22976 200.192 586.71104zM509.15328 830.73024c0 11.32544 9.15456 20.48 20.48 20.48l264.47872 0c11.32544 0 20.48-9.15456 20.48-20.48L814.592 566.23104c0-11.32544-9.15456-20.48-20.48-20.48L529.63328 545.75104c-11.32544 0-20.48 9.15456-20.48 20.48L509.15328 830.73024zM550.11328 586.71104l223.51872 0 0 223.51872L550.11328 810.22976 550.11328 586.71104z"
          fill="white"
        />
      </svg>
    ),
    title: 'Change to Grid',
    action(node) {
      changeCellToGrid(node);
    },
  },
  condition: (node) => {
    return node.componentMeta.componentName === CELL;
  },
  important: true,
});

window.parent?.AliLowCodeEngine?.designerCabin?.addBuiltinComponentAction?.({
  name: 'change to FixedContainer',
  content: {
    icon: (
      <svg viewBox="0 0 1024 1024" width="14">
        <path
          fill="white"
          d="M893.76 523.26a29.582 29.582 0 0 0 0-22.56c-1.5-3.63-3.67-6.9-6.4-9.62l-88.6-88.6c-11.54-11.54-30.23-11.54-41.77 0-11.54 11.54-11.54 30.23 0 41.77l38.2 38.2H541.54V228.8l38.2 38.2c5.77 5.77 13.33 8.65 20.89 8.65s15.12-2.88 20.89-8.65c11.54-11.54 11.54-30.23 0-41.77l-88.6-88.6c-2.73-2.74-6-4.9-9.62-6.4a29.562 29.562 0 0 0-22.57 0c-3.63 1.5-6.89 3.67-9.62 6.4l-88.6 88.6c-11.54 11.54-11.54 30.23 0 41.77 11.54 11.54 30.23 11.54 41.77 0l38.2-38.2v253.64H228.82l38.2-38.2c11.54-11.54 11.54-30.23 0-41.77s-30.23-11.54-41.77 0l-88.6 88.6c-2.73 2.73-4.9 6-6.4 9.62a29.516 29.516 0 0 0 0 22.57c1.5 3.62 3.66 6.89 6.4 9.62l88.6 88.6c5.77 5.77 13.33 8.65 20.89 8.65 7.56 0 15.12-2.88 20.89-8.65 11.54-11.54 11.54-30.23 0-41.77l-38.2-38.2h253.64v253.64l-38.2-38.2c-11.54-11.54-30.23-11.54-41.77 0-11.54 11.54-11.54 30.23 0 41.77l88.6 88.6c2.73 2.74 6 4.9 9.62 6.4 3.61 1.49 7.44 2.28 11.29 2.28s7.68-0.78 11.29-2.28c3.63-1.5 6.89-3.67 9.62-6.4l88.6-88.6c11.54-11.54 11.54-30.23 0-41.77-11.54-11.54-30.23-11.54-41.77 0l-38.2 38.2V541.52h253.64l-38.2 38.2c-11.54 11.54-11.54 30.23 0 41.77 5.77 5.77 13.33 8.65 20.89 8.65s15.12-2.88 20.89-8.65l88.6-88.6c2.73-2.73 4.89-6 6.39-9.63z"
        />
      </svg>
    ),
    title: '转为自由布局容器',
    action(node) {
      const fixedContainerSnippets = createFixedContainerSnippet();
      const parentNode = node.parent;

      const wrapSnippet = {
        ...fixedContainerSnippets,
        props: {
          ...fixedContainerSnippets.props,
          style: {
            ...node.schema.props?.style,
            ...fixedContainerSnippets.props?.style,
          },
        },
      };
      const wrapNode = node.document.createNode(wrapSnippet);
      parentNode.insertAfter(wrapNode, node, false);
      wrapNode.select();
      node.remove();
    },
  },
  condition: (node) => {
    return node.componentMeta.componentName === CELL;
  },
  important: true,
});

module.exports = {
  componentName: CELL,
  title: '容器',
  category: '布局容器类',
  group: '精选组件',
  icon: 'https://img.alicdn.com/imgextra/i1/O1CN01AQZw941ZgdfVtjsDO_!!6000000003224-55-tps-128-128.svg',
  docUrl: '',
  screenshot: '',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Cell',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: 'style',
      propType: 'object',
      description: '自定义内敛样式',
    },
    {
      name: '!shortcuts',
      title: '快捷键',
      display: 'block',
      setter: () => {
        return (
          <div style={shortcutsStyle}>
            <a
              href="https://www.yuque.com/fusion-design/layout/pbkx1v"
              target="_blank"
              style={{ position: 'absolute', right: 20 }}
              rel="noreferrer"
            >
              使用文档
            </a>
            <div>
              <code style={codeStyle}>s</code> Append a column
            </div>
            <div>
              <code style={codeStyle}>shift+s</code> Preappend a column
            </div>
            <div>
              <code style={codeStyle}>w</code> Append a row
            </div>
            <div>
              <code style={codeStyle}>shift+w</code> Preappend a row
            </div>
            <div>
              <code style={codeStyle}>f</code> Select parent
            </div>
            <div>
              <code style={codeStyle}>a</code> Open Component Panel
            </div>
          </div>
        );
      },
    },
    {
      title: '布局',
      type: 'group',
      display: 'block',
      items: [
        ...flexSetter,
        {
          name: 'gap',
          title: '间距',
          defaultValue: 4,
          initialValue: 4,
          setter: {
            componentName: 'NumberSetter',
            props: {
              step: 2,
              min: 0,
            },
          },
        },
      ],
    },
    {
      title: '宽度控制',
      type: 'group',
      display: 'block',
      condition: (target) => {
        // Col 下不允许控制宽度
        return target.getNode().parent.componentName !== COL;
      },
      items: [...widthSetter],
    },
    {
      title: '高度控制',
      type: 'group',
      display: 'block',
      condition: (target) => {
        // Row 下不允许控制高度
        return target.getNode().parent.componentName !== ROW;
      },
      items: [...heightSetter],
    },
    {
      title: '样式',
      type: 'group',
      display: 'accordion',
      items: [...backgroundSetter],
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: (node) => {
          return [CELL, ROW, COL].indexOf(node.componentName) === -1;
        },
        parentWhitelist: (node) => {
          return [P, CELL].indexOf(node.componentName) === -1;
        },
      },
    },
    supports: {
      style: true,
      loop: false,
    },
  },
  experimental: {
    getResizingHandlers,
    callbacks: {
      ...onDrageResize,
      /**
       * 组件拖入回调逐层向上触发，需要做好判断。
       * 自动包裹 P
       * @param {*} draggedNode 被拖入的组件
       * @param {*} currentNode 被拖入到 CELL
       */
      onNodeAdd: (draggedNode, currentNode) => {
        if (
          !draggedNode ||
          // Slider 不能包裹在 P 里面
          // FusionUI 里面的通栏组件不包 P
          [
            P,
            CELL,
            ROW,
            COL,
            BLOCK,
            'Slot',
            'Anchor',
            'AnchorForm',
            'Slider',
            'PageHeader',
            'ProCard',
            'ProTable',
            'ProForm',
            'StepForm',
            'Filter',
          ].includes(draggedNode.componentName) ||
          (draggedNode.isModal && draggedNode.isModal())
        ) {
          return;
        }

        const { currentDocument } = draggedNode.document.project;
        const { dropLocation } = draggedNode.document.canvas;

        if (
          dropLocation?.target === currentNode ||
          currentDocument.selection.selected[0] === currentNode.id
        ) {
          // 自动包裹 P
          const pSnippet = createPSnippet();

          const newNode = currentNode.document.createNode(pSnippet);
          newNode.insertAfter(draggedNode, newNode, false);

          if (dropLocation?.detail?.near?.node) {
            const insertPoint = dropLocation.detail.near.node;
            dropLocation.detail.near.pos === 'after'
              ? currentNode.insertAfter(newNode, insertPoint, false)
              : currentNode.insertBefore(newNode, insertPoint, false);
          } else {
            // 粘贴进来的
            currentNode.insertAfter(newNode, currentNode, false);
          }
        }
      },
      onSubtreeModified: (currentNode, e) => {
        onNodeReplaceSelfWithChildrenCell(currentNode, e);
      },
      /**
       * 节点被拖拽的回调
       * @param {*} draggedNode 当前被拖拽节点 CELL
       * @returns
       */
      // onMoveHook() {
      //   return false;
      // },
    },
  },
  snippets: [
    {
      title: '容器',
      screenshot:
        'https://img.alicdn.com/imgextra/i2/O1CN01B1NMW926IFrFxjqQT_!!6000000007638-55-tps-56-56.svg',
      schema: {
        componentName: CELL,
        props: {},
      },
    },
  ],
};
