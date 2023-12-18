/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { CreateModal } from 'react-core-form';
import { Avatar, Dropdown, Empty, Menu, Select } from '@arco-design/web-react';
import Edit from '@/pages/edit';
import formSchema from './schema';
import { outLogin } from '@/services/common';
import { getList } from './services';
import userStore from '@/store/user';
import { IconPlus } from '@arco-design/web-react/icon';
import Loading from '@/components/loading';
import './index.less';

const prefixCls = 'app-form-designer-dashboard';

export default () => {
  const { name, avatarUrl } = userStore.use();
  const [data, setData]: any = useState([]);
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
          <img src="https://react-core-form.oss-cn-beijing.aliyuncs.com/assets/favicon.ico" />
          <h2>Crud-Model</h2>
        </div>
        <div className={`${prefixCls}-header-tools`}>
          <Select
            value={currentMenuId}
            onChange={(v) => {
              setCurrentMenuId(v);
            }}
            options={data.map((i) => ({ label: i.name, value: i.id }))}
            style={{ width: 200 }}
          />
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
            <IconPlus />
          </div>
          <div className={`${prefixCls}-header-tools-item`}>
            <Avatar size={32}>
              <img alt="avatar" src={avatarUrl} />
            </Avatar>
            &nbsp; &nbsp;
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
      <div className={`${prefixCls}-main`}>
        {spin ? (
          <Loading />
        ) : (
          <div className={`${prefixCls}-main-content`}>
            {currentMenuId ? (
              <Edit
                type={currentMenu?.type}
                id={currentMenu?.id}
                key={currentMenu?.id}
              />
            ) : (
              <Empty description="暂无数据，请先创建数据模型" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
