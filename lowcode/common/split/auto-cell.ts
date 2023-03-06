import {
  createGridlSnippet,
  createCellSnippet,
  createRowColSnippet,
  createPSnippet,
} from '../../default-schema';
import { updateSpan } from './auto-block';
import { CELL, ROW, COL, P, BLOCK } from '../../names';
import { IPublicModelNode } from '@alilc/lowcode-types';

/**
 * 把 CELL 变成 Grid
 * @param node
 */
export const changeCellToGrid = (node: IPublicModelNode) => {
  const parentNode = node.parent;

  const gridSnippet = createGridlSnippet();
  const wrapSnippet = {
    ...gridSnippet,
    props: {
      ...gridSnippet.props,
      style: node.schema.props?.style,
    },
  };
  const wrapNode = node.document?.createNode(wrapSnippet);
  wrapNode && parentNode?.insertAfter(wrapNode, node, false);
  // node 的宽度要去掉
  node.setPropValue('style', undefined);

  wrapNode?.insertAfter(node);
  [1, 2, 3].forEach(() => {
    const cellSnippet = node.document?.createNode(createCellSnippet());
    cellSnippet && wrapNode?.insertAfter(cellSnippet, node, false);
  });
  wrapNode?.select();
};

export const splitNodeByDimension = (dimension: 'v' | 'h' | 'm', node: IPublicModelNode, preAppend = false) => {
  const { currentDocument } = window.parent.AliLowCodeEngine.project;
  if (!currentDocument) {
    return;
  }

  const selectedIds = currentDocument.selection.selected;

  let nodeList: IPublicModelNode[] = [node];
  if (selectedIds.length > 1) {
    nodeList = selectedIds.map((id) => {
      return currentDocument.nodesMap.get(id);
    }).filter<IPublicModelNode>((_node: IPublicModelNode | undefined): _node is IPublicModelNode => !!_node);
    // 1. 类型必须完全相等，并且在同一个父元素中
    if (
      nodeList.some(
        (n) => [CELL, ROW, COL].indexOf(n.componentName) === -1 || n.parent?.id !== node.parent?.id,
      )
    ) {
      // @ts-ignore
      window?.parent?.Next?.Message?.error('必须相邻组件才支持快捷操作');
      return;
    }

    // 排序, nodeList是按照选中顺序展示的
    nodeList = nodeList.sort((a, b) => a.index - b.index);

    // 2. 必须连续
    const prevIndex: number = nodeList[0].index - 1;
    const lastIndex: number = nodeList[nodeList.length - 1].index;

    // 利用连续整数 n(n+1)/2 求和对比
    if (
      nodeList.reduce((total, n) => n.index + total, 0) !==
      (lastIndex * (lastIndex + 1)) / 2 - (prevIndex * (prevIndex + 1)) / 2
    ) {
      // @ts-ignore
      window.parent?.Next?.Message?.error('必须相邻组件才支持快捷操作');
      return;
    }
  }

  let parentNode = node.parent;
  let insertPoint = node;

  switch (node.componentName) {
    case CELL:
    case ROW:
    case COL:
      {
        const pComponentName = parentNode?.componentName;

        let isSameDirection =
          (pComponentName === ROW && dimension === 'v') ||
          (pComponentName === COL && dimension === 'h');

        if (isSameDirection) {
          insertPoint = preAppend ? nodeList[0] : nodeList[nodeList.length - 1];
        }

        // 需要判断下是不是全选了
        if (
          !isSameDirection &&
          nodeList.length > 1 &&
          parentNode?.children?.size === nodeList.length
        ) {
          const ppComponentName = parentNode.parent?.componentName;
          isSameDirection =
            (ppComponentName === ROW && dimension === 'v') ||
            (ppComponentName === COL && dimension === 'h');
          if (isSameDirection) {
            insertPoint = parentNode;
            parentNode = parentNode.parent;
          }
        }

        if (isSameDirection) {
          // 切割手法和方向一致，直接 append 节点
          const cellSnippet = createCellSnippet();
          const newNode = node.document?.createNode({
            ...cellSnippet,
            props: {
              ...cellSnippet.props,
              ...insertPoint.schema.props,
              style: cellSnippet.props?.style,
            }
          });

          preAppend
            ? newNode && parentNode?.insertBefore(newNode, insertPoint, false)
            : newNode && parentNode?.insertAfter(newNode, insertPoint, false);

          newNode?.select();
        } else {
          // 切割手法不一致，一变三节点 <ROW><CELL/><CELL/></ROW>
          const rowcolSnippet = createRowColSnippet(dimension === 'v' ? ROW : COL);
          const wrapSnippet = {
            ...rowcolSnippet,
            props: {
              ...rowcolSnippet.props,
              style: node.schema.props?.style,
              width: node.schema.props?.width,
              height: node.schema.props?.height,
            },
          };
          const wrapNode = node.document?.createNode(wrapSnippet);
          wrapNode && parentNode?.insertAfter(wrapNode, node, false);

          if (nodeList.length > 1) {
            // 多个子节点选中，需要先合并
            const rowcolSnippet2 = createRowColSnippet(dimension === 'v' ? COL : ROW);
            const wrapNode2 = node.document?.createNode(rowcolSnippet2);
            wrapNode2 && parentNode?.insertAfter(wrapNode2, node, false);

            nodeList.forEach((n) => wrapNode2?.insertAfter(n));
            wrapNode2 && wrapNode?.insertAfter(wrapNode2);

            if (wrapNode2) {
              insertPoint = wrapNode2;
            }
          } else {
            // node 的宽度要去掉
            node.setPropValue('style', undefined);
            wrapNode?.insertAfter(node, wrapNode, false);
          }

          const cellSnippet = createCellSnippet();

          const newNode = node.document?.createNode({
            ...cellSnippet,
            props: {
              ...cellSnippet.props,
              ...insertPoint.schema.props,
              style: cellSnippet.props?.style,
              width: undefined,
              height: undefined,
            }
          });
          preAppend
            ? newNode && wrapNode?.insertBefore(newNode, insertPoint, false)
            : newNode && wrapNode?.insertAfter(newNode, insertPoint, false);

          newNode?.select();
        }
      }
      break;

    case BLOCK:
      if (dimension === 'v') {
        updateSpan({
          parent: node.parent,
          child: node,
          type: 'split',
        });
      }

      node.select();
      break;

    default:
      break;
  }
};

/**
 * 把 node + * 素有节点放到新 P 标签
 * @param node
 * @returns
 */
const createPwithChildrens = (node: IPublicModelNode) => {
  const pSnippet = createPSnippet();
  const pNode = node.document?.createNode(pSnippet);

  node.parent?.children?.forEach((child) => {
    if (child.index >= node.index) {
      pNode?.insertBefore(child);
    }
  });

  return pNode;
};
export const autoPCellWithEnter = (node: IPublicModelNode) => {
  if (node?.parent?.componentName === P && node.parent?.parent?.componentName === CELL) {
    const cellWrap = node.parent.parent;

    // 不是第一个节点 自动换行并包裹 P 标签
    if (node.index > 0) {
      const insertPoint = node.parent;
      const pNode = createPwithChildrens(node);
      pNode && cellWrap.insertAfter(pNode, insertPoint, false);
    } else if (node.index === 0 && node.parent.prevSibling?.componentName === P) {
      // 第一个节点并且不是第一个P。先水平切割 CELL
      splitNodeByDimension('h', cellWrap);

      const pNode = node.parent;

      const nextCell = cellWrap.nextSibling;
      cellWrap.children?.forEach((n) => {
        if (n.index >= pNode.index) {
          nextCell?.insertAfter(n);
        }
      });
    }
  }
};

export const autoPCellWithTab = (node: IPublicModelNode) => {
  if (node?.parent?.componentName === P && node.parent?.parent?.componentName === CELL) {
    const cellWrap = node.parent.parent;
    const parentP = node.parent;
    splitNodeByDimension('v', cellWrap);

    const children = cellWrap.children;
    const nextCell = cellWrap.nextSibling;
    if (node.index !== 0) {
      // 不是第一个元素，要再多拆一个P
      const pNode = createPwithChildrens(node);
      pNode && nextCell?.insertAfter(pNode);

      children?.forEach((child) => {
        if (child.index > parentP.index) {
          nextCell?.insertAfter(child);
        }
      });
    } else {
      children?.forEach((child) => {
        if (child.index >= parentP.index) {
          nextCell?.insertAfter(child);
        }
      });
    }
  }
};
