import { useEffect, useState } from 'react';
import { detail } from '@/pages/dashboard/services';
import Main from './main';
import { beforeUnloadListener } from '../form';
import Loading from '@/.theme/loading';
import './index.less';

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
  /** window 注册全局 API 对象 */
  // useEffect(() => {
  //   .registerGlobalApi(source);
  // }, [source]);
  return spin ? <Loading /> : <Main schemaEntity={schemaEntity} />;
};
