import * as React from 'react';
import {
  useContext,
  forwardRef,
  ForwardedRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
} from 'react';
import classNames from 'classnames';
import Context from './common/context';
import { isString } from './utils';
import Row from './row';
import Cell from './cell';
// import Col from './col';
import P from './p';
import Text from './text';
import { BlockProps, LayoutContextProps, TypeMark } from './types';

type IBlock = ForwardRefExoticComponent<BlockProps> & TypeMark;

/**
 * 区块,默认 flex 布局
 * @param props
 * @param ref
 * @constructor
 */
const Block: ForwardRefRenderFunction<any, BlockProps> = (props, ref: ForwardedRef<any>) => {
  const {
    className,
    title,
    titleAlign,
    extra,
    noPadding: noPaddingProp,
    mode,
    bordered,
    width,
    contentClassName,
    contentStyle = {},
    span: spanProp,
    divider,
    children,
    align,
    verAlign,
    ...others
  } = props;
  const { prefix, maxNumberOfColumns } = useContext<LayoutContextProps>(Context);
  const isTransparent = mode === 'transparent';
  const noPadding = !isTransparent ? noPaddingProp : true;
  const hasHead = !isTransparent && (title || extra);

  let span = spanProp;

  if (!span || span > maxNumberOfColumns || span <= 0) {
    span = maxNumberOfColumns;
  }

  const clsPrefix = `${prefix}block`;

  const blockCls = classNames(className, clsPrefix, {
    [`${prefix}bg--${mode}`]: mode,
    [`${clsPrefix}--no-padding`]: noPadding,
    [`${clsPrefix}--headless`]: !hasHead,
    [`${clsPrefix}--span-${span}`]: span > 0,
    [`${clsPrefix}--bordered`]: !isTransparent && bordered,
    [`${clsPrefix}--divided`]: divider,
  });

  const headCls = classNames({
    [`${clsPrefix}-head`]: true,
  });

  const blockContentCls = classNames(contentClassName, {
    [`${clsPrefix}-content`]: true,
    [`${clsPrefix}-content--no-padding`]: noPadding,
  });

  // 当有 title 或 extra 节点时
  if (hasHead) {
    return (
      <div {...others} className={blockCls} ref={ref}>
        <Row autoFit verAlign="middle" className={headCls}>
          {title ? (
            <Cell className={`${clsPrefix}-title`} align={titleAlign}>
              {isString(title) ? (
                <P>
                  <Text type="h6">{title}</Text>
                </P>
              ) : (
                title
              )}
            </Cell>
          ) : null}

          {extra ? (
            <Cell autoFit className={`${clsPrefix}-extra`} align="right">
              {isString(extra) ? (
                <P>
                  <Text>{extra}</Text>
                </P>
              ) : (
                extra
              )}
            </Cell>
          ) : null}
        </Row>

        <Cell
          {...others}
          align={align}
          verAlign={verAlign}
          className={blockContentCls}
          style={contentStyle}
        >
          {children}
        </Cell>
      </div>
    );
  }

  return (
    // @ts-ignore
    <Cell {...others} width={width} verAlign={verAlign} className={blockCls} ref={ref}>
      {children}
    </Cell>
  );
};

const RefBlock: IBlock = forwardRef(Block);

RefBlock.displayName = 'Block';
RefBlock.defaultProps = {
  mode: 'surface',
  noPadding: false,
};
RefBlock._typeMark = 'Block';

export default RefBlock;
