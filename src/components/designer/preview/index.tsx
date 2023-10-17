import { getUrlSearchParams } from 'react-core-form-tools';
import { CrudModelRender } from 'react-core-form-designer';
import { APPID } from '@/app';
import axios from 'axios';
import './index.less';

const PreviewRender: any = CrudModelRender;

export default () => {
  const { id }: any = getUrlSearchParams(location.hash);
  return (
    <div className="designer-preview-wapper">
      <div className="designer-preview-wapper-header" />
      <div className="designer-preview-wapper-sider">
        <div className="designer-preview-wapper-sider-left" />
        <div className="designer-preview-wapper-sider-right">
          <PreviewRender
            schemaId={id}
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
