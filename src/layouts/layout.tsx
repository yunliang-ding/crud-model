import { useState, useEffect } from 'react';
import ProLayout, { PageContainer, WaterMark } from '@ant-design/pro-layout';
import { ConfigProvider, Dropdown, Menu, Space, Avatar } from 'antd';
import { useHistory, createBrowserHistory } from 'ice';
import zhCN from 'antd/lib/locale/zh_CN';
import store from '@/store';
import { LayoutProps } from '@/types';
import { iconUrl, Icon } from '@/util';
import AppBreadcrumb from '@/components/breadcrumb';
import AlertNotice from './alert-notice';
import { outLogin } from '@/services/common';
import './index.less';

const { listen } = createBrowserHistory(); // 创建实例，用于监听浏览器会退前进
export default ({ children }) => {
  const history = useHistory();
  const [, breadcrumbDispatcher]: any = store.useModel('breadcrumb');
  const [uiState, uiDispatchers] = store.useModel('ui');
  const [userState] = store.useModel('user'); // 获取 user model
  const { pathname, navTheme, title, layout }: LayoutProps = uiState;
  const setPathName = () => {
    const path = location.hash.substr(1);
    const index = location.hash.substr(1).indexOf('?'); // 去除参数
    uiDispatchers.update({
      pathname: index === -1 ? path : path.substring(0, index),
    });
  };
  useEffect(() => {
    setPathName(); // 同步左侧菜单
    // 监听路径改变，菜单联动
    const removeListener = listen(setPathName);
    return () => {
      // 注销remove
      removeListener();
    };
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const { name, avatarUrl, menus } = userState;
  const logout = async () => {
    const { code } = await outLogin();
    if (code === 200) {
      location.reload();
    }
  };
  return (
    <ConfigProvider locale={zhCN}>
      <WaterMark
        {...{
          rotate: -20,
          content: name,
          fontColor: 'rgba(0,0,0,.05)',
          fontSize: 16,
          gapY: 70,
          zIndex: 999,
        }}
      >
        <ProLayout
          iconfontUrl={iconUrl}
          location={{ pathname }}
          collapsed={collapsed}
          fixSiderbar
          title={title}
          logo={
            <Icon
              type="icon-model"
              style={{ fontSize: 20, position: 'relative', top: 3 }}
            />
          }
          navTheme={navTheme}
          {...layout}
          menuDataRender={() => menus}
          onCollapse={setCollapsed}
          menuItemRender={(item: any, dom) => (
            <a
              onClick={() => {
                history.push(item.path);
                // 这个地方不能依赖于监听，因为监听是原生事件，原生事件中调用hooks会不同步
                setPathName();
                let list = [];
                const bread = item.locale.split('.');
                if (bread.length > 2) {
                  // 二级菜单,设置面包屑
                  list = bread.filter((i) => i !== 'menu').map((menu) => menu);
                }
                breadcrumbDispatcher.update({
                  list,
                  title: item.name,
                });
              }}
            >
              {dom}
            </a>
          )}
          rightContentRender={() => (
            <div className="app-right-header">
              <Space>
                <Avatar size={32} src={avatarUrl} />
                <Dropdown
                  placement="bottom"
                  overlay={
                    <Menu>
                      <Menu.Item
                        onClick={logout}
                        icon={
                          <Icon
                            type="icon-tuichudenglu"
                            style={{ fontSize: 18 }}
                          />
                        }
                      >
                        退出登录
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a
                    style={{
                      marginRight: 12,
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
          footerRender={() => {
            return <AlertNotice />;
          }}
        >
          <PageContainer
            {...AppBreadcrumb.options()}
            breadcrumbRender={() => {
              return <AppBreadcrumb />;
            }}
          >
            {children}
          </PageContainer>
        </ProLayout>
      </WaterMark>
    </ConfigProvider>
  );
};
