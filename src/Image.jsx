import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import createStyle from './create-style';

class Image extends PureComponent {
  static displayName = 'Image';

  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    src: '',
    width: 'auto',
    maxWidth: 'none',
    minWidth: 'none',
    height: 'auto',
    maxHeight: 'none',
    minHeight: 'none',
    style: {},
    className: null
  };

  createStyle(style = {}, props) {
    return {
      ...style,
      ...createStyle(props)
    };
  }

  render() {
    const { width, minWidth, maxWidth, height, minHeight, maxHeight, style, className, ...others } = this.props;

    const styleProps = {
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight
    };

    const Image = 'img';

    return <Image style={this.createStyle(style, styleProps)} className={className} {...others} />;
  }
}

export default Image;
