import { getUrlSearchParams } from 'lyr-extra';
import { CrudModelRender } from 'lyr-low-code';
import axios from 'axios';
import './index.less';

export default () => {
  const { schema, type }: any = getUrlSearchParams(location.hash);
  return (
    <div className="designer-preview-wapper">
      <div className="designer-preview-wapper-header" />
      <div className="designer-preview-wapper-sider">
        <div className="designer-preview-wapper-sider-left" />
        <div className="designer-preview-wapper-sider-right">
          <CrudModelRender
            schema={schema}
            type={type}
            require={{
              request: axios.create({
                baseURL: 'https://api-online.yunliang.cloud',
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};
