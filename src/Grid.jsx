import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createStyle, { getGridChildProps } from './create-style';

class Grid extends Component {
  static displayName = 'Grid';

  static propTypes = {
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    autoRowsHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gap: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    direction: PropTypes.oneOf(['row', 'columns']),
    dense: PropTypes.bool,
    justify: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    align: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    justifySelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    alignSelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    // 开始的位置，第几个线条
    row: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    col: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // 占据几个的位置，默认为 1
    rowSpan: PropTypes.number,
    colSpan: PropTypes.number,
    tabletColSpan: PropTypes.number,
    phoneColSpan: PropTypes.number,
    device: PropTypes.oneOf(['phone', 'tablet', 'desktop']),
    margin: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    padding: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    background: PropTypes.string,
    shadow: PropTypes.any,
    corner: PropTypes.any,
    lineWidth: PropTypes.number,
    lineStyle: PropTypes.oneOf(['dotted', 'solid', 'double', 'dashed']),
    lineColor: PropTypes.string,
    position: PropTypes.oneOf(['absolute', 'relative']),
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    opacity: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.any,
    Component: PropTypes.string,
    overflow: PropTypes.oneOf(['visible', 'hidden', 'scroll', 'auto', 'inherit'])
  };

  static defaultProps = {
    // gap: 0,
    // direction: 'row',
    dense: false,
    justify: 'stretch',
    align: 'stretch',
    autoRowsHeight: 'auto',
    // row: 'initial',
    // col: 'initial',
    // rowSpan: 1,
    // colSpan: 1,
    // padding: 0,
    // width: 'auto',
    // maxWidth: 'none',
    // minWidth: 'none',
    // height: '100%',
    // maxHeight: 'none',
    // minHeight: 'none',
    // shadow: '',
    // corner: 0,
    // lineWidth: 0,
    // lineStyle: 'solid',
    // lineColor: '#000',
    position: 'relative',
    // left: 'auto',
    // right: 'auto',
    // top: 'auto',
    // bottom: 'auto',
    // opacity: 1,
    style: {},
    className: null,
    children: null,
    // overflow: 'visible'
  };

  createChildren(children, device) {
    const array = React.Children.toArray(children);
    if (!children) {
      return null;
    }

    return array.map((child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          style: {
            ...getGridChildProps(child.props, device),
            ...(child.props.style || {}),
          }
        });
      }

      return child;
    });
  }

  createStyle(style = {}, props) {
    return {
      ...createStyle({ display: 'grid', ...props }),
      ...style
    };
  }

  render() {
    const {
      device,
      gap,
      dense,
      rowSpan,
      colSpan,
      tabletColSpan,
      phoneColSpan,
      row,
      col,
      rows,
      columns,
      direction,
      autoRowsHeight,
      justify,
      justifySelf,
      align,
      alignSelf,
      padding,
      margin,
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
      style,
      className,
      children,
      Component,
      overflow,
      ...others
    } = this.props;

    const styleProps = {
      device,
      gap,
      dense,
      rowSpan,
      colSpan,
      tabletColSpan,
      phoneColSpan,
      row,
      col,
      rows,
      columns,
      direction,
      autoRowsHeight,
      justify,
      align,
      padding,
      margin,
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
    };
    const View = 'Component' in this.props ? Component : 'div';

    const styleSheet = this.createStyle(style, styleProps);

    return <View style={styleSheet} className={className} {...others}>
      {this.createChildren(children, device)}
    </View>

  }
}

export default Grid;
