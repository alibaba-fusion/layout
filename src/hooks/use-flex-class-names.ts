import { useContext } from 'react';
import classNames from 'classnames';
import { isNumber, isString } from 'lodash-es';

import Context from '@/common/context';
import { LayoutContextProps } from '@/types';

// 通过判断容器 props 值，给容器设置class，由 class 控制容器 flex 样式
const useFlexClassNames = (props: any) => {
  const { autoFit, width, height, style } = props;

  const { prefix } = useContext<LayoutContextProps>(Context);
  const clsPrefix = `${prefix}flex-item`;

  const validWidth = width || style?.width;
  const validHeight = isNumber(height) || (isString(height) && height !== '') ? height : undefined;
  const validMinHeight = style?.minHeight;

  let isDefault = false;
  let isAutoFit = false;
  let isValidWidth = false;
  let isValidHeight = false;

  if (autoFit) {
    isAutoFit = true;
  } else if (validHeight || validMinHeight || validWidth) {
    isValidHeight = validHeight || validMinHeight;
    isValidWidth = validWidth;
  } else {
    isDefault = true;
  }

  return classNames({
    [`${clsPrefix}-default`]: isDefault,
    [`${clsPrefix}-auto-fit`]: isAutoFit,
    [`${clsPrefix}-valid-width`]: isValidWidth,
    [`${clsPrefix}-valid-height`]: isValidHeight,
  });
};

export default useFlexClassNames;
