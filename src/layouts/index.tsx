import { useEffect } from 'react';
import Layout from './layout';
import Loading from '@/components/loading';
import DesignerPreview from '@/components/designer/preview'
import Error from '@/components/error';
import NoPermissions from '@/pages/403';
import uiStore from '@/store/ui';
import userStore from '@/store/user';

export default () => {
  if (location.hash === '#/designer/preview') {
    return <DesignerPreview />;
  }
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
