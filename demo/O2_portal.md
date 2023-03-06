---
title: 案例2 - 门户
order: 2
---

居中对齐 demo

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Divider } from '@alifd/next';
import { Page, Block, Section, Cell, Row, Col, Grid, P, Text } from '@alifd/layout';

import '@alifd/theme-3/variables.css';

class App extends Component {
  render() {
    return (
      <div className="mock-body-portal">
        <Page
          minHeight="100vh"
          breakPoints={[{ width: Infinity, maxContentWidth: 1000, numberOfColumns: 12 }]}
          sectionGap={0}
          style={{
            background: '#f9f9f9',
          }}
        >
          <Section
            style={{
              minHeight: 460,
              background:
                'linear-gradient(rgb(227, 229, 233), rgb(237, 238, 242), rgb(232, 233, 238))',
            }}
          >
            <Block mode="transparent">
              <Cell verAlign="center" gap={12}>
                <P type="h1">Alibaba Fusion Design</P>
                <P type="h3">企业级的中后台设计系统解决方案</P>
                <P>
                  <Button type="primary" size="large">
                    研发文档
                  </Button>
                  <Button size="large">设计模式</Button>
                </P>
              </Cell>
            </Block>
          </Section>
          <Section style={{ background: 'white' }}>
            <Block mode="transparent">
              <Cell align="center" verAlign="center" style={{ height: 160 }}>
                <P type="h2">精选设计系统站点</P>
              </Cell>
              <Row>
                <Cell>
                  <P>
                    <img
                      src="https://img.alicdn.com/tfs/TB1MjfHAbr1gK0jSZFDXXb9yVXa-770-480.png"
                      style={{ maxWidth: 300 }}
                    />
                  </P>
                  <P align="left" verAlign="center">
                    <img
                      src="https://img.alicdn.com/tfs/TB1awiGBAT2gK0jSZFkXXcIQFXa-44-41.svg"
                      style={{ width: 32, height: 32 }}
                    />
                    Fusion Design Pro
                  </P>
                </Cell>
                <Cell>
                  <P>
                    <img
                      src="https://img.alicdn.com/tfs/TB1lCHFAoz1gK0jSZLeXXb9kVXa-770-480.png"
                      style={{ maxWidth: 300 }}
                    />
                  </P>
                  <P align="left" verAlign="center">
                    <img
                      src="https://img.alicdn.com/tfs/TB1TOkPua61gK0jSZFlXXXDKFXa-53-53.png"
                      style={{ width: 32, height: 32 }}
                    />
                    Deep Design Pro
                  </P>
                </Cell>
                <Cell>
                  <P>
                    <img
                      src="https://img.alicdn.com/tfs/TB180fGAeL2gK0jSZPhXXahvXXa-770-480.png"
                      style={{ maxWidth: 300 }}
                    />
                  </P>
                  <P align="left" verAlign="center">
                    <img
                      src="https://gw.alicdn.com/tfs/TB1MbBSvKH2gK0jSZFEXXcqMpXa-60-56.png"
                      style={{ width: 32, height: 32 }}
                    />
                    InTiger Design
                  </P>
                </Cell>
              </Row>
            </Block>
            <Block mode="transparent">
              <Cell align="center" verAlign="center" style={{ height: 160 }}>
                <P type="h2">Fusion 的能力</P>
              </Cell>
              <Grid cols={2} align="center">
                <Cell align="center" style={{ width: 260 }}>
                  <P>
                    <img
                      src="https://img.alicdn.com/tfs/TB1T82LAbj1gK0jSZFOXXc7GpXa-360-360.png"
                      style={{ width: 160 }}
                    />
                  </P>
                  <P type="h3">企业级的中后台设计系统解决方案</P>
                  <P type="body1">
                    基于对阿里集团中后台业务的总结和抽象， 提供了一套开箱即用的核心模式
                  </P>
                </Cell>
                <Cell align="center" style={{ width: 260 }}>
                  <P>
                    <img
                      src="https://img.alicdn.com/tfs/TB1T82LAbj1gK0jSZFOXXc7GpXa-360-360.png"
                      style={{ width: 160 }}
                    />
                  </P>
                  <P type="h3">企业级的中后台设计系统解决方案</P>
                  <P type="body1">
                    基于对阿里集团中后台业务的总结和抽象， 提供了一套开箱即用的核心模式
                  </P>
                </Cell>
                <Cell align="center" style={{ width: 260 }}>
                  <P>
                    <img
                      src="https://img.alicdn.com/tfs/TB1T82LAbj1gK0jSZFOXXc7GpXa-360-360.png"
                      style={{ width: 160 }}
                    />
                  </P>
                  <P type="h3">企业级的中后台设计系统解决方案</P>
                  <P type="body1">
                    基于对阿里集团中后台业务的总结和抽象， 提供了一套开箱即用的核心模式
                  </P>
                </Cell>
                <Cell align="center" style={{ width: 260 }}>
                  <P>
                    <img
                      src="https://img.alicdn.com/tfs/TB1T82LAbj1gK0jSZFOXXc7GpXa-360-360.png"
                      style={{ width: 160 }}
                    />
                  </P>
                  <P type="h3">企业级的中后台设计系统解决方案</P>
                  <P type="body1">
                    基于对阿里集团中后台业务的总结和抽象， 提供了一套开箱即用的核心模式
                  </P>
                </Cell>
              </Grid>
              <Cell style={{ height: 60 }}></Cell>
            </Block>
          </Section>
          <Section style={{ background: '#f9f9f9' }}>
            <Block mode="transparent">
              <Row gap={40}>
                <Cell
                  style={{
                    height: 600,
                    overflow: 'hidden',
                    animation: 'up 20s linear 0s infinite',
                    background:
                      'url("https://img.alicdn.com/tfs/TB1sx9x1kY2gK0jSZFgXXc5OFXa-1244-2446.png") 50% center / 100%',
                  }}
                ></Cell>
                <Cell align="center" verAlign="center" gap={20}>
                  <P type="h2">优秀的团队都在使用 Fusion 助力产品研发</P>
                  <P type="h5">
                    “通过对 Fusion 组件库进行封装 ICE，淘宝实现了组件库的全面中台化。极大提高了 B2C
                    平台的设计协同效率。”
                  </P>
                </Cell>
              </Row>
            </Block>
          </Section>
          <Divider style={{ margin: 0 }} />
          <Section style={{ background: 'white' }}>
            <Block mode="transparent">
              <Cell style={{ height: 80 }} />
              <Row spacing={40}>
                <Cell verAlign="top">
                  <P type="h3">Alibaba Fusion</P>
                  <P type="h6">更聪明的工作，让效率突飞猛进</P>
                  <P type="h6">Work smarter, as easy as blowing off dust</P>
                </Cell>
                <Col>
                  <Cell verAlign="top" style={{ height: 200 }}>
                    <P type="h6">Fusion 官方物料（200px height 没生效)</P>
                    <P>Fusion Next PC 组件库</P>
                    <P>Fusion Mobile 组件库</P>
                    <P>Fusion 官方推荐组件</P>
                  </Cell>
                  <Cell verAlign="top">
                    <P type="h6">开发者社区</P>
                    <P>Fusion Github</P>
                    <P>在 Fusion Github 开发者社群您可以提 Issue 或贡献组件</P>
                  </Cell>
                </Col>

                <Cell verAlign="top">
                  <P type="h6">相关资源</P>
                  <P>Done-Client Sketch Plugin</P>
                  <P>BizCharts</P>
                  <P>Fusion 官方推荐组件</P>
                </Cell>
              </Row>
              <Cell style={{ height: 80 }} />
            </Block>
          </Section>
        </Page>
      </div>
    );
  }
}

ReactDOM.render(
  <div className="mock-iframe-portal">
    <App />
  </div>,
  mountNode,
);
```

```css
.mock-iframe-portal {
  border: 3px solid black;
  border-radius: 12px;
  overflow: hidden;
  --page-max-content-width: 1000px;
}
@keyframes up {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -1132.5px;
  }
}
```
