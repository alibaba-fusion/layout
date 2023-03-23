import React, {
  useContext,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { VER_ALIGN_ALIAS_MAP } from '@/common/constant';
import Context from '@/common/context';
import { getGapVal, wrapUnit } from '@/utils';
import useFlexClassNames from '@/hooks/use-flex-class-names';
import { LayoutContextProps, RowProps, TypeMark } from './types';

type IRow = ForwardRefExoticComponent<RowProps> & TypeMark;

/**
 * 行拆分布局 （子元素如果不是 Row、Col 或 Cell, 则默认用 Cell 包裹）
 */
const Row: ForwardRefRenderFunction<HTMLDivElement, RowProps> = (props: RowProps, ref) => {
  const {
    width,
    height,
    children,
    className,
    verAlign,
    style,
    autoFit,
    gap: gapProp,
    ...others
  } = props;
  const { prefix, gridGap } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}row-flex`;
  const gap = getGapVal(gridGap, gapProp);

  const validWidth = width || style?.width


  const newStyle = useMemo(
    () => ({
      // @ts-ignore
      alignItems: VER_ALIGN_ALIAS_MAP[verAlign] || verAlign,
      ...(width ? { width: wrapUnit(width) } : null),
      ...(height ? { height: wrapUnit(height) } : null),
      ...(gap ? { gap: wrapUnit(gap) } : null),
      // 有 width 或者 style.width 的时候，设置 flexBasis 宽度
      ...(validWidth ? { flexBasis: wrapUnit(validWidth) } : null ),
      ...style,
    }),
    [verAlign, width, height, gap, style, validWidth],
  );
  const flexClassNames = useFlexClassNames(props);

  return (
    <div
      {...others}
      className={classNames(className, clsPrefix, flexClassNames)} style={newStyle} ref={ref}>
      {children}
    </div>
  );
};

const RefRow: IRow = forwardRef(Row);

RefRow.displayName = 'Row';
RefRow.typeMark = 'Row';

export default RefRow;
