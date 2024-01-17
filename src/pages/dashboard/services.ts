import { request } from 'lyr';

export const getList = (data): Promise<any> => {
  return request.post('https://dev-ops.yunliang.cloud/crud/list', data);
};

export const add = (data): Promise<any> => {
  return request.post('https://dev-ops.yunliang.cloud/crud/add', data);
};

export const update = (data): Promise<any> => {
  return request.post('https://dev-ops.yunliang.cloud/crud/update', data);
};

export const remove = (id): Promise<any> => {
  return request.get(`https://dev-ops.yunliang.cloud/crud/delete?id=${id}`);
};

export const detail = (id): Promise<any> => {
  return request.get(`https://dev-ops.yunliang.cloud/crud/detail?id=${id}`);
};
