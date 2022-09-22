---
title: 字体
order: 10
---

通过段落组织文本及各类 inline 模式的元素，自动元素间左右和上下间隙。

```jsx
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Breadcrumb, Radio, Icon } from '@alifd/next';
import { Page, Section, Block, Row, Col, Grid, Cell, P, Text } from '@alifd/layout';

const { Header } = Page;

import '@alifd/theme-3/variables.css'
import '@alifd/theme-3/index.scss'

const App = () => {
  const [align, setAlign] = useState('left');

  return (
    <Page breakPoints={[{ width: Infinity, maxContentWidth: 1000, numberOfColumns: 12 }]}>
      <Header>
        <P>
          <Breadcrumb>
            <Breadcrumb.Item>自然布局</Breadcrumb.Item>
            <Breadcrumb.Item>小布局</Breadcrumb.Item>
          </Breadcrumb>
        </P>
        <br />
        <P type="h4">字体</P>
      </Header>

      <Section>
        <Block title="段落中的简写" span={3}>
          <P type="body2">段落中的纯文本</P>
        </Block>
        <Block span={3} title="样式">
          <Cell>
            <P>
              <Text>默认</Text>
              <Text mark>标记</Text>
              <Text code>代码</Text>
              <Text strong>加粗</Text>
              <Text underline>下划线</Text>
              <Text delete>删除线</Text>
            </P>
          </Cell>
        </Block>
        <Block span={3} title="颜色">
          <P>
            <Text color="red">赤</Text>
            <Text color="orange">橙</Text>
            <Text color="yellow">黄</Text>
            <Text color="green">绿</Text>
            <Text color="cyan">蓝</Text>
            <Text color="red">靛</Text>
            <Text color="purple">紫</Text>
          </P>
          <P>
            <Text backgroundColor="red">赤</Text>
            <Text backgroundColor="orange">橙</Text>
            <Text backgroundColor="yellow">黄</Text>
            <Text backgroundColor="green">绿</Text>
            <Text backgroundColor="cyan">蓝</Text>
            <Text backgroundColor="red">靛</Text>
            <Text backgroundColor="purple">紫</Text>
          </P>
        </Block>

        <Block span={3} title="尺寸">
          <Cell>
            <Text type="h1">标题 1 </Text>
            <Text type="h2">标题 2</Text>
            <Text type="h3">标题 3</Text>
            <Text type="h4">标题 4</Text>
            <Text type="h5">标题 5</Text>
            <Text type="h6">标题 6</Text>
            <Text type="body1">正文 1</Text>
            <Text type="body2">正文 2</Text>
            <Text type="caption">水印</Text>
            <Text type="overline">超小字体</Text>
          </Cell>
        </Block>
      </Section>
    </Page>
  );
};

ReactDOM.render(
  <div className="mock-iframe">
    <App />
  </div>,
  mountNode,
);
```

```css
.mock-iframe {
  border: 3px solid black;
  border-radius: 12px;
  overflow: hidden;
}
```
