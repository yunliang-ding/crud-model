import { Button, CreateModal } from 'react-core-form';
import { Dropdown, Menu, notification, Empty } from 'antd';
import formSchema from './form.schema';
import { remove } from './services';

export default ({
  query,
  items,
  setCurrentMenuId,
  currentMenuId,
  prefixCls,
}) => {
  return items.length === 0 ? (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
  ) : (
    <>
      {items.map((item: any) => {
        return (
          <Dropdown
            overlay={
              <Menu className="sider-dropdown">
                <Menu.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      CreateModal({
                        title: `创建模型基于《${item.name}》`,
                      }).open(
                        formSchema({
                          onSearch: query,
                          initialValues: {
                            ...item,
                            id: undefined,
                            name: undefined,
                          },
                        }),
                      );
                    }}
                  >
                    复制
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    spin
                    type="link"
                    confirm={{
                      title: '提示',
                      content: `是否确认删除模型(${item.name})?`,
                    }}
                    onClick={async () => {
                      const {
                        data: { code },
                      } = await remove(item.id);
                      if (code === 200) {
                        notification.success({
                          message: '提示',
                          description: '删除成功',
                        });
                        const first = await query();
                        // 删除的是当前的处理下选中项目
                        if (currentMenuId === item.id) {
                          setCurrentMenuId(first?.id);
                        }
                      }
                    }}
                  >
                    删除
                  </Button>
                </Menu.Item>
              </Menu>
            }
            trigger={['contextMenu']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <div
                key={item.id}
                onClick={() => {
                  setCurrentMenuId(item.id);
                }}
                className={
                  currentMenuId === item.id
                    ? `${prefixCls}-main-sider-menu-active`
                    : `${prefixCls}-main-sider-menu`
                }
              >
                {item.type === 'form' ? (
                  <i className="iconfont spicon-biaodansheji" />
                ) : (
                  <i className="iconfont spicon-biaoge" />
                )}
                {item.name}
              </div>
            </a>
          </Dropdown>
        );
      })}
    </>
  );
};
