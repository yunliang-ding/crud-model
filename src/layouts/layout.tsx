import { useState, useEffect } from 'react';
import ProLayout, { PageContainer, WaterMark } from '@ant-design/pro-layout';
import { ConfigProvider, Dropdown, Menu, Space, Avatar } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from '@/store';
import { iconUrl, Icon } from '@/util';
import AlertNotice from './alert-notice';
import { outLogin } from '@/services/common';
import './index.less';

export default ({ children }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <div>{children}</div>
    </ConfigProvider>
  );
};
