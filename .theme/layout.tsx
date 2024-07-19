import React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
  (window as any).monacoTheme = 'vs-dark';
  return <Outlet />;
};
