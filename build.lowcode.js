const { name, version } = require('./package.json');
const { library } = require('./build.json');

const baseRenderUrl =
  process && process.argv && process.argv.includes('start')
    ? '.'
    : `https://unpkg.com/${name}@${version}`;

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
            'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@1.1.3-beta.2/dist/css/engine-core.css',
          engineExtCssUrl:
            'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@1.0.5-beta.10/dist/css/engine-ext.css',
          engineCoreJsUrl:
            'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@1.1.3-beta.2/dist/js/engine-core.js',
          engineExtJsUrl:
            'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@1.0.5-beta.10/dist/js/engine-ext.js',
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
