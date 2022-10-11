import React, { createElement, useMemo, FC, useContext } from 'react';
import classNames from 'classnames';
import Context from '@/common/context';
import { TEXT_TYPE_MAP } from '@/common/constant';
import { TextProps, LayoutContextProps, TypeMark } from '@/types';

export type ITextComponent = FC<TextProps> & TypeMark;
/**
 * 文字 包含：字号、字重、行高
 * @param props
 */
const Text: ITextComponent = (props) => {
  const {
    className,
    type,
    style,
    component = 'span',
    strong,
    underline,
    delete: deleteProp,
    code,
    mark,
    color,
    align,
    backgroundColor,
    children,
    ...others
  } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);

  // @ts-ignore
  const newType = TEXT_TYPE_MAP[type] || type;

  const cls = classNames(className, {
    [`${prefix}text`]: true,
    [`${prefix}text-${newType}`]: newType,
  });

  const memorizedChildren = useMemo(() => {
    let _children = children;

    if (typeof _children === 'string' && _children.indexOf('\n') !== -1) {
      const childrenList = _children.split('\n');
      const newChildren: any = [];
      childrenList.forEach((child) => {
        newChildren.push(child);
        newChildren.push(<br />);
      });
      newChildren.pop();

      _children = newChildren;
    }

    if (strong) {
      _children = <strong>{_children}</strong>;
    }

    if (underline) {
      _children = <u>{_children}</u>;
    }

    if (deleteProp) {
      _children = <del>{_children}</del>;
    }

    if (code) {
      _children = <code>{_children}</code>;
    }

    if (mark) {
      _children = <mark>{_children}</mark>;
    }
    return _children;
  }, [children, mark, code, deleteProp, underline, strong]);

  const newStyle = useMemo(
    () => ({
      ...(color ? { color } : null),
      ...(backgroundColor ? { backgroundColor } : null),
      textAlign: align,
      ...style,
    }),
    [color, backgroundColor, align, style],
  );

  return createElement(
    component,
    {
      ...others,
      style: newStyle,
      className: cls,
    },
    memorizedChildren,
  );
};

Text.displayName = 'Text';
Text._typeMark = 'Text';
Text.defaultProps = {
  align: 'left',
  type: 'body2',
  component: 'span',
};

export default Text;
