import { useEffect } from 'react';
import { decode, encode } from '@yl-d/shared';
import { Notification, Space } from '@arco-design/web-react';
import { TableDesigner } from '@yl-d/low-code';
import { update } from '@/pages/dashboard/services';
import { Button } from '@yl-d/components';
import { IconSave } from '@arco-design/web-react/icon';

export default ({ schemaEntity }) => {
  const [table] = TableDesigner.useTable();
  // 更新模型
  const saveOrUpdate = async (flag = true) => {
    const store = table.getStore();
    const { code }: any = await update({
      ...schemaEntity,
      pureSchema: encode(table.getStandardSchema()),
      schema: encode(JSON.stringify(store)),
      size: Number(new Blob([JSON.stringify(store)]).size / 1024),
    });
    if (code === 200 && flag) {
      Notification.success({
        title: '提示',
        content: '保存成功',
      });
    }
    return encode(JSON.stringify(store));
  };
  /** 设置模型 */
  useEffect(() => {
    if (schemaEntity.schema) {
      const newStore = JSON.parse(decode(schemaEntity.schema));
      table.setStore(newStore);
    }
  }, []);
  return (
    <div className="table-designer-playground">
      <TableDesigner
        table={table}
        logo={
          <Space>
            <img
              src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico"
              width={40}
            />
            <h2>TableDesigner</h2>
          </Space>
        }
        extra={[
          <Button
            spin
            onClick={saveOrUpdate}
            type="primary"
            icon={<IconSave />}
          >
            保存
          </Button>,
        ]}
        // selectModelOptions={async () => {
        //   const {
        //     code,
        //     data: { data },
        //   }: any = await getList({ type: 'form', pageSize: 100 });
        //   return code === 200
        //     ? data.map((item) => {
        //         return {
        //           label: item.name,
        //           value: item.id,
        //         };
        //       })
        //     : [];
        // }}
      />
    </div>
  );
};
