import { useEffect, useRef } from 'react';
import { decode, encode } from 'lyr-extra';
import { FormDesigner } from 'lyr-low-code';
import { Message, Notification } from '@arco-design/web-react';
import Header from './header';
import { update } from '@/pages/dashboard/services';

export default ({ schemaEntity }) => {
  const formDesignerRef: any = useRef({});
  /** 更新模型 */
  const saveOrUpdate = async (flag = true) => {
    const store = formDesignerRef.current.getStore();
    const { code } = await update({
      ...schemaEntity,
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
      formDesignerRef.current.setStore(newStore);
    }
  }, []);
  return (
    <div className="form-designer-playground">
      <Header
        saveOrUpdate={saveOrUpdate}
        schemaEntity={schemaEntity}
        formDesignerRef={formDesignerRef}
      />
      <div className="form-designer-playground-body">
        <FormDesigner ref={formDesignerRef}>
          <FormDesigner.RegisterWidgets />
          <FormDesigner.FormCanvas
            onCtrlS={async () => {
              const hide = Message.loading('保存中');
              await saveOrUpdate();
              hide();
            }}
          />
          <FormDesigner.PropsConfigPanel />
        </FormDesigner>
      </div>
    </div>
  );
};
