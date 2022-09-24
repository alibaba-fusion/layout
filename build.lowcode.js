const { name, version } = require('./package.json');
const { library } = require('./build.json');

const baseRenderUrl =
  process && process.argv && process.argv.includes('start')
    ? '.'
    : `https://unpkg.alibaba-inc.com/${name}@${version}`;

module.exports = {
  alias: {
    '@': './src',
  },
  plugins: [
    [
      '@alifd/build-plugin-lowcode',
      {
        library,
        engineScope: '@alilc',
        extraAssets: [
          'https://g.alicdn.com/code/npm/@ali/ali-lowcode-materials/1.2.4/assets.json',
          'https://g.alicdn.com/code/npm/@alife/fusion-ui/0.1.7/build/lowcode/assets-prod.json',
        ],
        renderUrls: [`${baseRenderUrl}/dist/${library}.js`, `${baseRenderUrl}/dist/${library}.css`],
        noParse: true,
        singleComponent: true,
      },
    ],
  ],
};
