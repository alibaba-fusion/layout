import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  useContext,
  useMemo,
} from 'react';
import classNames from 'classnames';

import Context from '@/common/context';
import { getGapVal, wrapUnit } from '@/utils';
import useFlexClassNames from '@/hooks/use-flex-class-names';
import { GridProps, LayoutContextProps, TypeMark } from './types';

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
    width,
    minWidth,
    maxWidth,
    ...others
  } = props;

  const { prefix, gridGap } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}grid`;
  const rowGap = getGapVal(gridGap, rowGapProp);
  const colGap = getGapVal(gridGap, colGapProp);

  const valiedWidth = width || style?.width || minWidth
  const memorizedNewStyle = useMemo(() => {
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

    return {
      display: 'grid',
      gridTemplateColumns: gtc,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      ...(rowGap ? { gridRowGap: wrapUnit(rowGap) } : null),
      ...(colGap ? { gridColumnGap: wrapUnit(colGap) } : null),
      // 有 width 或者 style.width 的时候，设置 flexBasis 宽度
      ...(valiedWidth ? { flexBasis: wrapUnit(valiedWidth) } : null ),
      ...style,
    };
  }, [cols, colGap, minWidth, maxWidth, rows, rowGap, style]);

  // 优先行渲染
  const renderChildren = () => {
    return Array.from(new Array(rows)).map((_, row) => {
      return Array.from(new Array(cols)).map((__, col) => {
        return renderItem ? renderItem(row, col) : null;
      });
    });
  };

  const flexClassNames = useFlexClassNames(props);
  return (
    <div
      {...others}
      ref={ref}
      className={classNames(className, clsPrefix, flexClassNames, {
        [`${clsPrefix}-align--${align}`]: align,
        [`${clsPrefix}-valign--${verAlign}`]: verAlign,
      })}
      style={memorizedNewStyle}
    >
      {renderItem ? renderChildren() : children}
    </div>
  );
};

const RefGrid: IGrid = forwardRef(Grid);

RefGrid.displayName = 'Grid';
RefGrid.typeMark = 'Grid';
RefGrid.defaultProps = {
  rows: 1,
  cols: 1,
};

export default RefGrid;
