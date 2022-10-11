import * as React from 'react';
import { createElement, FC, useContext } from 'react';
import classNames from 'classnames';
import { TextTypeMap } from './util';
import Context from './common/context';
import { TextProps, LayoutContextProps, TypeMark } from './types';

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
    ...others
  } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);

  let { children } = props;
  // @ts-ignore
  const newType = TextTypeMap[type] || type;

  const cls = classNames(className, {
    [`${prefix}text`]: true,
    [`${prefix}text-${newType}`]: newType,
  });

  if (typeof children === 'string' && children.indexOf('\n') !== -1) {
    const childrenList = children.split('\n');
    const newChildren: any = [];
    childrenList.forEach((child) => {
      newChildren.push(child);
      newChildren.push(<br />);
    });
    newChildren.pop();

    children = newChildren;
  }

  if (strong) {
    children = <strong>{children}</strong>;
  }

  if (underline) {
    children = <u>{children}</u>;
  }

  if (deleteProp) {
    children = <del>{children}</del>;
  }

  if (code) {
    children = <code>{children}</code>;
  }

  if (mark) {
    children = <mark>{children}</mark>;
  }

  const newStyle = {
    ...(color ? { color } : null),
    ...(backgroundColor ? { backgroundColor } : null),
    textAlign: align,
    ...style,
  };

  return createElement(
    component,
    {
      ...others,
      style: newStyle,
      className: cls,
    },
    children,
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
