# layout

@alifd/layout

Layout of PC 

## Box
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| direction            | 布局方向<br><br>**可选值**:<br>'row', 'column'                                                                                                    | Enum      | column         |
| justify              | 主轴对齐方式<br><br>**可选值**:<br>'flex-start', 'center', 'flex-end', 'space-between', 'space-around'                                              | Enum      | flex-start         |
| align                | 与主轴垂直方向的对齐方式<br><br>**可选值**:<br>'flex-start', 'center', 'flex-end', 'baseline', 'stretch'                                                  | Enum      | stretch         |
| wrap                 | 直接子元素是否可折行<br><br>**可选值**:<br>'wrap', 'nowrap'                                                                                             | Enum      | nowrap         |
| flex                 | flex-grow, flex-shrink, flex-basis 简写，采用数组方式例如[0, 1, 'auto']<br>或者直接简写为数字                                                                  | Array/Number   | -         |
| spacing              | 直接子元素之间的间距(margin)                                                                                                                         | Number    | 0         |
| padding              | 自身的padding                                                                                                                                 | Array/Number   | 0         |
| width                | 宽度                                                                                                                                         | String/Number   | auto         |
| minWidth             | 最小宽度                                                                                                                                       | String/Number   | none         |
| maxWidth             | 最大宽度                                                                                                                                       | String/Number   | none         |
| height               | 高度                                                                                                                                         | String/Number   | auto         |
| minHeight            | 最小高度                                                                                                                                       | String/Number   | none         |
| maxHeight            | 最大高度                                                                                                                                       | String/Number   | none         |
| background           | 背景色                                                                                                                                        | String    | auto         |
| shadow               | 阴影                                                                                                                                         | any       | ''         |
| corner               | 角                                                                                                                                          | any       | 0         |
| lineWidth            | 边框宽度                                                                                                                                       | Number    | 0         |
| lineStyle            | 边框样式<br><br>**可选值**:<br>'dotted', 'solid', 'double', 'dashed'                                                                              | Enum      | solid         |
| lineColor            | 边框颜色                                                                                                                                       | String    | #000         |
| position             | 定位<br><br>**可选值**:<br>'absolute', 'relative'                                                                                               | Enum      | relative         |
| left                 | 距离非static的父节点的左侧距离                                                                                                                         | String/Number   | auto         |
| top                  | 距离非static的父节点的顶部距离                                                                                                                         | String/Number   | auto         |
| right                | 距离非static的父节点的右侧距离                                                                                                                         | String/Number   | auto         |
| bottom               | 距离非static的父节点的底部距离                                                                                                                         | String/Number   | auto         |
| opacity              | 透明度                                                                                                                                        | Number    | 1         |
| Component            | 默认渲染的html节点                                                                                                                                | String    | div         |
| overflow             | 自身的overflow类型<br><br>**可选值**:<br>'visible', 'hidden', 'scroll', 'auto', 'inherit'                                                          | Enum      | visible         |

## Layout
> Layout Layout.Header Layout.Footer Layout.Aside Layout.Main API 继承自Box

| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| hasSider             | 直接子节点中是否有Aside    | Boolean         | false     |

## Text

| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| color             | 字体颜色    | String         |  #000    |
| fontFamily             | 字体库    | String         |      |
| fontSize             | 字体大小    | Number         |   14   |
| fontStyle             | 斜体<br><br>**可选值**:<br>'normal', 'italic'    | Enum         |  normal    |
| fontWeight             | 字重    | String/Number         |  normal    |
| textDecorationLine             | 下划线<br><br>**可选值**:<br>'none', 'underline', 'overline', 'line-through'     | Enum         |  none    |
| textDecorationColor             | 字体颜色    | String         |  #000    |
| textDecorationStyle             | 下划线<br><br>**可选值**:<br>'solid', 'wavy', 'double', 'dotted', 'dashed'     | Enum         |  solid    |
| letterSpacing             | 字间距    | Number         |  0    |
| lineHeight             | 行高    | Number         |      |
| textAlign             | 字体对齐方式<br><br>**可选值**:<br>'auto', 'left', 'right', 'center', 'justify'     | Enum         | left |
| opacity             | 透明度    | Number         |   1   |
| style             | 自定义样式    | Object         |      |

## Grid

| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| rows                 | 有几行                                                                                                                                         | String/Number   | 1         |
| columns              | 有几列                                                                                                                                         | String/Number   | 1         |
| device             | 当前所处设备<br><br>**可选值**:<br>'phone', 'tablet', 'desktop' <br><br>当设置device后，默认columns分别为 4, 8, 12                                                      | Enum      |          |
| gap                  | 间距                                                                                                                                 | Array/Number   | 0         |
| direction            | 布局方向<br><br>**可选值**:<br>'row', 'column'                                                                                                    | Enum      | column         |
| dense             | 是否为密集模式    | Boolean         | false     |
| align                | (子元素的)与主轴垂直方向的对齐方式<br><br>**可选值**:<br>'start', 'end', 'center', 'stretch'                                                  | Enum      | start         |
| justify                | (子元素的)与主轴垂直方向的对齐方式<br><br>**可选值**:<br>'start', 'end', 'center', 'stretch'                                                  | Enum      | start         |
| justifySelf                | (自身的)与主轴垂直方向的对齐方式<br><br>**可选值**:<br>'start', 'end', 'center', 'stretch'                                                  | Enum      | start         |
| alignSelf                | (自身的)与主轴垂直方向的对齐方式<br><br>**可选值**:<br>'start', 'end', 'center', 'stretch'                                                  | Enum      | start         |
| autoRowsHeight       | (子元素的) 高度，仅在 direction 为 column 时生效。设置后                                                                                                                                        | String/Number   | auto         |
| row            | (作为子元素)从行的第几个线条算起(最小为1)                                                                                                                                       | String/Number     | initial         |
| col            | (作为子元素)从列的第几个线条算起(最小为1)                                                                                                                                       | String/Number     | initial         |
| rowSpan            | 在纵向占据了几个格子                                                                                                                                       | Number    | 1         |
| colSpan            | 在横向占据了几个格子                                                                                                                                      | Number    | 1         |
| tabletColSpan            | 在tablet模式下横向占据了几个格子                                                                                                                                      | Number    | 1         |
| phoneColSpan            | 在phone模式下横向占据了几个格子                                                                                                                                      | Number    | 1         |
| width                | 宽度                                                                                                                                         | String/Number   | auto         |
| minWidth             | 最小宽度                                                                                                                                       | String/Number   | none         |
| maxWidth             | 最大宽度                                                                                                                                       | String/Number   | none         |
| height               | 高度                                                                                                                                         | String/Number   | auto         |
| minHeight            | 最小高度                                                                                                                                       | String/Number   | none         |
| maxHeight            | 最大高度                                                                                                                                       | String/Number   | none         |
| background           | 背景色                                                                                                                                        | String    | auto         |
| shadow               | 阴影                                                                                                                                         | any       | ''         |
| corner               | 角                                                                                                                                          | any       | 0         |
| lineWidth            | 边框宽度                                                                                                                                       | Number    | 0         |
| lineStyle            | 边框样式<br><br>**可选值**:<br>'dotted', 'solid', 'double', 'dashed'                                                                              | Enum      | solid         |
| lineColor            | 边框颜色                                                                                                                                       | String    | #000         |
| position             | 定位<br><br>**可选值**:<br>'absolute', 'relative'                                                                                               | Enum      | relative         |
| left                 | 距离非static的父节点的左侧距离                                                                                                                         | String/Number   | auto         |
| top                  | 距离非static的父节点的顶部距离                                                                                                                         | String/Number   | auto         |
| right                | 距离非static的父节点的右侧距离                                                                                                                         | String/Number   | auto         |
| bottom               | 距离非static的父节点的底部距离                                                                                                                         | String/Number   | auto         |
| opacity              | 透明度                                                                                                                                        | Number    | 1         |
| Component            | 默认渲染的html节点                                                                                                                                | String    | div         |
| overflow             | 自身的overflow类型<br><br>**可选值**:<br>'visible', 'hidden', 'scroll', 'auto', 'inherit'                                                          | Enum      | visible         |
