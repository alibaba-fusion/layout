import React, {
  Children,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  isValidElement,
  ReactNode,
  useContext,
  useRef,
} from 'react';
import classNames from 'classnames';

import Context from '@/common/context';
import { wrapUnit } from '@/utils';
import { BaseBgMode, BaseProps, LayoutContextProps, TypeMark } from '@/types';

export interface PageContentProps extends BaseProps, BaseBgMode {
  children?: ReactNode;
  // string 指的是 calc(100vh - 52px) 这种，而不是 30px
  minHeight?: number | string;
  noPadding?: boolean;
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
  const { children, mode, noPadding, style, ...others } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);

  const sectionWrapperRef = useRef(null);
  let navNode: any;
  let asideNode: any;

  const newChildren = Children.map(children, (child) => {
    let tm;

    if (isValidElement(child)) {
      // @ts-ignore
      tm = child?.type?.typeMark;

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

  const mainCls = classNames({
    [`${prefix}page-main`]: true,
  });

  const contentHelpCls = classNames({
    [`${prefix}page-bg-${mode}`]: !!mode,
    [`${prefix}page-min-height-helper`]: true,
    [`${prefix}page-content--with-aside`]: asideNode,
    [`${prefix}page-content--with-nav`]: navNode,
    [`${prefix}page-content--center-mode`]: navNode || asideNode,
    [`${prefix}page-content--single-col`]: !navNode && !asideNode,
  });

  const contentCls = classNames({
    [`${prefix}page-content`]: true,
    [`${prefix}page-content-no-padding`]: noPadding,
    [`${prefix}page-content--with-nav`]: navNode,
  });

  return (
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
};

const RefPageContent: IPageContent = forwardRef(PageContent);

RefPageContent.displayName = 'Content';
RefPageContent.typeMark = 'Content';

export default RefPageContent;
