import { IPublicModelNode, IPublicTypeNodeSchema } from '@alilc/lowcode-types';
import { createBlockSnippet } from '../../default-schema';
import { BLOCK, SECTION } from '../../names';
import BLOCK_RESIZE_MAP from './block-resize-map';

interface IGroup {
  id: string | undefined;
  groupIndex: number;
  span?: number;
  groupInnerIndex?: number;
  groupList?: string;
  groupLength?: number;
}

const parseFlaten2Tree = (flaten: IGroup[] = [], tree: IGroup[][]) => {
  flaten.forEach((item) => {
    if (!tree[item.groupIndex]) {
      tree[item.groupIndex] = [];
    }
    tree[item.groupIndex].push(item);
  });
};

/**
 * 一组（ span加和小于等于12 ）块，在遇到 resize 时候的处理行为
 * @param {*} groupArr 在原数组上进行修改
 * @param {*} blockNode 触发resize的节点
 * @param {*} offset 偏移量，-2表示左2格，1表示右1格
 * @param {Emun} direction 'e' | 'w' 表示在用哪条bar e（右） 或 w（左）
 * @returns
 */
const handleResize = (groupArr: IGroup[], blockNode: IPublicModelNode, offset: number, direction = 'e') => {
  const changeIndex = groupArr.findIndex((item) => item.id === blockNode.schema.id);
  const key = groupArr.map((item) => item.span).join(',');
  if (changeIndex < 0) {
    return;
  }
  const lineIndex = direction === 'w' ? changeIndex : changeIndex + 1;

  // mapping 上给的是第一条线，对应的是第0个 BlockCell 上的resize操作
  const subKey = `${lineIndex}${offset > 0 ? 'r' : 'l'}`;
  const targetMap = BLOCK_RESIZE_MAP?.[key]?.[subKey];

  if (targetMap) {
    targetMap.split(',').forEach((col, i) => {
      groupArr[i].span = +col;
    });
  }
};

/**
 * 一组（ span加和小于等于12 ）块，在遇到切割时候的处理行为
 * @param {*} groupArr 在原数组上进行修改
 * @param {*} blockNode 触发 分割 的节点
 * @param {*} groupIndex 当前所处理的数组，他们有共同的组序列号
 * @returns
 */
const handleSplit = (groupArr: IGroup[], blockNode: IPublicModelNode, groupIndex: number) => {
  const changeIndex = groupArr.findIndex((item) => item.id === blockNode.schema.id);
  const key = groupArr.map((item) => item.span).join(',');
  if (changeIndex < 0) {
    return;
  }
  const subKey = `${changeIndex}s`;
  const targetMap = BLOCK_RESIZE_MAP?.[key]?.[subKey];
  if (targetMap) {
    const originProps = blockNode.schema.props;
    const blockSnippet = createBlockSnippet({
      blockProps: originProps,
    });
    const newNode = blockNode?.document?.createNode(blockSnippet);
    newNode && blockNode.parent?.insertAfter(newNode, blockNode, false);

    const newNodeSchema = [blockNode, newNode].map((item) => {
      return {
        id: item?.id,
        groupIndex,
      };
    });
    groupArr.splice(changeIndex, 1, newNodeSchema[0], newNodeSchema[1]);

    targetMap.split(',').forEach((col, i) => {
      groupArr[i].span = +col;
    });
  }
};

/**
 * 一组（ span加和小于等于12 ）块，在遇到删除时候的处理行为
 * @param {*} afterTreeGroup 由于事件监听的是onNodeRemove, 所以对 delete 来说，这里已经是after的group了
 * @param {*} afterFlatenGroup 在原数组上进行修改
 * @param {*} blockNode 触发 删除 的节点
 * @param {*} sectionNode 触发 删除 的节点属的Block
 * @returns
 */
const handleDelete = (afterTreeGroup: IGroup[][], afterFlatenGroup: IGroup[], blockNode: IPublicModelNode, sectionNode: IPublicModelNode) => {
  const treeMap: IGroup[][] = [];
  parseFlaten2Tree(sectionNode.lastFlatenMap, treeMap);
  treeMap.forEach((group) => {
    const { groupIndex } = group[0];
    const changeIndex = group.findIndex((item) => item.id === blockNode.schema.id);
    const key: string = group.map((item) => item.span).join(',');
    if (changeIndex < 0) {
      afterFlatenGroup.push(...afterTreeGroup[groupIndex]);
      return;
    }

    const subKey = `${changeIndex}d`;
    const targetMap = BLOCK_RESIZE_MAP?.[key]?.[subKey];
    if (targetMap) {
      targetMap.split(',').forEach((col, i) => {
        afterTreeGroup[groupIndex][i].span = +col;
      });

      afterFlatenGroup.push(...afterTreeGroup[groupIndex]);
    }
  });
};
// currentBlock.lastFlatenMap
const findGroupIndex = (id: string, map: IGroup[] = []) => {
  let groupIndex = -1;
  map.forEach((m) => {
    if (m.id === id) {
      groupIndex = m.groupIndex;
    }
  });

  return groupIndex;
};

/**
 *
 * @param {*} currentSection parent refresh 的模式下，只要求有parent
 * @param {*} currentBlock child
 * @param {Enum} type 'split' | 'delete' | 'resize' | 'refresh'
 * @param {*} object 若是resize， offset表示移动的距离; node1, node2 表示新增之后的节点
 * @param {Emun} direction 'e' | 'w' 表示 e（右） 或 w（左）
 */
export const updateSpan = ({
  parent: currentSection,
  child: currentBlock,
  type,
  offset = 0,
  direction = 'e',
}: {
  parent: IPublicModelNode | null;
  type: 'split' | 'delete' | 'resize' | 'refresh';
  child?: IPublicModelNode;
  offset?: number;
  direction?: string
}) => {
  if (
    !(
      currentSection &&
      currentSection.componentName === SECTION &&
      (type === 'refresh' || (currentBlock && currentBlock.componentName === BLOCK))
    )
  ) {
    return;
  }

  const beforeFlatenGroup: IGroup[] = [];
  const children = currentSection.schema.children || [];
  const childrenListSchema = Array.isArray(children) ? children : [children];

  if (!childrenListSchema) {
    // 把 SECTION 中的最后一个元素 BLOCK 删掉，意味着删掉 SECTION
    currentSection.remove();
    return;
  }
  let total: number = 0;
  let groupIndex = 0;

  (childrenListSchema as any).forEach((c: IPublicTypeNodeSchema) => {
    const item: IGroup = {
      id: c.id,
      span: (c.props?.span as number) || 12,
      groupIndex,
    };

    const inheritIndex = findGroupIndex(c.id!, currentBlock?.lastFlatenMap);

    if (inheritIndex > -1 && type === 'delete') {
      item.groupIndex = inheritIndex;
    } else {
      total += (c.props?.span as number) || 0;
      if (total > 12) {
        groupIndex++;
        total = (c.props?.span as number);
      }
      item.groupIndex = groupIndex;
    }

    beforeFlatenGroup.push(item);
  });
  // console.log(beforeFlatenGroup, '====== before group =====');

  const beforeTreeGroup: IGroup[][] = [];

  parseFlaten2Tree(beforeFlatenGroup, beforeTreeGroup);

  const afterFlatenGroup: IGroup[] = [];

  if (type === 'resize' && offset !== 0) {
    beforeTreeGroup.forEach((group) => {
      handleResize(group, currentBlock!, offset, direction);
      afterFlatenGroup.push(...group);
    });
  } else if (type === 'split') {
    beforeTreeGroup.forEach((group, idx) => {
      handleSplit(group, currentBlock!, idx);
      afterFlatenGroup.push(...group);
    });
  } else if (type === 'delete') {
    // 由于事件监听的是onNodeRemove, 所以对 delete 来说，这里已经是after的group了
    handleDelete(beforeTreeGroup, afterFlatenGroup, currentBlock!, currentSection);
  } else {
    beforeTreeGroup.forEach((group) => {
      afterFlatenGroup.push(...group);
    });
  }

  afterFlatenGroup.forEach((data) => {
    const currentGroupIndex = data.groupIndex;
    const groupList: number[] = [];
    let num = 0;
    afterFlatenGroup.forEach((item) => {
      if (item.groupIndex === currentGroupIndex) {
        item.groupInnerIndex = num;
        item.span && groupList.push(item.span);
        num++;
      }
    });
    data.groupLength = groupList.length;
    data.groupList = groupList.join(',');
  });

  // console.log(afterFlatenGroup, '====== after group =====');

  const adjustColSpan = (afterFlaten: IGroup[]) => {
    afterFlaten.forEach((item) => {
      item.id && currentSection.document?.getNodeById(item.id)?.setPropValue('span', item.span);
    });
  };

  adjustColSpan(afterFlatenGroup);
  currentSection.lastFlatenMap = afterFlatenGroup;
  // for delete
};
