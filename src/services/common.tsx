import { request } from 'ice';

export const outLogin = () => {
  return request.post('/unification/logout');
};

export const userInfo = () => {
  return request.post('/user/userinfo');
};
