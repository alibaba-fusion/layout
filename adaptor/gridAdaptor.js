import { adaptor, getPropsForLayoutComps } from '../utils';

export default {
  name: 'Grid',
  editor: () => {
    return {
      props: [{
        name: 'children',
        type: 'node-list',
      }]
    };
  },
  adaptor,
  demos: [
    {
      node: {
        adaptor: 'Grid',
        props: {
          ...getPropsForLayoutComps('grid'),
          style: { border: 'dashed 1px grey' },
          children: [
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'grid'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'grid'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'grid'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'grid'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'grid'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'grid'),
                style: { backgroundColor: 'pink' },
              },
            },
          ],
        },
      },
      backgroundColor: '#000', // 背景色
      // height: 200, // 高度 默认 auto
    },
  ],
};
