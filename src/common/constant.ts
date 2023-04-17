import { BreakPoints } from '@/types';

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
    width: Infinity,
    maxContentWidth: 1200,
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

export const TEXT_TYPE_MAP = {
  'body-1': 'body2',
  'body-2': 'body1',
  subhead: 'h6',
  title: 'h5',
  headline: 'h4',
  'display-1': 'h3',
  'display-2': 'h2',
  'display-3': 'h1',
};
