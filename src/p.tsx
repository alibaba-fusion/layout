/**
 * 段落
 */
import React, {
  useContext,
  forwardRef,
  Children,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  isValidElement,
  cloneElement,
  ReactNode,
  useMemo,
} from 'react';
import { isNumber, isString } from 'lodash-es';
import classNames from 'classnames';
import Context from '@/common/context';
import { isPresetSize, wrapUnit } from '@/utils';
import Text from '@/text';
import { BaseSize, LayoutContextProps, ParagraphProps, TypeMark } from '@/types';

const getChildren = (children: any, type: ParagraphProps['type'] = 'body2') => {
  return Children.map(children, (child: ReactNode) => {
    // 文本节点 和 纯文本链接默认使用 Text 节点包裹
    if (typeof child === 'string') {
      return <Text type={type}>{child}</Text>;
    } else if (isValidElement(child)) {
      if (child.type === 'a' && isString(child.props.children)) {
        return cloneElement(
          child,
          { ...child.props },
          <Text type={type} color="inherit">
            {child.props.children}
          </Text>,
        );
        // @ts-ignore
      } else if (child.type.typeMark === 'Text' && !child.props.type) {
        return cloneElement(child, {
          type,
        });
      }
    }

    return child;
  });
};

type IParagraph = ForwardRefExoticComponent<ParagraphProps> & TypeMark;

/**
 * 段落布局，自动为段落内元素增加横向和垂直间隙，并支持多种模式对齐
 */
const P: ForwardRefRenderFunction<HTMLParagraphElement, ParagraphProps> = (props, ref) => {
  const {
    type,
    className,
    beforeMargin,
    afterMargin,
    align,
    verAlign,
    spacing: spacingProp,
    hasVerSpacing,
    children,
    style,
    ...others
  } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}p`;
  const isCustomSize =
    isNumber(spacingProp) ||
    (isString(spacingProp) && spacingProp !== '' && !isPresetSize(spacingProp));
  const spacing = isCustomSize ? 'medium' : spacingProp;

  const newStyle = useMemo(
    () => ({
      marginTop: wrapUnit(beforeMargin) || 0,
      marginBottom: wrapUnit(afterMargin) || 0,
      // 如果 spacingProp 为数值类型，则默认修改当前段落下的间隙值
      ...(isCustomSize
        ? {
            '--page-p-medium-spacing': wrapUnit(spacingProp),
          }
        : null),
      ...style,
    }),
    [beforeMargin, afterMargin, isCustomSize, style],
  );

  return (
    <div
      {...others}
      ref={ref}
      className={classNames(clsPrefix, className, {
        [`${clsPrefix}-spacing`]: spacing,
        [`${clsPrefix}-align--${align}`]: align,
        [`${clsPrefix}-valign--${verAlign}`]: verAlign,
        [`${clsPrefix}-spacing--${align}`]: spacing && align,
        [`${clsPrefix}-spacing--${spacing}`]:
          ['small', 'medium', 'large'].indexOf(spacing as BaseSize) > -1,
        [`${clsPrefix}-margin`]: hasVerSpacing,
        [`${clsPrefix}--${type}`]: type,
      })}
      style={newStyle}
    >
      {getChildren(children, type)}
    </div>
  );
};

const RefParagraph: IParagraph = forwardRef(P);

RefParagraph.displayName = 'P';
RefParagraph.typeMark = 'P';

RefParagraph.defaultProps = {
  spacing: 'medium',
  hasVerSpacing: true,
  verAlign: 'middle',
};

export default RefParagraph;
