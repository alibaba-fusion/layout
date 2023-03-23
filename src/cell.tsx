import React, {
  ForwardRefExoticComponent,
  forwardRef,
  useContext,
  CSSProperties,
  ForwardRefRenderFunction,
  useMemo,
} from 'react';
import classNames from 'classnames';

import Context from '@/common/context';
import { VER_ALIGN_ALIAS_MAP } from '@/common/constant';
import { isValidGap, wrapUnit } from '@/utils';
import useFlexClassNames from '@/hooks/use-flex-class-names';
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
    height,
    block,
    direction,
    align,
    style,
    // 父级元素处理 autoFit 的相关布局
    autoFit,
    gap,
    ...others
  } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}cell`;

  const validWidth = width || style?.width
  const newStyle: CSSProperties = useMemo(
    () => ({
      ...(!block
        ? { display: 'flex', flexDirection: direction === 'ver' ? 'column' : 'row' }
        : null),
      ...(verAlign
        ? {
            // @ts-ignore
            justifyContent: VER_ALIGN_ALIAS_MAP[verAlign] || verAlign,
          }
        : null),
      ...(width ? { width: wrapUnit(width) } : null),
      ...(height ? { height: wrapUnit(height) } : null),
      ...(isValidGap(gap) ? { gap: wrapUnit(gap) } : null),
      // 有 width 或者 style.width 的时候，设置 flexBasis 宽度
      ...(validWidth ? { flexBasis: wrapUnit(validWidth) } : null ),
      ...style,
    }),
    [block, direction, verAlign, width, height, gap, style, validWidth],
  );

  const flexClassNames = useFlexClassNames(props);

  return (
    <div
      {...others}
      ref={ref}
      className={classNames(clsPrefix, className, flexClassNames, {
        [`${clsPrefix}-align--${align}`]: align,
      })}
      style={newStyle}
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
RefCell.typeMark = 'Cell';

export default RefCell;
