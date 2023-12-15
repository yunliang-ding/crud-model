import { useEffect, useRef } from 'react';
import { decode, encode } from 'react-core-form-tools';
import { Message, Notification } from '@arco-design/web-react';
import { TableDesigner } from 'react-core-form-designer';
import { getList, update } from '@/pages/dashboard/services';
import Header from './header';

export default ({ schemaEntity }) => {
  const tableDesignerRef: any = useRef({});
  // 更新模型
  const saveOrUpdate = async (flag = true) => {
    const store = tableDesignerRef.current.getStore();
    const data = {
      formProps: store.formProps,
      schema: store.schema,
      tableProps: store.tableProps,
      columns: store.columns,
    };
    const { code }: any = await update({
      ...schemaEntity,
      schema: encode(JSON.stringify(data)),
      size: Number(new Blob([JSON.stringify(data)]).size / 1024),
    });
    if (code === 200 && flag) {
      Notification.success({
        title: '提示',
        content: '保存成功',
      });
    }
  };
  /** 设置模型 */
  useEffect(() => {
    if (schemaEntity.schema) {
      const newStore = JSON.parse(decode(schemaEntity.schema));
      tableDesignerRef.current.update(newStore);
    }
  }, [])
  return (
    <div className="table-designer-playground">
      <Header
        saveOrUpdate={saveOrUpdate}
        schemaEntity={schemaEntity}
        tableDesignerRef={tableDesignerRef}
      />
      <div className="table-designer-playground-body">
        <TableDesigner ref={tableDesignerRef}>
          <TableDesigner.RegisterWidgets />
          <TableDesigner.TableCanvas
            onCtrlS={async () => {
              const hide = Message.loading('保存中');
              await saveOrUpdate();
              hide();
            }}
          />
          <TableDesigner.PropsConfigPanel
            selectModelOptions={async () => {
              const {
                code,
                data: { data },
              }: any = await getList({ type: 'form', pageSize: 100 });
              return code === 200
                ? data.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  })
                : [];
            }}
          />
        </TableDesigner>
      </div>
    </div>
  );
};
