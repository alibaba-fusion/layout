import React, { FC, ReactNode, useContext, cloneElement, Children, isValidElement } from 'react';
import classNames from 'classnames';
import Context from '@/common/context';
import Block from '@/block';
import { wrapUnit } from '@/utils';
import { BaseBgMode, BaseProps, LayoutContextProps, TypeMark } from '@/types';

export interface PageAsideProps extends BaseProps, BaseBgMode {
  width: number | string;
  children?: ReactNode;
}

export type IPageAside = FC<PageAsideProps> & TypeMark;

const PageAside: IPageAside = (props: PageAsideProps) => {
  const { className, width, mode, children, style, ...others } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);

  const asideCls = classNames(className, {
    [`${prefix}page-aside`]: true,
    [`${prefix}bg--${mode}`]: !!mode,
  });
  const asideInnerCls = classNames(`${prefix}page-aside-inner`);

  const newChildren = Children.map(children, (child: any) => {
    const { style: childStyle, ...otherChildProps } = child.props;

    if (isValidElement(child)) {
      return cloneElement(child, {
        ...otherChildProps,
        span: 1,
        style: {
          ...childStyle,
        },
      });
    } else {
      return (
        <Block span={1} width={width}>
          {child}
        </Block>
      );
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
    <aside className={asideCls} style={newStyle} {...others}>
      <div className={asideInnerCls}>{newChildren}</div>
    </aside>
  );
};

PageAside.displayName = 'Aside';
PageAside.defaultProps = {
  width: 200,
  mode: 'transparent',
};
PageAside._typeMark = 'Aside';

export default PageAside;
