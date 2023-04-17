import { isNumber, isString } from 'lodash-es';
import { DEFAULT_BREAK_POINTS } from '@/common/constant';
import { BreakPoint, BreakPoints } from '@/types';

/**
 * 获取当前屏幕断点
 * @param breakPoints
 */
export function getCurBreakPoint(breakPoints: BreakPoints): BreakPoint {
  let screenWidths: number[] = [];
  const tmpMap: any = {};
  const availWidth = document.body.clientWidth;

  breakPoints.forEach((bp) => {
    const { width } = bp;
    screenWidths.push(width);
    tmpMap[width] = bp;
  });

  screenWidths = screenWidths.sort((a, b) => a - b);

  const len = screenWidths.length;

  let ret = tmpMap[screenWidths[0]];

  if (availWidth > screenWidths[len - 1]) {
    ret = tmpMap[screenWidths[len - 1]];
  } else {
    for (let i = 1; i < len; i++) {
      const breakPoint = tmpMap[screenWidths[i]];

      if (screenWidths[i - 1] <= availWidth && availWidth < screenWidths[i]) {
        ret = breakPoint;
      }
    }
  }

  return ret;
}

/**
 * 获取最大断点列数
 */
export function getMaxNumberOfColumns(breakPoints: BreakPoints = DEFAULT_BREAK_POINTS): number {
  const screenWidths = breakPoints.map((bp) => bp.width);
  const maxWidth = Math.max(...screenWidths);
  const bp = breakPoints.find((breakPoint) => breakPoint?.width === maxWidth);

  return bp?.numberOfColumns || 12;
}

/**
 * 是否为标准的预设尺寸
 * @param val
 */
export function isPresetSize(val: any): boolean {
  return ['small', 'medium', 'large'].includes(val);
}

/**
 * 为数值包裹自动单位
 * eg:
 *  wrapUnit(2) -> 2px
 *  wrapUnit('2em') -> 2em
 * @param value
 * @param unit
 */
export function wrapUnit(value: number | string | undefined, unit = 'px') {
  return isNumber(value) ? `${value}${unit}` : value;
}

/**
 * 是否为一个有效的 gap 值:
 * eg: 0.9 / -9px / auto
 * @param val
 */
export function isValidGap(val: any): boolean {
  const gapValReg = /^-?[0-9]*\.?[0-9]+([a-z|A-z]*)$/;
  return isNumber(val) || (isString(val) && (gapValReg.test(val) || val === 'auto'));
}

/**
 * 获取最终的 gap 值
 * @param contextGap 上下文中的 gap 值
 * @param propGap 属性中定义的 gap 值
 */
export function getGapVal(contextGap: any, propGap: any) {
  if (isValidGap(propGap)) {
    return wrapUnit(propGap);
  } else if (isValidGap(contextGap)) {
    return wrapUnit(contextGap);
  }
  return undefined;
}
