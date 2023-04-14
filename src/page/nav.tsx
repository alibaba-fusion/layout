import React, { FC, ReactNode, cloneElement, useContext, isValidElement, Children } from 'react';
import classNames from 'classnames';

import Context from '@/common/context';
import Block from '@/block';
import { wrapUnit } from '@/utils';
import { BaseBgMode, BaseProps, LayoutContextProps, TypeMark } from '@/types';

export interface PageNavProps extends BaseProps, BaseBgMode {
  width: number | string;
  children?: ReactNode;
}

export type IPageNav = FC<PageNavProps> & TypeMark;

const PageNav: IPageNav = (props: PageNavProps) => {
  const { children, className, mode, width, style = {}, ...others } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);

  const navCls = classNames(className, {
    [`${prefix}page-nav`]: true,
    [`${prefix}bg--${mode}`]: !!mode,
  });
  const navInnerCls = classNames(`${prefix}page-nav-inner`);

  const newChildren = Children.map(children, (child: any) => {
    const { style: childStyle, ...otherChildProps } = child?.props || {};

    if (isValidElement(child)) {
      return cloneElement(child, {
        ...otherChildProps,
        span: 1,
        style: {
          ...childStyle,
        },
      });
    } else {
      return <Block span={1}>{child}</Block>;
    }
  });

  const newStyle = {
    width: wrapUnit(width),
    ...style,
  };

  if (!children) {
    return null;
  }

  return (
    <nav className={navCls} style={newStyle} {...others}>
      <div className={navInnerCls}>{newChildren}</div>
    </nav>
  );
};

PageNav.displayName = 'Nav';
PageNav.typeMark = 'Nav';
PageNav.defaultProps = {
  width: 200,
  mode: 'transparent',
};

export default PageNav;
