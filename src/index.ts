// 大布局
import RefPage from './page/index';
import Header from './page/page-header';
import Nav from './page/nav';
import Aside from './page/aside';
import Content from './page/content';
import Footer from './page/page-footer';

import './index.scss';

type IPage = typeof RefPage & {
  Header: typeof Header;
  Nav: typeof Nav;
  Aside: typeof Aside;
  Content: typeof Content;
  Footer: typeof Footer;
};

// @ts-ignore
const ExpandedPage: IPage = RefPage;

ExpandedPage.Header = Header;
ExpandedPage.Nav = Nav;
ExpandedPage.Aside = Aside;
ExpandedPage.Content = Content;
ExpandedPage.Footer = Footer;

export { Header, Nav, Aside, Content, Footer };

export { ExpandedPage as Page };

export { default as Section } from './section';
export { default as Block } from './block';

// 小布局
export { default as Grid } from './grid';
export { default as Row } from './row';
export { default as Col } from './col';
export { default as Cell } from './cell';
export { default as P } from './p';
export { default as Text } from './text';

export { default as FixedPoint } from './fixed-point';
export { default as FixedContainer } from './fixed-container';

export { default as Space } from './space';

export type { PageProps } from './page/index';
export type { PageHeaderProps, IPageHeader } from './page/page-header';
export type { PageFooterProps, IPageFooter } from './page/page-footer';
export type { PageNavProps, IPageNav } from './page/nav';
export type { PageAsideProps, IPageAside } from './page/aside';
export type { PageContentProps, IPageContent } from './page/content';

export type {
  BreakPoint,
  BreakPoints,
  SectionProps,
  BlockProps,
  GridProps,
  RowProps,
  ColProps,
  CellProps,
  ParagraphProps,
  TextProps,
  SpaceProps,
} from './types';
