import { request } from 'ice';

export const outLogin = () => {
  return request.post('/proxy/unification/logout');
};

export const userInfo = () => {
  return request.post('/proxy/user/userinfo');
};
