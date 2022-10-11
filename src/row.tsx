import React, {
  useContext,
  cloneElement,
  isValidElement,
  forwardRef,
  Children,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
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
const Row: ForwardRefRenderFunction<HTMLDivElement, RowProps> = (props, ref) => {
  const { width, children, className, verAlign, style, autoFit, gap: gapProp, ...others } = props;
  const { prefix, gridGap } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}row-flex`;
  const gap = getGapVal(gridGap, gapProp);

  const newChildren = Children.map(children, (child) => {
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

  const newStyle = {
    // @ts-ignore
    alignItems: VER_ALIGN_ALIAS_MAP[verAlign] || verAlign,
    ...(width ? { width: wrapUnit(width) } : null),
    ...(gap ? { gap: wrapUnit(gap) } : null),
    ...style,
  };

  return (
    <div {...others} className={classNames(className, clsPrefix)} style={newStyle} ref={ref}>
      {newChildren}
    </div>
  );
};

const RefRow: IRow = forwardRef(Row);

RefRow.displayName = 'Row';
RefRow._typeMark = 'Row';

export default RefRow;
