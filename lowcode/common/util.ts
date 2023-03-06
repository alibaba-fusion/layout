import { IPublicModelNode } from "@alilc/lowcode-types";

const wrapWithProCard = (currentNode: IPublicModelNode) => {
  const subChildren = currentNode.children;
  const newSubChildren: IPublicModelNode[] = [];

  subChildren?.map((_item, i) => {
    const item = subChildren.get(i);
    item && newSubChildren.push(item);
    return false;
  });

  const hasCard = subChildren?.size === 1 && subChildren?.get(0)?.componentName === 'ProCard';
  if (!hasCard) {
    const newProCard = currentNode.document?.createNode({
      componentName: 'ProCard',
      title: '高级卡片',
      props: {
        title: '标题',
      },
      children: [],
    });

    currentNode.children?.importSchema([]);
    newProCard && currentNode.children?.insert(newProCard);

    for (const i in newSubChildren) {
      currentNode.children?.get(0)?.insertAfter(newSubChildren[i]);
    }
  }
};

const removeWrapProCard = (currentNode: IPublicModelNode) => {
  const subChildren = currentNode.children;
  const children0 = subChildren?.get(0);

  if (children0?.componentName === 'ProCard') {
    children0?.children?.map((item) => {
      currentNode.insertBefore(item, children0);
      return false;
    });
    children0.remove();
  }
};

export default {
  wrapWithProCard,
  removeWrapProCard,
};
