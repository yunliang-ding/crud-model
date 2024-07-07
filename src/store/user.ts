import { createStore } from '@yl-d/components';
import { initData } from 'lyr';

export default createStore({
  // 定义 model 的初始 state
  name: '',
  avatarUrl: '',
  roles: [],
  remoteUrl: '',
  menus: [], // 菜单
  // 定义处理该模型副作用的函数
  async fetchUserInfo(uiStore) {
    try {
      const { userInfo } = initData;
      Object.assign(this, userInfo);
      uiStore.status = 'success';
    } catch (error) {
      console.log(error);
      uiStore.status = 'error';
    }
  },
});
