import { adaptor, getPropsForLayoutComps } from '../utils';

export default {
  name: 'Flow',
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
        adaptor: 'Flow',
        props: {
          ...getPropsForLayoutComps('flow'),
          style: { border: 'dashed 1px grey' },
          children: [
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
                style: { backgroundColor: 'pink' },
              },
            },
            {
              adaptor: 'Row',
              props: {
                ...getPropsForLayoutComps('row', 'flow'),
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
