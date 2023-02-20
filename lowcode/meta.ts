/* eslint-disable @typescript-eslint/no-require-imports */
import section from './metas/section';
import block from './metas/block';
import grid from './metas/grid';
import row from './metas/row';
import col from './metas/col';
import cell from './metas/cell';
import page from './metas/page';
import pageHeader from './metas/page-header';
import pageFooter from './metas/page-footer';
import pageAside from './metas/page-aside';
import pageNav from './metas/page-nav';
import pageContent from './metas/page-content';
import p from './metas/p';
import fixedPoint from './metas/fixed-point';
import fixedContainer from './metas/fixed-container';

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

export default [
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
