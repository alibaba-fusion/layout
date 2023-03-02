import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { splitNodeByDimension } from './split/auto-cell';
import { CELL, ROW, COL, BLOCK } from '../names';
import { IPublicApiProject, IPublicModelNode } from '@alilc/lowcode-types';

export interface IDividerProps {
  split: (dimension: 'v' | 'h' | 'm', node: any) => void;
}

interface Pos {
  dimension: 'v' | 'h' | 'm';
  left: number;
  top: number;
  node: IPublicModelNode;
}

const FUSION_UI_VIEW_PREFIX = 'fd-layout-view';

export const initSingletonDivider = (id?: string) => {
  const dividerId = id || 'default-layout-divider';
  const pageC = getPageRootDOMNode();
  if (!pageC) return;

  const $el = pageC.ownerDocument.getElementById(dividerId);

  if (!$el) {
    const dividerWrapper = createDividerWrapperNode(dividerId);
    pageC && pageC.appendChild(dividerWrapper);
    ReactDOM.render(<Divider split={splitNodeByDimension} />, dividerWrapper);
  }
};

export const Divider = (props: IDividerProps) => {
  const engine = useRef(window.parent.AliLowCodeEngine);
  const [cuts, setCuts] = useState<Pos[]>([]);
  const [disabled, setDisabled] = useState(false);
  const computCuts = useCallback((selectedNode) => {
    const dimension = getSplitDimension(selectedNode.componentName);
    const rect = selectedNode.getRect();
    const newCuts: Pos[] = [];

    const pageC = getPageRootDOMNode();
    const pageCRect = pageC ? pageC.getBoundingClientRect() : { left: 0, top: 0 };

    if (!rect || !pageCRect) {
      return;
    }

    if (dimension.h) {
      newCuts.push({
        dimension: 'h',
        left: rect.left - pageCRect.left,
        top: rect.top + rect.height / 2 - pageCRect.top,
        node: selectedNode,
      });
    }

    if (dimension.v && rect && pageCRect) {
      newCuts.push({
        dimension: 'v',
        left: rect.left + rect.width / 2 - pageCRect.left,
        top: rect.top - pageCRect.top,
        node: selectedNode,
      });
    }

    if (dimension.m) {
      newCuts.push({
        dimension: 'm',
        left: rect.left + rect.width / 2 - pageCRect.left,
        top: rect.top + rect.height / 2 - pageCRect.top,
        node: selectedNode,
      });
    }

    setCuts(newCuts);
  }, []);

  const onSelectionChange = useCallback((timer = 100) => {
    setDisabled(false);

    const selectedNode = getSelectedNode(engine.current);
    if (!selectedNode) {
      setCuts([]);
      return;
    }

    // TODO
    // 目前 selectionChang 时 dom 结构可能还在变化
    // 会偶尔导致 computCuts 计算尺寸出现问题，需要优化
    if (timer) {
      setTimeout(() => {
        computCuts(selectedNode);
      }, timer);
    } else {
      computCuts(selectedNode);
    }
  }, []);

  useEffect(() => {
    const { project } = engine.current;
    if (!project) return;

    project.currentDocument?.onChangeSelection(() => onSelectionChange(100));
  }, []);

  /*
  // 目前在 resize 开始/结束时会重新计算
  // 所以暂时不需要去监听了
  const resizeObserver = useRef(
    new ResizeObserver(() => {
      onSelectionChange();
    }),
  );
  useEffect(() => {
    engine.current.selection.onSelectionChange(() => {
      const selectedNode = getSelectedNode(engine.current);
      try {
        setTimeout(() => {
          resizeObserver.current.disconnect();
          selectedNode &&
            selectedNode.getDOMNode() &&
            resizeObserver.current.observe(selectedNode.getDOMNode());
        }, 50);
      } catch (error) {
        console.err(error);
      }
    });
  }, []);
  */

  const onDisabled = useCallback(() => {
    setDisabled(true);
  }, []);
  const onEnabled = useCallback(() => {
    setDisabled(false);
    onSelectionChange(0);
  }, [onSelectionChange]);

  useEffect(() => {
    const { contentWindow } = (engine as any).current.project.simulator;
    contentWindow.addEventListener('dividerDisable', onDisabled);
    contentWindow.addEventListener('dividerEnable', onEnabled);

    return () => {
      contentWindow.removeEventListener('dividerDisable', onDisabled);
      contentWindow.removeEventListener('dividerEnable', onEnabled);
    };
  }, [onDisabled, onEnabled]);

  if (disabled) return null;
  return (
    <>
      {/* vertical */}
      <Cut pos={cuts.find((p) => p.dimension === 'v')!} split={props.split} />

      {/* horizontal */}
      <Cut pos={cuts.find((p) => p.dimension === 'h')!} split={props.split} />

      {/* middle for grid */}
      {/* <Cut pos={cuts.find((p) => p.dimension === 'm')} split={props.split} /> */}
    </>
  );
};

interface ICutProps {
  split: (dimension: 'v' | 'h' | 'm', node: any) => void;
  pos: Pos;
}

const Cut = (props: ICutProps) => {
  const [showLine, setLineVisibility] = useState(false);
  const { pos, split } = props;
  if (!pos || !pos.node) return null;

  const objectRect: DOMRect | {
    [key: string]: undefined;
  } = pos.node.getRect() || {};
  const computeLineStyle = (): {
    width: number | undefined;
    height: number | undefined;
    transform?: string | undefined;
  } & Pos | null => {
    if (pos?.dimension === 'v') {
      return {
        width: 1,
        height: objectRect.height,
        transform: 'translate(-50%, 0)',
        ...pos,
      };
    } else if (pos?.dimension === 'h') {
      return {
        width: objectRect.width,
        height: 1,
        ...pos,
      };
    } else if (pos?.dimension === 'm') {
      return {
        width: objectRect.width,
        height: objectRect.height,
        transform: 'translate(-50%, 0)',
        ...pos,
      };
    }
    return null;
  };

  const computeCutStyle = () => {
    const isNanoSized = objectRect.width <= 60;
    const getTransform = () => {
      const gap = isNanoSized ? 0 : 8;
      const scale = isNanoSized ? 'scale(.6)' : '';
      switch (pos?.dimension) {
        case 'v':
          return `translate(-50%, ${gap}px) ${scale}`;
        case 'h':
          return `translate(${gap}px, -50%) rotate(270deg) ${scale}`;
        case 'm':
        default:
          return `translate(-50%, -50%) rotate(45deg) ${scale}`;
      }
    };

    return {
      ...pos,
      transform: getTransform(),
    };
  };

  const lineStyle: React.CSSProperties = computeLineStyle() || {};
  return (
    <>
      <div
        className={`${FUSION_UI_VIEW_PREFIX}-divider`}
        style={computeCutStyle()}
        onMouseEnter={() => setLineVisibility(true)}
        onMouseLeave={() => setLineVisibility(false)}
        onClick={() => {
          split(pos.dimension, pos.node);
          setTimeout(() => setLineVisibility(false), 20);
        }}
      >
        <div className={`${FUSION_UI_VIEW_PREFIX}-dividerImg`} />
      </div>
      {showLine &&
        (pos.dimension === 'm' ? (
          <>
            <div
              className={`${FUSION_UI_VIEW_PREFIX}-dividerLine`}
              style={{ ...lineStyle, height: 1 }}
            />
            <div
              className={`${FUSION_UI_VIEW_PREFIX}-dividerLine`}
              style={{ ...lineStyle, width: 1, top: Number(lineStyle!.top) - Number(lineStyle!.height) / 2 }}
            />
          </>
        ) : (
          <div className={`${FUSION_UI_VIEW_PREFIX}-dividerLine`} style={lineStyle} />
        ))}
    </>
  );
};

// utils
const getSplitDimension = (componentName: string) => {
  const dimension = {
    v: false,
    h: false,
    m: false,
  };

  switch (componentName) {
    case ROW:
    case COL:
      dimension.v = true;
      dimension.h = true;
      break;
    case CELL:
      dimension.v = true;
      dimension.h = true;
      // dimension.m = true;
      break;
    case BLOCK:
      dimension.v = true;
      break;
    default:
      break;
  }

  return dimension;
};

const getSelectedNode = ({ project }: { project: IPublicApiProject }): IPublicModelNode | undefined => {
  return project.currentDocument?.selection.getNodes()[0];
};

const getPageRootDOMNode = () => {
  return window.parent.AliLowCodeEngine.project.currentDocument?.root?.getDOMNode();
};

const createDividerWrapperNode = (dividerId: string) => {
  const node = document.createElement('div');
  node.id = dividerId;
  node.style.position = 'absolute';
  node.style.top = '0';
  node.style.left = '0';
  node.style.zIndex = '10001';
  return node;
};
