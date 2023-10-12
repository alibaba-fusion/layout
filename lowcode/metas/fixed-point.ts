import { IPublicTypeComponentMetadata } from '@alilc/lowcode-types';
import { FIXED_POINT } from '../names';

const config: IPublicTypeComponentMetadata = {
  componentName: FIXED_POINT,
  title: '自由节点',
  category: '布局容器类',
  group: '精选组件',
  npm: {
    package: '@alifd/layout',
    version: '^0.1.0',
    exportName: 'FixedPoint',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  configure: {
    component: {
      isContainer: true,
    },
    props: [
      {
        name: 'zIndex',
        title: '层级',
        setter: {
          componentName: 'NumberSetter',
          props: {
            min: 0,
          },
        },
      },
    ],
    supports: {
      style: true,
      loop: false,
    },
    advanced: {}
  },
  experimental: {
    callbacks: {},
  },
  icon: 'https://img.alicdn.com/imgextra/i1/O1CN0144G9Iw22y9fiO73NG_!!6000000007188-55-tps-56-56.svg',
  snippets: [
    {
      title: '自由节点',
      screenshot:
        'https://img.alicdn.com/imgextra/i1/O1CN0144G9Iw22y9fiO73NG_!!6000000007188-55-tps-56-56.svg',
      schema: {
        componentName: FIXED_POINT,
        title: '自由节点',
        props: {},
        children: [],
      },
    },
  ],
};

export default config;
