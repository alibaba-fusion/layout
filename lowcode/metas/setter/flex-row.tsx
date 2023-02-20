const TooltipLabel = require('./tooltip-label');

module.exports = () => [
  {
    name: 'align',
    title: '交叉轴对齐',
    defaultValue: 'flex-start',
    initialValue: 'flex-start',
    setter: {
      componentName: 'RadioGroupSetter',
      initialValue: 'flex-start',
      props: {
        defaultValue: 'flex-start',
        options: [
          {
            // "title": "上",
            title: (
              <TooltipLabel overlay="上 | flex-start">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 18"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 0h21v1H0z" />
                    <path d="M11 2h5v9h-5z" />
                    <path opacity=".4" d="M6 3h3v7H6z" />
                    <path d="M6 3v7h3V3H6zM5 2h5v9H5V2z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'flex-start',
          },
          {
            // "title": "中",
            title: (
              <TooltipLabel overlay="中 | center">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 9"
                >
                  <g fillRule="evenodd">
                    <path d="M0 4h21v1H0V4zm4.5 0h6v1h-6V4zm6 0h6v1h-6V4z" opacity=".5" />
                    <path d="M11 0h5v9h-5z" />
                    <path opacity=".4" d="M6 1h3v7H6z" />
                    <path d="M6 1v7h3V1H6zM5 0h5v9H5V0z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'center',
          },
          {
            // "title": "下",
            title: (
              <TooltipLabel overlay="下 | flex-end">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 18"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 17h21v1H0z" />
                    <path d="M11 7h5v9h-5z" />
                    <path opacity=".4" d="M6 8h3v7H6z" />
                    <path d="M6 8v7h3V8H6zM5 7h5v9H5V7z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'flex-end',
          },
          {
            // "title": "等高",
            title: (
              <TooltipLabel overlay="等高 | stretch">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 18"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 17h21v1H0zM0 0h21v1H0z" />
                    <path d="M11 2h5v14h-5z" />
                    <path opacity=".4" d="M6 3h3v12H6z" />
                    <path d="M6 3v12h3V3H6zM5 2h5v14H5V2z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'stretch',
          },
          {
            // "title": "基线",
            title: (
              <TooltipLabel overlay="基线 | baseline" align="tr">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 21 11"
                >
                  <g fillRule="evenodd">
                    <path d="M0 5h21v1H0V5zm4.5 0h6v1h-6V5zm6 0h6v1h-6V5z" opacity=".5" />
                    <path d="M11 1h5v9h-5V1zm1 1h3v3h-3V2z" />
                    <path opacity=".4" d="M6 5h3v5H6z" />
                    <path d="M6 3v7h3V3H6zM5 2h5v9H5V2z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'baseline',
          },
        ],
      },
    },
  },
  {
    name: 'justify',
    title: '主轴对齐',
    defaultValue: 'flex-start',
    initialValue: 'flex-start',
    setter: {
      componentName: 'RadioGroupSetter',
      initialValue: 'flex-start',
      defaultValue: 'flex-start',
      props: {
        defaultValue: 'flex-start',
        options: [
          {
            // "title": "| 左",
            title: (
              <TooltipLabel overlay="左 | flex-start">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 24 17"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M0 0h1v17H0z" />
                    <path d="M8 4h5v9H8z" />
                    <path opacity=".4" d="M3 5h3v7H3z" />
                    <path d="M3 5v7h3V5H3zM2 4h5v9H2V4z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'flex-start',
          },
          {
            // "title": "中",
            title: (
              <TooltipLabel overlay="中 | center">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 13 17"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M6 0h1v17H6z" />
                    <path d="M8 4h5v9H8z" />
                    <path opacity=".4" d="M1 5h3v7H1z" />
                    <path d="M1 5v7h3V5H1zM0 4h5v9H0V4z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'center',
          },
          {
            // "title": "右 |",
            title: (
              <TooltipLabel overlay="右 | flex-end">
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  width="20"
                  height="20"
                  viewBox="0 0 24 17"
                >
                  <g fillRule="evenodd">
                    <path opacity=".5" d="M23 0h1v17h-1z" />
                    <path d="M17 4h5v9h-5z" />
                    <path opacity=".4" d="M12 5h3v7h-3z" />
                    <path d="M12 5v7h3V5h-3zm-1-1h5v9h-5V4z" />
                  </g>
                </svg>
              </TooltipLabel>
            ),
            value: 'flex-end',
          },
          {
            // "title": "两端",
            title: (
              <TooltipLabel overlay="两端 | space-between">
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
            // "title": "等分",
            title: (
              <TooltipLabel overlay="等分 | space-around" align="tr">
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
        ],
      },
    },
  },
];
