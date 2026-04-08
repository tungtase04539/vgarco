import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Dự án', value: '12', href: '/admin/projects' },
    { label: 'Dịch vụ', value: '12', href: '/admin/services' },
    { label: 'Bài viết', value: '6', href: '/admin/journal' },
    { label: 'Thành viên', value: '1', href: '/admin/team' },
  ];

  return (
    <>
      <div className="admin-header">
        <h1>Tổng quan</h1>
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <Link key={i} href={s.href} className="card" style={{ textDecoration: 'none' }}>
            <div className="card-body" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{s.value}</div>
              <div className="text-label">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="card-body">
          <h3 style={{ marginBottom: '1rem' }}>Chào mừng đến trang quản trị</h3>
          <p className="text-muted">
            Quản lý dự án, dịch vụ, bài viết và thành viên đội ngũ.
            Mọi thay đổi sẽ hiển thị trực tiếp trên website.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link href="/admin/projects" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
              Quản lý dự án
            </Link>
            <Link href="/admin/journal" className="btn btn-outline" style={{ fontSize: '0.8rem', color: 'var(--color-on-surface)' }}>
              Viết bài mới
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
