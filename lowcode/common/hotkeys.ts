import { splitNodeByDimension, autoPCellWithEnter, autoPCellWithTab } from './split/auto-cell';
import { keybindingService } from './keybindingService';
import { CELL, ROW, COL, BLOCK, P } from '../names';

/**
 * 是否正在输入中
 * @returns
 */
function isInLiveEditing() {
  return window.parent.AliLowCodeEngine.canvas?.isInLiveEditing;
}
/**
 * 是否focus在表单
 * @param e
 * @returns
 */
function isFormEvent(e: KeyboardEvent | MouseEvent) {
  const t = e.target as HTMLFormElement;
  if (!t) {
    return false;
  }

  if (t.form || /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) {
    return true;
  }
  if (
    t instanceof HTMLElement &&
    /write/.test(window.getComputedStyle(t).getPropertyValue('-webkit-user-modify'))
  ) {
    return true;
  }
  return false;
}

export const registHotKeys = () => {
  // append a row
  keybindingService.bind({
    command: 'horizontalDividerCommands',
    keybinding: 's',
    components: [CELL, ROW, COL, BLOCK],
    cb: (node, e) => {
      if (isInLiveEditing() || isFormEvent(e)) {
        return;
      }
      splitNodeByDimension('v', node);
    },
    desc: 'append a row',
  });
  // preappend a row
  keybindingService.bind({
    command: 'preHorizontalDividerCommands',
    keybinding: 'shift+s',
    components: [CELL, ROW, COL, BLOCK],
    cb: (node) => {
      splitNodeByDimension('v', node, true);
    },
    desc: 'preappend a row',
  });
  // append a col
  keybindingService.bind({
    command: 'verticalDividerCommands',
    keybinding: 'w',
    components: [CELL, ROW, COL],
    cb: (node, e) => {
      if (isInLiveEditing() || isFormEvent(e)) {
        return;
      }
      splitNodeByDimension('h', node);
    },
    desc: 'append a col',
  });
  // preappend a col
  keybindingService.bind({
    command: 'preVerticalDividerCommands',
    keybinding: 'shift+w',
    components: [CELL, ROW, COL],
    cb: (node) => {
      splitNodeByDimension('h', node, true);
    },
    desc: 'preappend a col',
  });

  // 回车换行，是否有办法作用所有 P 元素内的组件？
  keybindingService.bind({
    command: 'enterPCommands',
    keybinding: 'enter',
    components: '*',
    cb: (node, e) => {
      // 正在输入则忽略
      if (isInLiveEditing() || isFormEvent(e)) {
        return;
      }

      if (node.parent.componentName === P) autoPCellWithEnter(node);
    },
    desc: 'Enter 换行, 把node后的所有组件带过去',
  });

  // tab push，是否有办法作用所有 P 元素内的组件？
  keybindingService.bind({
    command: 'tabPCommands',
    keybinding: 'tab',
    components: '*',
    cb: (node, e) => {
      // 正在输入则忽略
      if (isInLiveEditing() || isFormEvent(e)) {
        // console.log(/in tab/)
        return;
      }

      if (node.parent.componentName === P) autoPCellWithTab(node);
    },
    desc: 'Tab 换列, 把node后的所有组件带过去',
  });

  // f
  keybindingService.bind({
    command: 'fUpCommands',
    keybinding: 'f',
    components: '*',
    cb: (node, e) => {
      // 正在输入则忽略
      if (isInLiveEditing() || isFormEvent(e)) {
        // console.log(/in tab/)
        return;
      }
      if (node?.parent?.componentName === P && node.parent?.parent) {
        node.parent.parent.select();
      } else if (node.parent) {
        node.parent.select();
      }
    },
    desc: 'f 选择父组件',
  });

  keybindingService.bind({
    command: 'aOpenMaterialPanelCommands',
    keybinding: 'a',
    components: '*',
    cb: (node, e) => {
      // 正在输入则忽略
      if (isInLiveEditing() || isFormEvent(e)) {
        return;
      }
      window.parent.AliLowCodeEngine.skeleton.showPanel('componentsPane');
    },
    desc: 'a 打开物料面板',
  });

  // command+k 快速选中变成链接
  // keybindingService.bind({
  //   command: 'textToLinkCommands',
  //   keybinding: 'command+k',
  //   components: '*',
  //   cb: (node, e) => {
  //     const selection = window.getSelection();
  //     if (node.componentName === 'NextText' && isInLiveEditing() && selection.toString()) {
  //       const range = selection.getRangeAt(0);
  //       const text = selection.focusNode.textContent;

  //       const firstText = text.slice(0, range.startOffset);
  //       const selectedText = text.slice(range.startOffset, range.endOffset);
  //       const lastText = text.slice(range.endOffset, text.length - 1);

  //       console.log(firstText, selectedText, lastText);
  //     }

  //     // window.parent.AliLowCodeEngine.skeleton.showPanel('componentsPane');
  //   },
  //   desc: 'command+k 把选中部分的文字快速变成链接',
  // });
};
