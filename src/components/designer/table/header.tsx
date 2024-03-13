import { useState, useEffect } from 'react';
import { Button, CreateDrawer } from 'lyr-design';
import { Message, Space, Input } from '@arco-design/web-react';
import { openRequestConfigDrawer } from '../request-config';
import { CodeEditor } from 'lyr-code-editor';
import { IconEdit } from '@arco-design/web-react/icon';

const exportDrawer = CreateDrawer({
  width: 800,
  footer: false,
  drawerProps: {
    headerStyle: {
      display: 'none',
    },
    bodyStyle: {
      padding: 0,
    },
  },
  render({ value }) {
    return (
      <CodeEditor
        value={value.code}
        minimapEnabled={false}
      />
    );
  },
});

export default ({ tableDesignerRef, schemaEntity, saveOrUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(schemaEntity.name);
  const saveName = () => {
    // 同步到entity
    schemaEntity.name = name;
    setEdit(false);
  };
  useEffect(() => {
    setName(schemaEntity.name);
  }, [schemaEntity.name]);
  return (
    <div className="table-designer-playground-header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>表格设计器</div>
        <Space className="table-designer-playground-header-project-info">
          {edit ? (
            <Input
              value={name}
              autoFocus
              onChange={(e) => {
                setName(e);
              }}
              onBlur={saveName}
              onPressEnter={saveName}
              placeholder="请输入模型名称"
              style={{ width: 160, height: 24 }}
            />
          ) : (
            <>
              <span style={{ marginRight: 10 }}>{schemaEntity.name}</span>
              <a
                onClick={() => {
                  setEdit(true);
                }}
              >
                <IconEdit />
              </a>
            </>
          )}
        </Space>
      </div>
      <Space>
        <Button type="primary" spin onClick={saveOrUpdate}>
          保存
        </Button>
        <Button
          type="primary"
          spin
          onClick={() => {
            openRequestConfigDrawer(schemaEntity);
          }}
        >
          数据请求接口
        </Button>
        <Button
          type="primary"
          onClick={() => {
            if (tableDesignerRef.current.getStore().columns.length) {
              exportDrawer.open({
                initialValues: {
                  code: tableDesignerRef.current.getStandardSchema(),
                },
              });
            } else {
              Message.info('暂无模型数据.');
            }
          }}
        >
          查看模型
        </Button>
        <Button
          type="primary"
          spin
          onClick={async () => {
            const schema = await saveOrUpdate(false);
            window.open(`#/preview?schema=${schema}&type=table`);
          }}
        >
          预览
        </Button>
      </Space>
    </div>
  );
};
