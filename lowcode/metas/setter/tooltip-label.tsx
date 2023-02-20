const Balloon = require('@alifd/next/lib/balloon');
const Box = require('@alifd/next/lib/box');

module.exports = (props) => {
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
