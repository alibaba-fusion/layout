import { createContext } from 'react';
import { LayoutContextProps } from '../types';

export const defaultContext: LayoutContextProps = {
  prefix: 'fd-layout-',
  noPadding: false,
  sectionGap: undefined,
  blockGap: undefined,
  gridGap: undefined,
};

export default createContext<LayoutContextProps>(defaultContext);
