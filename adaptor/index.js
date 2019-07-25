import React from 'react';
import { Box, Grid } from '@alifd/layout';

export default {
    name: 'Box',
    shape: ['box', 'grid'],
    layout: true,
    editor: () => {
        return {
            props: [],
        };
    },
    adaptor: ({ shape, ...others }) => {
        let temp = <Box></Box>;
        switch (level) {
            case 'box':
                temp = <Box {...others}></Box>
                break;
            case 'grid':
                temp = <Grid {...others}></Grid>
                break;
            default:
                break;
        }
        return temp;
    }
}