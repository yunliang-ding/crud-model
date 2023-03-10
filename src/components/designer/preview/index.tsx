import { getUrlSearchParams } from 'react-core-form-tools';
import { CrudModelRender } from 'react-core-form-designer';
import './index.less';

export default () => {
  const { id }: any = getUrlSearchParams(location.hash);
  const PreviewRender: any = CrudModelRender;
  return (
    <div className="designer-preview-wapper">
      <div className="designer-preview-wapper-header" />
      <div className="designer-preview-wapper-sider">
        <div className="designer-preview-wapper-sider-left" />
        <div className="designer-preview-wapper-sider-right">
          <PreviewRender schemaId={id} />
        </div>
      </div>
    </div>
  );
};
