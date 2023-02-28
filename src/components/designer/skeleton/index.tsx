import { Skeleton, Space } from 'antd';
import './index.less';

export default () => {
  return (
    <div className="form-designer-playground">
      <div className="form-designer-playground-header">
        <div>
          <Space>
            <Skeleton.Button active />
            <Skeleton.Input active />
            <Skeleton.Input active />
          </Space>
        </div>
        <div>
          <Space>
            <Skeleton.Button active />
            <Skeleton.Button active />
            <Skeleton.Button active />
            <Skeleton.Button active />
          </Space>
        </div>
      </div>
      <div className="form-designer-playground-body app-skeleton">
        <div className="widgets-panel">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
        <div className="table-canvas from-canvas">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
        <div className="props-config-panel">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      </div>
    </div>
  );
};
