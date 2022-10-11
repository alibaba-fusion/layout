import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  useContext,
} from 'react';
import classNames from 'classnames';
import Context from '@/common/context';
import { getGapVal, wrapUnit } from '@/utils';
import { GridProps, LayoutContextProps, TypeMark } from '@/types';

type IGrid = ForwardRefExoticComponent<GridProps> & TypeMark;

/**
 * 网格布局
 * @param props
 * @param ref
 */
const Grid: ForwardRefRenderFunction<HTMLDivElement, GridProps> = (props, ref) => {
  const {
    className,
    children,
    style,
    align,
    verAlign,
    rowGap: rowGapProp,
    colGap: colGapProp,
    renderItem,
    rows,
    cols,
    minWidth,
    maxWidth,
    ...others
  } = props;

  const { prefix, gridGap } = useContext<LayoutContextProps>(Context);

  const clsPrefix = `${prefix}grid`;

  const rowGap = getGapVal(gridGap, rowGapProp);
  const colGap = getGapVal(gridGap, colGapProp);

  let gtc = `repeat(${cols}, 1fr)`;

  if (cols && cols > 1) {
    gtc = `repeat(${cols}, calc( (100% - ${colGap || `var(--page-grid-gap)`} * ${
      cols - 1
    })/${cols}))`;
  } else if (minWidth && maxWidth) {
    gtc = `repeat(auto-fill, minmax(${wrapUnit(minWidth)}, ${wrapUnit(maxWidth)}))`;
  } else if (minWidth && !maxWidth) {
    gtc = `repeat(auto-fit, minmax(${wrapUnit(minWidth)}, auto))`;
  } else if (!minWidth && maxWidth) {
    gtc = `repeat(auto-fill, minmax(auto, ${wrapUnit(maxWidth)}))`;
  }

  const newStyle = {
    display: 'grid',
    gridTemplateColumns: gtc,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    ...(rowGap ? { gridRowGap: wrapUnit(rowGap) } : null),
    ...(colGap ? { gridColumnGap: wrapUnit(colGap) } : null),
    ...style,
  };

  const renderChildren = () => {
    return Array.from(new Array(rows)).map((_, row) => {
      return Array.from(new Array(cols)).map((__, col) => {
        return renderItem ? renderItem(row, col) : null;
      });
    });
  };

  return (
    <div
      {...others}
      className={classNames(className, clsPrefix, {
        [`${clsPrefix}-align--${align}`]: align,
        [`${clsPrefix}-valign--${verAlign}`]: verAlign,
      })}
      style={newStyle}
      ref={ref}
    >
      {renderItem ? renderChildren() : children}
    </div>
  );
};

const RefGrid: IGrid = forwardRef(Grid);

RefGrid.displayName = 'Grid';
RefGrid._typeMark = 'Grid';
RefGrid.defaultProps = {
  rows: 1,
  cols: 1,
};

export default RefGrid;
