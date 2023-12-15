import { Button } from '@arco-design/web-react';
import Marquee from 'react-fast-marquee';
import { Icon } from '@/util';

export default () => {
  return (
    <>
      <Icon
        type="icon-shengyin"
        style={{ color: 'rgb(var(--primary-6))', fontSize: 20 }}
      />
      <div style={{ width: 'calc(100% - 100px)', fontWeight: 'bold' }}>
        <Marquee pauseOnHover gradient={false} delay={2}>
          介绍：可快速搭建 Crud
          模型、让前端开发专注于业务本身，不需要专注模型的编写，可视化 基于
          react-core-form-designer 提供的相关组件以及api，底层基于
          react-core-form 提供的模型渲染能力。
        </Marquee>
      </div>
      <Button size="small" type="text">
        版本号 1.0.0
      </Button>
    </>
  );
};
