import { request } from 'ice';

export const getList = (data) => {
  return request.post('/proxy/crud/list', data);
};

export const add = (data) => {
  return request.post('/proxy/crud/add', data);
};

export const update = (data) => {
  return request.post('/proxy/crud/update', data);
};

export const remove = (id) => {
  return request.get(`/proxy/crud/delete?id=${id}`);
};

export const detail = (id) => {
  return request.get(`/proxy/crud/detail?id=${id}`);
};

