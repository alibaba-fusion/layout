module.exports = [
  {
    name: 'style.width',
    title: '宽度类型',
    initialValue: '',
    defaultValue: '',
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [
          {
            title: '自适应',
            value: '',
          },
          {
            title: '铺满',
            value: '100%',
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
        return typeof target.getNode().getPropValue('style.width') === 'number' ? 'fixed' : '';
      },
      setValue: (target, value) => {
        if (value === 'fixed') {
          target.getNode().setPropValue('style.width', parseInt(target.getNode().getRect().width));
        } else if (value === '') {
          target.getNode().setPropValue('style.width', '');
        }
      },
    },
  },
  {
    name: 'style.width',
    title: '宽度值',
    defaultValue: '',
    initialValue: '',
    setter: {
      componentName: 'NumberSetter',
      props: {
        units: 'px',
      },
    },
    condition: (target) => typeof target.getNode().getPropValue('style.width') === 'number',
  },
];
