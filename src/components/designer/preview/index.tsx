import { getUrlSearchParams } from 'react-core-form-tools';
import { CrudModelRender } from 'react-core-form-designer';
import './index.less';
import { APPID } from '@/app';

export default () => {
  const { id, appId }: any = getUrlSearchParams(location.hash);
  const PreviewRender: any = CrudModelRender;
  return (
    <div className="designer-preview-wapper">
      <div className="designer-preview-wapper-header" />
      <div className="designer-preview-wapper-sider">
        <div className="designer-preview-wapper-sider-left" />
        <div className="designer-preview-wapper-sider-right">
          <PreviewRender schemaId={id} appId={appId || APPID} />
        </div>
      </div>
    </div>
  );
};
