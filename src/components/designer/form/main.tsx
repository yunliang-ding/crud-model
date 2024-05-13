import { useEffect } from 'react';
import { decode, encode } from 'lyr-extra';
import { FormDesigner } from 'lyr-low-code';
import { Message, Notification, Space } from '@arco-design/web-react';
import { update } from '@/pages/dashboard/services';
import { Button } from 'lyr-component';
import { IconSave } from '@arco-design/web-react/icon';
import { copyImg } from '@/util';

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
            type="primary"
            spin
            onClick={async () => {
              if (form.getStore().schema.length > 0) {
                await new Promise((res) => {
                  setTimeout(res, 600);
                });
                await copyImg(
                  document.querySelector('.form-canvas .arco-card-body'),
                );
              } else {
                Message.info('暂无模型数据.');
              }
            }}
          >
            一键截图
          </Button>,
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
