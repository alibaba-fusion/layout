import { IPublicModelSettingPropEntry, IPublicTypeFieldConfig } from "@alilc/lowcode-types";

const items: IPublicTypeFieldConfig[] = [
  {
    name: '!heightType',
    title: '高度类型',
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
      getValue: (target: IPublicModelSettingPropEntry) => {
        if (target.node?.getPropValue('height')) {
          return 'fixed';
        }
        return 'auto';
        // if (target.getNode().getPropValue('autoFit')) {
        //   return 'autoFit';
        // } else {
        //   return 'auto';
        // }
      },
      setValue: (target: IPublicModelSettingPropEntry, value: string) => {
        if (value === 'fixed') {
          target.node?.setPropValue('height', parseInt(String(target.node?.getRect()?.height)));
        } else if (value === 'auto') {
          target.node?.setPropValue('height', undefined);
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
    setter: {
      componentName: 'NumberSetter',
      props: {
        units: 'px',
      },
    },
    condition: (target: IPublicModelSettingPropEntry) => {
      return (
        target.node?.getPropValue('!heightType') === 'fixed' ||
        !!target.node?.getPropValue('height')
      );
    },
  },
];

export default items;
