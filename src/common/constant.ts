import { BreakPoints } from '../types';

// 默认断点列信息
export const DEFAULT_BREAK_POINTS: BreakPoints = [
  {
    width: 750,
    maxContentWidth: 750,
    numberOfColumns: 4,
  },
  {
    width: 960,
    maxContentWidth: 960,
    numberOfColumns: 8,
  },
  {
    width: 1200,
    maxContentWidth: 1200,
    numberOfColumns: 12,
  },
  {
    width: Infinity,
    maxContentWidth: Infinity,
    numberOfColumns: 12,
  },
];

// css 别名处理
export const ALIGN_ALIAS_MAP = {
  left: 'start',
  right: 'end',
  middle: 'center',
};

export const VER_ALIGN_ALIAS_MAP = {
  top: 'start',
  middle: 'center',
  bottom: 'end',
};
