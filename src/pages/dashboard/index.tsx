/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { CreateModal } from 'react-core-form';
import { Avatar, Dropdown, Empty, Menu, Spin } from '@arco-design/web-react';
import Sider from './sider';
import View from '@/pages/view';
import formSchema from './schema';
import { outLogin } from '@/services/common';
import { getList } from './services';
import userStore from '@/store/user';
import AlertNotice from '@/layouts/footer-render';
import './index.less';

const prefixCls = 'app-form-designer-dashboard';

export default () => {
  const { name } = userStore.use();
  const [data, setData]: any = useState([]);
  const [expand, setExpand] = useState(true);
  const [spin, setSpin] = useState(false);
  const [currentMenuId, setCurrentMenuId]: any = useState();
  const query = async () => {
    setSpin(true);
    const {
      code,
      data: { data },
    } = await getList({
      pageNum: 1,
      pageSize: 9999,
    });
    setSpin(false);
    if (code === 200) {
      setData(data);
    }
    return data[0];
  };
  useEffect(() => {
    query().then((res) => {
      setCurrentMenuId(res?.id);
    });
  }, []);
  const currentMenu: any = data.find((i: any) => i.id === currentMenuId);
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-title`}>
          <img src="https://img.alicdn.com/imgextra/i4/O1CN01vxpDIq1MgYeVjxtC4_!!6000000001464-2-tps-128-128.png" />
          <span>我的数据模型</span>
          <div
            title="点击添加"
            className={`${prefixCls}-header-title-action`}
            onClick={() => {
              CreateModal({
                title: '创建模型',
              }).open(
                formSchema({
                  onSearch: async () => {
                    const first = await query();
                    setCurrentMenuId(first?.id);
                  },
                }),
              );
            }}
          >
            <i className="iconfont spicon-add" />
          </div>
        </div>
        <div className={`${prefixCls}-header-marquee`}>
          <AlertNotice />
        </div>
        <div className={`${prefixCls}-header-tools`}>
          <div className={`${prefixCls}-header-tools-item`}>
            <Avatar
              style={{
                backgroundColor: 'var(rgb(--primary-6))',
                marginRight: 10,
              }}
            >
              {name.substring(0, 1)}
            </Avatar>
            <Dropdown
              droplist={
                <Menu>
                  <Menu.Item
                    key="1"
                    onClick={async () => {
                      const { code } = await outLogin();
                      if (code === 200) {
                        location.reload();
                      }
                    }}
                  >
                    切换用户
                  </Menu.Item>
                </Menu>
              }
            >
              <a>{name}</a>
            </Dropdown>
          </div>
        </div>
      </div>
      <div
        className={
          expand
            ? `${prefixCls}-main`
            : `${prefixCls}-main ${prefixCls}-main-hidden-sider`
        }
      >
        <div className={`${prefixCls}-main-sider`}>
          <Spin loading={spin}>
            {expand && (
              <Sider
                items={data}
                setCurrentMenuId={setCurrentMenuId}
                currentMenuId={currentMenuId}
                prefixCls={prefixCls}
                query={query}
              />
            )}
          </Spin>
        </div>
        <div
          className={
            expand ? `${prefixCls}-main-expand` : `${prefixCls}-main-not-expand`
          }
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <i className="iconfont spicon-shouqikuaijin" />
        </div>
        <div className={`${prefixCls}-main-content`}>
          {currentMenuId ? (
            <View
              type={currentMenu?.type}
              schemaId={currentMenu?.id}
              key={currentMenu?.id}
            />
          ) : (
            <Empty description="暂无数据，请先创建数据模型" />
          )}
        </div>
      </div>
    </div>
  );
};
