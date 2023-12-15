/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { AppLayout } from 'react-core-form';
import { Dropdown, Menu, Space, Avatar, Trigger } from '@arco-design/web-react';
import uiStore from '@/store/ui';
import userStore from '@/store/user';
import FooterRender from './footer-render';
import { outLogin } from '@/services/common';
import { useEffect, useRef } from 'react';
import {
  IconInteraction,
  IconMoon,
  IconSkin,
  IconSun,
} from '@arco-design/web-react/icon';
import { SketchPicker } from 'react-color';
import { Outlet } from 'react-router-dom';

export default () => {
  const layoutRef: any = useRef({});
  const { dark, title, compact, collapsed, primaryColor } = uiStore.use();
  const { name, avatarUrl, menus } = userStore.use();
  const setCollapsed = (v: boolean) => {
    uiStore.collapsed = v;
  };
  const logout = async () => {
    const { code } = await outLogin();
    if (code === 200) {
      location.reload();
    }
  };
  // 使用 AppLayout 内置的 监听 hash 方法
  useEffect(() => {
    const removeListener = layoutRef.current.listenHashChange(
      ({ currentBreadcrumb }) => {
        /** 设置当前路由的默认面包屑 */
      },
    );
    return removeListener;
  }, []);
  return (
    <AppLayout
      layoutRef={layoutRef}
      waterMarkProps={{
        gap: [200, 200],
        content: `welcome-${name}`,
        zIndex: 10,
        fontStyle: {
          color: dark ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)',
          fontSize: 12,
        },
      }}
      compact={compact}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      title={title}
      dark={dark}
      menu={{
        items: menus,
        onClick: ({ path }: any) => {
          location.hash = path;
        },
      }}
      rightContentRender={() => (
        <div className="app-right-header">
          <Space size={20}>
            {dark ? (
              <IconSun
                onClick={() => {
                  uiStore.dark = false;
                }}
              />
            ) : (
              <IconMoon
                onClick={() => {
                  uiStore.dark = true;
                }}
              />
            )}
            <IconInteraction
              onClick={() => {
                uiStore.compact = !compact;
              }}
            />
            <Trigger
              trigger="hover"
              position="bl"
              popup={() => (
                <SketchPicker
                  color={primaryColor}
                  onChangeComplete={({ hex }) => {
                    uiStore.primaryColor = hex;
                  }}
                />
              )}
            >
              <IconSkin style={{ color: primaryColor }} />
            </Trigger>
            <Avatar size={32}>
              <img alt="avatar" src={avatarUrl} />
            </Avatar>
            <Dropdown
              position="bottom"
              droplist={
                <Menu>
                  <Menu.Item key="logout" onClick={logout}>
                    退出登录
                  </Menu.Item>
                </Menu>
              }
            >
              <a
                style={{
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                {name}
              </a>
            </Dropdown>
          </Space>
        </div>
      )}
      footerRender={() => <FooterRender />}
      siderFooterRender={() => null}
    >
      <Outlet />
    </AppLayout>
  );
};
