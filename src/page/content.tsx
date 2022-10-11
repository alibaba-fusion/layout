import React, {
  useRef,
  forwardRef,
  useContext,
  ReactNode,
  ForwardRefRenderFunction,
  ReactElement,
  Children,
  isValidElement,
  ForwardRefExoticComponent,
} from 'react';
import classNames from 'classnames';
import Tab from '@alifd/next/lib/tab';
import Context from '@/common/context';
import { BaseBgMode, BaseProps, LayoutContextProps, TypeMark } from '@/types';
import { wrapUnit } from '@/utils';

export interface PageContentProps extends BaseProps, BaseBgMode {
  nav?: ReactElement;
  aside?: ReactElement;
  children?: ReactNode;
  title?: ReactNode;
  minHeight?: number | string; // string 指的是 calc(100vh - 52px) 这种，而不是 30px
  noPadding?: boolean;
  active?: boolean;
  key?: string;
}

export type IPageContent = ForwardRefExoticComponent<PageContentProps> & TypeMark;

/**
 * Content 的高度默认占据 一个屏幕的剩余空间，即使里面内容不足也应该背景色撑满
 * @param props
 * @param ref
 */

const PageContent: ForwardRefRenderFunction<any, PageContentProps> = (
  props: PageContentProps,
  ref,
) => {
  const { children, mode, noPadding, title, key, active, style, ...others } = props;
  const { prefix, isTab } = useContext<LayoutContextProps>(Context);

  const sectionWrapperRef = useRef(null);
  let navNode: any;
  let asideNode: any;

  const newChildren = Children.map(children, (child) => {
    let tm;

    if (isValidElement(child)) {
      // @ts-ignore
      tm = child?.type?._typeMark;

      if (tm === 'Nav') {
        navNode = child;
      } else if (tm === 'Aside') {
        asideNode = child;
      }
    }

    return tm !== 'Nav' && tm !== 'Aside' ? child : null;
  });

  const navWidth = navNode?.props?.width || 0;
  const asideWidth = asideNode?.props?.width || 0;
  const centerMode = !!(asideNode || navNode);

  const newPrefix = isTab ? 'fd-layout-' : prefix;
  const mainCls = classNames({
    [`${newPrefix}page-main`]: true,
  });

  const contentHelpCls = classNames({
    [`${newPrefix}page-bg-${mode}`]: !!mode,
    [`${newPrefix}page-min-height-helper`]: true,
    [`${newPrefix}page-content--with-aside`]: asideNode,
    [`${newPrefix}page-content--with-nav`]: navNode,
    [`${newPrefix}page-content--is-tab`]: isTab,
    [`${newPrefix}page-content--center-mode`]: navNode || asideNode,
    [`${newPrefix}page-content--single-col`]: !navNode && !asideNode,
  });

  const contentCls = classNames({
    [`${newPrefix}page-content`]: true,
    [`${newPrefix}page-content-no-padding`]: noPadding,
    [`${newPrefix}page-content--with-nav`]: navNode,
  });

  const content = (
    <div ref={ref} className={contentHelpCls} {...others}>
      <div
        className={contentCls}
        style={{
          ...(centerMode
            ? {
                gridTemplateColumns: `${navWidth ? wrapUnit(navWidth) : ''} 1fr ${
                  asideWidth ? wrapUnit(asideWidth) : ''
                }`,
              }
            : null),
          ...style,
        }}
      >
        {navNode}
        <main ref={sectionWrapperRef} className={mainCls}>
          {newChildren}
        </main>
        {asideNode}
      </div>
    </div>
  );

  if (isTab) {
    return (
      // @ts-ignore
      <Tab.Item title={title} key={key} active={active}>
        {content}
      </Tab.Item>
    );
  }

  return content;
};

const RefPageContent: IPageContent = forwardRef(PageContent);

RefPageContent.displayName = 'PageContent';
RefPageContent._typeMark = 'Content';

export default RefPageContent;
