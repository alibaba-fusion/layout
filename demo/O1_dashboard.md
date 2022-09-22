---
title: 案例1 - 控制面板
order: 1
---

页面布局示例

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Button, Divider, Balloon, Icon, Progress, Slider } from '@alifd/next';

import { Page, Section, Block, Row, Col, Cell, P, Text } from '@alifd/layout';

import '@alifd/theme-3/variables.css';
import '@alifd/theme-3/index.scss';

const { Header, Content, Footer, Nav, Aside } = Page;

const slides = [
  {
    url: 'https://img.alicdn.com/tps/TB1bewbNVXXXXc5XXXXXXXXXXXX-1000-300.png',
    text: 'Tape Player Skin Design Competition',
  },
  {
    url: 'https://img.alicdn.com/tps/TB1xuUcNVXXXXcRXXXXXXXXXXXX-1000-300.jpg',
    text: 'Mobile Phone Taobao Skin Call',
  },
  {
    url: 'https://img.alicdn.com/tps/TB1ikP.NVXXXXaYXpXXXXXXXXXX-1000-300.jpg',
    text: 'Design Enabling Public Welfare',
  },
  {
    url: 'https://img.alicdn.com/tps/TB1s1_JNVXXXXbhaXXXXXXXXXXX-1000-300.jpg',
    text: 'Amoy Doll Design Competition',
  },
];

const App = () => {
  return (
    <Page sectionGap={16} blockGap={12} gridGap={8}>
      <Header fullWidth>
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>自动布局</Breadcrumb.Item>
        </Breadcrumb>
        <P>
          <Text type="title">自动布局</Text>
          <Text type="body-1">页面自动布局能力</Text>
        </P>
        <P type="body-1">这是一个自动布局的描述信息</P>
      </Header>
      <Section>
        <Block span={3}>
          <Row>
            <Cell>
              <Text>总销售额</Text>
            </Cell>
            <Cell align="right" autoFit>
              <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                指标说明
              </Balloon>
            </Cell>
          </Row>
          <P type="headline">¥ 126,560</P>
          <P>
            <img
              src="https://img.alicdn.com/tfs/TB1eWP1O4D1gK0jSZFsXXbldVXa-468-78.png"
              width="100%"
              height="32"
            />
          </P>
          <Divider />
          <P type="body-1">日销售额 ￥12,423</P>
        </Block>
        <Block span={3}>
          <Row>
            <Cell>
              <Text>访问量</Text>
            </Cell>
            <Cell align="right">
              <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                指标说明
              </Balloon>
            </Cell>
          </Row>
          <P type="headline">88,356</P>
          <P>
            <img
              src="https://img.alicdn.com/tfs/TB1FJbkdCR26e4jSZFEXXbwuXXa-468-68.png"
              width="100%"
              height="32"
            />
          </P>
          <Divider />
          <P type="body-1">日访问量 1,234</P>
        </Block>
        <Block span={3}>
          <Row align="space-between">
            <Cell>
              <Text>门店量</Text>
            </Cell>
            <Cell align="right">
              <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                指标说明
              </Balloon>
            </Cell>
          </Row>
          <P type="headline">6,356</P>
          <P>
            <img
              src="https://img.alicdn.com/tfs/TB1eWP1O4D1gK0jSZFsXXbldVXa-468-78.png"
              width="100%"
              height="32"
            />
          </P>
          <Divider />
          <P type="body-1">转化率 60%</P>
        </Block>
        <Block span={3}>
          <Row align="space-between">
            <Cell>
              <Text>门店活动效果</Text>
            </Cell>
            <Cell align="right">
              <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                指标说明
              </Balloon>
            </Cell>
          </Row>
          <P type="headline">78%</P>
          <P>
            <Progress percent={78} textRender={() => ''} style={{ height: 32 }} />
          </P>
          <Divider />
          <Row>
            <Cell align="center">
              <P>
                周同比 12% <Text style={{ color: 'red' }}>▲</Text>
              </P>
            </Cell>
            <Cell align="center">
              <P>
                日同比11% <Text style={{ color: 'green' }}>▼</Text>
              </P>
            </Cell>
          </Row>
        </Block>
        <Block title="活动实时情况" span={9} rowSpan={2}>
          <Row>
            <Cell>
              <P style={{ width: '100%' }}>今日交易总额</P>
              <P style={{ width: '100%' }} verAlign="baseline">
                <Text type="headline">124,543,233</Text>
                <Text type="body-1">元</Text>
              </P>
            </Cell>
            <Cell>
              <P style={{ width: '100%' }}>销售目标完成率</P>
              <P style={{ width: '100%' }} type="headline">
                92%
              </P>
            </Cell>
            <Cell>
              <P style={{ width: '100%' }}>活动剩余时间</P>
              <P style={{ width: '100%' }} type="headline">
                47:05:07:495
              </P>
            </Cell>
            <Cell>
              <P style={{ width: '100%' }}>每秒交易总额</P>
              <P style={{ width: '100%' }} type="headline" verAlign="baseline">
                234 <Text type="body-1">元</Text>
              </P>
            </Cell>
          </Row>
          <P>
            <img src="https://s2.ax1x.com/2020/02/17/3iKU5q.png" width="100%" />
          </P>
        </Block>
        <Block span={3} title="销售额类别占比">
          <div> 占位图 </div>
        </Block>
        <Block span={3} title="销售额类别占比">
          <div> 占位图 </div>
        </Block>
        <Block span={4} title="销售额类别占比">
          <div style={{ height: 200 }}> 占位图 </div>
        </Block>
        <Block span={8} title="消费数据">
          {' '}
          <div style={{ height: 200 }}> 占位图 </div>{' '}
        </Block>
      </Section>
      <Footer mode="transparent" noTopPadding>
        <Col>
          <Cell>
            <P type="headline" align="center">
              相关链接
            </P>
          </Cell>
          <Row>
            <Cell>
              <P type="h6" align="center">
                官方物料
              </P>
              <P align="center">PC 组件库地址</P>
              <P align="center">Mobile 组件库地址</P>
              <P align="center">官方区块</P>
              <P align="center">官方模板</P>
            </Cell>
            <Cell>
              <P align="center" type="subhead">
                帮助中心
              </P>
              <P align="center">Fusion 帮助中心</P>
              <P align="center">
                <Text style={{ textAlign: 'center' }}>
                  您可以通过扫描二维码的方式加入 Fusion钉钉的问题反馈群
                </Text>
              </P>
              <P align="center">
                <img
                  src="https://img.alicdn.com/tfs/TB102cEdLb2gK0jSZK9XXaEgFXa-660-666.png"
                  width="170"
                />
              </P>
            </Cell>
            <Cell>
              <P align="center" type="subhead">
                开发者社区
              </P>
              <P align="center">
                <a href="https://github.com/alibaba-fusion/next">进入 Github</a>
              </P>
            </Cell>
            <Cell>
              <P align="center" type="subhead">
                相关资源
              </P>
              <P align="center">
                <a href="https://fusion.design/tool">FusionCool</a>
              </P>
              <P align="center">
                <a href="https://fusion.design/tool">Iceworks</a>
              </P>
            </Cell>
          </Row>
          <Cell>
            <Divider />
            <P align="center" type="caption">
              Alibaba Fusion Design
            </P>
            <P align="center" type="caption">
              Copyright © 2022 Fusion Team
            </P>
          </Cell>
        </Col>
      </Footer>
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
