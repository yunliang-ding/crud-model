import { useEffect } from 'react';
import { decode, encode } from '@yl-d/shared';
import { FormDesigner } from '@yl-d/low-code';
import { Notification, Space } from '@arco-design/web-react';
import { update } from '@/pages/dashboard/services';
import { Button } from '@yl-d/components';
import { IconSave } from '@arco-design/web-react/icon';

export default ({ schemaEntity }) => {
  const [form] = FormDesigner.useForm();
  /** 更新模型 */
  const saveOrUpdate = async (flag = true) => {
    const store = form.getStore();
    const { code } = await update({
      ...schemaEntity,
      pureSchema: encode(form.getStandardSchema()),
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
      form.setStore(newStore);
    }
  }, []);
  return (
    <div className="form-designer-playground">
      <FormDesigner
        form={form}
        logo={
          <Space>
            <img
              src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico"
              width={40}
            />
            <h2>FormDesigner</h2>
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
      />
    </div>
  );
};
