import { IPublicModelSettingPropEntry } from "@alilc/lowcode-types";

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
      getValue: (target: IPublicModelSettingPropEntry) => {
        if (target.node?.getPropValue('width')) {
          return 'fixed';
        }
        return 'auto';
        // if (target.getNode().getPropValue('autoFit')) {
        //   return 'autoFit';
        // } else {
        //   return 'auto';
        // }
      },
      setValue: (target: IPublicModelSettingPropEntry, value) => {
        if (value === 'fixed') {
          target.node?.setPropValue('width', parseInt(String(target.node?.getRect()?.width)));
        } else if (value === 'auto') {
          target.node?.setPropValue('width', undefined);
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
    condition: (target: IPublicModelSettingPropEntry) => {
      return (
        target.node?.getPropValue('!widthType') === 'fixed' ||
        !!target.node?.getPropValue('width')
      );
    },
  },
];
