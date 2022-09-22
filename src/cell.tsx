import * as React from 'react';
import { ForwardRefExoticComponent, forwardRef, useContext, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import Context from './common/context';
import { VER_ALIGN_ALIAS_MAP } from './common/constant';
import { isValidGap, wrapUnit } from './utils';
import { CellProps, LayoutContextProps, TypeMark } from './types';

type ICell = ForwardRefExoticComponent<CellProps> & TypeMark;

/**
 * 单元格容器(默认垂直方向的 flex 布局容器)
 */
const Cell: ForwardRefRenderFunction<HTMLDivElement, CellProps> = (props, ref) => {
  const {
    className,
    children,
    verAlign,
    width,
    block,
    direction,
    align,
    style,
    autoFit,
    gap,
    ...others
  } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}cell`;

  const newStyle: React.CSSProperties = {
    ...(!block ? { display: 'flex', flexDirection: direction === 'ver' ? 'column' : 'row' } : null),
    ...(verAlign
      ? {
          // @ts-ignore
          justifyContent: VER_ALIGN_ALIAS_MAP[verAlign] || verAlign,
        }
      : null),
    ...(width ? { width: wrapUnit(width) } : null),
    ...(isValidGap(gap) ? { gap: wrapUnit(gap) } : null),
    ...style,
  };

  return (
    <div
      {...others}
      className={classNames(clsPrefix, className, {
        [`${clsPrefix}-align--${align}`]: align,
      })}
      style={newStyle}
      ref={ref}
    >
      {children}
    </div>
  );
};

const RefCell: ICell = forwardRef(Cell);

RefCell.displayName = 'Cell';
RefCell.defaultProps = {
  block: false,
  direction: 'ver',
};
RefCell._typeMark = 'Cell';

export default RefCell;
