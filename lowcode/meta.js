/* eslint-disable @typescript-eslint/no-require-imports */
const section = require('./metas/section');
const block = require('./metas/block');
const grid = require('./metas/grid');
const row = require('./metas/row');
const col = require('./metas/col');
const cell = require('./metas/cell');
const page = require('./metas/page');
const pageHeader = require('./metas/page-header');
const pageFooter = require('./metas/page-footer');
const pageAside = require('./metas/page-aside');
const pageNav = require('./metas/page-nav');
const pageContent = require('./metas/page-content');
const p = require('./metas/p');
const fixedPoint = require('./metas/fixed-point');
const fixedContainer = require('./metas/fixed-container');

// img 修改
// window.parent?.AliLowCodeEngine?.designerCabin?.registerMetadataTransducer?.((metadata) => {
//   if (metadata.componentName === 'Image') {
//     return {
//       ...metadata,
//       ...img
//     };
//   }
//   return metadata;
// });

module.exports = [
  { ...page },
  { ...pageHeader },
  { ...pageFooter },
  { ...pageContent },
  { ...pageAside },
  { ...pageNav },
  { ...section },
  { ...block },
  { ...cell },
  { ...row },
  { ...col },
  { ...grid },
  { ...p },
  { ...fixedPoint },
  { ...fixedContainer },
];
