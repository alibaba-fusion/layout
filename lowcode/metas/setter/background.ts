// const TooltipLabel = require('./tooltip-label');

import { IPublicModelSettingPropEntry, IPublicTypeFieldConfig } from "@alilc/lowcode-types";

const items: IPublicTypeFieldConfig[] = [
  // {
  //   name: 'style.background',
  //   title: '背景类型',
  //   initialValue: '',
  //   defaultValue: '',
  //   setter: {
  //     componentName: 'RadioGroupSetter',
  //     props: {
  //       options: [
  //         {
  //           title: <TooltipLabel overlay="背景色">
  //             <svg
  //               viewBox="0 0 1024 1024"
  //               fill="currentColor"
  //               preserveAspectRatio="xMidYMid meet"
  //               width="20"
  //               height="20"
  //             >
  //               <path d="M825.6 788.224a82.176 82.176 0 0 0 81.92-82.432c0-30.208-25.6-82.432-78.848-159.744l-3.072-4.608-3.072 4.608c-52.992 76.8-78.848 129.536-78.848 159.744a82.176 82.176 0 0 0 81.92 82.432zM1005.312 921.6H20.224a19.712 19.712 0 0 0-19.456 19.712v62.976a19.712 19.712 0 0 0 19.456 19.712h985.088a19.456 19.456 0 0 0 19.456-19.456v-62.72a19.712 19.712 0 0 0-19.456-20.224zM346.88 807.424a35.328 35.328 0 0 0 25.6 10.496 34.816 34.816 0 0 0 25.6-10.496L711.68 490.24a34.816 34.816 0 0 0 0-49.664L386.048 112.384 281.6 5.888a19.968 19.968 0 0 0-27.648 0L208.384 51.2a19.456 19.456 0 0 0-5.632 13.824 20.224 20.224 0 0 0 5.632 13.824l91.904 92.16L31.744 440.32a35.584 35.584 0 0 0 0 49.92z m232.192-349.952a30.208 30.208 0 0 1 1.792 5.12H162.816a15.104 15.104 0 0 1 4.352-8.448l193.536-194.816h1.28a16.384 16.384 0 0 1 20.992 0l193.024 194.304z" ></path>
  //             </svg>
  //           </TooltipLabel>,
  //           value: 'color',
  //         },
  //         {
  //           title: <TooltipLabel overlay="背景图">
  //             <svg
  //               viewBox="0 0 1024 1024"
  //               fill="currentColor"
  //               preserveAspectRatio="xMidYMid meet"
  //               width="20"
  //               height="20"
  //             >
  //               <path d="M128.299 128C92.788 128 64 156.788 64 192.299v639.4C64 867.212 92.788 896 128.299 896H895.7c35.512 0 64.3-28.788 64.3-64.299V192.299C960 156.788 931.212 128 895.701 128H128.299zM128 588.313l178.162-178.162c24.795-24.795 64.996-24.795 89.792 0L817.803 832H128V588.313z m768 231.375L666.385 590.073l64.718-64.718c25.153-25.152 65.933-25.152 91.085 0L896 599.167v220.521zM694.65 471.299l-73.519 73.519L432.653 356.34c-45.064-45.064-118.127-45.064-163.19 0L128 497.803V192h768v316.657l-37.358-37.358c-45.286-45.285-118.707-45.285-163.992 0z"></path>
  //             </svg>
  //           </TooltipLabel>,
  //           value: 'img',
  //         },
  //       ],
  //     },
  //   },
  // },
  {
    name: 'style.backgroundColor',
    title: '背景色',
    setter: {
      componentName: 'ColorSetter',
      initialValue: 'rgba(255,255,255,1)'
    },
  },
  {
    name: 'style.backgroundImage',
    title: '背景图',
    setter: {
      componentName: 'StringSetter',
      initialValue: '',
      props: {
        placeholder: '输入图片 url',
      },
    },
    extraProps: {
      getValue: (target: IPublicModelSettingPropEntry) => {
        const bgImg = target.node?.getPropValue('style.backgroundImage');
        return bgImg?.match(/^url\((.*)\)$/)?.[1];
      },
      setValue: (target: IPublicModelSettingPropEntry, value: string) => {
        if (value) {
          target.node?.setPropValue('style.backgroundImage', `url(${value})`);
        } else {
          const style = target.node?.getPropValue('style');
          style && delete style.backgroundImage;
          target.node?.setPropValue('style', style);
        }
      },
    },
  },
];

export default items;
