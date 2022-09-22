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

export const createHeaderSnippet = () => {
  return {
    componentName: PAGE_HEADER,
    title: '页面头部',
    props: {},
    children: [createCellSnippet()],
  };
};
export const createFooterSnippet = () => {
  return {
    componentName: PAGE_FOOTER,
    title: '页面尾部',
    props: {},
    children: [createCellSnippet()],
  };
};

export const createNavSnippet = () => {
  return {
    componentName: PAGE_NAV,
    title: '左侧区域',
    props: {
      width: 200,
    },
    children: [createBlockSnippet()],
  };
};
export const createAsideSnippet = () => {
  return {
    componentName: PAGE_ASIDE,
    title: '右侧区域',
    props: {
      width: 200,
    },
    children: [createBlockSnippet()],
  };
};

export const createSectionSnippet = ({ blockProps } = {}) => {
  return {
    componentName: SECTION,
    title: '区域',
    props: {},
    children: [createBlockSnippet({ blockProps })],
  };
};

export const createBlockSnippet = ({ blockProps } = {}) => {
  return {
    componentName: BLOCK,
    title: '区块',
    props: {
      ...blockProps,
    },
    children: [createCellSnippet()],
  };
};

export const createRowColSnippet = (componentName = COL) => {
  return {
    componentName,
    title: componentName === COL ? '列容器' : '行容器',
    props: {},
    children: [],
  };
};

export const createGridlSnippet = () => {
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

export const createCellSnippet = () => {
  return {
    componentName: CELL,
    title: '容器',
    props: {},
    children: [],
  };
};

export const createFixedContainerSnippet = () => {
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
export const createPSnippet = () => {
  return {
    componentName: P,
    title: '段落',
    props: {},
    children: [],
  };
};
