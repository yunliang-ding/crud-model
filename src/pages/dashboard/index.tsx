/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { decode } from '@yl-d/shared';
import { CreateModal } from '@yl-d/components';
import {
  Avatar,
  Card,
  Dropdown,
  Empty,
  Menu,
  Space,
} from '@arco-design/web-react';
import formSchema from './schema';
import { outLogin } from '@/services';
import { getList } from './services';
import userStore from '@/store/user';
import { IconPlus } from '@arco-design/web-react/icon';
import Loading from '@/.theme/loading';
import { CodeEditor } from '@yl-d/code-editor';
import './index.less';

const prefixCls = 'app-form-designer-dashboard';

export default () => {
  const { name, avatarUrl } = userStore.useSnapshot();
  const [data, setData]: any = useState([]);
  const [spin, setSpin] = useState(false);
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
    query();
  }, []);
  return spin ? (
    <Loading />
  ) : (
    <div className={prefixCls}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-title`}>
          <img src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico" />
          <h2>Crud-Model</h2>
        </div>
        <div className={`${prefixCls}-header-tools`}>
          <div
            title="点击添加"
            className={`${prefixCls}-header-title-action`}
            onClick={() => {
              CreateModal({
                title: '创建模型',
              }).open(
                formSchema({
                  onSearch: async () => {
                    await query();
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
                  <Menu.Item key="1" onClick={outLogin}>
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
      <div className={`${prefixCls}-body`}>
        {data.length === 0 ? (
          <Empty />
        ) : (
          data.map((item) => {
            return (
              <div>
                <Card
                  style={{ width: 360 }}
                  title={item.name}
                  key={item.id}
                  extra={
                    <Space>
                      <a
                        onClick={() => {
                          window.open(
                            `/#/edit?id=${item.id}&type=${item.type}`,
                          );
                        }}
                      >
                        编辑
                      </a>
                      <a
                        onClick={() => {
                          window.open(`/#/preview?schema=${item.pureSchema}&type=${item.type}`);
                        }}
                      >
                        预览
                      </a>
                    </Space>
                  }
                >
                  <CodeEditor
                    value={decode(item.pureSchema)}
                    readOnly
                    minimapEnabled={false}
                  />
                </Card>
                <div className="arco-card-footer">
                  <Space>
                    <span>更新时间</span>
                    <a>{item.updateTime}</a>
                  </Space>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
