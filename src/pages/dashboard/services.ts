import { request } from 'lyr';

export const getList = (data): Promise<any> => {
  return request.post('/proxy/crud/list', data);
};

export const add = (data): Promise<any> => {
  return request.post('/proxy/crud/add', data);
};

export const update = (data): Promise<any> => {
  return request.post('/proxy/crud/update', data);
};

export const remove = (id): Promise<any> => {
  return request.get(`/proxy/crud/delete?id=${id}`);
};

export const detail = (id): Promise<any> => {
  return request.get(`/proxy/crud/detail?id=${id}`);
};
