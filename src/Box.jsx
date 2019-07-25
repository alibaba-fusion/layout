import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import createStyle, {
  getMargin,
  getChildMargin,
  getSpacingHelperMargin,
  filterInnerStyle,
  filterHelperStyle,
  filterOuterStyle,
  getBoxChildProps,
} from './create-style';

class Box extends PureComponent {
  static displayName = 'Box';

  static propTypes = {
    direction: PropTypes.oneOf(['row', 'column']),
    justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
    align: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'baseline', 'stretch']),
    alignSelf: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'baseline', 'stretch']),
    wrap: PropTypes.oneOf(['wrap', 'nowrap']),
    flex: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number
    ]),
    spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
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
    direction: 'column',
    justify: 'flex-start',
    align: 'stretch',
    wrap: 'nowrap',
    flex: [],
    // padding: 0,
    // width: 'auto',
    // maxWidth: 'none',
    // minWidth: 'none',
    // height: 'auto',
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

  createChildren(children, { spacing, direction, isFlow }) {
    const array = React.Children.toArray(children);
    if (!children) {
      return null;
    }

    return array.map((child, index) => {
      let spacingMargin = {};

      spacingMargin = getChildMargin(spacing);

      if (!isFlow) {
        // 不折行
        const isNone = [index === 0, index === array.length - 1];
        const props = direction === 'row' ? ['marginLeft', 'marginRight'] : ['marginTop', 'marginBottom'];

        ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach((prop) => {
          if (prop in spacingMargin && props.indexOf(prop) === -1) {
            spacingMargin[prop] = 0;
          }

          props.forEach((key, i) => {
            if (key in spacingMargin && isNone[i]) {
              spacingMargin[key] = 0;
            }
          });
        });
      }

      if (React.isValidElement(child)) {

        const { margin: propsMargin } = child.props;
        let childPropsMargin = getMargin(propsMargin);

        return React.cloneElement(child, {
          style: {
            ...spacingMargin,
            ...getBoxChildProps(child.props),
            ...childPropsMargin,
            ...(child.props.style || {}),
          }
        });
      }

      return child;
    });
  }

  createStyle(style = {}, props) {
    return {
      ...createStyle({ display: 'flex', ...props }),
      ...style
    };
  }

  getOuterStyle = (style, styleProps) => {
    const sheet = this.createStyle(style, styleProps);

    return filterOuterStyle(sheet);
  }

  getHelperStyle = (style, styleProps) => {
    const sheet = this.createStyle(style, styleProps);

    return filterHelperStyle({
      ...sheet,
      ...getSpacingHelperMargin(styleProps.spacing)
    });
  }

  getInnerStyle = (style, styleProps) => {
    const sheet = this.createStyle(style, styleProps);

    return filterInnerStyle(sheet);
  }

  render() {
    const {
      direction,
      justify,
      align,
      alignSelf,
      wrap,
      flex,
      spacing,
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
      direction,
      justify,
      align,
      alignSelf,
      wrap,
      flex,
      spacing,
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

    const isFlow = wrap === 'wrap';
    const boxs = this.createChildren(children, { spacing, direction, isFlow });

    if (isFlow && spacing) {
      const outerStyle = this.getOuterStyle(style, styleProps);
      const helperStyle = this.getHelperStyle(style, styleProps);
      const innerStyle = this.getInnerStyle(style, styleProps);

      return (
        <View style={outerStyle} className={className} {...others}>
          <View style={helperStyle}>
            <View style={innerStyle}>
              {boxs}
            </View>
          </View>
        </View>
      );
    }

    return <View style={styleSheet} className={className} {...others}>
      {boxs}
    </View>;

  }
}

export default Box;
