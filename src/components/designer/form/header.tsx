import { useEffect, useState } from 'react';
import { Button, CardForm, CreateDrawer } from 'lyr-design';
import { Message, Space, Input } from '@arco-design/web-react';
import { openRequestConfigDrawer } from '../request-config';
import { copyImg } from '@/util';
import { babelParse } from 'lyr-extra';
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
    return <CodeEditor value={value.code} minimapEnabled={false} />;
  },
});

export default ({ formDesignerRef, schemaEntity, saveOrUpdate }) => {
  const [copyImgSchema, setCopyImgSchema] = useState('export default {}');
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
    <div className="form-designer-playground-header">
      <div className="app-form-render-result">
        <CardForm
          {...babelParse({
            code: copyImgSchema,
          })}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 12 }}>表单设计器</div>
        <Space className="form-designer-playground-header-project-info">
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
        <Button
          type="primary"
          spin
          onClick={() => {
            saveOrUpdate();
          }}
        >
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
            if (formDesignerRef.current.getStore().schema.length > 0) {
              exportDrawer.open({
                initialValues: {
                  code: formDesignerRef.current.getStandardSchema(),
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
            if (formDesignerRef.current.getStore().schema.length > 0) {
              await new Promise((res) => {
                setTimeout(res, 600);
              });
              setCopyImgSchema(formDesignerRef.current.getStandardSchema());
              await copyImg(
                document.querySelector('.app-form-render-result .ant-card'),
              );
            } else {
              Message.info('暂无模型数据.');
            }
          }}
        >
          一键截图
        </Button>
        <Button
          type="primary"
          spin
          onClick={async () => {
            await saveOrUpdate(false);
            window.open(
              `#/preview?id=${schemaEntity.id}`,
            );
          }}
        >
          预览
        </Button>
      </Space>
    </div>
  );
};
