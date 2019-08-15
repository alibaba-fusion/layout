import React from 'react';
import { Box, Grid } from '@alifd/layout';

const defaultPropsForLayoutProps = {
  fixedWidth: 100,
  frWidth: 1,
  fixedHeight: 100,
  aHeight: '3',
  frHeight: 1,
  before: 'auto',
  after: 'auto',
  alongAlignChildren: 'start',
  crossAlignChildren: 'start',
  alongAlignSelf: 'auto',
  crossAlignSelf: 'auto',
  columns: 3,
  minWidth: 16,
  minHeight: 16,
  maxWidth: 'none',
  maxHeight: 'none',
  spacing: [10, 10],
  padding: 10,
  position: 'normal',
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
};

const getWidthProps = (aWidth, parentType, fixedWidth, frWidth) => {
  if (aWidth === '3') { // content-dependent
    if (parentType === 'col') return { alignSelf: 'auto', width: 'auto' };
    if (parentType === 'row') return { flex: [0, 0, 'auto'], width: 'auto' };
    if (parentType === 'flow') return { flex: [0, 0, 'auto'], width: 'auto' };
    if (parentType === 'grid') return { justifySelf: 'auto', width: 'auto' };
    return { width: 'auto' };
  } else if (aWidth === '1') { // fixed width
    if (parentType === 'col') return { alignSelf: 'auto', width: fixedWidth };
    if (parentType === 'row') return { flex: [0, 0, 'auto'], width: fixedWidth };
    if (parentType === 'flow') return { flex: [0, 0, 'auto'], width: fixedWidth };
    if (parentType === 'grid') return { justifySelf: 'auto', width: fixedWidth };
    return { width: fixedWidth };
  } else if (aWidth === '4') {
    if (parentType === 'col') return { alignSelf: 'stretch', width: 'auto' };
    if (parentType === 'row') return { flex: [frWidth, 1, 'auto'], width: 'auto' };
    if (parentType === 'flow') return { flex: [0, 0, 'auto'], width: 'auto' }; // change width to '3'
    if (parentType === 'grid') return { justifySelf: 'stretch', width: 'auto' };
    return { width: '100%' };
  }
  return {};
};

const getHeightProps = (aHeight, parentType, fixedHeight, frHeight) => {
  if (aHeight === '3') { // content-dependent
    if (parentType === 'row') return { alignSelf: 'auto', height: 'auto' };
    if (parentType === 'col') return { flex: [0, 0, 'auto'], height: 'auto' };
    if (parentType === 'flow') return { alignSelf: 'auto', height: 'auto' };
    if (parentType === 'grid') return { alignSelf: 'auto', height: 'auto' };
    return { height: 'auto' };
  } else if (aHeight === '1') { // fixed width
    if (parentType === 'row') return { alignSelf: 'auto', height: fixedHeight };
    if (parentType === 'col') return { flex: [0, 0, 'auto'], height: fixedHeight };
    if (parentType === 'flow') return { alignSelf: 'auto', height: fixedHeight };
    if (parentType === 'grid') return { alignSelf: 'auto', height: fixedHeight };
    return { height: fixedHeight };
  } else if (aHeight === '4') {
    if (parentType === 'row') return { alignSelf: 'stretch', height: 'auto' };
    if (parentType === 'col') return { flex: [frHeight, 1, 'auto'], height: 'auto' };
    if (parentType === 'flow') return { alignSelf: 'stretch', height: 'auto' };
    if (parentType === 'grid') return { alignSelf: 'stretch', height: 'auto' };
    return { height: '100%' };
  }
  return {};
};

const getSpacingProps = (spacing, type) => {
  if (type === 'grid') return { gap: spacing };
  else return { spacing };
};

const changeAlignPropsForFlex = (value) => {
  if (value === 'start') return 'flex-start';
  if (value === 'end') return 'flex-end';
  return value;
}

const getAlongAlignSelfProps = (alongAlignSelf, parentType) => {
  if (parentType === 'grid') {
    return { justifySelf: alongAlignSelf };
  }
  return {};
}

const getCrossAlignSelfProps = (crossAlignSelf, parentType) => {
  if (parentType === 'grid') {
    return { alignSelf: crossAlignSelf };
  } else if (parentType) {
    return { alignSelf: changeAlignPropsForFlex(crossAlignSelf) };
  }
  return {};
}

const getAlongAlignChildrenProps = (alongAlignChildren, type) => {
  if (type === 'grid') {
    return { justify: alongAlignChildren };
  } else {
    return { justify: changeAlignPropsForFlex(alongAlignChildren) };
  }
}

const getCrossAlignChildrenProps = (crossAlignChildren, type) => {
  if (type === 'grid') {
    return { align: crossAlignChildren };
  } else {
    return { align: changeAlignPropsForFlex(crossAlignChildren) };
  }
}

export const getPropsForLayoutComps = (type, parentType) => ({
  type,
  parentType,
  ...defaultPropsForLayoutProps,
  aWidth: (parentType !== 'col' && type !== 'flow') ? '3' : '4',
});

export const adaptor = ({
  type,
  parentType, // optional
  aWidth, // width.endsWith('fr') && parentType === 'flow', width === '3'
  fixedWidth = defaultPropsForLayoutProps.fixedWidth,
  frWidth = defaultPropsForLayoutProps.frWidth, // 只在parentType row下面才可选非1
  aHeight = defaultPropsForLayoutProps.aHeight,
  fixedHeight = defaultPropsForLayoutProps.fixedHeight,
  frHeight = defaultPropsForLayoutProps.frHeight, // 只在parentType col下面可选非1
  // before = defaultPropsForLayoutProps.before,
  // after = defaultPropsForLayoutProps.before,
  alongAlignChildren = defaultPropsForLayoutProps.alongAlignChildren,
  crossAlignChildren = defaultPropsForLayoutProps.crossAlignChildren,
  alongAlignSelf = defaultPropsForLayoutProps.alongAlignSelf, // 只在grid下面才有
  crossAlignSelf = defaultPropsForLayoutProps.crossAlignSelf,
  columns = defaultPropsForLayoutProps.columns,
  minWidth = defaultPropsForLayoutProps.minWidth,
  minHeight = defaultPropsForLayoutProps.minHeight,
  maxWidth = defaultPropsForLayoutProps.maxWidth,
  maxHeight = defaultPropsForLayoutProps.maxHeight,
  spacing = defaultPropsForLayoutProps.spacing,
  padding = defaultPropsForLayoutProps.padding,
  position = defaultPropsForLayoutProps.position,
  top = defaultPropsForLayoutProps.top,
  bottom = defaultPropsForLayoutProps.bottom,
  left = defaultPropsForLayoutProps.left,
  right = defaultPropsForLayoutProps.right,
  style,
  children,
  ...rest,
}) => {
  let aSafeWidth = aWidth;
  if (!aSafeWidth) {
    aSafeWidth = (parentType !== 'col' && type !== 'flow') ? '3' : '4'
  }
  const props = {
    padding,
    position,
    top,
    bottom,
    left,
    right,
    ...(aWidth === '3' || aWidth === '4') ? {
      minWidth,
      maxWidth,
    } : {
      minWidth: 'none',
      maxWidth: 'none',
    },
    ...(aHeight === '3' || aHeight === '4') ? {
      minHeight,
      maxHeight,
    } : {
      minHeight: 'none',
      maxHeight: 'none',
    },
    columns, // 只有grid才有
    ...getWidthProps(aSafeWidth, parentType, fixedWidth, frWidth),
    ...getHeightProps(aHeight, parentType, fixedHeight, frHeight),
    ...getSpacingProps(spacing, type),
    ...getAlongAlignSelfProps(alongAlignSelf, parentType),
    ...getCrossAlignSelfProps(crossAlignSelf, parentType),
    ...getAlongAlignChildrenProps(alongAlignChildren, type),
    ...getCrossAlignChildrenProps(crossAlignChildren, type),
    style: {
      ...style,
    },
    ...rest,
  };
  let result;

  switch (type) {
    case 'row':
      result = (
        <Box
          {...props}
          direction="row"
          wrap="nowrap"
        >
          {children}
        </Box>
      );
      break;
    case 'col':
      result = (
        <Box
          {...props}
          direction="column"
          wrap="nowrap"
        >
          {children}
        </Box>
      );
      break;
    case 'flow':
      result = (
        <Box
          {...props}
          direction="row"
          wrap="wrap"
        >
          {children}
        </Box>
      );
      break;
    case 'grid':
      result = (
        <Grid
          {...props}
        >
          {children}
        </Grid>
      );
      break;
    default:
      break;
  }
  return result;
};
