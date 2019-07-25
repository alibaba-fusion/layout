/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

const StylesMaps = {
  Layout: {
    flex: [1, 1, 'auto']
  },
  Header: {
    flex: [0, 0, 'auto'],
    direction: 'row',
    justify: 'space-between'
  },
  Main: {
    flex: [1, 1, 'auto'],
    direction: 'column'
  },
  Footer: {
    direction: 'row',
    flex: [0, 0, 'auto']
  }
};

function generator({ Component, displayName }) {
  return (BasicComponent) => {
    class Adapter extends React.Component {
      static propTypes = {
        style: PropTypes.object
      };

      render() {
        const { style, ...others } = StylesMaps[displayName];
        const { style: propsStyle, ...othersProps } = this.props;

        const newStyle = { ...style, ...propsStyle };
        return <BasicComponent Component={Component} {...others} {...othersProps} style={newStyle} />;
      }
    }

    return Adapter;
  };
}

class Basic extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    style: PropTypes.object,
    Component: PropTypes.oneOf(['header', 'footer', 'main', 'section'])
  };

  render() {
    const { className, children, Component, style, ...others } = this.props;

    return <Box children={children} Component={Component} className={className} style={style} {...others} />;
  }
}

class BasicLayout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    hasSider: PropTypes.bool,
    style: PropTypes.object,
    Component: PropTypes.oneOf(['header', 'footer', 'main', 'section'])
  };

  static childContextTypes = {
    siderHook: PropTypes.object
  };

  state = { siders: [] };

  getChildContext() {
    return {
      siderHook: {
        addSider: (id) => {
          this.setState((state) => ({
            siders: [...state.siders, id]
          }));
        },
        removeSider: (id) => {
          this.setState((state) => ({
            siders: state.siders.filter((currentId) => currentId !== id)
          }));
        }
      }
    };
  }

  render() {
    const { className, children, Component, style, hasSider, ...others } = this.props;
    const direction = typeof hasSider === 'boolean' ? 'row' : this.state.siders.length > 0 ? 'row' : 'column';
    return (
      <Box
        children={children}
        Component={Component}
        className={className}
        direction={direction}
        style={style}
        {...others}
      />
    );
  }
}

const Layout = generator({
  displayName: 'Layout',
  Component: 'section'
})(BasicLayout);

const Header = generator({
  displayName: 'Header',
  Component: 'header'
})(Basic);

const Main = generator({
  displayName: 'Main',
  Component: 'section'
})(Basic);

const Footer = generator({
  displayName: 'Footer',
  Component: 'footer'
})(Basic);

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
