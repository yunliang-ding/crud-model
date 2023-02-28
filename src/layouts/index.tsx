import { useEffect } from 'react';
import Layout from './layout';
import Loading from '@/components/loading';
import Error from '@/components/error';
import NoPermissions from '@/pages/403';
import store from '@/store';
import { useAuth } from 'ice';

export default (props: any) => {
  const [, setAuth] = useAuth();
  const [, userDispatchers] = store.useModel('user');
  const [uiState] = store.useModel('ui');
  useEffect(() => {
    userDispatchers.fetchUserInfo(setAuth);
  }, []);
  console.log(uiState);
  if (uiState.status === 'loading') {
    return <Loading />;
  }else if (uiState.status === 'error') {
    return <Error />;
  } else if (uiState.status === 'noPermissions') {
    return <NoPermissions />;
  }
  return <Layout {...props} />;
};
