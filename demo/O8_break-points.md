---
title: 响应式和断点
order: 7
---

通过断点，可以实现区块的响应式布局

```jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Page, Section, Block, Cell, P, Text, BreakPoints } from '@alifd/layout';
import { Table, Tag } from '@alifd/next';
import throttle from 'lodash.throttle';
import '@alifd/theme-3/variables.css';

const cellProps = {
  align: 'center',
  verAlign: 'middle',
  style: { background: '#f2f2f2', height: 60 },
};

const breakPoints = [
  {
    width: 750,
    maxContentWidth: 750,
    numberOfColumns: 4,
  },
  {
    width: 960,
    maxContentWidth: 960,
    numberOfColumns: 8,
  },
  {
    width: 1200,
    maxContentWidth: 1200,
    numberOfColumns: 12,
  },
  {
    width: Infinity,
    maxContentWidth: 1200,
    numberOfColumns: 12,
  },
];

const App = () => {
  const [availWidth, setAvailWidth] = useState(document.body.clientWidth);
  const [curBreakPoint, setBreakPoint] = useState(undefined);

  const resize = throttle(() => {
    setAvailWidth(document.body.clientWidth);
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', resize, false);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <Page
      breakPoints={breakPoints}
      onBreakPointChange={(bp) => {
        setBreakPoint(bp);
      }}
    >
      <Section>
        <Block>
          <P type="h6">断点：</P>
          <P>
            调整窗口尺寸，查看不同断点下的显示效果。 窗口宽度:
            <Tag size="small" type="primary" color="green">
              {availWidth}px
            </Tag>
          </P>
          <Cell style={{ textIndent: '1em' }}>
            <Table
              dataSource={breakPoints}
              cellProps={(rowIndex, colIndex, dataIndex, record) => {
                if (curBreakPoint?.width === record?.width) {
                  return {
                    style: {
                      background: '#BBDEFB',
                    },
                  };
                }
                return {};
              }}
            >
              <Table.Column title="最大宽度" dataIndex="width" />
              <Table.Column title="最大内容宽度" dataIndex="maxContentWidth" />
              <Table.Column title="列数" dataIndex="numberOfColumns" />
            </Table>
          </Cell>
        </Block>
      </Section>

      <Section title="响应布局(1w x 12)">
        {Array.from(new Array(12)).map((_, key) => (
          <Block key={'span12-' + key} span={1}>
            <Cell {...cellProps}>
              <Text>span=1</Text>
            </Cell>
          </Block>
        ))}
      </Section>

      <Section title="响应布局(2,4,6)">
        <Block span={2}>
          <Cell {...cellProps}>
            <Text>span=2</Text>
          </Cell>
        </Block>
        <Block span={4}>
          <Cell {...cellProps}>
            <Text>span=4</Text>
          </Cell>
        </Block>
        <Block span={6}>
          <Cell {...cellProps}>
            <Text>span=6</Text>
          </Cell>
        </Block>
      </Section>
      <Section title="动态布局演示(4w x 6)">
        {Array.from(new Array(6)).map((_, index) => (
          <Block key={`block-${index}`} span={4}>
            <Cell {...cellProps}>
              <Text>span=4</Text>
            </Cell>
          </Block>
        ))}
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
