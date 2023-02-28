import { SoundOutlined } from "@ant-design/icons"
import { Alert, Button } from "antd"
import Marquee from "react-fast-marquee"

export default () => {
  return <Alert
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
      介绍：具体的应用介绍信息
    </Marquee>
  }
/>
}