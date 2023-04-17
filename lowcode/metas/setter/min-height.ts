import { IPublicModelSettingPropEntry, IPublicTypeFieldConfig } from '@alilc/lowcode-types';

const items: IPublicTypeFieldConfig[] = [
  {
    name: '!heightType',
    title: '高度类型',
    setter: {
      componentName: 'RadioGroupSetter',
      initialValue: '',
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
      getValue: (target: IPublicModelSettingPropEntry) => {
        if (target.node?.getPropValue('style.minHeight')) {
          return 'min';
        } else {
          return 'auto';
        }
      },
      setValue: (target: IPublicModelSettingPropEntry, value: string) => {
        if (value === 'min') {
          target.node?.setPropValue(
            'style.minHeight',
            parseInt(String(target.node?.getRect()?.height)),
          );
        } else if (value === 'auto') {
          target.node?.setPropValue('style.minHeight', null);
        }
      },
    },
  },
  {
    name: 'style.minHeight',
    title: '最小高度',
    defaultValue: '',
    setter: {
      componentName: 'NumberSetter',
      props: {
        units: 'px',
        step: 2,
      },
    },
    condition: (target: IPublicModelSettingPropEntry) => {
      return (
        target.node?.getPropValue('!heightType') === 'min' ||
        !!target.node?.getPropValue('style.minHeight')
      );
    },
  },
];

export default items;
