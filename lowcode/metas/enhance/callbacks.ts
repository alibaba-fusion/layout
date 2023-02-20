import { IPublicModelNode } from "@alilc/lowcode-types";

const { CELL, ROW, COL } = require('../../names');

/**
 * onSubtreeModified 是从叶子节点逐级冒泡, 注意做好判断
 * options.isSubDeleting 是否因为父节点删除导致被连带删除。树根节点为 false，其他分支节点、叶子节点则为 true
 */
export const onNodeReplaceSelfWithChildrenCell = (currentNode: IPublicModelNode, e) => {
  const { removeNode, type, isSubDeleting } = e;

  // console.log(currentNode, currentNode.children.length, e)

  // 必须到了触发节点，并且触发节点是子节点
  if (
    !removeNode ||
    !currentNode ||
    type !== 'remove' ||
    isSubDeleting ||
    removeNode.parent !== currentNode
  ) {
    return;
  }

  const { children } = currentNode;
  // 只有一个子元素 Cell/Row/Col，则让子元素替代自己
  if (children?.size === 1 && [CELL, ROW, COL].indexOf(children.get(0)?.componentName) > -1) {
    const child = children.get(0);
    const { parent } = currentNode;

    child?.setPropValue('style', currentNode.getPropValue('style'));
    child?.setPropValue('width', currentNode.getPropValue('width'));

    child && parent?.insertAfter(child, currentNode, false);

    currentNode.remove();
  } else if (children?.size && children?.size > 1) {
    // 同名节点提升
    const sameNameChild = children.find((n) => n.componentName === currentNode.componentName);
    if (sameNameChild?.children) {
      [...sameNameChild.children].reverse().forEach((n) => {
        currentNode.insertAfter(n, sameNameChild, false);
      });
      sameNameChild.remove();
    }
  }
};

/**
 * 容器元素不允许空着，无子节点的时候删除自己
 * @param {*} removeNode
 * @param {*} currentNode
 * @returns boolean
 */
export const onNodeRemoveSelfWhileNoChildren = (removeNode, currentNode) => {
  if (!removeNode || !currentNode) {
    return false;
  }

  const { children } = currentNode;
  // 若无 children, 删除组件本身
  if (children && children.length === 0) {
    currentNode.remove();
    return true;
  }

  return false;
};

function disableDivider() {
  const iframe = window.AliLowCodeEngine.project.simulatorHost;
  iframe && iframe.contentWindow?.dispatchEvent(new Event('dividerDisable'));
}
function enableDivider() {
  const iframe = window.AliLowCodeEngine.project.simulatorHost;
  iframe && iframe.contentWindow?.dispatchEvent(new Event('dividerEnable'));
}

export const onDrageResize = {
  onResizeStart(e, currentNode: IPublicModelNode) {
    disableDivider();

    currentNode.startRect = currentNode.getRect();
    currentNode.siblingNode =
      e.trigger === 'n' || e.trigger === 'w' ? currentNode.prevSibling : currentNode.nextSibling;
    currentNode.siblingRect = currentNode.siblingNode ? currentNode.siblingNode.getRect() : null;
  },
  onResize(e, currentNode: IPublicModelNode) {
    const { deltaY, deltaX } = e;
    const { height: startHeight, width: startWidth } = currentNode.startRect;

    if (e.trigger === 'e' || e.trigger === 'w') {
      const newWidth = e.trigger === 'w' ? startWidth - deltaX : startWidth + deltaX;

      // currentNode.setPropValue('style.width', `${newWidth}px`);
      currentNode.setPropValue('width', newWidth);
      currentNode.getDOMNode().style.flex = `0 0 ${Math.round(newWidth)}px`;

      // 去除兄弟节点的宽度
      if (currentNode.siblingRect) {
        currentNode.siblingNode.setPropValue('width', undefined);
        currentNode.siblingNode.getDOMNode().style.flex = '1 1';

        // const siblingStyle = currentNode.siblingNode.getPropValue('style');
        // siblingStyle && (delete siblingStyle.width);
        // currentNode.siblingNode.setPropValue('style', siblingStyle);
      }
    } else if (e.trigger === 's' || e.trigger === 'n') {
      const newHeight = e.trigger === 'n' ? startHeight - deltaY : startHeight + deltaY;

      currentNode.setPropValue('style.minHeight', newHeight);
      currentNode.getDOMNode().style.flex = '0 0 auto';

      // 去除兄弟节点的高度
      if (currentNode.siblingRect) {
        currentNode.siblingNode.setPropValue('style.minHeight', undefined);
        currentNode.siblingNode.getDOMNode().style.flex = '1 1';

        // const siblingStyle = currentNode.siblingNode.getPropValue('style');
        // siblingStyle && (delete siblingStyle.height);
        // currentNode.siblingNode.setPropValue('style', siblingStyle);
      }
    }
  },
  onResizeEnd() {
    enableDivider();
  },
};
