import React, {
  useContext,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { ALIGN_ALIAS_MAP } from '@/common/constant';
import Context from '@/common/context';
import { wrapUnit, getGapVal } from '@/utils';
import useFlexClassNames from '@/hooks/use-flex-class-names';
import { ColProps, LayoutContextProps, TypeMark } from './types';

type ICol = ForwardRefExoticComponent<ColProps> & TypeMark;

/**
 * 列拆分布局（子元素如果不是 Row、Col 或 Cell, 则默认用 Cell 包裹）
 */
const Col: ForwardRefRenderFunction<HTMLDivElement, ColProps> = (props: ColProps, ref) => {
  const {
    children,
    width,
    height,
    className,
    align,
    gap: gapProp,
    autoFit,
    style,
    ...others
  } = props;
  const { prefix, gridGap } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}col-flex`;
  const gap = getGapVal(gridGap, gapProp);

  const valiedWidth = width || style?.width
  const newStyle = useMemo(
    () => ({
      // @ts-ignore
      alignItems: ALIGN_ALIAS_MAP[align] || align,
      justifyContent: 'stretch',
      ...(width ? { width: wrapUnit(width) } : null),
      ...(height ? { height: wrapUnit(height), flex: '0 0 auto' } : null),
      ...(gap ? { gap: wrapUnit(gap) } : null),
      // 有 width 或者 style.width 的时候，设置 flexBasis 宽度
      ...(valiedWidth ? { flexBasis: wrapUnit(valiedWidth) } : null ),
      ...style,
    }),
    [align, width, height, gap, style],
  );
  const flexClassNames = useFlexClassNames(props);

  return (
    <div
      {...others} ref={ref}
      className={classNames(className, clsPrefix, flexClassNames)}
      style={newStyle}
    >
      {children}
    </div>
  );
};

const RefCol: ICol = forwardRef(Col);

RefCol.displayName = 'Col';
RefCol.typeMark = 'Col';

export default RefCol;
