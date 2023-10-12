import minHeight from './setter/min-height';
import { FIXED_CONTAINER } from '../names';
import { IPublicTypeComponentMetadata } from '@alilc/lowcode-types';

const config: IPublicTypeComponentMetadata = {
  componentName: FIXED_CONTAINER,
  title: '自由容器',
  category: '布局容器类',
  group: '精选组件',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'FixedContainer',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  configure: {
    component: {
      isContainer: true,
    },
    props: [
      ...minHeight,
      {
        name: 'items',
        title: '配置',
        setter: {
          componentName: 'ArraySetter',
          props: {
            itemSetter: {
              componentName: 'ObjectSetter',
              props: {
                config: {
                  items: [
                    {
                      name: 'zIndex',
                      title: '层级 (zIndex)',
                      important: true,
                      setter: 'NumberSetter',
                    },
                    {
                      name: 'left',
                      title: '右偏移',
                      setter: 'NumberSetter',
                    },
                    {
                      name: 'top',
                      title: '下偏移',
                      setter: 'NumberSetter',
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
            },
          },
        },
        extraProps: {
          disableAdd: true,
        },
      },
    ],
    supports: {
      style: true,
      loop: false,
    },
    advanced: {}
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
  snippets: [],
};

export default config;
