import { IPublicModelNode } from '@alilc/lowcode-types';
import { ROW, COL } from '../../names';

export const getResizingHandlers = (node: IPublicModelNode) => {
  const directionList: string[] = [];
  const parentNode = node.parent;
  const parentChildrenLength = parentNode?.children?.size;
  const parentCN = parentNode?.componentName;
  // debugger;
  if ((parentCN === ROW || parentCN === COL) && parentChildrenLength && parentChildrenLength > 1) {
    if (parentCN === COL) {
      // 列容器，只能上下拖动
      if (node.index > 0) {
        directionList.push('n');
      }
      if (node.index < parentChildrenLength - 1) {
        directionList.push('s');
      }
    } else {
      // 行容器，只能左右拖动
      if (node.index > 0) {
        directionList.push('w');
      }
      if (node.index < parentChildrenLength - 1) {
        directionList.push('e');
      }
    }
  }

  return directionList;
};
