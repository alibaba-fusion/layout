import * as React from 'react';
import { forwardRef, Children, ForwardRefRenderFunction } from 'react';

/**
 * 自由容器
 */
const FixedContainer: ForwardRefRenderFunction<HTMLDivElement, any> = (props: any, ref) => {
  const { children = [], style, items = [] } = props;

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', ...style }}>
      {Children.map(children, (child, idx) => {
        return <div style={{ position: 'absolute', zIndex: idx, ...items[idx] }}>{child}</div>;
      })}
    </div>
  );
};

FixedContainer.displayName = 'FixedContainer';

export default forwardRef(FixedContainer);
