import AdminSidebar from '@/components/layout/AdminSidebar';

export const metadata = { title: 'Admin | fbnSTUDIO' };

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
