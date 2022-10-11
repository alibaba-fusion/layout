// 兼容老逻辑
export const TextTypeMap = {
  'body-1': 'body2',
  'body-2': 'body1',
  subhead: 'h6',
  title: 'h5',
  headline: 'h4',
  'display-1': 'h3',
  'display-2': 'h2',
  'display-3': 'h1',
};

export const verMap = (v) => {
  const map = {
    top: 'flex-start',
    bottom: 'flex-end',
    middle: 'center',
  };

  return map[v] || v;
};

export const alignMapO2N = (v) => {
  const map = {
    'flex-start': 'left',
    'flex-end': 'right',
  };

  return map[v] || v;
};
export const verAlignMapO2N = (v) => {
  const map = {
    'flex-start': 'top',
    'flex-end': 'bottom',
    center: 'middle',
  };

  return map[v] || v;
};

export default {
  TextTypeMap,
  verMap,
  alignMapO2N,
  verAlignMapO2N,
};
