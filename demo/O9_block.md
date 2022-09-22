---
title: 区块
order: 8
---

区块的样子

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Avatar,
  Breadcrumb,
  Badge,
  Button,
  Balloon,
  Icon,
  Progress,
  ResponsiveGrid as RGrid,
} from '@alifd/next';
import { Page, Section, Block, Row, Col, P, Cell, Text } from '@alifd/layout';
import '@alifd/theme-3/variables.css';

const { Header } = Page;

const MockBlock = (props) => {
  return (
    <Cell align="center" verAlign="middle" className="mock-block-fullx60" {...props}>
      <P> {props.children || '100% x 60'}</P>
    </Cell>
  );
};

class App extends Component {
  render() {
    return (
      <Page breakPoints={[{ width: Infinity, maxContentWidth: 1000, numberOfColumns: 12 }]}>
        <Header>
          <P>
            <Breadcrumb>
              <Breadcrumb.Item>自然布局</Breadcrumb.Item>
              <Breadcrumb.Item>区块</Breadcrumb.Item>
            </Breadcrumb>
          </P>
          <P type="headline">区块</P>
        </Header>
        <Section>
          <Block
            span={3}
            title={
              <>
                <P type="h6">Simple Card</P>
                <P type="caption">SubTitle</P>
              </>
            }
            extra={<a href="#">link</a>}
          >
            <P>
              Lorem ipsum dolor sit amet, est viderer iuvaret perfecto et. Ne petentium quaerendum
              nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat
              pertinacia an, cu verterem praesent quo.
            </P>
          </Block>

          <Block
            span={3}
            title={
              <>
                <P type="h6">Simple Card</P>
                <P type="caption">SubTitle</P>
              </>
            }
            extra={<a href="#">link</a>}
            divider
          >
            <P>
              Lorem ipsum dolor sit amet, est viderer iuvaret perfecto et. Ne petentium quaerendum
              nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat
              pertinacia an, cu verterem praesent quo.
            </P>
          </Block>
          <Block span={3} noPadding>
            <Col gap={0}>
              <img
                src="https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png"
                style={{ width: '100%' }}
              />
              <Cell style={{ padding: 20 }}>
                <Row verAlign="top">
                  <Cell>
                    <P type="h6">Simple Card</P>
                    <P type="caption">SubTitle</P>
                  </Cell>
                  <Cell autoFit>
                    <a href="#">link</a>
                  </Cell>
                </Row>
                <P>
                  Lorem ipsum dolor sit amet, est viderer iuvaret perfecto et. Ne petentium
                  quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus.
                  Ius feugiat pertinacia an, cu verterem praesent quo.
                </P>
              </Cell>
            </Col>
          </Block>
        </Section>
        <Section title="常见的区块">
          <Block span={3} title="标题">
            <MockBlock>基础</MockBlock>
          </Block>
          <Block span={3} title="标题" extra={<Icon type="arrow-right" size="xs" />}>
            <MockBlock />
          </Block>
          <Block span={3} title="标题" extra="说明文案">
            <MockBlock />
          </Block>
          <Block span={3}>
            <MockBlock>无标题</MockBlock>
          </Block>
          <Block span={3} title="标题" titleAlign="center" divider>
            <MockBlock>分割线&标题居中</MockBlock>
          </Block>
          <Block
            span={3}
            title={
              <P>
                <img
                  src="https://img.alicdn.com/tfs/TB1QS.4l4z1gK0jSZSgXXavwpXa-1024-1024.png"
                  style={{ width: 24, borderRadius: '50%' }}
                />
                <Text type="h6">标题</Text>
              </P>
            }
            extra={<Badge dot />}
          >
            <MockBlock />
          </Block>

          <Block span={3} mode="transparnet">
            <MockBlock>透明模式</MockBlock>
          </Block>
          <Block span={3} mode="transparnet" />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(
  <div className="mock-iframe">
    <App />
  </div>,
  mountNode,
);
```

```css
.mock-block-fullx60 {
  width: 100%;
  min-height: 60px;
  height: 100%;
  background: #f2f2f2;
  border: 1px dashed #ccc;
}
.mock-iframe {
  border: 3px solid black;
  border-radius: 12px;
  overflow: hidden;
}
```
