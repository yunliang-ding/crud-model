interface LayoutProps {
  title: string;
  status: 'login' | 'loading' | 'error' | 'noPermissions' | 'userDisabled';
  dark?: boolean;
  collapsed?: boolean;
  primaryColor?: string;
}