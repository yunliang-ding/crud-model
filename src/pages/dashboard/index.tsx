/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Button, CreateModal } from 'react-core-form';
import { Alert, Avatar, Dropdown, Empty, Menu, Spin } from 'antd';
import DesignerForm from '@/components/designer/form';
import DesignerTable from '@/components/designer/table';
import Sider from './sider';
import formSchema from './form.schema';
import Marquee from 'react-fast-marquee';
import { outLogin } from '@/services/common';
import { getList } from './services';
import store from '@/store';
import './index.less';

const prefixCls = 'app-form-designer-dashboard';

export default () => {
  const [userInfo] = store.useModel('user');
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
          <Alert
            banner
            action={
              <Button size="small" type="link">
                version 1.0.0
              </Button>
            }
            style={{ padding: '6px 20px' }}
            description={
              <Marquee pauseOnHover gradient={false} delay={2}>
                介绍：可快速搭建 Crud
                模型、让前端开发专注于业务本身，不需要专注模型的编写，可视化
                基于 react-core-form-designer 提供的相关组件以及api，底层基于
                react-core-form 提供的模型渲染能力。
              </Marquee>
            }
          />
        </div>
        <div className={`${prefixCls}-header-tools`}>
          <div className={`${prefixCls}-header-tools-item`}>
            <Avatar
              style={{
                backgroundColor: 'var(--antd-wave-shadow-color)',
                marginRight: 10,
              }}
            >
              {userInfo.name.substring(0, 1)}
            </Avatar>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
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
              <a>{userInfo.name}</a>
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
          <Spin spinning={spin}>
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
            currentMenu?.type === 'form' ? (
              <DesignerForm schemaId={currentMenuId} key={currentMenuId} />
            ) : (
              <DesignerTable schemaId={currentMenuId} key={currentMenuId} />
            )
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无数据，请先创建数据模型"
            />
          )}
        </div>
      </div>
    </div>
  );
};
