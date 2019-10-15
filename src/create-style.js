// import { prefix } from 'inline-style-prefixer';
import { obj } from './util';
import postcssJs from 'postcss-js';
import autoprefixer from 'autoprefixer';
import postcssGapProperties from 'postcss-gap-properties';

const prefixer = postcssJs.sync([ autoprefixer, postcssGapProperties ]);

function getRadius(corner) {
  if (!Array.isArray(corner)) {
    return {
      borderRadius: corner
    };
  }

  const attrs = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'];
  const radius = {};

  attrs.forEach((attr, index) => {
    radius[attr] = corner[index] || 0;
  });

  return radius;
}

function getPadding(padding) {
  if (!Array.isArray(padding)) {
    return {
      padding
    };
  }

  const attrs = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
  const paddings = {};
  let value;

  attrs.forEach((attr, index) => {
    switch (padding.length) {
      case 1:
        value = padding[0] || 0;
        break;
      case 2:
        value = padding[index] || padding[index - 2] || 0;
        break;
      case 3:
        value = index === 2 ? padding[2] : (padding[index] || padding[index - 2])
          || 0;
        break;
      case 4:
      default:
        value = padding[index] || 0;
        break;
    }
    paddings[attr] = value;
  });

  return paddings;
}

function getChildMargin(spacing) {
  return getMargin(spacing, { half: true });
}

function getSpacingMargin(spacing) {
  return getMargin(spacing, { half: true });
}

function getSpacingHelperMargin(spacing) {
  return getMargin(spacing, { isNegative: true, half: true });
}

function getMargin(size, { isNegative, half } = { isNegative: false, half: false }) {
  if (!size) {
    return {};
  }
  const attrs = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
  const margins = {};
  const param = 1 * (isNegative ? -1 : 1) * (half ? 0.5 : 1);
  let value;

  attrs.forEach((attr, index) => {
    if (!Array.isArray(size)) {
      value = param * size;
    } else {
      switch (size.length) {
        case 1:
          value = param * (size[0] || 0);
          break;
        case 2:
          value = param * (size[index] || size[index - 2] || 0);
          break;
        case 3:
          value = param * (
            index === 2 ? size[2] : (size[index] || size[index - 2])
              || 0);
          break;
        case 4:
        default:
          value = param * (size[index] || 0);
          break;
      }
    }

    margins[attr] = value;
  });

  return margins;
}

function getFlexs(flex) {
  if (!Array.isArray(flex)) {
    return {
      flex
    };
  }

  const attrs = ['flexGrow', 'flexShrink', 'flexBasis'];
  const flexs = {};

  flex.forEach((val, index) => {
    flexs[attrs[index]] = val;
  });

  return flexs;
}

function getGridGap(gap) {
  if (!Array.isArray(gap)) {
    return {
      gap
    };
  }

  const attrs = ['rowGap', 'columnGap'];
  const gaps = {};

  gap.forEach((val, index) => {
    gaps[attrs[index]] = val;
  });

  return gaps;
}

function getTemplateCount(counts) {
  if (!isNaN(counts)) {
    return `repeat(${counts}, 1fr)`;
  }

  return counts;
}

// const outerProps = ['alignSelf', 'flexGrow', 'flexShrink', 'flexBasis', 'backgroundColor', 'boxShadow', 'borderRadius', 'borderWidth', 'borderStyle', 'borderColor', 'padding', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom'];

const helperProps = ['margin', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom'];

const innerProps = ['flexDirection', 'flexWrap', 'justifyContent', 'alignContent', 'alignItems', 'display'];

function filterOuterStyle(style) {
  const props = {};

  [...innerProps].forEach(key => {
    props[key] = style[key]
  });

  return obj.filterUndefinedValue(obj.stripObject(style, props));
}

function filterHelperStyle(style) {
  const props = {};
  helperProps.forEach(key => {
    props[key] = style[key]
  });

  return obj.filterUndefinedValue({
    ...props,
    overflow: 'hidden',
  });
}

function filterInnerStyle(style) {
  const props = {};

  innerProps.forEach(key => {
    props[key] = style[key]
  });

  return obj.filterUndefinedValue(props);
}

function getGridChildProps(props, device) {
  const {
    row = 'initial',
    col = 'initial',
    rowSpan = 1,
    colSpan = 1,
    tabletColSpan = 1,
    phoneColSpan = 1,
    justifySelf,
    alignSelf,
  } = props;

  let newColSpan = colSpan;

  ['tablet', 'phone'].forEach(deviceKey => {
    if (deviceKey === device) {
      const key = `${deviceKey}ColSpan`;
      if ((key in props) && props[key]) {
        newColSpan = props[key];
      } else {
        switch (deviceKey) {
          case 'tablet':
            newColSpan = colSpan > 5 ? 8 : colSpan > 2 ? 4 : 2;
            break;
          case 'phone':
            newColSpan = colSpan > 2 ? 4 : 2;
            break;
        }
      }
    }
  });

  return obj.filterUndefinedValue({
    gridRowStart: row,
    gridRowEnd: `span ${rowSpan}`,
    gridColumnStart: col,
    gridColumnEnd: `span ${newColSpan}`,
    // gridRow: `${row} / span ${rowSpan}`,
    // gridColumn: `${col} / span ${colSpan}`,
    justifySelf,
    alignSelf
  });
}

function getBoxChildProps(props) {
  const {
    alignSelf,
    flex,
  } = props;

  return obj.filterUndefinedValue({
    alignSelf,
    ...getFlexs(flex),
  });
}

export default ({
  device,
  display,
  gap,
  direction,
  dense,
  rowSpan,
  colSpan,
  tabletColSpan,
  phoneColSpan,
  row,
  col,
  rows,
  columns,
  autoRowsHeight,
  justify,
  justifySelf,
  align,
  alignSelf,
  wrap,
  flex,
  padding,
  margin,
  spacing,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  background,
  shadow,
  corner,
  lineWidth,
  lineStyle,
  lineColor,
  position,
  left,
  top,
  right,
  bottom,
  opacity,
  overflow
}) => {
  let style = {
    display,
    ...getPadding(padding),
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    backgroundColor: background,
    boxShadow: shadow,
    ...getRadius(corner),
    borderWidth: lineWidth,
    borderStyle: lineStyle,
    borderColor: lineColor,
    position,
    left,
    top,
    right,
    bottom,
    opacity,
    overflow
  };

  let deviceColumns = 'auto';

  switch (device) {
    case 'phone':
      deviceColumns = 4;
      break;
    case 'tablet':
      deviceColumns = 8;
      break;
    case 'desktop':
      deviceColumns = 12;
      break;
    default:
      break;
  }
  const newColumns = !isNaN(columns) ? columns : deviceColumns;

  switch (display) {
    case 'grid':
      style = {
        // parent
        ...getGridGap(gap),
        gridTemplateRows: getTemplateCount(rows),
        gridTemplateColumns: getTemplateCount(newColumns),
        gridAutoFlow: `${direction}${dense && ` dense`}`,
        justifyItems: justify,
        alignItems: align,
        gridAutoRows: autoRowsHeight,
        // child
        ...getGridChildProps({
          row,
          rowSpan,
          col,
          colSpan,
          tabletColSpan,
          phoneColSpan,
          justifySelf,
          alignSelf,
        }, device),
        ...style,
      }
      break;
    case 'flex':
      style = {
        // parent
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        ...getMargin(margin),
        // child
        ...getBoxChildProps({
          alignSelf,
          flex,
        }),
        ...style,
      }
      break;
    default:
      break;
  }

  // https://github.com/facebook/react/issues/9166
  // prefix 针对display: flex 返回了display: ['flex', '-o-flex']
  // react-dom出于安全考虑不支持style中接受 ' ; 等字符
  // 因此display: flex的兼容性需要走css样式
  // const prefixed = prefix(style);
  const prefixed = prefixer(style);

  return obj.filterUndefinedValue(prefixed);
};

export {
  getMargin,
  getChildMargin,
  getSpacingMargin,
  getSpacingHelperMargin,
  filterInnerStyle,
  filterOuterStyle,
  filterHelperStyle,
  getGridChildProps,
  getBoxChildProps,
}
