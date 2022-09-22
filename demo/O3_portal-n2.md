---
title: 案例3 - 门户2
order: 2
---

居中对齐 demo

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Tab } from '@alifd/next';
import { Page, Block, Row, Col, Cell, Section, P, Text } from '@alifd/layout';
import '@alifd/theme-3/variables.css';

class App extends Component {
  render() {
    return (
      <div className="mock-body-portal">
        <Page minHeight="100vh" contentProps={{ noPadding: true }} style={{ background: '#000' }}>
          <Section
            style={{
              height: 460,
              background:
                "url('https://img.alicdn.com/imgextra/i4/O1CN01TPc6BR1jXbzrurETr_!!6000000004558-2-tps-3840-920.png') 50% 50% / cover no-repeat",
            }}
          >
            <Block mode="transparent" />
          </Section>
          <Section>
            <Block mode="transparent">
              <Cell verAlign="center" style={{ height: 160 }}>
                <P type="h2">
                  <Text color="white">平台服务能力介绍</Text>
                </P>
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
                    <Text color="white">Fusion Design Pro</Text>
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
                    <Text color="white">Deep Design Pro</Text>
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
                    <Text color="white">InTiger Design</Text>
                  </P>
                </Cell>
              </Row>
            </Block>
            <Block mode="transparent">
              <Cell verAlign="center" style={{ height: 160 }}>
                <P type="h2">
                  <Text color="white">营销创意服务</Text>
                </P>
              </Cell>
              <Box spacing={20}>
                <Tab>
                  <Tab.Item title="春节营销主题活动">
                    <Box style={{ height: 400 }}>
                      <Text color="white">内容标签</Text>
                    </Box>
                  </Tab.Item>
                  <Tab.Item title="精选案例">
                    <Box style={{ height: 400 }}>
                      <Text color="white">内容标签</Text>
                    </Box>
                  </Tab.Item>
                </Tab>
              </Box>
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
.mock-body-portal {
  border: 3px solid black;
  border-radius: 12px;
  overflow: hidden;
  --page-max-content-width: 1000px;
}
```
