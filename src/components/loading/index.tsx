import { Spin } from 'antd';

export default () => {
  return (
    <div
      style={{
        background: '#eee',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Spin wrapperClassName='app-loading' size='large' />
    </div>
  );
};
