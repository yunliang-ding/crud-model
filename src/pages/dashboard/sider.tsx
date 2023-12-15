import { Button, CreateModal } from 'react-core-form';
import { Dropdown, Menu, Notification, Empty } from '@arco-design/web-react';
import formSchema from './schema';
import { remove } from './services';
import { Icon } from '@/util';

export default ({
  query,
  items,
  setCurrentMenuId,
  currentMenuId,
  prefixCls,
}) => {
  return items.length === 0 ? (
    <Empty description="暂无数据" />
  ) : (
    <>
      {items.map((item: any) => {
        return (
          <Dropdown
            droplist={
              <Menu className="sider-dropdown">
                <Menu.Item key=''>
                  <Button
                    type="text"
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
                <Menu.Item key=''>
                  <Button
                    spin
                    type="text"
                    confirm={{
                      title: '提示',
                      content: `是否确认删除模型(${item.name})?`,
                    }}
                    onClick={async () => {
                      const { code } = await remove(item.id);
                      if (code === 200) {
                        Notification.success({
                          title: '提示',
                          content: '删除成功',
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
                  <Icon type="icon-biaodansheji" />
                ) : (
                  <Icon type="icon-biaoge" />
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
