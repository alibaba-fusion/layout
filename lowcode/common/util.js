const wrapWithProCard = (currentNode) => {
  const subChildren = currentNode.children;
  const newSubChildren = [];

  subChildren.map((_item, i) => {
    newSubChildren.push(subChildren.get(i));
    return false;
  });

  const hasCard = subChildren.length === 1 && subChildren.get(0).componentName === 'ProCard';
  if (!hasCard) {
    const newProCard = currentNode.document.createNode({
      componentName: 'ProCard',
      title: '高级卡片',
      props: {
        title: '标题',
      },
      children: [],
    });

    currentNode.children.import([]);
    currentNode.children.insert(newProCard);

    for (const i in newSubChildren) {
      currentNode.children.get(0).insert(newSubChildren[i]);
    }
  }
};

const removeWrapProCard = (currentNode) => {
  const subChildren = currentNode.children;
  const children0 = subChildren.get(0);

  if (children0.componentName === 'ProCard') {
    children0.children.map((item) => {
      currentNode.insertBefore(item, children0.getNode());
      return false;
    });
    children0.remove();
  }
};

module.exports = {
  wrapWithProCard,
  removeWrapProCard,
};
