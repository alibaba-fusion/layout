import { createContext } from 'react';
import { last } from 'lodash-es';
import { DEFAULT_BREAK_POINTS } from '@/common/constant';
import { BreakPoint, LayoutContextProps } from '../types';

const lastBreakPoint = last(DEFAULT_BREAK_POINTS) as BreakPoint;

// 默认的布局上下文参数
export const defaultContext: LayoutContextProps = {
  prefix: 'fd-layout-',
  noPadding: false,
  sectionGap: undefined,
  blockGap: undefined,
  gridGap: undefined,
  maxNumberOfColumns: lastBreakPoint.numberOfColumns || 12,
  breakPoint: lastBreakPoint,
};

export default createContext<LayoutContextProps>(defaultContext);
