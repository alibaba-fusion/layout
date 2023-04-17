import { PAGE_FOOTER } from '../names';
import minHeight from './setter/min-height';
import background from './setter/background';
import { IPublicTypeComponentMetadata } from '@alilc/lowcode-types';

const meta: IPublicTypeComponentMetadata = {
  componentName: PAGE_FOOTER,
  title: '页面尾部',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Page',
    main: 'lib/index.js',
    destructuring: true,
    subName: 'Footer',
  },
  props: [],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {},
    },
    props: [
      {
        name: 'fixed',
        title: {
          label: '是否吸底',
          tip: '可以用来放置吸底的表单提交按钮等',
        },
        defaultValue: false,
        setter: {
          componentName: 'BoolSetter',
          initialValue: false,
          defaultValue: false,
        },
      },
      ...minHeight,
      ...background,
    ],
    supports: {
      style: true,
      loop: false,
    },
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

export default meta;
