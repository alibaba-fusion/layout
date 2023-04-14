---
title: 案例5 - 表格
order: 5
---

表格相关的布局

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Table, Pagination, Icon, Breadcrumb } from '@alifd/next';
import { Page, Section, Block, Row, Col, P, Cell, Text } from '@alifd/layout';

import '@alifd/theme-3/variables.css';

const { Header } = Page;

const dataSourceGen = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
      id: 100306660940 + i,
      time: 2000 + i,
    });
  }
  return result;
};
const cellRender = (value, index, record) => {
  return (
    <P type="caption">
      <Button type="primary" text>
        删除
      </Button>
      <Button type="primary" text>
        编辑
      </Button>
    </P>
  );
};

const columns = new Array(4).fill({
  dataIndex: 'data',
  title: 'Data',
  width: 200,
});
columns.unshift({
  dataIndex: 'id',
  title: 'Id',
  width: 100,
  lock: 'left',
});
columns.push({
  dataIndex: 'state',
  title: 'State',
  width: 200,
});
columns.push({
  title: 'Action',
  width: 100,
  align: 'center',
  cell: () => <Button>delete</Button>,
  lock: 'right',
});

const dataSource = [
  {
    id: 30000,
    data: '$13.02',
    state: 'normal',
  },
  {
    id: 30001,
    data: '$16.02',
    state: 'normal',
  },
  {
    id: 30002,
    data: '$63.0002',
    state: 'error',
  },
];

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

class App extends Component {
  render() {
    return (
      <Page breakPoints={[{ width: Infinity, maxContentWidth: 1000, numberOfColumns: 12 }]}>
        <Header>
          <Breadcrumb>
            <Breadcrumb.Item>列表页</Breadcrumb.Item>
            <Breadcrumb.Item>查询表格</Breadcrumb.Item>
          </Breadcrumb>
          <P align="baseline">
            <Text type="title">组件间距</Text>
            <Text type="body-1">Component Spacing</Text>
          </P>
          <P>描述组件之间的间距关系</P>
        </Header>
        <Section>
          <Block>
            <Col>
              <Row verAlign="middle">
                <Cell>
                  <P>
                    <Button type="primary">批量提交</Button>
                    <Button>批量删除</Button>
                    <Button>批量下载</Button>
                    <Icon type="help" size="small" />
                    <Text>帮助信息</Text>
                  </P>
                </Cell>
                <Cell autoFit>
                  <P align="right">
                    <Icon size="small" type="set" />
                    <Icon size="small" type="filter" />
                    <Icon size="small" type="arrow-down" />
                  </P>
                </Cell>
              </Row>
              <Cell>
                <Table dataSource={dataSourceGen()} rowSelection={{}} style={{ width: '100%' }}>
                  <Table.Column title="Id" htmlTitle="Unique Id" dataIndex="id" />
                  <Table.Column title="Title" dataIndex="title.name" />
                  <Table.Column title="Time" dataIndex="time" />
                  <Table.Column title="Operation" cell={cellRender} />
                </Table>
              </Cell>
              <Cell align="right">
                <Pagination />
              </Cell>
            </Col>
          </Block>
          <Block title="锁列 Table 问题处理">
            <Table
              type="primary"
              dataSource={dataSource}
              cellProps={(rowIndex, colIndex) => {
                if (colIndex === 0) {
                  return {
                    colSpan: 1,
                    rowSpan: 2,
                  };
                }
                if (colIndex === columns.length - 1) {
                  return {
                    colSpan: 1,
                    rowSpan: 3,
                  };
                }
              }}
            >
              {columns.map((col, i) => {
                return <Table.Column key={i} {...col} />;
              })}
            </Table>
          </Block>
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
.mock-iframe {
  border: 3px solid black;
  border-radius: 12px;
  overflow: hidden;
}
```
