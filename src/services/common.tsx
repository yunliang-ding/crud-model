import { request } from 'lyr';

export const outLogin = (): Promise<any> => {
  return request.post('/user/logout');
};

export const userInfo = (): Promise<any> => {
  return request.post('/user/info');
};
