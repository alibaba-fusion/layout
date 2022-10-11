---
title: 基本结构
order: 1
---

自然布局主要解决页面内容区(main 区域)的布局，不解决 Shell 层级，一般每个业务线都会有自己现成的吊顶和布局。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Button, Divider, Balloon, Icon, Progress, Slider } from '@alifd/next';

import { Page, Section, Block, Row, Col, Cell, P, Text } from '@alifd/layout';

import '@alifd/theme-3/variables.css';
import '@alifd/theme-3/index.scss';

const { Header, Content, Footer, Nav, Aside } = Page;

const App = () => {
  return (
    <>
      <Page style={{ border: '3px solid black', borderRadius: 12, overflow: 'hidden' }}>
        <Header>
          <Cell align="center">
            <Text type="h5">Header</Text>
          </Cell>
        </Header>
        <Section title="Section 1" extra="Section extra">
          <Block title="Block 1" span={9} divider extra={<Icon type="prompt" size="small" />}>
            <Cell>
              <Text type="h5">Block</Text>
            </Cell>
          </Block>
          <Block title="Block 2" span={3} divider>
            <Cell>
              <Text type="h5">Block</Text>
            </Cell>
          </Block>
          <Block title="Block Full" divider>
            <Cell>
              <Text type="h5">Block</Text>
            </Cell>
          </Block>
        </Section>
        <Section title="Section 2">
          <Block>
            <Cell>
              <P>
                <Text>Block</Text>
              </P>
              <P>
                <Button type="primary">button</Button>
                <Button>button</Button>
              </P>
            </Cell>
          </Block>
        </Section>
        <Footer>
          <Cell align="center">
            <Text type="h5">Footer</Text>
          </Cell>
        </Footer>
      </Page>
      <br />
      <Page style={{ border: '3px solid black', borderRadius: 12, overflow: 'hidden' }}>
        <Header>
          <Cell align="center">
            <Text type="h5">Header</Text>
          </Cell>
        </Header>
        <Content>
          <Nav>
            <Block>
              <Cell align="center" verAlign="middle" style={{ height: '80vh' }}>
                <Text type="h5">Nav</Text>
              </Cell>
            </Block>
          </Nav>
          <Aside>
            <Block>
              <Cell align="center" verAlign="middle" style={{ height: '80vh' }}>
                <Text type="h5">Aside</Text>
              </Cell>
            </Block>
          </Aside>
          <Section title="Section 1">
            <Block title="Block">
              <Cell style={{ height: '40vh' }}></Cell>
            </Block>
          </Section>
          <Section title="Section 2">
            <Block title="Block">
              <Cell>
                <Text type="h5">Block</Text>
              </Cell>
            </Block>
          </Section>
        </Content>
        <Footer>
          <Cell align="center">
            <Text type="h5">Footer</Text>
          </Cell>
        </Footer>
      </Page>
    </>
  );
};

ReactDOM.render(<App />, mountNode);
```
