import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Text extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    fontStyle: PropTypes.oneOf(['normal', 'italic']),
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textDecorationLine: PropTypes.oneOf(['none', 'underline', 'overline', 'line-through']),
    textDecorationColor: PropTypes.string,
    textDecorationStyle: PropTypes.oneOf(['solid', 'wavy', 'double', 'dotted', 'dashed']),
    letterSpacing: PropTypes.number,
    lineHeight: PropTypes.number,
    textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    opacity: PropTypes.number,
    style: PropTypes.object
  }

  static defaultProps = {
    color: '#000',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textDecorationLine: 'none',
    textDecorationColor: '#000',
    textDecorationStyle: 'solid',
    letterSpacing: 0,
    textAlign: 'left',
    opacity: 1,
    style: {}
  }

  getStyle(style, props) {
    return {
      ...props,
      ...style
    };
  }

  render() {
    const {
      color,
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      textDecorationLine,
      textDecorationColor,
      textDecorationStyle,
      letterSpacing,
      lineHeight,
      textAlign,
      opacity,
      style,
      ...others
    } = this.props;

    const Text = 'span';
    const styles = this.getStyle(style, {
      color,
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      textDecorationLine,
      textDecorationColor,
      textDecorationStyle,
      letterSpacing,
      lineHeight,
      textAlign,
      opacity
    });

    return <Text {...others} style={styles} />;
  }
}

export default Text;
