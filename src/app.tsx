import { runApp } from 'lyr';
import NProgress from 'nprogress';
import Loading from '@/components/loading';
import { Notification } from '@arco-design/web-react';
import { Icon } from './util';
import { userInfo } from '@/services';
import "nprogress/nprogress.css";

export const APPID = 2;

const recursion = (menus: any, auths: any) => {
  menus?.forEach((menu: any) => {
    menu.label = menu.name;
    menu.icon = <Icon type={menu.icon} />;
    if (menu.children?.length > 0) {
      recursion(menu.children, auths);
    } else {
      delete menu.children;
      auths.push(menu.path);
    }
  });
};

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  easing: 'ease-in-out',
});

runApp({
  /** 节点 */
  element: '#root',
  /** loading */
  loading: () => <Loading />,
  /** 加载勾子 */
  getInitData: async () => {
    // 查询 userInfo 获取详细信息
    const { code, data }: any = await userInfo();
    const auth = [];
    if(code === 200){
      recursion(data.menus, auth);
    }
    return {
      auth,
      userInfo: data,
    };
  },
  /** 请求配置 */
  axiosConfig: {
    timeout: 1000 * 180,
    withCredentials: true,
    maxContentLength: 5000,
    validateStatus: () => true,
    // 拦截请求
    requestInterceptors: (requestConfig) => {
      requestConfig.headers = {
        appId: APPID.toString(),
      };
      NProgress.start();
      return requestConfig;
    },
    // 拦截响应
    responseInterceptors: (response) => {
      NProgress.done();
      const {
        data: { code, msg },
      } = response;
      if (code === 40005) {
        // 登录信息失效，之后重新登录
        location.href = `http://ulp.yunliang.cloud/login?redirect=${location.href}&appId=${APPID}`;
        return;
      }
      if (code !== 200) {
        Notification.error({
          title: '提示',
          content: msg || '接口异常',
        });
      }
      return response.data;
    },
  },
});
