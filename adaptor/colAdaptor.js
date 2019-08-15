import { adaptor, getPropsForLayoutComps } from '../utils';

export default {
  name: 'Col',
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
        adaptor: 'Col',
        props: {
          ...getPropsForLayoutComps('col'),
          style: { border: 'dashed 1px grey' },
          children: [
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'col'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'col'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'col'),
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
