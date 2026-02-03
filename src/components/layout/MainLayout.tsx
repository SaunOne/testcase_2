import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AppBar } from './AppBar';

const getBreadcrumb = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb: { label: string; href?: string }[] = [];

  if (segments[0] === 'outbound') {
    breadcrumb.push({ label: 'Outbound', href: '/outbound' });
    if (segments[1] === 'create-do') {
      breadcrumb.push({ label: 'Create DO' });
    }
  }

  return breadcrumb;
};

export function MainLayout() {
  const location = useLocation();
  const breadcrumb = getBreadcrumb(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-60">
        <AppBar breadcrumb={breadcrumb} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
