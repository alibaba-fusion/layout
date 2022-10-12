import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type BaseSize = 'small' | 'medium' | 'large';

/**
 * 基础属性
 */
export type BaseProps = Omit<HTMLAttributes<HTMLElement>, 'title'>;

/**
 * 基础的小布局简写配置
 */
export type BaseGap = 'auto' | number;

export interface BaseBgMode {
  /**
   * 容器预置背景色
   */
  mode?: 'surface' | 'lining' | 'transparent';
}

export interface TypeMark {
  typeMark?: string;
}

/**
 * 断点
 */
export interface BreakPoint {
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

/**
 * 断点配置(至少 2 个)
 */
export type BreakPoints = BreakPoint[];

/**
 * 上下文
 */
export interface LayoutContextProps {
  /**
   * 类名前缀
   */
  prefix?: string;
  /**
   * 当前断点信息
   */
  breakPoint: BreakPoint;
  /**
   * 禁用页面内容的内边距
   */
  noPadding?: boolean;
  /**
   * 最大列数
   */
  maxNumberOfColumns: number;
  /**
   * content 中 "章" 之间的间距
   */
  sectionGap?: BaseGap;
  /**
   * 水槽间距
   */
  blockGap?: BaseGap;
  /**
   * 小布局间距（行、列、网格布局的 单元格-Cell 间距）
   */
  gridGap?: BaseGap;
}

/**
 * 内容
 */
export interface PageContentProps extends BaseProps, BaseBgMode {
  /**
   * 子节点
   */
  children?: ReactNode;
  /**
   * 禁用内容区域的默认内边距
   */
  noPadding?: boolean;
}

/**
 * 章节
 */
export interface SectionProps extends BaseProps {
  /**
   * 章节标题
   */
  title?: ReactNode;
  /**
   * 章节标题
   */
  titleAlign?: 'left' | 'center';
  /**
   * 附加内容
   */
  extra?: ReactNode;
  /**
   * 移除内边距
   */
  noPadding?: boolean;
  /**
   * 章节中区块的间隙
   */
  gap?: BaseGap;
  /**
   * 子节点
   */
  children?: ReactNode;
}

/**
 * 单元格容器
 */
export interface CellProps extends BaseProps {
  /**
   * 在行模式下，未设置 autoFit 时, 自定义单个 cell 的宽度，
   */
  width?: number | string;
  /**
   * 指定高度
   */
  height?: number | string;
  /**
   * 是否宽度（行模式下）/ 高度（列模式下）自适应内容
   */
  autoFit?: boolean;
  /**
   * 自定义内容间隙
   */
  gap?: BaseGap;
  /**
   * 主轴方向
   */
  direction?: 'hoz' | 'ver';
  /**
   * cell 子元素的水平对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * cell 子元素的垂直对齐方式
   */
  verAlign?: 'top' | 'middle' | 'bottom' | 'space-around' | 'space-between' | 'space-evenly';
  /**
   * 启用 display:block 模式(默认为 flex )
   */
  block?: boolean;
  /**
   * 孩子节点
   */
  children?: ReactNode;
}

/**
 * 区块，默认 flex 布局
 */
export interface BlockProps extends BaseProps, BaseBgMode, Omit<CellProps, 'width' | 'height'> {
  /**
   * 禁用 padding
   */
  noPadding?: boolean;
  /**
   * 展示标题与内容的分割线
   */
  divider?: boolean;
  /**
   * 展示边框
   */
  bordered?: boolean;
  /**
   * 列宽
   */
  span?: number;
  /**
   * 指定宽度
   */
  width?: number | string;
  /**
   * 有标题时生效,内容区域的样式名
   */
  contentClassName?: string;
  /**
   * 有标题时生效,内容区域的自定义样式
   */
  contentStyle?: CSSProperties;
  /**
   * 区块标题
   */
  title?: ReactNode;
  /**
   * 标题的对齐方式
   */
  titleAlign?: 'left' | 'center';
  /**
   * 附加内容
   */
  extra?: ReactNode;
  /**
   * 孩子节点
   */
  children?: ReactNode;
}

// ==========================小布局====================
/**
 *  cell 父容器组件
 */
export interface GridProps extends BaseProps {
  /**
   * 默认行列间距, `BaseGap`  可为预设值或 css 单位
   */
  gap?: [BaseGap, BaseGap];
  /**
   * 行数
   */
  rows?: number;
  /**
   * 列数
   */
  cols?: number;
  /**
   * 单元格的最小宽度
   */
  minWidth?: number;
  /**
   * 单元格的最大宽度
   */
  maxWidth?: number;
  /**
   * 行间隙,可为预设值 `small`， `medium`、`large`, `false` 或 css 长度单位。此项设置会覆盖 Page 上的 grid-gap 全局值
   */
  rowGap?: BaseGap;
  /**
   * 列间隙,可为预设值 `small`， `medium`、`large`, `false` 或 css 长度单位。此项设置会覆盖 Page 上的 grid-gap 全局值
   */
  colGap?: BaseGap;
  /**
   * 水平对齐方式
   */
  align?: 'left' | 'center' | 'right' | 'stretch';
  /**
   * 垂直对齐方式
   */
  verAlign?: 'top' | 'middle' | 'bottom' | 'stretch';
  /**
   * 自定义渲染网格项
   */
  renderItem?: (row: number, col: number) => ReactNode;
  /**
   * 孩子节点
   */
  children?: ReactNode;
}

/**
 * 行列通用属性类型
 */
interface BaseRowColPropBases extends BaseProps {
  /**
   * 是否 宽度/高度 自适应
   */
  autoFit?: boolean;
  /**
   * 单元格列间距尺寸, 可为预设值 `small`， `medium`、`large`, `false` 或 css 长度单位。此项设置会覆盖 Page 上的 grid-gap 全局值
   */
  gap?: BaseGap;
  /**
   * 固定宽度
   */
  width?: number | string;
  /**
   *固定高度
   */
  height?: number | string;
  /**
   * 自定义样式
   */
  style?: CSSProperties;
  /**
   * 孩子节点
   */
  children?: ReactNode;
}

/**
 * 行模式容器
 */
export interface RowProps extends BaseRowColPropBases {
  /**
   * 子元素垂直对齐方式
   */
  verAlign?: 'top' | 'middle' | 'bottom' | 'stretch' | 'baseline';
}

/**
 * 列模式容器
 */
export interface ColProps extends BaseRowColPropBases {
  /**
   * 子元素水平对齐方式
   */
  align?: 'left' | 'center' | 'right' | 'stretch';
}

/**
 * 字体
 */
export interface TextProps extends BaseProps {
  /**
   * 类型
   */
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  /**
   * 添加删除线样式
   */
  delete?: boolean;
  /**
   * 添加标记样式
   */
  mark?: boolean;
  /**
   * 添加下划线样式
   */
  underline?: boolean;
  /**
   * 是否加粗
   */
  strong?: boolean;
  /**
   * 添加代码样式
   */
  code?: boolean;
  /**
   * 设置标签类型
   */
  component?: string;
  /**
   * 自定义颜色
   */
  color?: string;
  /**
   * 文本对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 自定义背景色
   */
  backgroundColor?: string;
  /**
   * 子节点
   */
  children?: ReactNode;
}

/**
 * 段落
 */
export interface ParagraphProps extends BaseProps {
  /**
   * 字体类型（快捷方式），相当于 Typography
   */
  type?: TextProps['type'];
  /**
   * 水平对齐方式
   */
  align?: 'left' | 'right' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * 垂直对齐方式
   */
  verAlign?: 'top' | 'middle' | 'bottom' | 'baseline';
  /**
   * 子元素间水平间距
   */
  spacing?: BaseSize | string | number;
  /**
   * 子元素间具有垂直间距
   */
  hasVerSpacing?: boolean;
  /**
   * 段前间距尺寸（在父容器中的第一个段落无效）
   */
  beforeMargin?: number | string;
  /**
   * 段后间距尺寸 (在父容器中的最后一个段落无效)
   */
  afterMargin?: number | string;
  /**
   * 孩子节点
   */
  children?: ReactNode;
}

/**
 * 间距
 */
export interface SpaceProps extends BaseProps {
  /**
   * 尺寸
   */
  size?: BaseSize | string | number;
  /**
   * 布局方向
   */
  direction?: 'hoz' | 'ver';
  /**
   * 子元素
   */
  children?: ReactNode;
}
