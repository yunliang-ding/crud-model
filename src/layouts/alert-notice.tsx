import { SoundOutlined } from '@ant-design/icons';
import { Alert, Button } from 'antd';
import Marquee from 'react-fast-marquee';

export default () => {
  return (
    <Alert
      type="info"
      showIcon
      icon={<SoundOutlined />}
      action={
        <Button size="small" type="link">
          版本号 1.0.0
        </Button>
      }
      style={{
        fontWeight: 600,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 10,
      }}
      description={
        <Marquee pauseOnHover gradient={false} delay={2}>
          介绍：可快速搭建 Crud
          模型、让前端开发专注于业务本身，不需要专注模型的编写，可视化 基于
          react-core-form-designer 提供的相关组件以及api，底层基于
          react-core-form 提供的模型渲染能力。
        </Marquee>
      }
    />
  );
};
