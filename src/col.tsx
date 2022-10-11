import React, {
  useContext,
  cloneElement,
  forwardRef,
  isValidElement,
  Children,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
} from 'react';
import classNames from 'classnames';
import { ALIGN_ALIAS_MAP } from '@/common/constant';
import Context from '@/common/context';
import { wrapUnit, getGapVal } from '@/utils';
import { ColProps, LayoutContextProps, TypeMark } from '@/types';

type ICol = ForwardRefExoticComponent<ColProps> & TypeMark;

/**
 * 列拆分布局（子元素如果不是 Row、Col 或 Cell, 则默认用 Cell 包裹）
 */
const Col: ForwardRefRenderFunction<HTMLDivElement, ColProps> = (props, ref) => {
  const { children, width, className, align, gap: gapProp, autoFit, style, ...others } = props;
  const { prefix, gridGap } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}col-flex`;
  const gap = getGapVal(gridGap, gapProp);

  const newChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const { style: childStyle, autoFit: childAutoFit, ...otherChildProps } = child?.props;
      const { minHeight: childStyleMinHeight, ...otherChildStyle } = childStyle || {};

      let flex;
      // 有效的最小高度
      let validMinHeight;

      if (childStyleMinHeight && childStyleMinHeight !== '') {
        validMinHeight = childStyleMinHeight;
      }

      // 如果设置了最小高, 那么 flex 属性就启动清除掉了
      if (childAutoFit || validMinHeight) {
        flex = `0 0 auto`;
      } else {
        flex = '1 1 0';
      }
      return cloneElement(child, {
        ...otherChildProps,
        style: {
          flex,
          ...(validMinHeight ? { minHeight: validMinHeight } : null),
          ...otherChildStyle,
        },
      });
    }

    return child;
  });

  const newStyle = {
    // @ts-ignore
    alignItems: ALIGN_ALIAS_MAP[align] || align,
    justifyContent: 'stretch',
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

const RefCol: ICol = forwardRef(Col);

RefCol.displayName = 'Col';
RefCol._typeMark = 'Col';

export default RefCol;
