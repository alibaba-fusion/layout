const { updateSpan } = require('../common/split/auto-block');
const BLOCK_RESIZE_MAP = require('../common/split/block-resize-map');
const { CELL, ROW, COL, SECTION, BLOCK } = require('../names');
const heightSetter = require('./setter/min-height');
const backgroundSetter = require('./setter/background');
const { onNodeRemoveSelfWhileNoChildren } = require('./enhance/callbacks');

/**
 * 获取数组 arr 中， 前 index 个（包括第index个）元素的加和值, index 是索引 从0开始
 * @param {*} arr
 * @param {*} index
 */
const getAcc = (arr, index) => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.reduce((last, count, i) => {
      if (i <= index) {
        return +count + last;
      }
      return last;
    }, 0);
  }
  return 0;
};

module.exports = {
  componentName: BLOCK,
  title: '区块',
  category: '容器',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Block',
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
      name: 'mode',
      propType: 'string',
    },
    {
      name: 'span',
      propType: 'number',
    },
    {
      name: 'title',
      propType: 'node',
    },
    {
      name: 'extra',
      propType: 'node',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: [CELL, ROW, COL],
        parentWhitelist: [SECTION],
      },
    },
    props: [
      {
        type: 'group',
        title: {
          label: '样式类型',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'mode',
            title: '区块样式',
            setter: {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  {
                    title: '默认',
                    value: undefined,
                  },
                  {
                    title: '透明',
                    value: 'transparent',
                  },
                ],
              },
            },
            extraProps: {
              setValue: (target, value) => {
                if (value === 'transparent') {
                  target.getNode().setPropValue('title', undefined);
                } else if (value !== undefined) {
                  target.getNode().setPropValue('mode', undefined);
                }
              },
            },
          },
          // {
          //   name: '!mode',
          //   title: '透明模式',
          //   setter: 'BoolSetter',
          //   extraProps: {
          //     getValue: (target) => {
          //       return target.getNode().getPropValue('mode') === 'transparent';
          //     },
          //     setValue: (target, value) => {
          //       if (value) {
          //         target.getNode().setPropValue('title', undefined);
          //         target.getNode().setPropValue('mode', 'transparent');
          //       } else {
          //         target.getNode().setPropValue('mode', undefined);
          //       }
          //     },
          //   },
          // },
          {
            name: 'title',
            title: '标题',
            condition: (target) => {
              return target.parent.getPropValue('mode') !== 'transparent';
            },
            setter: (target) => {
              if (
                window.AliLowCodeEngine &&
                window.AliLowCodeEngine.setters.getSetter('TitleSetter')
              ) {
                return {
                  componentName: 'TitleSetter',
                  props: {
                    defaultChecked: !!target.parent.getPropValue('title'),
                  },
                };
              }
              return {
                componentName: 'StringSetter',
              };
            },
            description: '标题',
          },
          {
            name: 'divider',
            title: '头部分割线',
            condition: (target) => {
              return (
                target.parent.getPropValue('mode') !== 'transparent' &&
                !!target.parent.getPropValue('title')
              );
            },
            setter: 'BoolSetter',
          },
          {
            name: 'extra',
            title: '扩展',
            condition: (target) => {
              return target.parent.getPropValue('mode') !== 'transparent';
            },
            setter: {
              componentName: 'SlotSetter',
              initialValue: {
                type: 'JSSlot',
                title: 'extra',
                value: [
                  {
                    componentName: CELL,
                    title: '容器',
                  },
                ],
              },
            },
          },
          {
            name: 'bordered',
            title: '边框',
            condition: (target) => {
              return target.parent.getPropValue('mode') !== 'transparent';
            },
            setter: 'BoolSetter',
          },
        ],
      },
      {
        title: '样式',
        type: 'group',
        display: 'accordion',
        items: [...backgroundSetter, ...heightSetter],
      },
    ],
    supports: {
      style: true,
      loop: false,
    },
  },
  experimental: {
    getResizingHandlers: (node) => {
      const directionMap = [];
      const flatenGroupMap = node.parent.lastFlatenMap;

      if (node.index < 0) {
        return [];
      }
      if (
        !(
          Array.isArray(flatenGroupMap) &&
          flatenGroupMap.length > 0 &&
          node.index > -1 &&
          flatenGroupMap[node.index]
        )
      ) {
        updateSpan({
          parent: node.parent,
          child: node,
          type: 'refresh',
        });
        return ['e', 'w'];
      }
      const { groupLength, groupInnerIndex } = flatenGroupMap[node.index];

      if (groupInnerIndex > 0) {
        directionMap.push('w');
      }

      if (groupInnerIndex < groupLength - 1) {
        directionMap.push('e');
      }

      return directionMap;
    },
    callbacks: {
      onNodeRemove: onNodeRemoveSelfWhileNoChildren,
      onResizeStart: (e, currentNode) => {
        const parent = currentNode.getParent();
        if (parent) {
          const parentNode = parent.getDOMNode();
          if (parentNode) {
            currentNode.parentRect = parentNode.getBoundingClientRect();
          }
        }
        currentNode.lastDeltaX = 0;
        currentNode.lastGroupList = '';
      },
      onResize: (e, currentNode) => {
        // 获取合法移动位移
        // 判断是否要变化
        // 更新鼠标开始位置，更新span信息
        const { deltaX, trigger } = e;
        // trigger 可能为 e（右） 或 w（左）
        const { index: parentIndex } = currentNode;
        const { lastFlatenMap } = currentNode.parent;

        if (!lastFlatenMap) {
          return;
        }
        const { groupInnerIndex, groupList } = lastFlatenMap[parentIndex];
        const latestDeltaX = deltaX - currentNode.lastDeltaX || 0;

        // 当前 groupList 是 4 4 4
        // 根据左右方向确认是 r 还是 l
        // 根据resize handleer 方向（w e） 和 当前的 groupInnerIndex ，确定分割线位置
        // 假如算出来的是 1r
        //  4 4 4 + 1r = 6 3 3
        // 在「groupInnerIndex === 0， deltaX 往右移动两格」或 「groupInnerIndex === 1」deltaX往左移动两格时
        //  再updateColSpan

        const direction = latestDeltaX > 0 ? 'r' : 'l';
        const operation = `${trigger === 'e' ? groupInnerIndex + 1 : groupInnerIndex}${direction}`;
        const afterGroupList =
          BLOCK_RESIZE_MAP[groupList] && BLOCK_RESIZE_MAP[groupList][operation];
        const groupAccInnerIndex = trigger === 'e' ? groupInnerIndex : groupInnerIndex - 1;

        // console.log('groupList:', groupList, '   afterGroupList', afterGroupList, '  operation:', operation, ' deltaX:', deltaX, '  latestDeltaX:',latestDeltaX, '   linedirection', trigger)
        if (!afterGroupList) {
          return;
        }
        const step =
          getAcc(afterGroupList.split(','), groupAccInnerIndex) -
          getAcc(groupList.split(','), groupAccInnerIndex);
        // console.log('step:', step, '  groupAccInnerIndex:', groupAccInnerIndex, '  deltaX', deltaX, '   currentNode.movementAtOnce:', currentNode.movementAtOnce, '   currentNode.lastGroupList:', currentNode.lastGroupList);
        if (currentNode.movementAtOnce === step && currentNode.lastGroupList === groupList) {
          return;
        }

        const stepPx = (currentNode.parentRect.width / 12) * step;
        const tolerance = 40;

        // console.log('stepPx:', stepPx, '  tolerance:', tolerance)

        if (Math.abs(latestDeltaX) > Math.abs(stepPx) - tolerance) {
          currentNode.movementAtOnce = step;
          currentNode.lastGroupList = groupList;
          currentNode.lastDeltaX += stepPx;

          updateSpan({
            parent: currentNode.parent,
            child: currentNode,
            type: 'resize',
            direction: trigger, // 默认是 e , 也就是拖拽区块右边的线进行resize
            offset: step,
          });
        }
      },
      onResizeEnd: (e, currentNode) => {
        currentNode.movementAtOnce = 'clear';
      },
      // onLocateHook: (e) => {
      //   const { dragObject, target, detail } = e;
      //   console.log(e);
      // },
    },
    initialChildren: [
      {
        componentName: CELL,
        title: '容器',
      },
    ],
  },
  icon: 'https://img.alicdn.com/imgextra/i2/O1CN01wBgtFK1NKP32cK57c_!!6000000001551-55-tps-128-128.svg',
};
