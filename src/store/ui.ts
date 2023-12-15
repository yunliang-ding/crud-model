import { LayoutProps } from '@/types';
import { create } from 'react-core-form-store';

export default create<LayoutProps>({
  title: 'Crud-Model',
  primaryColor: '#165dff',
  status: 'loading',
  compact: true,
  dark: false,
});
