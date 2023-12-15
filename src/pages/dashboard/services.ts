import { request } from 'lyr';

export const getList = (data) => {
  return request.post('/crud/list', data);
};

export const add = (data) => {
  return request.post('/crud/add', data);
};

export const update = (data) => {
  return request.post('/crud/update', data);
};

export const remove = (id) => {
  return request.get(`/crud/delete?id=${id}`);
};

export const detail = (id) => {
  return request.get(`/crud/detail?id=${id}`);
};

