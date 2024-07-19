/* eslint-disable require-atomic-updates */
/* eslint-disable no-template-curly-in-string */
import axios from 'axios';
import { Notification } from '@arco-design/web-react';
import { CreateDrawer } from '@yl-d/components';
import { decode, encode } from '@yl-d/shared';
import { update } from '@/pages/dashboard/services';
import { CodeEditor, encrypt } from '@yl-d/code-editor';

export const defaultRequestConfig = {
  baseURL: 'https://api-online.yunliang.cloud',
  code: encrypt(`import request from 'request';

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
        widget: 'Input',
        hidden: true,
        name: 'id',
      },
      {
        widget: 'Input',
        label: '基地址/baseURL',
        name: 'baseURL',
        required: true,
      },
      {
        widget: ({ value, onChange }) => {
          return (
            <CodeEditor
              style={{
                height: 'calc(100vh - 260px)',
                width: '100%',
              }}
              mode="function"
              debounceTime={0}
              onChange={onChange}
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
      const services = encode(JSON.stringify(values));
      const { code }: any = await update({
        ...schemaEntity,
        services,
      });
      if (code === 200) {
        schemaEntity.services = services;
        Notification.success({
          title: '提示',
          content: '保存成功',
        });
      } else {
        return Promise.reject();
      }
    },
  });
