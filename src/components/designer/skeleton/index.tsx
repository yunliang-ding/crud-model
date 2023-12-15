import { Skeleton, Space } from '@arco-design/web-react';
import './index.less';

export default () => {
  return (
    <div className="form-designer-playground">
      <div className="form-designer-playground-header">
        <div>
          <Space>
            <Skeleton animation />
            <Skeleton animation />
          </Space>
        </div>
        <div>
          <Space>
            <Skeleton animation />
            <Skeleton animation />
            <Skeleton animation />
            <Skeleton animation />
          </Space>
        </div>
      </div>
      <div className="form-designer-playground-body app-skeleton">
        <div className="widgets-panel">
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
        </div>
        <div className="table-canvas from-canvas">
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
        </div>
        <div className="props-config-panel">
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
          <Skeleton animation />
        </div>
      </div>
    </div>
  );
};
