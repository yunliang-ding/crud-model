import { request } from 'lyr';

export const outLogin = () => {
  return request.post('/user/logout');
};

export const userInfo = () => {
  return request.post('/user/userinfo');
};
