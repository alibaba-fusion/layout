import React, {
  useContext,
  cloneElement,
  forwardRef,
  isValidElement,
  Children,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { ALIGN_ALIAS_MAP } from '@/common/constant';
import Context from '@/common/context';
import { wrapUnit, getGapVal } from '@/utils';
import { ColProps, LayoutContextProps, TypeMark } from '@/types';
import { isNumber, isString } from 'lodash-es';

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

  const memorizedChildren = useMemo(() => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        const {
          style: childStyle,
          height: childHeight,
          autoFit: childAutoFit,
          ...otherChildProps
        } = child?.props;
        const { minHeight: childStyleMinHeight, ...otherChildStyle } = childStyle || {};

        let flex;
        // 有效的固定高度
        let validHeight;
        // 有效的最小高度
        let validMinHeight;

        if (isNumber(childHeight) || (isString(childHeight) && childHeight !== '')) {
          validHeight = childHeight;
        } else if (childStyleMinHeight && childStyleMinHeight !== '') {
          validMinHeight = childStyleMinHeight;
        }

        // 如果设置了最小高, 那么 flex 伸缩能力就禁用了
        if (childAutoFit || validMinHeight || validHeight) {
          flex = `0 0 auto`;
        } else {
          flex = '1 1 0';
        }

        return cloneElement(child, {
          ...otherChildProps,
          style: {
            flex,
            ...(validMinHeight ? { minHeight: validMinHeight } : null),
            ...(validHeight ? { height: validHeight } : null),
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
      alignItems: ALIGN_ALIAS_MAP[align] || align,
      justifyContent: 'stretch',
      ...(width ? { width: wrapUnit(width) } : null),
      ...(height ? { height: wrapUnit(height), flex: '0 0 auto' } : null),
      ...(gap ? { gap: wrapUnit(gap) } : null),
      ...style,
    }),
    [align, width, height, gap, style],
  );

  return (
    <div {...others} ref={ref} className={classNames(className, clsPrefix)} style={newStyle}>
      {memorizedChildren}
    </div>
  );
};

const RefCol: ICol = forwardRef(Col);

RefCol.displayName = 'Col';
RefCol.typeMark = 'Col';

export default RefCol;
