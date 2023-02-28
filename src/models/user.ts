/* eslint-disable no-console */
import { userInfo } from '@/services/common';

const recursion = (menuList, auths) => {
  menuList?.forEach((menu) => {
    if (menu.children?.length > 0) {
      recursion(menu.children, auths);
    } else {
      auths[menu.name] = true;
    }
  });
};

export default {
  // 定义 model 的初始 state
  state: {
    name: '',
    avatarUrl: '',
    roles: [],
    remoteUrl: '',
    menus: [], // 菜单
  },
  // 定义改变该模型状态的纯函数
  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  // 定义处理该模型副作用的函数
  effects: (dispatch) => ({
    async fetchUserInfo(setAuth) {
      try {
        // 查询 userInfo 获取详细信息
        const { code, data } = await userInfo();
        if (code === 200) {
          const auth = {}; // 权限集合
          recursion(data.menus, auth);
          setAuth(auth)
          dispatch.user.update({
            ...data,
          });
          dispatch.ui.update({
            status: 'success',
          });
        } else {
          dispatch.ui.update({
            status: 'error',
          });
        }
      } catch (error) {
        console.log(error);
        dispatch.ui.update({
          status: 'error',
        });
      }
    },
  }),
};
