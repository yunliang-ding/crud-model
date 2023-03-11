import { useRef } from 'react';
import { Tools } from 'react-core-form';
import { message, notification } from 'antd';
import { TableDesigner } from 'react-core-form-designer';
import { getList, update } from '@/pages/dashboard/services';
import Header from './header';

const { decode, encode, isEmpty } = Tools;

export default ({ schemaEntity }) => {
  const tableDesignerRef: any = useRef({});
  // 更新模型
  const saveOrUpdate = async (flag = true) => {
    const data = {
      formProps: tableDesignerRef.current.formProps,
      schema: tableDesignerRef.current.schema,
      tableProps: tableDesignerRef.current.tableProps,
      columns: tableDesignerRef.current.columns,
    };
    const { code }: any = await update({
      ...schemaEntity,
      schema: encode(JSON.stringify(data)),
      size: Number(new Blob([JSON.stringify(data)]).size / 1024),
    });
    if (code === 200 && flag) {
      notification.success({
        message: '提示',
        description: '保存成功',
      });
    }
  };
  const obj = JSON.parse(decode(schemaEntity.schema));
  let initialValues = undefined;
  if (!isEmpty(obj)) {
    initialValues = obj;
  }
  return (
    <div className="table-designer-playground">
      <Header
        saveOrUpdate={saveOrUpdate}
        schemaEntity={schemaEntity}
        tableDesignerRef={tableDesignerRef}
      />
      <div className="table-designer-playground-body">
        <TableDesigner ref={tableDesignerRef} initialValues={initialValues}>
          <TableDesigner.RegisterWidgets />
          <TableDesigner.TableCanvas
            onCtrlS={async () => {
              const hide = message.loading('保存中');
              await saveOrUpdate();
              hide();
            }}
          />
          <TableDesigner.PropsConfigPanel
            selectModelOptions={async () => {
              const {
                code,
                data: { data },
              } = await getList({ type: 'form', pageSize: 100 });
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
