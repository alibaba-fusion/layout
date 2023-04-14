import { IPublicModelSettingPropEntry, IPublicTypeFieldConfig } from '@alilc/lowcode-types';

import { PAGE_NAV, PAGE_ASIDE } from '../names';
import { createNavSnippet, createAsideSnippet } from '../default-schema';

const navAside: IPublicTypeFieldConfig[] = [
  {
    name: '!nav',
    title: {
      label: '左侧区域',
    },
    setter: 'BoolSetter',
    extraProps: {
      getValue: (target: IPublicModelSettingPropEntry) => {
        const pageNode = target.node;
        return !!pageNode?.children?.find((n) => n.componentName === PAGE_NAV);
      },
      setValue: (target: IPublicModelSettingPropEntry, value: boolean) => {
        const pageNode = target.node;
        const navNode = pageNode?.children?.find((n) => n.componentName === PAGE_NAV);
        if (value && !navNode) {
          const navSnippets = createNavSnippet();
          const navNode2 = pageNode?.document?.createNode(navSnippets);
          navNode2 && pageNode?.insertAfter(navNode2);
        } else if (!value && navNode) {
          navNode.remove();
        }
      },
    },
  },
  {
    name: '!aside',
    title: {
      label: '右侧区域',
    },
    setter: 'BoolSetter',
    extraProps: {
      getValue: (target: IPublicModelSettingPropEntry) => {
        const pageNode = target.node;
        return !!pageNode?.children?.find((n) => n.componentName === PAGE_ASIDE);
      },
      setValue: (target: IPublicModelSettingPropEntry, value: boolean) => {
        const pageNode = target.node;
        const asideNode = pageNode?.children?.find((n) => n.componentName === PAGE_ASIDE);
        if (value && !asideNode) {
          const navSnippets = createAsideSnippet();
          const asideNode2 = pageNode?.document?.createNode(navSnippets);
          asideNode2 && pageNode?.insertAfter(asideNode2);
        } else if (!value && asideNode) {
          asideNode.remove();
        }
      },
    },
  },
];

export default navAside;
