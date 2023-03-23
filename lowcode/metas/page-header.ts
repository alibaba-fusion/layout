import { PAGE_HEADER, CELL } from '../names';
import minHeight from './setter/min-height';
import background from './setter/background';
import { IPublicTypeComponentMetadata } from '@alilc/lowcode-types';

const config: IPublicTypeComponentMetadata = {
  componentName: PAGE_HEADER,
  title: '页面头部',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Page',
    main: 'lib/index.js',
    destructuring: true,
    subName: 'Header',
  },
  props: [],
  configure: {
    component: {
      isContainer: true,
      disableBehaviors: '*',
      nestingRule: {
        childWhitelist: [CELL],
      },
    },
    props: [
      {
        name: 'style.padding',
        title: {
          label: '内边距',
        },
        setter: {
          componentName: 'RadioGroupSetter',
          initialValue: '',
          props: {
            options: [
              {
                title: '无',
                value: '0',
              },
              {
                title: '有',
                value: '',
              },
            ],
          },
        },
      },
      {
        name: 'fullWidth',
        title: '全宽',
        setter: 'BoolSetter',
      },
      {
        title: '高度控制',
        type: 'group',
        display: 'block',
        items: [...minHeight],
      },
      {
        title: '样式',
        type: 'group',
        display: 'block',
        items: [...background],
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