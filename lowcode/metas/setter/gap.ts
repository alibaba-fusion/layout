import { IPublicTypeFieldConfig } from "@alilc/lowcode-types";

const item: IPublicTypeFieldConfig[] = [
  {
    name: 'gap',
    title: '间距',
    defaultValue: 0,
    setter: {
      componentName: 'NumberSetter',
      props: {
        step: 4,
      },
    },
  },
];

export default item;