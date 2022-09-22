---
title: 案例6 - 工作台
order: 5
---

页面布局示例

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Breadcrumb,
  Avatar,
  Button,
  Divider,
  Balloon,
  Icon,
  Progress,
  Slider,
  Table,
  Tag,
  Calendar,
  Timeline,
} from '@alifd/next';

import { Page, Section, Block, Row, Col, Cell, P, Text } from '@alifd/layout';

import '@alifd/theme-3/variables.css';
import '@alifd/theme-3/index.scss';

const { Header, Content, Footer, Nav, Aside } = Page;

const orderList = [
  {
    id: 1,
    name: '蓝瓶咖啡线下体验店室内设计1',
    state: '进行中',
    level: 'high',
  },
  {
    id: 2,
    name: '双12投放 Banner',
    state: '进行中',
    level: 'high',
  },
  {
    id: 3,
    name: 'Global 大促活动',
    state: '进行中',
    level: 'high',
  },
  {
    id: 4,
    name: 'Banner 拓展',
    state: '进行中',
    level: 'middle',
  },
  {
    id: 5,
    name: '类目市场宣传设计',
    state: '待处理',
    level: 'low',
  },
  {
    id: 6,
    name: '类目市场宣传设计',
    state: '待处理',
    level: 'low',
  },
  {
    id: 7,
    name: '类目市场宣传设计',
    state: '待处理',
    level: 'low',
  },
];
const timeLineList = [
  {
    planName: '财经周会',
    planAddress: '深圳 T4-4-1；杭州 7-4-9-N',
    planTime: '09:00',
    planDuaring: '2小时',
  },
  {
    planName: '财经周会',
    planAddress: '深圳 T4-4-1；杭州 7-4-9-N',
    planTime: '11:00',
    planDuaring: '2小时',
  },
];
const colorMap = {
  high: 'red',
  middle: 'yellow',
  low: 'green',
};
const renderLevel = (text, index) => (
  <span key={text + index.toString()}>
    <Tag size="small" color={colorMap[text]}>
      {text}
    </Tag>
  </span>
);

const App = () => {
  return (
    <Page
      breakPoints={[
        {
          width: 960,
          maxContentWidth: 960,
          numberOfColumns: 8,
        },
        {
          width: Infinity,
          maxContentWidth: 1400,
          numberOfColumns: 12,
        },
      ]}
    >
      <Header fullWidth>
        <Cell gap={8}>
          <Breadcrumb>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Cell style={{ width: 80 }}>
              <Avatar
                size="large"
                src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
              />
            </Cell>
            <Cell>
              <P type="title">早上好, 潕量 !</P>
              <P type="body-1">
                美好的一天，从智能、创意、无缝的协作开始。我们将专注处理你专注的事情!
              </P>
            </Cell>
            <Row style={{ width: 300 }}>
              <Cell>
                <P>项目数</P>
                <P type="headline">56</P>
              </Cell>
              <Cell>
                <P>团队内排名</P>
                <P type="headline" verAlign="baseline">
                  8/24
                </P>
              </Cell>
              <Cell>
                <P>项目数</P>
                <P type="headline">56</P>
              </Cell>
            </Row>
          </Row>
        </Cell>
      </Header>

      <Section>
        <Block title="动态" span={8} style={{ minHeight: 400 }} divider>
          <P>
            <Row>
              <Cell width={80}>
                <Avatar
                  size="large"
                  src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
                />
              </Cell>
              <Cell>
                <P>
                  阮小五 在 <a href="">设计中台</a> 新建项目 <a href="">Fusion Design</a>
                  （「在」的间距丢了）
                </P>
                <P>4小时前</P>
              </Cell>
            </Row>
          </P>
          <Divider />
          <P>
            <Row>
              <Cell width={80}>
                <Avatar
                  size="large"
                  src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
                />
              </Cell>
              <Cell>
                <P>
                  阮小五 将 <a href="">新版本迭代</a> 更新为已发布（lastchild 间距问题）
                </P>
                <P>4小时前</P>
              </Cell>
            </Row>
          </P>
        </Block>

        <Block title="我的日程" span={4} divider>
          <Calendar shape="panel" />
          <P>
            共 <a href=""> 2 </a> 个日程
          </P>
          <Timeline>
            {timeLineList.map((item) => (
              <Timeline.Item
                key={item.planTime}
                title={item.planName}
                content={item.planAddress}
                timeLeft={
                  <>
                    <div>{item.planTime}</div>
                    <div>{item.planDuaring}</div>
                  </>
                }
              />
            ))}
          </Timeline>
        </Block>
        <Block title="进行中的项目" divider>
          <Table
            dataSource={orderList}
            hasBorder={false}
            rowSelection={{
              getProps: (record, index) => ({
                children: (
                  <span key={index} className="next-table-cell-wrapper">
                    {record.name}
                  </span>
                ),
              }),
              columnProps: () => ({
                width: 330,
              }),
              titleAddons: () => <span className="next-table-cell-wrapper">任务名称</span>,
            }}
          >
            <Table.Column title="所属阶段" dataIndex="state" width={230} />
            <Table.Column title="优先级" dataIndex="level" cell={renderLevel} width={150} />
          </Table>
        </Block>
      </Section>

      <Footer mode="lining" divider>
        <P type="caption" align="center">
          Alibaba Fusion Design
          <br />
          Copyright © 2022 Fusion Team
        </P>
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
