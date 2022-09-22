module.exports = [
  {
    name: '!widthType',
    title: '宽度类型',
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
            title: '拉伸',
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
        if (target.getNode().getPropValue('width')) {
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
          target.getNode().setPropValue('width', parseInt(target.getNode().getRect().width));
        } else if (value === 'auto') {
          target.getNode().setPropValue('width', undefined);
          // target.getNode().setPropValue('autoFit', false);
        } else if (value === 'autoFit') {
          // target.getNode().setPropValue('autoFit', true);
        }
      },
    },
  },
  {
    name: 'width',
    title: '宽度值',
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
        target.getNode().getPropValue('!widthType') === 'fixed' ||
        !!target.getNode().getPropValue('width')
      );
    },
  },
];
