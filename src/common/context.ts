import { createContext } from 'react';
import { LayoutContextProps } from '@/types';

// 默认的布局上下文参数
export const defaultContext: LayoutContextProps = {
  prefix: 'fd-layout-',
  noPadding: false,
  sectionGap: undefined,
  blockGap: undefined,
  gridGap: undefined,
  maxNumberOfColumns: 12,
  breakPoint: {
    numberOfColumns: 12,
    width: Infinity,
    maxContentWidth: 1200,
  },
};

export default createContext<LayoutContextProps>(defaultContext);
