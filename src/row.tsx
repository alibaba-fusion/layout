import React, {
  useContext,
  cloneElement,
  isValidElement,
  forwardRef,
  Children,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { VER_ALIGN_ALIAS_MAP } from '@/common/constant';
import Context from '@/common/context';
import { getGapVal, wrapUnit } from '@/utils';
import { LayoutContextProps, RowProps, TypeMark } from '@/types';

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

  // 暂存 children (此处用处不大，上层大部分情况有 clone children 的操作)
  const memorizedChildren = useMemo(() => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        const { width: childWidth, autoFit: childAutoFit, style: childStyle } = child?.props;
        const { width: childStyleWidth, ...otherChildStyle } = childStyle || {};

        let flex;
        let validWidth;

        if (childWidth && childWidth !== '') {
          validWidth = childWidth;
        } else if (childStyleWidth && childStyleWidth !== '') {
          validWidth = childStyle.width;
        }

        if (childAutoFit) {
          flex = '0 0 auto';
        } else if (validWidth) {
          flex = `0 0 ${wrapUnit(validWidth)}`;
        } else {
          flex = '1 1 0';
        }

        return cloneElement(child, {
          ...child?.props,
          style: {
            flex,
            width: validWidth,
            ...otherChildStyle,
          },
        });
      }

      return child;
    });
  }, [children]);

  const newStyle = useMemo(
    () => ({
      // @ts-ignore
      alignItems: VER_ALIGN_ALIAS_MAP[verAlign] || verAlign,
      ...(width ? { width: wrapUnit(width) } : null),
      ...(height ? { height: wrapUnit(height) } : null),
      ...(gap ? { gap: wrapUnit(gap) } : null),
      ...style,
    }),
    [verAlign, width, height, gap, style],
  );

  return (
    <div {...others} className={classNames(className, clsPrefix)} style={newStyle} ref={ref}>
      {memorizedChildren}
    </div>
  );
};

const RefRow: IRow = forwardRef(Row);

RefRow.displayName = 'Row';
RefRow.typeMark = 'Row';

export default RefRow;
