import { adaptor, getPropsForLayoutComps } from '../utils';

export default {
  name: 'Row',
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
        adaptor: 'Row',
        props: {
          ...getPropsForLayoutComps('row'),
          style: { border: 'dashed 1px grey' },
          children: [
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'row'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'row'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'row'),
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
