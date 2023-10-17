import { request } from 'ice';

export const outLogin = () => {
  return request.post('/user/logout');
};

export const userInfo = () => {
  return request.post('/user/info');
};
