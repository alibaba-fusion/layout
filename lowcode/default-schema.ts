import { IPublicTypeNodeSchema, IPublicTypePropsMap } from '@alilc/lowcode-types';
import {
  SECTION,
  CELL,
  COL,
  P,
  GRID,
  BLOCK,
  PAGE_NAV,
  PAGE_ASIDE,
  PAGE_HEADER,
  PAGE_FOOTER,
  FIXED_CONTAINER,
} from './names';

export const createHeaderSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: PAGE_HEADER,
    title: '页面头部',
    props: {},
    children: [createCellSnippet()],
  };
};
export const createFooterSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: PAGE_FOOTER,
    title: '页面尾部',
    props: {},
    children: [createCellSnippet()],
  };
};

export const createNavSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: PAGE_NAV,
    title: '左侧区域',
    props: {
      width: 200,
    },
    children: [createBlockSnippet()],
  };
};
export const createAsideSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: PAGE_ASIDE,
    title: '右侧区域',
    props: {
      width: 200,
    },
    children: [createBlockSnippet()],
  };
};

export const createSectionSnippet = ({
  blockProps,
}: { blockProps?: IPublicTypePropsMap } = {}): IPublicTypeNodeSchema => {
  return {
    componentName: SECTION,
    title: '区域',
    props: {},
    children: [createBlockSnippet({ blockProps })],
  };
};

export const createBlockSnippet = ({
  blockProps,
}: { blockProps?: IPublicTypePropsMap } = {}): IPublicTypeNodeSchema => {
  return {
    componentName: BLOCK,
    title: '区块',
    props: {
      ...blockProps,
    },
    children: [createCellSnippet()],
  };
};

export const createRowColSnippet = (componentName = COL): IPublicTypeNodeSchema => {
  return {
    componentName,
    title: componentName === COL ? '列容器' : '行容器',
    props: {},
    children: [],
  };
};

export const createGridlSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: GRID,
    title: '网格容器',
    props: {
      rows: 2,
      cols: 2,
    },
    children: [],
  };
};

export const createCellSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: CELL,
    title: '容器',
    props: {},
    children: [],
  };
};

export const createFixedContainerSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: FIXED_CONTAINER,
    title: '自由容器',
    props: {
      style: {
        minHeight: 60,
      },
    },
    children: [],
  };
};

/**
 * 返回包裹了P标签的schema，会根据dragged的类型设置不同的属性
 * @param {*} dragged 被拖入的组件，是个引擎 node 类型
 * @returns {} 返回值是个对象
 */
export const createPSnippet = (): IPublicTypeNodeSchema => {
  return {
    componentName: P,
    title: '段落',
    props: {},
    children: [],
  };
};
