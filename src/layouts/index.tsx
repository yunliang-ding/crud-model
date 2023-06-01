import { useEffect } from 'react';
import Layout from './layout';
import Loading from '@/components/loading';
import DesignerPreview from '@/components/designer/preview'
import Error from '@/components/error';
import NoPermissions from '@/pages/403';
import store from '@/store';
import { useAuth } from 'ice';

export default (props: any) => {
  if (props.location.pathname === '/designer/preview') {
    return <DesignerPreview {...props} />;
  }
  const [, setAuth] = useAuth();
  const [, userDispatchers] = store.useModel('user');
  const [uiState] = store.useModel('ui');
  useEffect(() => {
    userDispatchers.fetchUserInfo(setAuth);
  }, []);
  if (uiState.status === 'loading') {
    return <Loading />;
  }else if (uiState.status === 'error') {
    return <Error />;
  } else if (uiState.status === 'noPermissions') {
    return <NoPermissions />;
  }
  return <Layout {...props} />;
};
