import { IPublicModelSettingPropEntry, IPublicTypeFieldConfig } from '@alilc/lowcode-types';

const items: IPublicTypeFieldConfig[] = [
  {
    name: 'style.width',
    title: '宽度类型',
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
      getValue: (target: IPublicModelSettingPropEntry) => {
        return typeof target.node?.getPropValue('style.width') === 'number' ? 'fixed' : '';
      },
      setValue: (target: IPublicModelSettingPropEntry, value: string) => {
        if (value === 'fixed') {
          target.node?.setPropValue('style.width', parseInt(String(target.node?.getRect()?.width)));
        } else if (value === '') {
          target.node?.setPropValue('style.width', '');
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
    condition: (target: IPublicModelSettingPropEntry) =>
      typeof target.node?.getPropValue('style.width') === 'number',
  },
];

export default items;
