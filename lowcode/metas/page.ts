import {
  IPublicModelNode,
  IPublicModelSettingPropEntry,
  IPublicTypeComponentMetadata,
} from '@alilc/lowcode-types';

import {
  PAGE,
  PAGE_HEADER,
  PAGE_FOOTER,
  PAGE_CONTENT,
  SECTION,
  BLOCK,
  CELL,
  PAGE_NAV,
  PAGE_ASIDE,
} from '../names';
import { createHeaderSnippet, createFooterSnippet, createSectionSnippet } from '../default-schema';
// import navAside from './nav-aside';

// Tab 功能因为依赖了Fusion的Tab，只是暂时去掉，后续会重新设计
// const newNavAside = navAside.map((item) => {
//   const newItem = { ...item };
//   newItem.condition = (target: IPublicModelSettingPropEntry): boolean => {
//     const isTab = target.getProps().getPropValue('isTab');
//     if (['nav', 'aside'].indexOf(String(newItem.name)) > -1) {
//       return !isTab;
//     }
//     if (['navProps.width'].indexOf(String(newItem.name)) > -1) {
//       return !isTab && !!target.getProps().getPropValue('nav');
//     }

//     if (['asideProps.width'].indexOf(String(newItem.name)) > -1) {
//       return !isTab && !!target.getProps().getPropValue('aside');
//     }

//     return false;
//   };
//   return newItem;
// });

const config: IPublicTypeComponentMetadata = {
  componentName: PAGE,
  title: '页面',
  category: '布局容器类',
  group: '精选组件',
  icon: 'https://img.alicdn.com/imgextra/i1/O1CN01Yzdr431hx8rjT6PuR_!!6000000004343-55-tps-128-128.svg',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Page',
    main: 'lib/index.js',
    destructuring: true,
  },
  props: [
    {
      name: 'style',
      propType: 'object',
    },
    {
      name: 'prefix',
      propType: 'string',
      defaultValue: 'next-',
    },
    {
      name: 'header',
      propType: 'node',
    },
    {
      name: 'footer',
      propType: 'node',
    },
    {
      name: 'nav',
      propType: 'node',
    },
    {
      name: 'aside',
      propType: 'node',
    },
    {
      name: 'main',
      propType: 'node',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      isMinimalRenderUnit: true,
      disableBehaviors: '*',
      nestingRule: {
        parentWhitelist: (dropTargetNode: IPublicModelNode) => {
          let targetNodeNextPageNum = 0;
          dropTargetNode.children?.forEach((item) => {
            if (item.componentName === PAGE) {
              targetNodeNextPageNum += 1;
            }
          });
          // 要拖入到的节点是根节点 && 根节点不是NextPage && 当前根节点下没有 NextPage  => 才允许被拖入
          if (
            dropTargetNode.isRoot &&
            dropTargetNode.componentName !== PAGE &&
            targetNodeNextPageNum === 0
          ) {
            return true;
          }

          return false;
        },
        childWhitelist: [SECTION, PAGE_CONTENT, PAGE_FOOTER, PAGE_HEADER, PAGE_NAV, PAGE_ASIDE],
      },
    },
    props: [
      {
        type: 'group',
        title: {
          label: '页面功能',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: '!header',
            title: '开启页头',
            setter: 'BoolSetter',
            extraProps: {
              getValue: (target: IPublicModelSettingPropEntry) => {
                const pageNode = target.node;
                return !!pageNode?.children?.find((n) => n.componentName === PAGE_HEADER);
              },
              setValue: (target: IPublicModelSettingPropEntry, value: boolean) => {
                const pageNode = target.node;
                const node = pageNode?.children?.find((n) => n.componentName === PAGE_HEADER);
                if (value && !node) {
                  const navSnippets = createHeaderSnippet();
                  const node2 = pageNode?.document?.createNode(navSnippets);
                  const insertNode = pageNode?.children?.get(0);
                  node2 && insertNode && pageNode?.insertBefore(node2, insertNode, false);
                } else if (!value && node) {
                  node.remove();
                }
              },
            },
          },
          {
            name: '!footer',
            title: '开启页尾',
            setter: 'BoolSetter',
            extraProps: {
              getValue: (target: IPublicModelSettingPropEntry) => {
                const pageNode = target.node;
                return !!pageNode?.children?.find((n) => n.componentName === PAGE_FOOTER);
              },
              setValue: (target: IPublicModelSettingPropEntry, value: boolean) => {
                const pageNode = target.node;
                const node = pageNode?.children?.find((n) => n.componentName === PAGE_FOOTER);
                if (value && !node) {
                  const navSnippets = createFooterSnippet();
                  const node2 = pageNode?.document?.createNode(navSnippets);
                  node2 && pageNode?.insertBefore(node2);
                } else if (!value && node) {
                  node.remove();
                }
              },
            },
          },
          {
            name: '!items',
            condition: (target: IPublicModelSettingPropEntry) => {
              return !!target.getProps().getPropValue('isTab');
            },
            isDynamicProp: true,
            setter: {
              componentName: 'ArraySetter',
              props: {
                itemSetter: {
                  componentName: 'ObjectSetter',
                  props: {
                    config: {
                      items: [
                        {
                          name: 'title',
                          title: '名称',
                          important: true,
                          setter: 'StringSetter',
                        },
                        {
                          name: 'primaryKey',
                          title: '项目编号',
                          condition: () => false,
                          setter: 'StringSetter',
                        },
                      ],
                    },
                  },
                  initialValue: () => {
                    return {
                      primaryKey: `key-${Math.random().toString(36).substr(-6)}`,
                      title: '子页面',
                    };
                  },
                },
              },
            },
            extraProps: {
              display: 'plain',
              getValue(target: IPublicModelSettingPropEntry) {
                return target?.node?.children
                  ?.filter((n) => n.componentName === PAGE_CONTENT)
                  .map((child: IPublicModelNode) => {
                    const title = child.getPropValue('title');
                    const primaryKey = child.getPropValue('primaryKey');

                    const newPrimaryKey = primaryKey ? String(primaryKey) : child.id;
                    return {
                      primaryKey: newPrimaryKey,
                      title,
                    };
                  });
              },
              setValue(target: IPublicModelSettingPropEntry, value: any[]) {
                const node = target.node;
                const map: {
                  [key: string]: any;
                } = {};
                if (!Array.isArray(value)) {
                  value = [];
                }
                value.forEach((i) => {
                  const tabitem = Object.assign({}, i);
                  map[i.primaryKey] = tabitem;
                });

                node?.mergeChildren(
                  (child) => {
                    // 修改
                    if (child.componentName !== PAGE_CONTENT) {
                      return false;
                    }
                    const primaryKey = child.getPropValue('primaryKey');
                    const newPrimaryKey = primaryKey ? String(primaryKey) : child.id;
                    if (Object.hasOwnProperty.call(map, newPrimaryKey)) {
                      child.setPropValue('title', map[newPrimaryKey].title);
                      delete map[newPrimaryKey];
                      return false;
                    }
                    return true;
                  },
                  () => {
                    // 新增
                    const items = [];
                    // 取最新 Block 作为默然值
                    const blockProps =
                      target.node?.children
                        ?.find((n) => n.componentName === PAGE_CONTENT)
                        ?.children?.find((n) => n.componentName === SECTION)
                        ?.children?.find((n) => n.componentName === BLOCK)?.schema?.props || {};

                    for (const primaryKey in map) {
                      if (Object.hasOwnProperty.call(map, primaryKey)) {
                        items.push({
                          componentName: PAGE_CONTENT,
                          title: '页面主体',
                          props: {
                            isTab: true,
                            title: map[primaryKey].title,
                            primaryKey,
                          },
                          children: [{ ...createSectionSnippet({ blockProps }) }],
                        });
                      }
                    }
                    return items;
                  },
                  (child1, child2) => {
                    // 排序
                    const a = value.findIndex(
                      (item) =>
                        String(item.primaryKey) === String(child1.getPropValue('primaryKey')),
                    );
                    const b = value.findIndex(
                      (item) =>
                        String(item.primaryKey) === String(child2.getPropValue('primaryKey')),
                    );
                    return a - b;
                  },
                );
              },
            },
          },
        ],
      },
      {
        type: 'group',
        title: {
          label: '选项卡样式',
        },
        extraProps: {
          display: 'block',
        },
        condition: (target: IPublicModelSettingPropEntry) => {
          return !!target.getProps().getPropValue('isTab');
        },
        items: [
          {
            name: 'tabProps.shape',
            title: '样式',
            condition: (target: IPublicModelSettingPropEntry) => {
              return !!target.getProps().getPropValue('isTab');
            },
            defaultValue: 'pure',
            setter: {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  { title: '普通型', value: 'pure' },
                  { title: '包裹型', value: 'wrapped' },
                  { title: '文本型', value: 'text' },
                  { title: '胶囊型', value: 'capsule' },
                ],
              },
            },
          },
          {
            name: 'tabProps.size',
            title: '尺寸',
            condition: (target: IPublicModelSettingPropEntry) => {
              return !!target.getProps().getPropValue('isTab');
            },
            defaultValue: 'medium',
            setter: {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  { title: '小', value: 'small' },
                  { title: '中', value: 'medium' },
                ],
              },
            },
          },
          {
            name: 'tabProps.excessMode',
            title: {
              label: '滑动模式',
              tip: '选项卡过多时，超出可视区域部分的tab该如何展示',
            },
            defaultValue: 'slide',
            condition: (target: IPublicModelSettingPropEntry) => {
              return !!target.getProps().getPropValue('isTab');
            },
            setter: {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  { title: '左右滑动', value: 'slide' },
                  { title: '下拉', value: 'dropdown' },
                ],
              },
            },
          },
          {
            name: 'minHeight',
            title: {
              label: '最小高度',
            },
            initialValue: '100vh',
            defaultValue: '100vh',
            setter: {
              componentName: 'StringSetter',
            },
            // 设计在线里不需要出现
            condition: () => false,
          },
        ],
      },
      {
        name: 'breakPoints',
        title: {
          label: '内容宽度配置',
        },
        extraProps: {
          display: 'block',
        },
        setter: {
          componentName: 'ArraySetter',
          props: {
            itemSetter: {
              componentName: 'ObjectSetter',
              props: {
                config: {
                  items: [
                    {
                      name: 'width',
                      title: '当屏幕宽度小于',
                      setter: {
                        componentName: 'SelectSetter',
                        props: {
                          options: [
                            {
                              value: 9999,
                              label: '默认匹配',
                            },
                            {
                              value: 1440,
                              label: '1440',
                            },
                            {
                              value: 1200,
                              label: '1200',
                            },
                            {
                              value: 750,
                              label: '750',
                            },
                          ],
                        },
                      },
                      isRequired: true,
                    },
                    {
                      name: 'maxContentWidth',
                      title: '内容最大宽度',
                      setter: {
                        componentName: 'NumberSetter',
                        props: {
                          step: 20,
                        },
                      },
                      isRequired: true,
                      extraProps: {
                        setValue: () => {
                          // @ts-ignore
                          window?.Next?.Message?.notice(
                            '内容最大宽度配置完后，请保存，然后刷新页面查看效果',
                          );
                          console.warn('内容最大宽度配置完后，请保存，然后刷新页面查看效果');
                          // const currentNode = target.getNode();
                          // const pageNode = currentNode.document.createNode({
                          //   componentName: 'NextPage',
                          //   props: {
                          //     ...currentNode.schema.props
                          //   },
                          //   children: []
                          // });
                          // [...currentNode.children].forEach(n => {
                          //   pageNode.insertBefore(n);
                          // });
                          // currentNode.parent.insertAfter(pageNode, currentNode, false);

                          // currentNode.remove();
                          // pageNode.select();
                        },
                      },
                    },
                    {
                      name: 'numberOfColumns',
                      title: '栅格数量',
                      setter: {
                        componentName: 'SelectSetter',
                        props: {
                          options: [
                            {
                              value: 12,
                              label: '12',
                            },
                            {
                              value: 8,
                              label: '8',
                            },
                            {
                              value: 4,
                              label: '4',
                            },
                            {
                              value: 1,
                              label: '1',
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
              initialValue: () => {
                return {
                  width: 9999,
                  maxContentWidth: 1000,
                  numberOfColumns: 12,
                };
              },
            },
          },
        },
      },
      // {
      //   type: 'group',
      //   title: {
      //     label: '拓展区域',
      //   },
      //   extraProps: {
      //     display: 'block',
      //   },
      //   condition: (target: IPublicModelSettingPropEntry) => {
      //     return !target.getProps().getPropValue('isTab');
      //   },
      //   // condition: () => false,
      //   items: [...newNavAside],
      // },
      {
        name: 'page',
        type: 'group',
        title: {
          label: '样式',
        },
        // condition: (target) => {
        //   return !target.getProps().getPropValue('isTab');
        // },
        extraProps: {
          display: 'block',
        },
        items: [
          // {
          //   name: 'contentProps.noPadding',
          //   title: {
          //     label: '去除内边距',
          //   },
          //   initialValue: true,
          //   defaultValue: true,
          //   setter: 'BoolSetter',
          // },
          {
            name: 'contentProps.style.background',
            title: {
              label: '主体背景色',
            },
            initialValue: 'rgba(255,255,255,0)',
            defaultValue: 'rgba(255,255,255,0)',
            setter: {
              componentName: 'ColorSetter',
              initialValue: 'rgba(255,255,255,0)',
              defaultValue: 'rgba(255,255,255,0)',
            },
          },
          {
            name: 'sectionGap',
            title: '区域间隙',
            initialValue: 16,
            defaultValue: 16,
            setter: {
              componentName: 'NumberSetter',
              props: {
                step: 4,
              },
            },
          },
          {
            name: 'blockGap',
            title: '区块间隙',
            initialValue: 16,
            defaultValue: 16,
            setter: {
              componentName: 'NumberSetter',
              props: {
                step: 4,
              },
            },
          },
          // {
          //   name: 'gridGap',
          //   title: '小布局间隙',
          //   setter: {
          //     componentName: 'NumberSetter',
          //     props: {
          //       step: 4,
          //     },
          //   },
          // },
          // {
          //   name: 'background',
          //   title: {
          //     label: 'Page的背景色',
          //   },
          //   setter: {
          //     componentName: 'RadioGroupSetter',
          //     initialValue: 'lining',
          //   },
          // }
        ],
      },
    ],
    advanced: {
      initials: [
        {
          name: 'modifyRemoveCondition',
          initial: () => {
            window.parent.AliLowCodeEngine.material.modifyBuiltinComponentAction(
              'remove',
              (action) => {
                const oldCondition = Object.prototype.hasOwnProperty.call(action, 'condition')
                  ? action.condition
                  : true;
                action.condition = (node: IPublicModelNode): boolean => {
                  if (node.componentName === PAGE) {
                    return false;
                  }
                  return typeof oldCondition === 'function'
                    ? oldCondition(node)
                    : Boolean(oldCondition);
                };
              },
            );
          },
        },
        // 会让页面拖入不了 Dialog / Drawer 这些，暂时屏蔽
        // {
        //   name: 'drillDown',
        //   initial: (target) => {
        //     // 这里加 timeout 0 的原因是初始化时当前页面可能还没有添加到页面中（target.parent is null）
        //     setTimeout(() => {
        //       if (target.parent && target.parent.isRoot()) {
        //         target.parent.document.drillDown(target);
        //       }
        //     }, 0);
        //   },
        // },
      ],
    },
  },
  snippets: [
    {
      title: '自然布局',
      screenshot:
        'https://img.alicdn.com/imgextra/i4/O1CN01NkB89W1dav8vtrAoc_!!6000000003753-55-tps-56-56.svg',
      schema: {
        componentName: PAGE,
        title: '页面',
        props: {},
        children: [
          {
            componentName: SECTION,
            title: '区域',
            children: [
              {
                componentName: BLOCK,
                title: '区块',
                props: {
                  mode: 'transparent',
                },
                children: [
                  {
                    componentName: CELL,
                    title: '容器',
                    props: {},
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};

export default config;
