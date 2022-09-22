# 自然布局(@alifd/layout)

<p align="center">
  <a href="https://fusion.design/">
    <img alt="Fusion" src="https://img.alicdn.com/tfs/TB1YsoiHVzqK1RjSZFCXXbbxVXa-159-99.svg" width="200">
  </a>
</p>
<p align="center">
  <img src="https://img.shields.io/npm/v/@alifd/layout.svg">
  <img src="https://img.shields.io/npm/dm/@alifd/layout.svg">
  <img src="https://img.shields.io/npm/l/@alifd/layout.svg">
</p>

用于搭建、源码，嵌套特定组件的布局体系，目标是不写任何布局 CSS 代码。

## 设计理念

- **初衷**：愿布局不需写 css 样式
- **定位**：页面内容区的布局解决方案

> 详细介绍：https://www.yuque.com/fusion-design/layout/yzx8g4 （需先加入 [Fusion Design](https://www.yuque.com/g/fusion-design/layout/collaborator/join?token=7bTjikyxDTAh3WwS) 语雀知识库）

## 使用指引

自然布局提供的能力分为「页面布局」、「局部布局」两种。

- 页面布局：会用到 `Page` `Page.Header` `Page.Footer` `Page.Content` `Page.Aside` `Page.Nav` 六类组件。
- 局部局部：会用到 `Section` `Block`, `Row`, `Col`, `Cell`, `P`, `Text` 等

```jsx
import { Page, Section, Block, Row, Col, Cell, P, Text, Space } from '@alifd/layout';

export default function App() {
  return (
    <Page>
      <Page.Header></Page.Header>
      <Page.Content>
        <Section>
          <Block>
            <Row>
              <Cell>
                <P>
                  <Text>文本</Text>
                  <Text>文本</Text>
                </P>
              </Cell>
              <Cell>
                <P>
                  <Text>文本</Text>
                  <Text>文本</Text>
                </P>
              </Cell>
            </Row>
            <Space />
            <Col>
              <Cell>
                <P>
                  <Text>文本</Text>
                  <Text>文本</Text>
                </P>
              </Cell>
              <Cell>
                <P>
                  <Text>文本</Text>
                  <Text>文本</Text>
                </P>
              </Cell>
            </Col>
          </Block>
        </Section>
      </Page.Content>
      <Page.Footer></Page.Footer>
    </Page>
  );
}
```

## 开发

1. 启动 demo

```bash
npm run start
```

2. 启动低代码预览

```bash
npm run lowcode:dev
```

## API

### Page

页面

| 参数               | 含义                                        | 类型                                              | 默认值       |
| ------------------ | ------------------------------------------- | ------------------------------------------------- | ------------ |
| prefix             | CSS 类名前缀                                | string                                            | `fd-layout-` |
| minHeight          | 页面的最小高度，例如 `calc(100vh - 52px)`   | Number/String                                     | -            |
| noPadding          | 禁用页面内边距,包含 Header, Content, Footer | Boolean                                           | `false`      |
| isTab              | 是否开启分页布局                            | Boolean                                           | `false`      |
| tabProps           | 放到 Tab 组件上的一些默认值                 | Object                                            | -            |
| sectionGap         | Header、Footer、Nav、Aside 和章节之间间隙   | Number                                            | -            |
| blockGap           | Section 中栅格布局间隙                      | Number                                            | -            |
| gridGap            | 小布局间隙（包含行、列、网格布局）          | Number                                            | -            |
| breakPoints        | 断点信息                                    | `BreakPoint[]`                                    | -            |
| children           | 子元素                                      | ReactNode                                         | -            |
| onBreakPointChange | 断点变更回调                                | (curBreakPoint, oldBreakPoint, breakPoints)=>void |              |

```
interface BreakPoint {
  /**
   *  断点宽度(包含)
   */
  width: number;
  /**
   * 最大展示宽, 默认为断点宽度
   */
  maxContentWidth: number | string;
  /**
   * 列数
   */
  numberOfColumns: 1 | 2 | 4 | 8 | 12 | 16;
}
```

#### Page.Header

序章

| 参数            | 含义                                          | 类型      | 默认值 |
| --------------- | --------------------------------------------- | --------- | ------ |
| mode            | 背景色 'lining' / 'surface' / 'transparent'   | Enum      | -      |
| noBottomPadding | 隐藏默认底部内边距                            | Boolean   | -      |
| divider         | 展示分割线                                    | Boolean   | -      |
| fullWidth       | 保持全屏宽（不受断点 `maxContentWidth` 限制） | Boolean   | false  |
| children        | 子元素                                        | ReactNode | -      |

#### Page.Footer

终章

| 参数         | 含义                                          | 类型      | 默认值 |
| ------------ | --------------------------------------------- | --------- | ------ |
| mode         | 背景色 'lining' / 'surface' / 'transparent'   | Enum      | -      |
| noTopPadding | 隐藏默认顶部内边距                            | Boolean   | -      |
| divider      | 展示分割线                                    | Boolean   | -      |
| fullWidth    | 保持全屏宽（不受断点 `maxContentWidth` 限制） | Boolean   | false  |
| children     | 子元素                                        | ReactNode | -      |

#### Page.Content

内容

| 参数      | 含义                                             | 类型          | 默认值 |
| --------- | ------------------------------------------------ | ------------- | ------ |
| minHeight | 页面的最小高度，例如 calc(100vh - 52px)          | Number/String | -      |
| title     | 开启分页布局后生效，作为子页面(Tab.Item)的 title | String        | -      |
| key       | 开启分页布局后生效，作为子页面(Tab.Item)的 key   | String        | -      |
| children  | 子元素                                           | ReactNode     | -      |

#### Page.Aside

右侧边栏，如有 Content，需为 Content 的子元素

| 参数     | 含义   | 类型          | 默认值 |
| -------- | ------ | ------------- | ------ |
| width    | 宽度   | Number/String | -      |
| children | 子元素 | ReactNode     | -      |

#### Page.Nav

左侧导航，如有 Content，需为 Content 的子元素

| 参数     | 含义   | 类型          | 默认值 |
| -------- | ------ | ------------- | ------ |
| width    | 宽度   | Number/String | -      |
| children | 子元素 | ReactNode     | -      |

### Section

章

| 参数       | 含义                          | 类型      | 默认值 |
| ---------- | ----------------------------- | --------- | ------ |
| title      | 标题                          | ReactNode | -      |
| titleAlign | 标题位置，可选值 left/center  | Enum      | -      |
| extra      | 附加区域（标题右侧）          | ReactNode | -      |
| gap        | 自定义内部区块（Block）的间隙 | Number    | -      |
| children   | 子元素                        | ReactNode | -      |

### Block

区块（节）

| 参数             | 含义                                                              | 类型          | 默认值 |
| ---------------- | ----------------------------------------------------------------- | ------------- | ------ |
| mode             | 背景模式，可选值 transparent(自动移除内边距和标题)/surface/lining | Enum          | -      |
| title            | 标题                                                              | ReactNode     | -      |
| titleAlign       | 标题位置，可选值 left/center                                      | Enum          | -      |
| extra            | 附加区域（标题右侧）                                              | ReactNode     | -      |
| divider          | 展示标题与内容之间的分割线                                        | Boolean       | -      |
| bordered         | 展示边框                                                          | Boolean       | -      |
| noPadding        | 移除内边距                                                        | Boolean       | false  |
| span             | 列宽                                                              | Number        | -      |
| width            | 指定宽度                                                          | Number        | -      |
| contentClassName | 有标题时，内容区域的样式名                                        | string        | -      |
| contentStyle     | 有标题时，内容区域的自定义样式                                    | CSSProperties | -      |
| children         | 子元素                                                            | ReactNode     | -      |

### Row

行

| 参数     | 含义                                                      | 类型      | 默认值 |
| -------- | --------------------------------------------------------- | --------- | ------ |
| width    | 指定宽度                                                  | Number    | -      |
| autoFit  | 根据内容自适应宽度（当作为行列布局的子元素时生效）        | Boolean   | -      |
| gap      | 自定义元素间间距                                          | Number    | -      |
| verAlign | 垂直对齐方式， 可选值：top/middle/bottom/stretch/baseline | Enum      | -      |
| children | 子元素                                                    | ReactNode | -      |

### Col

列

| 参数     | 含义                                               | 类型      | 默认值 |
| -------- | -------------------------------------------------- | --------- | ------ |
| autoFit  | 根据内容自适应宽度（当作为行列布局的子元素时生效） | Boolean   | -      |
| gap      | 自定义元素间间距                                   | Number    | -      |
| align    | 水平对齐方式， 可选值：left/center/right/stretch   | Enum      | -      |
| children | 子元素                                             | ReactNode | -      |

### Grid

网格

| 参数       | 含义                                          | 类型                         | 默认值 |
| ---------- | --------------------------------------------- | ---------------------------- | ------ |
| cols       | 指定列数                                      | number                       |        |
| rows       | 指定行数                                      | number                       |        |
| minWidth   | 单元格最小宽度                                | number                       |        |
| maxWidth   | 单元格最大宽度                                | number                       |        |
| rowGap     | 单元格行间距, 可选值: small/medium/large/数值 | Enum                         |        |
| colGap     | 单元格列间距, 可选值: small/medium/large/数值 | Enum                         |        |
| renderItem | 手动渲染单个单元格内容                        | (rowIndex,colIndex)=>RaxNode |        |
| children   | 子元素，默认应为 `Cell`                       | RaxNode                      | -      |

### Cell

单元格，其内容默认为 flex 纵向布局

| 参数     | 含义                                                                                 | 类型      | 默认值 |
| -------- | ------------------------------------------------------------------------------------ | --------- | ------ |
| width    | 指定宽度                                                                             | Number    | -      |
| autoFit  | 根据内容自适应宽度（当作为行列布局的子元素时生效）                                   | Boolean   | -      |
| gap      | 自定义内部元素的行解析                                                               | Number    | 0      |
| align    | 内容水平对齐方式， 可选值: left/center/right                                         | Enum      | -      |
| verAlign | 内容垂直对齐方式， 可选值: top/middle/bottom/space-between/space-around/space-evenly | Enum      | -      |
| block    | 使用 `block` 布局                                                                    | Boolean   | -      |
| children | 子元素                                                                               | ReactNode | -      |

### Space

空间间隙

| 参数      | 说明                                     | 类型      | 默认值 |
| --------- | ---------------------------------------- | --------- | ------ |
| direction | 组件自身布局模式，可选： `hoz/ver`       | Enum      | hoz    |
| size      | 尺寸， 可选: `small/medium/large/Number` | Enum      | medium |
| children  | 子元素                                   | ReactNode |        |

### 文本

| 参数      | 说明                                     | 类型    | 默认值 |
| --------- | ---------------------------------------- | ------- | ------ |
| direction | 组件自身布局模式，可选： `hoz/ver`       | Enum    | hoz    |
| size      | 尺寸， 可选: `small/medium/large/Number` | Enum    | medium |
| children  | 子元素                                   | RaxNode |        |

### P

段落

| 参数         | 说明                                                                       | 类型      | 默认值     |
| ------------ | -------------------------------------------------------------------------- | --------- | ---------- |
| align        | 水平方向对齐模式 left/center/right/space-between/space-around/space-evenly | Enum      | 'left'     |
| verAlign     | 垂直方向对齐模式 top/middle/bottom/baseline                                | Enum      | 'baseline' |
| spacing      | 子元素间保持水平间距, 可选： small/medium/large/false                      | Enum      | medium     |
| verMargin    | 除 Text 节点外子元素间保持垂直外边距                                       | Boolean   | true       |
| beforeMargin | 段前外边距距（第一个子元素无效）                                           | Number    | 0          |
| afterMargin  | 段尾外边距（最后一个子元素无效）                                           | Number    | 0          |
| children     | 子元素                                                                     | ReactNode | -          |

#### Text

文本

| 参数      | 说明                                                              | 类型    | 默认值 |
| --------- | ----------------------------------------------------------------- | ------- | ------ |
| type      | 约束字体大小 overline/caption/body1/body2/title/h1/h2/h3/h4/h5/h6 | Enum    | body2  |
| delete    | 添加删除线样式                                                    | Boolean | false  |
| mark      | 添加标记样式                                                      | Boolean | false  |
| underline | 添加下划线样式                                                    | Boolean | false  |
| strong    | 是否加粗                                                          | Boolean | false  |
| code      | 添加代码样式                                                      | Boolean | false  |
| component | 设置标签类型                                                      | custom  | 'span' |
| color     | 颜色                                                              | String  | -      |

## CSS 变量

| 变量名                            | 说明                   | 默认值                 |
| --------------------------------- | ---------------------- | ---------------------- |
| `--color-transparent`             | 前景色                 | `transparent`          |
| `--color-surface`                 | 前景色                 | `#fff`                 |
| `--color-lining`                  | 衬色                   | `#f0f0f0`              |
| `--page-padding-lr`               | 页面左右内边距         | `var(--s-5)`           |
| `--page-padding-tb`               | 页面上下内边距         | `var(--s-5)`           |
| `--page-header-divider-color`     | header 分割线颜色      | `var(--color-line1-1)` |
| `--page-block-corner`             | 区块圆角尺寸           | `var(--corner-0)`      |
| `--page-block-padding-lr`         | 区块左右内边距         | `var(--s-3)`           |
| `--page-block-padding-tb`         | 区块上下内边距         | `var(--s-3)`           |
| `--page-section-title-font-color` | 章节标题颜色           | `var(--color-text1-4)` |
| `--page-section-extra-font-color` | 章节附加内容文本颜色   | `var(--color-text1-2)` |
| `--page-block-title-font-color`   | 区块标题颜色           | `var(--color-text1-4)` |
| `--page-block-extra-font-color`   | 区块附加内容文本颜色   | `var(--color-text1-2)` |
| `--page-section-gap`              | 章间隙                 | `var(--s-3)`           |
| `--page-block-gap`                | 区块间隙               | `var(--s-2)`           |
| `--page-block-border-width`       | 区块边框宽度           | `var(--line-1)`        |
| `--page-block-border-color`       | 区块边框颜色           | `var(--color-line1-1)` |
| `--page-grid-gap`                 | 小布局间隙             | `var(--s-1)`           |
| `--page-p-small-spacing`          | 段落子元素的水平小间距 | `var(--s-1)`           |
| `--page-p-medium-spacing`         | 段落子元素的水平中间距 | `var(--s-2)`           |
| `--page-p-large-spacing`          | 段落子元素的水平大间距 | `var(--s-4)`           |
| `--page-p-el-margin`              | 段落子元素的上下间距   | `var(--s-1)`           |
| `--page-p-font-color`             | 段落默认字体色         | `var(--color-text1-4)` |
