import { IPublicApiHotkey, IPublicApiProject } from '@alilc/lowcode-types';

interface cbFunc {
  (node: any, e: KeyboardEvent): void;
}

export interface IKeyBinding {
  command: string;
  keybinding: string | string[];
  components: string | string[];
  cb: cbFunc;
  desc?: string;
}

class KeybindingService {
  hotkey: IPublicApiHotkey;
  project: IPublicApiProject;
  keybindingMap: IKeyBinding[];

  constructor() {
    const engine = window.parent.AliLowCodeEngine;
    this.hotkey = engine.hotkey;
    this.project = engine.project;
    this.keybindingMap = [];
  }
  bind(kb: IKeyBinding) {
    if (kb.command && this.keybindingMap.find((k) => k.command === kb.command)) {
      console.warn('KeybindingService Error[duplicated command]', kb.command);
      return;
    }

    this.keybindingMap.push(kb);
    this.hotkey.bind(kb.keybinding, (e: KeyboardEvent) => {
      const node = this.getSelectedNode();
      if (!node) {
        console.warn(`No node select on keydown: ${kb.keybinding}`);
        return;
      }

      if (!this.isValidNode(node, kb)) {
        console.warn(`Not valid node for keydown target: ${kb.keybinding}`);
        return;
      }
      kb.cb.apply(null, [node, e]);
    });
  }
  // unbind, hotkey 暂时不支持
  execCommand(command: string, node: any, ...rest: any[]) {
    const targetKb = this.keybindingMap.find((kb) => kb.command === command);
    if (!targetKb) {
      console.warn(`No command founded from keybindingMap: ${command}`);
      return;
    }

    if (!node || !this.isValidNode(node, targetKb)) {
      console.warn(`Not valid node target for command: ${command} ${node}`);
      return;
    }

    targetKb.cb.apply(null, [node, ...rest]);
  }
  private getSelectedNode() {
    return this.project.currentDocument?.selection.getNodes()[0];
  }
  private isValidNode(node: any, kb: IKeyBinding) {
    return kb.components === '*' || kb.components.includes(node.componentName);
  }
}

export const keybindingService = new KeybindingService();
