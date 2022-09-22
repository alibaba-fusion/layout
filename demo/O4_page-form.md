---
title: 案例4 - 表单
order: 4
---

表单

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Table,
  Pagination,
  Icon,
  Breadcrumb,
  Select,
  Input,
  DatePicker,
  Step,
} from '@alifd/next';
import { Page, Section, Block, Grid, Row, Col, Cell, P, Text } from '@alifd/layout';
import '@alifd/theme-3/variables.css';

const { Header } = Page;

class App extends Component {
  render() {
    return (
      <Page breakPoints={[{ width: Infinity, maxContentWidth: 1000, numberOfColumns: 12 }]}>
        <Header>
          <Breadcrumb>
            <Breadcrumb.Item>表单页</Breadcrumb.Item>
            <Breadcrumb.Item>表单布局</Breadcrumb.Item>
          </Breadcrumb>
          <P>
            <Text type="h4">表单布局</Text>
            <Text type="body1">Form Layout</Text>
          </P>
          <P>描述组件之间的间距关系</P>
        </Header>

        <Section>
          <Block title="标签在上">
            <Col>
              <Grid cols={4}>
                <Cell>
                  <P>单据号</P>
                  <Select showSearch placeholder="输入内容进行搜索" />
                </Cell>
                <Cell>
                  <P>选择业务类型</P>
                  <Select placeholder="选择业务类型" />
                </Cell>
                <Cell>
                  <P>收款方</P>
                  <Input state="error" style={{ width: '100%' }} />
                </Cell>
                <Cell>
                  <P>收票状态</P>
                  <Input placeholder="输入内容" style={{ width: '100%' }} />
                </Cell>
                <Cell colSpan={4}>
                  <P>单据状态</P>
                  <Select placeholder="选择业务类型" />
                </Cell>
                <Cell colSpan={4}>
                  <P>单据备注</P>
                  <Input placeholder="输入内容" style={{ width: '100%' }} />
                </Cell>
                <Cell colSpan={4}>
                  <P>提交时间:</P>
                  <DatePicker style={{ width: '100%' }} />
                </Cell>
              </Grid>
              <Row verAlign="middle">
                <P verMargin={0}>
                  <Button type="primary">查询</Button>
                  <Button>导出</Button>
                </P>
                <Cell autoFit>
                  <Button text>
                    展开 <Icon type="arrow-down" />
                  </Button>
                </Cell>
              </Row>
            </Col>
          </Block>

          <Block title="标签在左侧">
            <Col>
              <Grid cols={3}>
                <Cell>
                  <Row verAlign="middle">
                    <Cell autoFit>
                      <Text align="right" style={{ width: 100 }}>
                        单据号
                      </Text>
                    </Cell>
                    <Select showSearch placeholder="输入内容进行搜索" />
                  </Row>
                </Cell>
                <Cell>
                  <Row verAlign="middle">
                    <Cell autoFit>
                      <Text align="right" style={{ width: 100 }}>
                        选择业务类型
                      </Text>
                    </Cell>
                    <Select showSearch placeholder="选择业务类型" />
                  </Row>
                </Cell>
                <Cell>
                  <Row>
                    <Cell autoFit>
                      <Text align="right" style={{ width: 100 }}>
                        收款方(对齐)
                      </Text>
                    </Cell>
                    <Input state="error" />
                  </Row>
                </Cell>
                <Cell>
                  <Row verAlign="middle">
                    <Cell autoFit>
                      <Text align="right" style={{ width: 100 }}>
                        收票状态
                      </Text>
                    </Cell>
                    <Input placeholder="输入内容" />
                  </Row>
                </Cell>
                <Cell colSpan={4}>
                  <Row verAlign="middle">
                    <Cell autoFit>
                      <Text align="right" style={{ width: 100 }}>
                        单据状态
                      </Text>
                    </Cell>
                    <Select placeholder="选择业务类型" />
                  </Row>
                </Cell>
                <Cell colSpan={4}>
                  <Row verAlign="middle">
                    <Cell autoFit>
                      <Text align="right" style={{ width: 100 }}>
                        单据备注
                      </Text>
                    </Cell>
                    <Input placeholder="输入内容" />
                  </Row>
                </Cell>
                <Cell colSpan={4}>
                  <Row verAlign="middle">
                    <Cell autoFit>
                      <Text align="right" style={{ width: 100 }}>
                        提交时间
                      </Text>
                    </Cell>
                    <DatePicker.RangePicker />
                  </Row>
                </Cell>
              </Grid>
              <P align="right" verMargin={0}>
                <Button type="primary">查询</Button>
                <Button>导出</Button>
                <Button text>
                  展开 <Icon type="arrow-down" />
                </Button>
              </P>
            </Col>
          </Block>

          <Block title="分步表单">
            <Col>
              <Cell>
                <Step shape="circle" labelPlacement="hoz">
                  <Step.Item title="填写转账信息"></Step.Item>
                  <Step.Item title="确认转账信息"></Step.Item>
                  <Step.Item title="完成"></Step.Item>
                </Step>
              </Cell>
              <Cell gap={12} style={{ width: 500, margin: '0 auto' }}>
                <P verAlign="middle">
                  <Text style={{ width: 100, textAlign: 'right' }}>付款账户:</Text>
                  <Select placeholder="选择付款账户" defaultValue="frankqian" />
                </P>

                <P verAlign="middle">
                  <Text style={{ width: 100, textAlign: 'right' }}>收款账户:</Text>
                  <Input placeholder="选择付款账户" />
                </P>
                <P verAlign="middle">
                  <Text style={{ width: 100, textAlign: 'right' }}>收款人姓名:</Text>
                  <Input placeholder="收款人姓名" defaultValue="frankqian" />
                </P>
                <P verAlign="middle">
                  <Text style={{ width: 100, textAlign: 'right' }}>转账金额:</Text>
                  <Input placeholder="转账金额" innerBefore="￥" defaultValue="500" />
                </P>
                <P>
                  <Text align="right" style={{ width: 100 }} />
                  <Button type="primary">下一步</Button>
                </P>
              </Cell>
            </Col>
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
