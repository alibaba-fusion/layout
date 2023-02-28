import React from 'react';
import Balloon from '@alifd/next/lib/balloon';
import Box from '@alifd/next/lib/box';

export default (props: any) => {
  const { overlay, children, ...others } = props;
  return (
    <Balloon.Tooltip
      v2
      triggerType="hover"
      align="t"
      {...others}
      trigger={
        <Box style={{ width: '100%' }} align="center">
          {children}
        </Box>
      }
    >
      {overlay}
    </Balloon.Tooltip>
  );
};
