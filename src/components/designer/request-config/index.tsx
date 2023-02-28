import React from 'react';
import axios from 'axios';
import { notification } from 'antd';
import { FunctionEditor, getTools } from 'react-core-form-designer';
import { CreateDrawer } from 'react-core-form';
import { decode, encode } from '@/util';
import { update } from '@/pages/dashboard/services';

export const defaultRequestConfig = {
  baseURL: 'http://121.4.49.147:8361',
  tokenKey: 'appkey',
  tokenValue: 'TttxBH3CxRumOqHyJV34WbUt00B3CZKwP',
  code: getTools().encrypt(`import request from 'request';

export const getList = (params) => {
  return request.post('/xx/list', params);
};
  
export const add = (data) => {
  return request.post('/xx/add', data);
};

export const update = (data) => {
  return request.post('/xx/update', data);
};

export const detail = (id) => {
  return request.get(${'`/xx/detail?id=${id}`'});
};

export const remove = (id) => {
  return request.get(${'`/xx/delete?id=${id}`'});
};`),
};

export const openRequestConfigDrawer = async (schemaEntity) => {
  let services = { ...defaultRequestConfig };
  if (schemaEntity.services) {
    services = JSON.parse(decode(schemaEntity.services));
  }
  requestConfigDrawer(schemaEntity).open({
    width: 800,
    title: '配置请求接口',
    drawerProps: {
      headerStyle: {
        padding: '16px 20px',
      },
    },
    initialValues: services,
  });
};

const requestConfigDrawer = (schemaEntity) =>
  CreateDrawer({
    width: 800,
    title: '配置请求接口',
    drawerProps: {
      headerStyle: {
        padding: '16px 20px',
      },
      bodyStyle: {
        padding: 0,
      },
    },
    schema: [
      {
        type: 'Input',
        hidden: true,
        name: 'id',
      },
      {
        type: 'Input',
        label: '基地址/baseURL',
        name: 'baseURL',
        required: true,
      },
      {
        type: 'Input',
        label: '令牌 key',
        name: 'tokenKey',
      },
      {
        type: 'TextArea',
        label: '令牌 value',
        name: 'tokenValue',
        props: {
          maxCount: 500,
        },
      },
      {
        type: ({ value, onChange }) => {
          const functionRef = React.useRef({});
          return (
            <FunctionEditor
              prefix=""
              style={{
                height: 'calc(100vh - 370px)',
                width: '100%',
              }}
              useEncrypt={false}
              onChange={onChange}
              functionRef={functionRef}
              require={{
                request: axios,
              }}
              value={value}
            />
          );
        },
        required: true,
        label: '模型数据源',
        name: 'code',
      },
    ],
    async onSubmit(values) {
      const { code } = await update({
        ...schemaEntity,
        services: encode(JSON.stringify(values))
      });
      if (code === 200) {
        notification.success({
          message: '提示',
          description: '保存成功',
        });
      } else {
        return Promise.reject()
      }
    },
  });
