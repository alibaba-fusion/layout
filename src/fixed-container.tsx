import React, { forwardRef, Children, ForwardRefRenderFunction, useContext } from 'react';
import classNames from 'classnames';
import useFlexClassNames from '@/hooks/use-flex-class-names';
import Context from '@/common/context';
import { LayoutContextProps } from './types';

/**
 * 自由容器
 */
const FixedContainer: ForwardRefRenderFunction<HTMLDivElement, any> = (props: any, ref) => {
  const { children = [], style, items = [] } = props;
  const { prefix } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}fixed-container`;
  const flexClassNames = useFlexClassNames(props);

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width: '100%', ...style }}
      className={classNames(clsPrefix, flexClassNames)}
    >
      {Children.map(children, (child, idx) => {
        return <div style={{ position: 'absolute', zIndex: idx, ...items[idx] }}>{child}</div>;
      })}
    </div>
  );
};

FixedContainer.displayName = 'FixedContainer';

export default forwardRef(FixedContainer);
