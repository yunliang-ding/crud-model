import { request } from 'lyr';

export const outLogin = () => {
  localStorage.removeItem("token");
  location.reload();
};

export const userInfo = (): Promise<any> => {
  return request.post('/user/info');
};
