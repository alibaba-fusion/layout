---
title: 案例7 - 多标签页
order: 6
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
  Tab,
  MenuButton,
  Input,
  Select,
  Card,
} from '@alifd/next';

import { Page, Section, Block, Row, Col, Grid, Cell, P, Text } from '@alifd/layout';

import '@alifd/theme-3/variables.css'
import '@alifd/theme-3/index.scss'

const { Header, Content, Footer, Nav, Aside } = Page;

const list = [
  {
    id: 'qianchen.qc',
    name: '潕量',
    avatar: 'https://work.alibaba-inc.com/photo/82181.80x80.jpg',
    role: 1,
  },
  { id: 'lianmin.slm', name: '联民', avatar: 'https://work.alibaba-inc.com/photo/76578.80x80.jpg' },
  { id: 'jinli.lyy', name: '瑾鲤', avatar: 'https://work.alibaba-inc.com/photo/187554.80x80.jpg' },
  { id: 'mark.ck', name: '金禅', avatar: 'https://work.alibaba-inc.com/photo/190997.80x80.jpg' },
  { id: 'youlu.zgy', name: '游鹿', avatar: 'https://work.alibaba-inc.com/photo/167139.80x80.jpg' },
  {
    id: 'zhengtao.lzt',
    name: '暮郴',
    avatar: 'https://work.alibaba-inc.com/photo/152621.80x80.jpg',
  },
];

const headerRender = (value, index, item) => {
  return (
    <div>
      <img
        alt="pic"
        src={
          item.avatar && item.avatar.length > 0
            ? item.avatar
            : '//img.alicdn.com/tps/TB1kssgNXXXXXc_aXXXXXXXXXXX-56-56.png'
        }
        style={{
          width: 28,
          height: 28,
          verticalAlign: 'middle',
          borderRadius: '50%',
          marginRight: 10,
        }}
      />{' '}
      {item.name}
    </div>
  );
};

const roleRender = (value, index, record) => {
  return record.role === 1 ? '管理员' : '成员';
};

const App = () => {
  return (
    <Page isTab>
      <Header>
        <Cell gap={8}>
          <Breadcrumb>
            <Breadcrumb.Item>个人中心</Breadcrumb.Item>
            <Breadcrumb.Item>设置</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Cell style={{ width: 80 }}>
              <Avatar
                size="large"
                src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
              />
            </Cell>
            <Cell>
              <P type="title">谢莉莉</P>
              <P type="body-1">xielili@aliwork-inc.com</P>
            </Cell>
          </Row>
        </Cell>
      </Header>

      <Content title="知识库">
        <Nav width={300}>
          <Block span={4}>
            <P align="center">
              <Avatar
                size={96}
                src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
              />
            </P>
            <P align="center">
              <Tag size="small" color="#d66620">
                语雀会员
              </Tag>
            </P>
            <P align="center">
              <Button style={{ width: 200 }}>编辑资料</Button>
            </P>
            <Row>
              <Cell align="center">
                <P>关注了</P>
                <P type="headline">2</P>
              </Cell>
              <Cell align="center">
                <Divider direction="ver" style={{ height: 40 }} />
              </Cell>
              <Cell align="center">
                <P>关注者</P>
                <P type="headline">8</P>
              </Cell>
            </Row>
            <Divider />
            <Row>
              <Cell width={20}>
                <Icon type="attachment" size="small" />
              </Cell>
              <Cell>
                <Text>浙江-杭州-西溪园区</Text>
              </Cell>
            </Row>
            <Row>
              <Cell width={20}>
                <Icon type="toggle-right" size="small" />
              </Cell>
              <Cell>
                <Text>
                  阿里集团-CTO线-新零售技术事业群-业务平台事业部-体验技术-设计中台研发中心-Fusion&中后台
                </Text>
              </Cell>
            </Row>
            <Row>
              <Cell width={20}>
                <Icon type="atm" size="small" />
              </Cell>
              <Cell>
                <Text>前端专家</Text>
              </Cell>
            </Row>
            <Divider />
            <P type="h5" afterMargin={20}>
              团队
            </P>
            <Grid cols={3}>
              <Cell align="center">
                <P>
                  <Avatar src="https://zos.alipayobjects.com/skylark/d10c0fee-c569-450a-a64a-862c3c1a8fcb/avatar/634db6ab22662a7f/Fusion-logo.png" />
                </P>
                <P type="caption" align="center">
                  Fusion Design System
                </P>
              </Cell>
              <Cell align="center">
                <P>
                  <Avatar src="https://img.alicdn.com/tfscom/TB1EQXdOpXXXXXdaXXXXXXXXXXX" />
                </P>
                <P type="caption">Fusion Cool</P>
              </Cell>
              <Cell>
                <P align="center">
                  <Avatar src="https://img.alicdn.com/imgextra/i2/O1CN01KFDXBv1Y800QzX5vM_!!6000000003013-2-tps-200-200.png" />
                </P>
                <P>
                  <Text type="caption">
                    设计事业部 <Icon type="lock" size="xs" />
                  </Text>
                </P>
              </Cell>
              <Cell>
                <P align="center">
                  <Avatar src="https://gw.alipayobjects.com/zos/skylark/35f923b6-d51c-4f75-96a9-f06a1d2f3f26/2018/png/avatar/f8def2bb-26dc-404b-932c-24e9cd98fb17.png" />
                </P>
                <P type="caption">
                  <Text type="caption">
                    Lazada vayager <Icon type="lock" size="xs" />
                  </Text>
                </P>
              </Cell>
            </Grid>
          </Block>
        </Nav>
        <Section>
          <Block>
            <Tab>
              <Tab.Item title="知识库">
                <Cell style={{ paddingTop: 20 }}>
                  <P align="space-between">
                    <Input
                      placeholder="搜索知识库(marginTop值问题)"
                      innerBefore={<Icon type="search" style={{ marginLeft: 8 }} />}
                    />
                    <MenuButton text label="类型" popupProps={{ v2: true, placement: 'br' }}>
                      <MenuButton.Item>全部</MenuButton.Item>
                      <MenuButton.Item>文档</MenuButton.Item>
                      <MenuButton.Item>资源</MenuButton.Item>
                    </MenuButton>
                  </P>
                  <Divider />
                  <Row>
                    <Cell width={40}>
                      <Avatar src="https://img.alicdn.com/tfs/TB1ZnevdmslXu8jSZFuXXXg7FXa-70-70.png" />
                    </Cell>
                    <Cell>
                      <P type="body-2">工作文档</P>
                      <P type="caption">今天 10:38</P>
                    </Cell>
                  </Row>
                  <Divider />
                  <Row>
                    <Cell width={40}>
                      <Avatar src="https://img.alicdn.com/tfs/TB1ZnevdmslXu8jSZFuXXXg7FXa-70-70.png" />
                    </Cell>
                    <Cell>
                      <P type="body-2">
                        <Text>
                          个人日常项目管理 <Icon size="xs" type="lock" />
                        </Text>
                      </P>
                      <P>本月个人对接项目的进度管理</P>
                      <P type="caption">07-13 11:32</P>
                    </Cell>
                  </Row>
                </Cell>
              </Tab.Item>
              <Tab.Item title="关注了"></Tab.Item>
              <Tab.Item title="关注者"></Tab.Item>
            </Tab>
          </Block>
        </Section>
      </Content>
      <Content title="主题管理">
        <Section>
          <Block mode="transparent">
            <Grid cols={3}>
              <Card contentHeight="auto">
                <Row>
                  <Cell>
                    <P>
                      <Text>Fusion Origin</Text>{' '}
                      <Button text type="primary">
                        修改>
                      </Button>
                    </P>
                  </Cell>
                  <Cell autoFit>
                    <P>
                      <Icon type="ashbin" size="xs" />
                    </P>
                  </Cell>
                </Row>

                <P type="caption">阿里橙，经典的橙色主题，适用于阿里内外、淘宝等品牌站点</P>
                <P type="caption">语言: zh-cn</P>
                <P type="caption">主题包名: @alife/theme-orange</P>
                <P type="caption">当前版本: 1.1.2</P>
                <P>
                  <Button type="primary">配置主题</Button>
                  <Button type="secondary">发布与历史</Button>
                </P>
              </Card>
              <Card contentHeight="auto">
                <Row>
                  <Cell>
                    <P>
                      <Text>Fusion Blue</Text>
                      <Tag type="primary" size="small">
                        默认主题
                      </Tag>&nbsp;&nbsp;
                      <Button text type="primary">
                        修改>
                      </Button>
                    </P>
                  </Cell>
                  <Cell autoFit>
                    <P>
                      <Icon type="ashbin" size="xs" />
                    </P>
                  </Cell>
                </Row>

                <P type="caption">极客蓝，中后台系统通用主题</P>
                <P type="caption">语言: zh-cn</P>
                <P type="caption">主题包名: @alife/theme-blue</P>
                <P type="caption">当前版本: 1.1.2</P>
                <P>
                  <Button type="primary">配置主题</Button>
                  <Button type="secondary">发布与历史</Button>
                </P>
              </Card>
              <Card contentHeight="auto">
                <Row>
                  <Cell>
                    <P>
                      <Text>Fusion Purple</Text>
                      <Button text type="primary">
                        修改>
                      </Button>
                    </P>
                  </Cell>
                  <Cell autoFit>
                    <P>
                      <Icon type="ashbin" size="xs" />
                    </P>
                  </Cell>
                </Row>

                <P type="caption">菖蒲紫</P>
                <P type="caption">语言: zh-cn</P>
                <P type="caption">主题包名: @alife/theme-blue</P>
                <P type="caption">当前版本: 1.1.2</P>
                <P>
                  <Button type="primary">配置主题</Button>
                  <Button type="secondary">发布与历史</Button>
                </P>
              </Card>
              <Card contentHeight="auto">
                <Row>
                  <Cell>
                    <P>
                      <Text>Fusion Green</Text>

                      <Button text type="primary">
                        修改>
                      </Button>
                    </P>
                  </Cell>
                  <Cell autoFit>
                    <P>
                      <Icon type="ashbin" size="xs" />
                    </P>
                  </Cell>
                </Row>

                <P type="caption">松石绿</P>
                <P type="caption">语言: zh-cn</P>
                <P type="caption">主题包名: @alife/theme-blue</P>
                <P type="caption">当前版本: 1.1.2</P>
                <P>
                  <Button type="primary">配置主题</Button>
                  <Button type="secondary">发布与历史</Button>
                </P>
              </Card>
            </Grid>
          </Block>
        </Section>
      </Content>

      <Content title="权限设置">
        <Section>
          <Block title="添加成员">
            <P>
              <Select
                mode="multiple"
                showSearch
                placeholder="请输入 花名、 工号 等进行搜索"
                style={{ width: 400 }}
              />
              <Button type="primary">请选择操作</Button>
            </P>
          </Block>
          <Block
            title={
              <P verAlign="center">
                <Text>团队成员</Text>
                <Tag size="small" type="primary">
                  {list.length}
                </Tag>
              </P>
            }
          >
            <Table dataSource={list} hasHeader={false} hasBorder={false}>
              <Table.Column cell={headerRender} />
              <Table.Column dataIndex="id" cell={roleRender} />
            </Table>
          </Block>
        </Section>
      </Content>

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
