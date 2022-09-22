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
        staticResources: {
          engineCoreCssUrl:
            'https://g.alicdn.com/ali-lowcode/ali-lowcode-engine/1.0.79/engine-core.css',
          engineExtCssUrl:
            'https://g.alicdn.com/ali-lowcode/lowcode-engine-ext/1.0.19/engine-ext.css',
          engineCoreJsUrl:
            'https://g.alicdn.com/ali-lowcode/ali-lowcode-engine/1.0.79/engine-core.js',
          engineExtJsUrl:
            'https://g.alicdn.com/ali-lowcode/lowcode-engine-ext/1.0.19/engine-ext.js',
        },
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
