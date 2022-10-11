import React, { FC, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import Context from '@/common/context';
import { BaseBgMode, BaseProps, LayoutContextProps, TypeMark } from '@/types';

export interface PageHeaderProps extends BaseProps, BaseBgMode {
  /**
   * 禁用底部 padding
   */
  noBottomPadding?: boolean;
  divider?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export type IPageHeader = FC<PageHeaderProps> & TypeMark;

const PageHeader: IPageHeader = (props: PageHeaderProps) => {
  const { className, children, mode, noBottomPadding, divider, fullWidth, ...others } = props;
  const { prefix, isTab } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}page-header`;

  const headerCls = classNames(className, clsPrefix, {
    [`${clsPrefix}--dividing`]: divider,
    [`${clsPrefix}--no-margin`]: isTab,
    [`${clsPrefix}--no-bottom-padding`]: isTab || noBottomPadding,
    [`${clsPrefix}--fullwidth`]: fullWidth,
    [`${prefix}bg--${mode}`]: !!mode,
  });

  if (!children) {
    return null;
  }

  return (
    <header {...others} className={headerCls}>
      <div className={`${prefix}page-header-inner`}>{children}</div>
    </header>
  );
};

PageHeader.displayName = 'Header';
PageHeader.defaultProps = {
  noBottomPadding: false,
  divider: false,
  fullWidth: false,
  mode: 'surface',
};

PageHeader._typeMark = 'Header';

export default PageHeader;
