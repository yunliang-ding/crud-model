import { getUrlSearchParams } from 'lyr-extra';
import { CrudModelRender } from 'lyr-low-code';
import { APPID } from '@/app';
import axios from 'axios';
import './index.less';

export default () => {
  const { id }: any = getUrlSearchParams(location.hash);
  return (
    <div className="designer-preview-wapper">
      <div className="designer-preview-wapper-header" />
      <div className="designer-preview-wapper-sider">
        <div className="designer-preview-wapper-sider-left" />
        <div className="designer-preview-wapper-sider-right">
          <CrudModelRender
            schemaId={id}
            baseURL="/proxy"
            appId={APPID}
            require={{
              request: axios.create({
                baseURL: 'http://api-online.yunliang.cloud',
                withCredentials: true,
                headers: {
                  appId: APPID as any,
                },
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};
