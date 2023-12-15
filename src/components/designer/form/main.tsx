import { useEffect, useRef } from 'react';
import { decode, encode, isEmpty } from 'react-core-form-tools';
import { FormDesigner } from 'react-core-form-designer';
import { Message, Notification } from '@arco-design/web-react';
import Header from './header';
import { update } from '@/pages/dashboard/services';

export default ({ schemaEntity }) => {
  const formDesignerRef: any = useRef({});
  /** 更新模型 */
  const saveOrUpdate = async (flag = true) => {
    const data = {
      ...formDesignerRef.current.formProps,
      schema: formDesignerRef.current.schema,
      selectSchema: formDesignerRef.current.selectSchema,
    };
    const { code } = await update({
      ...schemaEntity,
      schema: encode(JSON.stringify(data)),
      size: Number(new Blob([JSON.stringify(data)]).size / 1024),
    });
    if (code === 200 && flag) {
      Notification.success({
        message: '提示',
        description: '保存成功',
      });
    }
  };
  /** 设置模型 */
  useEffect(() => {
    if (schemaEntity.schema) {
      const obj = JSON.parse(decode(schemaEntity.schema));
      const formProps = { ...obj };
      delete formProps.schema;
      delete formProps.selectSchema;
      if (!isEmpty(formProps)) {
        formDesignerRef.current.setFormProps(formProps);
      }
      formDesignerRef.current.setSchema(obj.schema || []);
      formDesignerRef.current.setSelectSchema(obj.selectSchema || {});
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
