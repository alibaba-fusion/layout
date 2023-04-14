import {
  IPublicModelNode,
  IPublicTypeFieldConfig,
  IPublicTypeComponentMetadata,
} from '@alilc/lowcode-types';
import { PAGE_CONTENT } from '../names';
import navAside from './nav-aside';

const newNavAside = navAside.map((item: IPublicTypeFieldConfig) => {
  return { ...item };
});

const meta: IPublicTypeComponentMetadata = {
  componentName: PAGE_CONTENT,
  title: '页面主体',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'Page',
    main: 'lib/index.js',
    destructuring: true,
    subName: 'Content',
  },
  props: [],
  configure: {
    component: {
      isContainer: true,
    },
    props: [
      {
        name: 'title',
        title: {
          label: '子页面标题',
        },
        defaultValue: '子页面',
        setter: {
          componentName: 'StringSetter',
          initialValue: '子页面',
          defaultValue: '子页面',
        },
      },
      {
        type: 'group',
        title: {
          label: '拓展区域',
        },
        extraProps: {
          display: 'block',
        },
        items: [...newNavAside],
      },
      {
        type: 'group',
        title: {
          label: '样式',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'style.background',
            title: {
              label: '主体背景色',
            },
            defaultValue: 'transparent',
            setter: 'ColorSetter',
          },
        ],
      },
    ],
    advanced: {
      callbacks: {
        // onNodeAdd,
        onNodeRemove: (removedNode: IPublicModelNode, currentNode: IPublicModelNode) => {
          // 如果删除的是slot 那么焦点聚焦到PageContent上
          if (
            removedNode.componentName === 'Slot' &&
            ['header', 'footer', 'aside', 'nav'].indexOf(String(removedNode?.slotFor?.key)) > -1
          ) {
            currentNode.select();
          }
        },
        onMoveHook() {
          return false;
        },
      },
    },
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};

export default meta;
