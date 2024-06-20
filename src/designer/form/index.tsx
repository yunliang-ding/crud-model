import { useEffect, useState } from 'react';
import { detail } from '@/pages/dashboard/services';
import Main from './main';
import Loading from '@/.theme/loading';
import './index.less';

export const beforeUnloadListener = (event) => {
  event.preventDefault();
  return 'Are you sure you want to exit?';
};

export default ({ schemaId }) => {
  const [spin, setSpin] = useState(true);
  const [schemaEntity, setSchemaEntity]: any = useState({});
  /** 查询数据模型详情 */
  const querySchemaById = async (schemaId: string) => {
    try {
      setSpin(true);
      const { code, data }: any = await detail(schemaId);
      if (code === 200) {
        setSchemaEntity(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpin(false);
    }
  };
  useEffect(() => {
    querySchemaById(schemaId);
    window.addEventListener('beforeunload', beforeUnloadListener);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, []);
  return spin ? <Loading /> : <Main schemaEntity={schemaEntity} />;
};
