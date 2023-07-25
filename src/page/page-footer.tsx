import React, { FC, ReactNode, useContext } from 'react';
import classNames from 'classnames';

import Context from '@/common/context';
import { BaseBgMode, BaseProps, LayoutContextProps, TypeMark } from '@/types';

export interface PageFooterProps extends BaseProps, BaseBgMode {
  divider?: boolean;
  fixed?: boolean;
  noTopPadding?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export type IPageFooter = FC<PageFooterProps> & TypeMark;

const PageFooter: IPageFooter = (props: PageFooterProps) => {
  const { className, fixed, divider, mode, noTopPadding, children, fullWidth, ...others } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}page-footer`;

  const footerCls = classNames(className, {
    [`${clsPrefix}--dividing`]: divider,
    [`${prefix}page-footer`]: true,
    [`${prefix}page-footer--fixed`]: fixed,
    [`${clsPrefix}--no-top-padding`]: noTopPadding,
    [`${clsPrefix}--fullwidth`]: fullWidth,
    [`${prefix}bg--${mode}`]: !!mode,
  });

  if (!children) {
    return null;
  }

  return (
    <footer {...others} className={footerCls}>
      <div className={`${prefix}page-footer-inner`}>{children}</div>
    </footer>
  );
};

PageFooter.displayName = 'Footer';
PageFooter.typeMark = 'Footer';
PageFooter.defaultProps = {
  noTopPadding: false,
  divider: false,
  fullWidth: false,
  mode: 'surface',
};

export default PageFooter;
