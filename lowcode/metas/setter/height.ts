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
          // {
          //   title: '适应内容',
          //   value: 'autoFit',
          // },
          {
            title: '自动',
            value: 'auto',
          },
          {
            title: '固定',
            value: 'fixed',
          },
        ],
      },
    },
    extraProps: {
      getValue: (target) => {
        if (target.getNode().getPropValue('height')) {
          return 'fixed';
        }
        return 'auto';
        // if (target.getNode().getPropValue('autoFit')) {
        //   return 'autoFit';
        // } else {
        //   return 'auto';
        // }
      },
      setValue: (target, value) => {
        if (value === 'fixed') {
          target.getNode().setPropValue('height', parseInt(target.getNode().getRect().height));
        } else if (value === 'auto') {
          target.getNode().setPropValue('height', undefined);
          // target.getNode().setPropValue('autoFit', false);
        } else if (value === 'autoFit') {
          // target.getNode().setPropValue('autoFit', true);
        }
      },
    },
  },
  {
    name: 'height',
    title: '高度值',
    defaultValue: '',
    initialValue: '',
    setter: {
      componentName: 'NumberSetter',
      props: {
        units: 'px',
      },
    },
    condition: (target) => {
      return (
        target.getNode().getPropValue('!heightType') === 'fixed' ||
        !!target.getNode().getPropValue('height')
      );
    },
  },
];
