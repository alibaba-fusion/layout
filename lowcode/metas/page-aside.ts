import { IPublicTypeComponentMetadata } from '@alilc/lowcode-types';
import { PAGE_ASIDE } from '../names';

const config: IPublicTypeComponentMetadata = {
  componentName: PAGE_ASIDE,
  title: '页面右侧',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Page',
    main: 'lib/index.js',
    destructuring: true,
    subName: 'Aside',
  },
  props: [],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {},
    },
    props: [
      {
        name: 'width',
        title: {
          label: '宽度',
        },
        setter: {
          componentName: 'NumberSetter',
          // props: {
          //   min: 0,
          //   units: [{ type: 'px' }],
          // },
        },
      },
    ],
    advanced: {
      callbacks: {
        onMoveHook() {
          return false;
        },
      },
    },
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};

export default config;