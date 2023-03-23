import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Balloon from '@alifd/next/lib/balloon';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { initSingletonDivider } from './common/divider';
import { registHotKeys } from './common/hotkeys';
import { SECTION, BLOCK, CELL } from './names';
import { createBlockSnippet, createSectionSnippet } from './default-schema';
import * as ProLayout from '../src';
import './index.scss';
import { IPublicModelNode, IPublicTypeNodeData } from '@alilc/lowcode-types';

let pageLoaded = false;

const { Tooltip } = Balloon;
const { Page, Section, Block, Cell, Grid, Row, Col, P, Text, FixedPoint, FixedContainer } =
  ProLayout;

const {
  Header: PageHeader,
  Footer: PageFooter,
  Content: PageContent,
  Nav: PageNav,
  Aside: PageAside,
} = Page;

const FUSION_UI_VIEW_PREFIX = 'fd-layout-view';

const AddSection = ({ onClick, alwaysShow = false }: {
  onClick: MouseEventHandler;
  alwaysShow: boolean;
}) => {
  return (
    <div className={`${FUSION_UI_VIEW_PREFIX}-section-add`}>
      <div className={`${FUSION_UI_VIEW_PREFIX}-section-add-wrapper ${alwaysShow ? 'show' : ''}`}>
        <div className={`${FUSION_UI_VIEW_PREFIX}-section-add-icon`}>
          <div onClick={onClick}>Add Section</div>
        </div>
      </div>
    </div>
  );
};

function addNewSection(_leaf?: IPublicModelNode) {
  const prevSectionSchema =
    [...(_leaf?.schema?.children || [])].reverse().find((n) => n.componentName === SECTION) ||
    createSectionSnippet();
  const prevBlockSchema =
    [...prevSectionSchema?.children].reverse().find((n) => n.componentName === BLOCK) ||
    createBlockSnippet();
  const prevBlockProps = { ...prevBlockSchema.props };
  delete prevBlockProps.operation;

  _leaf?.insertAfter({
    ...prevSectionSchema,
    children: [
      {
        componentName: BLOCK,
        title: '区块',
        props: {
          ...prevBlockProps,
          span: 12,
        },
        children: [
          {
            componentName: CELL,
            title: '容器',
            props: {},
            children: [],
          },
        ],
      },
    ],
  });
}

const addNewBlock = (_leaf: IPublicModelNode | undefined) => {
  const children = _leaf?.schema?.children;
  const prevBlockSchema: IPublicTypeNodeData =
    [...((Array.isArray(children) ? children : []) || [])].reverse().find((n) => typeof n === 'object' && (n as any).componentName === BLOCK) ||
    createBlockSnippet();
  const prevBlockProps = { ...prevBlockSchema.props };
  delete prevBlockProps.operation;

  const blockSchema = createBlockSnippet();
  blockSchema.props = {
    ...prevBlockProps,
    span: 12,
  };

  const newNode = _leaf?.document?.createNode(blockSchema);
  newNode && _leaf?.insertAfter(newNode);
  newNode && newNode.select();
};

const PageView = (props: {
  _leaf?: IPublicModelNode;
  [key: string]: any;
}) => {
  const { children, _leaf, ...others } = props;

  const isTab = _leaf?.props?.getPropValue('isTab');
  const hasSection = Array.isArray(_leaf?.schema.children) && _leaf?.schema.children?.length;

  useEffect(() => {
    if (!pageLoaded) {
      registHotKeys();
      // 加载切割的交互能力
      initSingletonDivider();

      // 增加快捷选择父节点的按钮
      window.parent?.AliLowCodeEngine?.material?.addBuiltinComponentAction({
        name: 'to Parent',
        content: {
          icon: (
            <svg viewBox="0 0 1024 1024" width="14">
              <path
                d="M896 96H128c-17.066667 0-32 14.933333-32 32S110.933333 160 128 160h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM535.466667 296.533333c-12.8-12.8-32-12.8-44.8 0l-213.333334 213.333334c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0l157.866667-157.866667V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V396.8l157.866667 157.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-213.333333-213.333334z"
                fill="#ffffff"
              />
            </svg>
          ),
          title: 'Select Parent',
          action(node) {
            if (node.parent) {
              node.parent.select();
            }
          },
        },
        important: true,
      });
      pageLoaded = true;
    }
  }, []);

  return (
    <Page {...others}>
      {children}
      {!isTab && <AddSection onClick={() => addNewSection(_leaf)} alwaysShow={!hasSection} />}
    </Page>
  );
};

const SectionView = (props: {
  _leaf?: IPublicModelNode;
  [key: string]: any;
}) => {
  const { children, _leaf, ...others } = props;

  return (
    <>
      <Section {...others}>{children}</Section>
      <div className={`${FUSION_UI_VIEW_PREFIX}-block-add`}>
        <Tooltip
          v2
          align="b"
          trigger={
            <div onClick={() => addNewBlock(_leaf)} className={`${FUSION_UI_VIEW_PREFIX}-icon-add`}>
              <svg
                viewBox="0 0 1024 1024"
                width="24"
                height="24"
                style={{ transform: 'scale(0.5)' }}
              >
                <path
                  d="M524.8 64c4.693333 0 8.533333 3.84 8.533333 8.533333V490.666667h418.133334c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H533.333333v418.133333a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V554.666667H51.2a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H469.333333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h46.933333z"
                  fill="#FFF"
                />
              </svg>
            </div>
          }
        >
          在下方添加区块
        </Tooltip>
      </div>
    </>
  );
};

const BlockView = (props: any) => {
  return <Block {...props} />;
};

const GridView = (props: any) => {
  return <Grid {...props} />;
};

const ColView = (props: any) => {
  return <Col {...props} />;
};

const RowView = (props: any) => {
  return <Row {...props} />;
};

const CellView = (props: any) => {
  const { children, ...others } = props;
  useEffect(() => {
    if (!pageLoaded) {
      console.warn('容器组件 Cell 必须在自然布局内使用');
    }
  }, []);

  let newChildren = children;
  if (!children?.length) {
    newChildren = <div className="lc-container-placeholder">拖拽组件或模板到这里</div>;
  }

  return <Cell {...others}>{newChildren}</Cell>;
};

const PView = (props: any) => {
  return <P {...props} />;
};

const TextView = (props: any) => {
  return <Text {...props} />;
};

const PageHeaderView = (props: any) => {
  return <PageHeader {...props} />;
};

const PageFooterView = (props: any) => {
  return <PageFooter {...props} />;
};

const PageContentView = (props: any) => {
  const { children, _leaf, ...others } = props;
  const hasSection = _leaf.schema.children?.length;

  return (
    <PageContent {...others}>
      {children}
      <AddSection onClick={() => addNewSection(_leaf)} alwaysShow={!hasSection} />
    </PageContent>
  );
};

const PageNavAsideView = (props: {
  _leaf?: IPublicModelNode;
  [key: string]: any;
}) => {
  const { children, _leaf, component: Tag, ...others } = props;
  return (
    <Tag {...others}>
      {children}
      <div className={`${FUSION_UI_VIEW_PREFIX}-block-add`}>
        <Tooltip
          v2
          align="b"
          trigger={
            <div onClick={() => addNewBlock(_leaf)} className={`${FUSION_UI_VIEW_PREFIX}-icon-add`}>
              <svg
                viewBox="0 0 1024 1024"
                width="24"
                height="24"
                style={{ transform: 'scale(0.5)' }}
              >
                <path
                  d="M524.8 64c4.693333 0 8.533333 3.84 8.533333 8.533333V490.666667h418.133334c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H533.333333v418.133333a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V554.666667H51.2a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H469.333333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h46.933333z"
                  fill="#FFF"
                />
              </svg>
            </div>
          }
        >
          在下方添加区块
        </Tooltip>
      </div>
    </Tag>
  );
};

const PageNavView = (props: any) => {
  return <PageNavAsideView {...props} component={PageNav} />;
};
const PageAsideView = (props: any) => {
  return <PageNavAsideView {...props} component={PageAside} />;
};

const FixedPointView = (props: {
  _leaf?: IPublicModelNode;
  [key: string]: any;
}) => {
  const { _leaf, children, left = 0, top = 0, ...others } = props;

  // hack engine for mousedown
  if (_leaf?.parent) {
    _leaf.parent.isRGLContainerNode = true;
  }

  // const enableMouseEventPropagationInCanvas = useRef();
  const movehook = useRef<(currentNode: any) => boolean>();
  const [isDraging, setDraging] = useState(false);
  const [disabled, setDisaled] = useState(false);

  // 第一次拖拽 x/y=0
  const onDragStart = () => {
    // hack engine for mousemove
    // enableMouseEventPropagationInCanvas.current = window.parent.AliLowCodeEngine.editorCabin.engineConfig.config.enableMouseEventPropagationInCanvas;
    window.parent.AliLowCodeEngine.config.set('enableMouseEventPropagationInCanvas', true);

    // disable move
    movehook.current = _leaf?.componentMeta?.getMetadata().experimental?.callbacks?.onMoveHook;
    if (_leaf?.componentMeta?.getMetadata().experimental?.callbacks) {
      _leaf.componentMeta.getMetadata().experimental!.callbacks!.onMoveHook = () => false;
    }
    setDraging(true);
  };
  const onDragEnd = (e: DraggableEvent, uiData: DraggableData) => {
    // window.parent.AliLowCodeEngine.editorCabin.engineConfig.config.enableMouseEventPropagationInCanvas = enableMouseEventPropagationInCanvas.current;
    if (_leaf?.componentMeta?.getMetadata().experimental?.callbacks) {
      _leaf.componentMeta.getMetadata().experimental!.callbacks!.onMoveHook = movehook.current;
    }

    _leaf?.setPropValue('left', uiData.x + left);
    _leaf?.setPropValue('top', uiData.y + top);

    setDraging(false);
  };

  return (
    <FixedPoint {...others} left={left} top={top}>
      <Draggable
        onStart={onDragStart}
        onStop={onDragEnd}
        disabled={disabled}
        position={{ x: 0, y: 0 }}
      >
        <div style={{ position: 'relative', border: isDraging ? '1px solid blue' : '' }}>
          {children}
          <div
            className={`${FUSION_UI_VIEW_PREFIX}-float-move left`}
            onMouseEnter={() => {
              setDisaled(true);
            }}
            title="拖动插入点"
          >
            <svg viewBox="0 0 1024 1024" width="20" height="20">
              <path
                fill="#0000ff75"
                d="M912 532v380H112V112h800v420z m-54 207.63V590.25L609.788 858h129.843zM165 251.08v125.91L376.987 165h-125.9zM165 515v125.9L640.9 165H515z m613.906-350L165 778.91V858h46.809L858 211.81V165h-79.094zM858 349.82L349.817 858H474.99L858 469.74V349.82z"
              />
            </svg>
          </div>
          <div
            className={`${FUSION_UI_VIEW_PREFIX}-float-move`}
            onMouseEnter={() => {
              setDisaled(false);
            }}
            title="拖动浮层位置"
          >
            <svg viewBox="0 0 1024 1024" width="20" height="20">
              <path
                fill="#808080"
                d="M912 532v380H112V112h800v420z m-54 207.63V590.25L609.788 858h129.843zM165 251.08v125.91L376.987 165h-125.9zM165 515v125.9L640.9 165H515z m613.906-350L165 778.91V858h46.809L858 211.81V165h-79.094zM858 349.82L349.817 858H474.99L858 469.74V349.82z"
              />
            </svg>
          </div>
        </div>
      </Draggable>
    </FixedPoint>
  );
};

interface IFixedContainerViewProps {
  _leaf: IPublicModelNode;
  children: any;
  items: any;
}

const FixedContainerView = (props: IFixedContainerViewProps) => {
  const { _leaf, children, items = [], ...others } = props;

  // hack engine for mousedown
  if (_leaf.parent) {
    _leaf.parent.isRGLContainer = true;
  }

  // const enableMouseEventPropagationInCanvas = useRef();
  const movehook: any = useRef();
  const [isDraging, setDraging] = useState(false);

  // 第一次拖拽 x/y=0
  const onDragStart = () => {
    // hack engine for mousemove
    // enableMouseEventPropagationInCanvas.current = window.parent.AliLowCodeEngine.editorCabin.engineConfig.config.enableMouseEventPropagationInCanvas;
    window.parent.AliLowCodeEngine.config.set('enableMouseEventPropagationInCanvas', true);

    // disable move
    movehook.current = _leaf?.componentMeta?.getMetadata().experimental?.callbacks?.onMoveHook;
    // TODO: 不一定能设置上
    if (_leaf.componentMeta?.getMetadata()?.experimental?.callbacks?.onMoveHook) {
      _leaf.componentMeta.getMetadata().experimental!.callbacks!.onMoveHook = () => false;
    }
    setDraging(true);
  };
  const onDragEnd = (uiData: DraggableData, idx: number) => {
    // window.parent.AliLowCodeEngine.editorCabin.engineConfig.config.enableMouseEventPropagationInCanvas = enableMouseEventPropagationInCanvas.current;
    // // TODO: 不一定能设置上
    if (_leaf.componentMeta?.getMetadata()?.experimental?.callbacks?.onMoveHook) {
      _leaf.componentMeta.getMetadata().experimental!.callbacks!.onMoveHook = movehook.current;
    }

    // 有节点增加
    const newItems = [..._leaf.schema.children].map((child, index) => {
      const item = items.find((i) => i.primaryKey === child.id) || {
        primaryKey: child.id,
        top: 0,
        left: 0,
        zIndex: index + 1,
      };

      if (idx === index) {
        item.left = uiData.x + item.left;
        item.top = uiData.y + item.top;
      }

      return item;
    });

    _leaf.setPropValue('items', newItems);
    setDraging(false);
  };

  return (
    <FixedContainer {...others} items={items}>
      {children.map((child, idx: number) => {
        return (
          <Draggable
            onStart={onDragStart}
            onStop={(e, uiData) => onDragEnd(uiData, idx)}
            position={{ x: 0, y: 0 }}
          >
            <div style={{ position: 'relative', border: isDraging ? '1px solid blue' : '' }}>
              {child}
              <div className={`${FUSION_UI_VIEW_PREFIX}-float-move`} title="拖动浮层位置">
                <svg viewBox="0 0 1024 1024" width="20" height="20">
                  <path
                    fill="#808080"
                    d="M912 532v380H112V112h800v420z m-54 207.63V590.25L609.788 858h129.843zM165 251.08v125.91L376.987 165h-125.9zM165 515v125.9L640.9 165H515z m613.906-350L165 778.91V858h46.809L858 211.81V165h-79.094zM858 349.82L349.817 858H474.99L858 469.74V349.82z"
                  />
                </svg>
              </div>
            </div>
          </Draggable>
        );
      })}
    </FixedContainer>
  );
};

hoistNonReactStatic(PageView, Page);
hoistNonReactStatic(SectionView, Section);
hoistNonReactStatic(BlockView, Block);
hoistNonReactStatic(CellView, Cell);
hoistNonReactStatic(GridView, Grid);
hoistNonReactStatic(RowView, Row);
hoistNonReactStatic(ColView, Col);
hoistNonReactStatic(TextView, Text);
hoistNonReactStatic(PView, P);
hoistNonReactStatic(PageHeaderView, PageHeader);
hoistNonReactStatic(PageFooterView, PageFooter);
hoistNonReactStatic(PageContentView, PageContent);
hoistNonReactStatic(PageAsideView, PageAside);
hoistNonReactStatic(PageNavView, PageNav);
hoistNonReactStatic(FixedPointView, FixedPoint);
hoistNonReactStatic(FixedContainerView, FixedContainer);

PageView.Header = PageHeaderView;
PageView.Footer = PageFooterView;
PageView.Nav = PageNavView;
PageView.Aside = PageAsideView;
PageView.Content = PageContentView;

export {
  PageView as Page,
  SectionView as Section,
  BlockView as Block,
  GridView as Grid,
  RowView as Row,
  ColView as Col,
  CellView as Cell,
  TextView as Text,
  PView as P,
  FixedPointView as FixedPoint,
  FixedContainerView as FixedContainer,
};
