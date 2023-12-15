import { useEffect, useState } from 'react';
import { Button, CardForm, CreateDrawer } from 'react-core-form';
import { Message, Space, Input } from '@arco-design/web-react';
import { openRequestConfigDrawer } from '../request-config';
import { copyImg } from '@/util';
import { APPID } from '@/app';
import { babelParse } from 'react-core-form-tools';
import { CodeEditor } from 'react-core-form-code-editor';

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
        <div>表单设计器</div>
        <Space className="form-designer-playground-header-project-info">
          {edit ? (
            <Input
              value={name}
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
              onBlur={saveName}
              onPressEnter={saveName}
              placeholder="请输入模型名称"
              style={{ width: 160, height: 24 }}
            />
          ) : (
            <>
              <span>{schemaEntity.name}</span>
              <a
                onClick={() => {
                  setEdit(true);
                }}
              >
                <i className="iconfont spicon-bianji" />
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
          ghost
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
          ghost
          onClick={() => {
            if (formDesignerRef.current.schema?.length > 0) {
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
          ghost
          spin
          onClick={async () => {
            if (formDesignerRef.current.schema?.length > 0) {
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
          ghost
          type="primary"
          spin
          onClick={async () => {
            await saveOrUpdate(false);
            window.open(`#/designer/preview?id=${schemaEntity.id}&appId=${APPID}`);
          }}
        >
          预览
        </Button>
      </Space>
    </div>
  );
};
