import React, {
  useContext,
  Children,
  forwardRef,
  cloneElement,
  ReactNode,
  ReactElement,
  ForwardRefRenderFunction,
  ForwardRefExoticComponent,
  useMemo,
} from 'react';
import { isString, isNil } from 'lodash-es';
import classNames from 'classnames';
import Context from '@/common/context';
import { wrapUnit, getGapVal, isValidGap } from '@/utils';
import Block from '@/block';
import Row from '@/row';
import Col from '@/col';
import Cell from '@/cell';
import P from '@/p';
import { SectionProps, LayoutContextProps, TypeMark } from '@/types';

type ISection = ForwardRefExoticComponent<SectionProps> & TypeMark;

/**
 * 获取计算后的子节点
 * @param children
 * @param numberOfColumns
 * @param maxNumberOfColumns
 */
function getValidChildren(
  children: ReactNode,
  numberOfColumns: number,
  maxNumberOfColumns: number,
) {
  const newChildren = wrapBlock(children, maxNumberOfColumns);

  return calBlockSpan(newChildren, numberOfColumns);
}

/**
 * 为非 Block 节点，包裹 Block 子元素
 * @param children
 * @param maxNumberOfColumns
 * @return ReactNode[]
 */
function wrapBlock(children: ReactNode, maxNumberOfColumns: number) {
  let tmp: any[] = [];
  const ret: any[] = [];
  const validChildList = Children.toArray(children).filter((child) => !isNil(child));

  validChildList.forEach((child: any, index) => {
    if (child?.type === Block || child?.type?.typeMark === 'Block') {
      if (tmp.length > 0) {
        ret.push(
          <Block key={`cs-${index}`} span={maxNumberOfColumns}>
            {tmp}
          </Block>,
        );
        tmp = [];
      }

      ret.push(child);

      if (tmp.length > 0) {
        ret.push(
          <Block key={`cs-${index}`} span={maxNumberOfColumns}>
            {[...tmp]}
          </Block>,
        );
        tmp = [];
      }
    } else {
      tmp.push(child);
    }

    if (index === validChildList.length - 1 && tmp.length > 0) {
      ret.push(
        <Block key={`cs-${index}`} span={maxNumberOfColumns}>
          {[...tmp]}
        </Block>,
      );
      tmp = [];
    }
  });

  return ret;
}

/**
 * 为 Block 自动调整列宽
 * @param children
 * @param numberOfColumns
 */
function calBlockSpan(children: ReactElement[], numberOfColumns: number) {
  let ret: ReactElement[] = [];
  let stack: ReactElement[] = [];
  let counter = 0;
  const len = children.length;

  for (let i = 0; i < len; i++) {
    const child = children[i];
    const span: number = +child.props.span;

    if (span < numberOfColumns) {
      if (span + counter <= numberOfColumns) {
        stack.push(child);
        counter += span;
      } else {
        ret = [...ret, ...adjustColWidth(stack, counter, numberOfColumns)];
        stack = [child];
        counter = span;
      }
    } else {
      if (stack.length > 0) {
        ret = [...ret, ...adjustColWidth(stack, counter, numberOfColumns)];
        stack = [];
        counter = 0;
      }

      ret = [...ret, ...adjustColWidth([child], numberOfColumns, numberOfColumns)];
    }

    if (i === len - 1 && stack.length > 0) {
      ret = [...ret, ...adjustColWidth(stack, counter, numberOfColumns)];
    }
  }
  return ret;
}

/**
 * 重算列宽
 * @param blockNodes
 * @param totalSpan
 * @param maxColNum
 */
function adjustColWidth(blockNodes: ReactElement[], totalSpan: number, maxColNum: number) {
  return blockNodes.map((item) => {
    const { span } = item.props;

    return cloneElement(item, {
      ...item.props,
      span: Math.round((span / totalSpan) * maxColNum),
    });
  });
}

/**
 * 章节
 * @param props
 * @param ref
 */
const Section: ForwardRefRenderFunction<HTMLDivElement, SectionProps> = (props, ref) => {
  const {
    className,
    children,
    title,
    titleAlign,
    extra,
    gap: blockGapProp,
    noPadding,
    ...others
  } = props;

  const {
    prefix,
    blockGap: blockGapContext,
    breakPoint: { numberOfColumns },
    maxNumberOfColumns,
  } = useContext<LayoutContextProps>(Context);

  const clsPrefix = `${prefix}section`;
  const hasHead = title || extra;
  // classNames
  const sectionCls = classNames(clsPrefix, className);
  const blockWrapperCls = `${clsPrefix}-block-wrapper`;
  const innerContainerWithHead = classNames(`${clsPrefix}-inner--with-head`, {
    [`${clsPrefix}-no-padding`]: noPadding,
  });
  const innerContainerWithoutHead = classNames(`${clsPrefix}-inner-without-head`);

  // 此处定义的是 blockGap
  const gap = getGapVal(blockGapContext, blockGapProp);

  const blockWrapperStyle = useMemo(() => {
    return {
      ...(isValidGap(gap)
        ? {
            gridColumnGap: wrapUnit(gap),
            gridRowGap: wrapUnit(gap),
          }
        : null),
    };
  }, [gap]);

  const newChildren = useMemo(
    () => getValidChildren(children, numberOfColumns, maxNumberOfColumns),
    [children, numberOfColumns, maxNumberOfColumns],
  );

  // 带有 title&extra
  if (hasHead) {
    return (
      <div {...others} className={classNames(clsPrefix, className)} ref={ref}>
        <div className={innerContainerWithHead}>
          <Col align="stretch">
            <Row autoFit className={`${clsPrefix}-head`} verAlign="middle">
              <Cell className={`${clsPrefix}-title`} align={titleAlign}>
                {isString(title) ? <P type="h5">{title}</P> : title}
              </Cell>
              <Cell x-if={extra} align="right" autoFit className={`${clsPrefix}-extra`}>
                {isString(extra) ? (
                  <P align="right" type="body2">
                    {extra}
                  </P>
                ) : (
                  extra
                )}
              </Cell>
            </Row>
            <Cell>
              <div className={blockWrapperCls} style={blockWrapperStyle}>
                {newChildren}
              </div>
            </Cell>
          </Col>
        </div>
      </div>
    );
  }

  return (
    <div {...others} className={sectionCls} ref={ref}>
      <div
        className={classNames(innerContainerWithoutHead, blockWrapperCls)}
        style={blockWrapperStyle}
      >
        {newChildren}
      </div>
    </div>
  );
};

const RefSection: ISection = forwardRef(Section);
RefSection.displayName = 'Section';
RefSection.typeMark = 'Section';

export default RefSection;
