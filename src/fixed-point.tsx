import * as React from 'react';
import { useContext, forwardRef, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import Context from './common/context';
import { LayoutContextProps } from './types';

/**
 * 自由节点
 */
const FixedPoint: ForwardRefRenderFunction<HTMLDivElement, any> = (props: any, ref) => {
  const { children, left = 0, top = 0, className, zIndex } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);

  return (
    <div
      ref={ref}
      style={{ width: 2, height: 2, position: 'relative' }}
      className={classNames(`${prefix}float`, className)}
    >
      <div style={{ position: 'absolute', zIndex, left, top }}>{children}</div>
    </div>
  );
};

FixedPoint.displayName = 'FixedPoint';

export default forwardRef(FixedPoint);
