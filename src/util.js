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
  verMap,
  alignMapO2N,
  verAlignMapO2N,
};
