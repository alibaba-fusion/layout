const { updateSpan } = require('../common/split/auto-block');
const { PAGE, SECTION, BLOCK, CELL } = require('../names');
const minHeight = require('./setter/min-height');
const background = require('./setter/background');

module.exports = {
  componentName: SECTION,
  title: '区域',
  category: '布局容器类',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Section',
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
      name: 'childTotalColumns',
      propType: 'number',
    },
    {
      name: 'background',
      propType: {
        type: 'oneOf',
        value: ['lining', 'surface', 'transparent'],
      },
      defaultValue: 'transparent',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: [BLOCK],
        parentWhitelist: (testNode) => {
          // 允许拖入LayoutPage aside slot中
          if (testNode.componentName === PAGE) {
            return true;
          }

          if (testNode.componentName === 'Slot' && ['aside'].indexOf(testNode.title) > -1) {
            return true;
          }
          return false;
        },
      },
    },
    props: [
      {
        type: 'group',
        title: {
          label: '高度',
        },
        extraProps: {
          display: 'block',
        },
        items: [...minHeight],
      },
      {
        type: 'group',
        title: {
          label: '布局',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'gap',
            title: '间距',
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
      {
        type: 'group',
        title: {
          label: '区域功能',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'title',
            title: '区域标题',
            setter: () => {
              if (
                window.AliLowCodeEngine &&
                window.AliLowCodeEngine.setters.getSetter('TitleSetter')
              ) {
                return {
                  componentName: 'TitleSetter',
                  defaultValue: '区域标题',
                  props: {
                    // defaultChecked: true,
                  },
                };
              }
              return {
                componentName: 'StringSetter',
                defaultValue: '区域标题',
              };
            },
          },
        ],
      },
      {
        type: 'group',
        title: {
          label: '样式',
        },
        extraProps: {
          display: 'block',
        },
        items: [...background],
      },
    ],
    supports: {
      className: true,
      style: true,
      loop: false,
    },
  },
  experimental: {
    callbacks: {
      onNodeRemove: (removedNode) => {
        updateSpan({
          parent: removedNode.parent,
          child: removedNode,
          type: 'delete',
        });
      },
      onLocateHook: ({ dragObject, target, detail }) => {
        if (dragObject.nodes?.length === 1) {
          const dragNode = dragObject.nodes[0];
          const currentDragIndex = dragNode.index;
          if (!target.lastFlatenMap) {
            updateSpan({
              parent: target,
              type: 'refresh',
            });
          }
          const flattenMap = target.lastFlatenMap || [];
          let distDragIndex = detail.index;
          if (distDragIndex > currentDragIndex) {
            distDragIndex -= 1;
          }
          // 只有同行可以换
          if (flattenMap[currentDragIndex]?.groupIndex === flattenMap[distDragIndex]?.groupIndex) {
            return true;
          }
        }
        // 拖拽多个先不处理
        return false;
      },
      // onHoverHook: () => false,
      // onMouseDownHook: () => false,
      // onClickHook: () => false,
    },
    initialChildren: [
      {
        componentName: BLOCK,
        props: {},
        children: [
          {
            componentName: CELL,
            props: {},
          },
        ],
      },
    ],
  },
  icon: 'https://img.alicdn.com/imgextra/i3/O1CN018CwRJM1ZkIpmeEfRD_!!6000000003232-55-tps-128-128.svg',
};
