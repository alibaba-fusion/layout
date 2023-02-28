import { IPublicTypeFieldConfig } from '@alilc/lowcode-types';
import React from 'react';
import TooltipLabel from './tooltip-label';

export default (): IPublicTypeFieldConfig[] => [
  {
    name: 'align',
    title: '水平对齐',
    defaultValue: 'left',
    initialValue: 'left',
    setter: {
      componentName: 'RadioGroupSetter',
      initialValue: 'left',
      props: {
        defaultValue: 'left',
        options: [
          {
            // "title": '| 左',
            title: (
              <TooltipLabel overlay="左">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 24 17"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 0h1v17H0z" />
                    <path d="M2 9h9v5H2z" />
                    <path opacity=".4" d="M3 4h7v3H3z" />
                    <path d="M3 4v3h7V4H3zM2 3h9v5H2V3z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'left',
          },
          {
            // "title": "中",
            title: (
              <TooltipLabel overlay="中">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 9 17"
                >
                  <g fillRule="evenodd">
                    <path d="M4 0h1v17H4V0zm0 8.5h1v6H4v-6zm0-6h1v6H4v-6z" opacity=".5" />
                    <path d="M0 9h9v5H0z" />
                    <path opacity=".4" d="M1 4h7v3H1z" />
                    <path d="M1 4v3h7V4H1zM0 3h9v5H0V3z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'center',
          },
          {
            // "title": "右 |",
            title: (
              <TooltipLabel overlay="右">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 24 17"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M23 0h1v17h-1z" />
                    <path d="M13 9h9v5h-9z" />
                    <path opacity=".4" d="M14 4h7v3h-7z" />
                    <path d="M14 4v3h7V4h-7zm-1-1h9v5h-9V3z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'right',
          },
          // {
          //   // "title": "等宽",
          //   title: (
          //     <TooltipLabel overlay="等宽 | stretch">
          //       <svg
          //         fill="currentColor"
          //         preserveAspectRatio="xMidYMid meet"
          //         width="20"
          //         height="20"
          //         viewBox="0 0 24 17"
          //       >
          //         <g fillRule="evenodd">
          //           <path opacity=".5" d="M23 0h1v17h-1zM0 0h1v17H0z" />
          //           <path d="M2 9h20v5H2z" />
          //           <path opacity=".4" d="M3 4h18v3H3z" />
          //           <path d="M3 4v3h18V4H3zM2 3h20v5H2V3z" />
          //         </g>
          //       </svg>
          //     </TooltipLabel>
          //   ),
          //   value: 'stretch',
          // },
          {
            // "title": "两端",
            title: (
              <TooltipLabel overlay="两端">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 24 17"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 0h1v17H0zm23 0h1v17h-1z" />
                    <path d="M17 4h5v9h-5z" />
                    <path opacity=".4" d="M3 5h3v7H3z" />
                    <path d="M3 5v7h3V5H3zM2 4h5v9H2V4z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'space-between',
          },
          {
            title: (
              <TooltipLabel overlay="等分">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 16 17"
                >
                  <g fillRule="evenodd">
                    <path
                      d="M2 0h1v17H2V0zm0 3.5h1v10H2v-10zM13 0h1v17h-1V0zm0 3.5h1v10h-1v-10z"
                      opacity=".5"
                    />
                    <path d="M11 4h5v9h-5z" />
                    <path opacity=".4" d="M1 5h3v7H1z" />
                    <path d="M1 5v7h3V5H1zM0 4h5v9H0V4z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'space-around',
          },
          {
            title: '绝对均分',
            value: 'space-evenly',
          },
        ],
      },
    },
  },
  {
    name: 'verAlign',
    title: '垂直对齐',
    defaultValue: 'top',
    setter: {
      componentName: 'RadioGroupSetter',
      initialValue: 'top',
      defaultValue: 'top',
      props: {
        defaultValue: 'top',
        options: [
          {
            // "title": "上",
            title: (
              <TooltipLabel overlay="上">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 18"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 0h21v1H0z" />
                    <path d="M6 8h9v5H6z" />
                    <path opacity=".4" d="M7 3h7v3H7z" />
                    <path d="M7 3v3h7V3H7zM6 2h9v5H6V2z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'top',
          },
          {
            // "title": "中",
            title: (
              <TooltipLabel overlay="中">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 13"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 6h21v1H0z" />
                    <path d="M6 8h9v5H6z" />
                    <path opacity=".4" d="M7 1h7v3H7z" />
                    <path d="M7 1v3h7V1H7zM6 0h9v5H6V0z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'middle',
          },
          {
            // "title": "下",
            title: (
              <TooltipLabel overlay="下">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 18"
                >
                  <g fillRule="evenodd">
                    <path d="M6 11h9v5H6z" />
                    <path opacity=".4" d="M7 6h7v3H7z" />
                    <path d="M7 6v3h7V6H7zM6 5h9v5H6V5z" />
                    <path opacity=".5" d="M0 17h21v1H0z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'bottom',
          },
          {
            // "title": "两端",
            title: (
              <TooltipLabel overlay="两端">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 18"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 0h21v1H0zm0 17h21v1H0z" />
                    <path d="M6 11h9v5H6z" />
                    <path opacity=".4" d="M7 3h7v3H7z" />
                    <path d="M7 3v3h7V3H7zM6 2h9v5H6V2z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'space-between',
          },
          {
            // "title": "等分",
            title: (
              <TooltipLabel overlay="等分" align="tr">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 13"
                >
                  <g fillRule="evenodd">
                    <path
                      d="M0 2h21v1H0V2zm5.5 0h10v1h-10V2zM0 10h21v1H0v-1zm5.5 0h10v1h-10v-1z"
                      opacity=".5"
                    />
                    <path d="M6 8h9v5H6z" />
                    <path opacity=".4" d="M7 1h7v3H7z" />
                    <path d="M7 1v3h7V1H7zM6 0h9v5H6V0z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'space-around',
          },
          {
            title: '绝对均分',
            value: 'space-evenly',
          },
        ],
      },
    },
  },
];
