import { SchemaProps } from 'react-core-form';

export default [
  {
    type: 'Input',
    label: '姓名',
    name: 'name',
    required: true,
  },
  {
    type: 'Select',
    label: '性别',
    name: 'sex',
    props: {
      options: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
    },
  },
] as SchemaProps[];
