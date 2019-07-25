/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class Aside extends React.Component {
  static displayName = 'Aside';

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    Component: PropTypes.string
  };

  static defaultProps = {
    Component: 'aside'
  };

  static contextTypes = {
    siderHook: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.uniqueId = generateId('layout-');
  }
  componentDidMount() {
    if (this.context.siderHook) {
      this.context.siderHook.addSider(this.uniqueId);
    }
  }

  componentWillUnmount() {
    if (this.context.siderHook) {
      this.context.siderHook.removeSider(this.uniqueId);
    }
  }

  render() {
    const { className, children, Component, ...others } = this.props;

    return <Box children={children} Component={Component} className={className} {...others} />;
  }
}

export default Aside;
