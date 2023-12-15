import { useEffect } from 'react';
import Layout from './layout';
import Loading from '@/components/loading';
import Error from '@/components/error';
import NoPermissions from '@/pages/403';
import uiStore from '@/store/ui';
import userStore from '@/store/user';

export default () => {
  const { fetchUserInfo } = userStore.use();
  const { status } = uiStore.use();
  useEffect(() => {
    fetchUserInfo(uiStore);
  }, []);
  if (status === 'loading') {
    return <Loading />;
  }else if (status === 'error') {
    return <Error />;
  } else if (status === 'noPermissions') {
    return <NoPermissions />;
  }
  return <Layout />;
};
