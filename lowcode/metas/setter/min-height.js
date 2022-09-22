module.exports = [
  {
    name: '!heightType',
    title: '高度类型',
    initialValue: '',
    defaultValue: '',
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [
          {
            title: '适应',
            value: 'auto',
          },
          {
            title: '至少',
            value: 'min',
          },
        ],
      },
    },
    extraProps: {
      getValue: (target) => {
        if (target.getNode().getPropValue('style.minHeight')) {
          return 'min';
        } else {
          return 'auto';
        }
      },
      setValue: (target, value) => {
        if (value === 'min') {
          target
            .getNode()
            .setPropValue('style.minHeight', parseInt(target.getNode().getRect().height));
        } else if (value === 'auto') {
          target.getNode().setPropValue('style.minHeight', null);
        }
      },
    },
  },
  {
    name: 'style.minHeight',
    title: '最小高度',
    defaultValue: '',
    initialValue: '',
    setter: {
      componentName: 'NumberSetter',
      props: {
        units: 'px',
        step: 2,
      },
    },
    condition: (target) => {
      return (
        target.getNode().getPropValue('!heightType') === 'min' ||
        !!target.getNode().getPropValue('style.minHeight')
      );
    },
  },
];
