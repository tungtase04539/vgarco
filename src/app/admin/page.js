import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Projekte', value: '12', href: '/admin/projects' },
    { label: 'Leistungen', value: '12', href: '/admin/services' },
    { label: 'Journal Artikel', value: '6', href: '/admin/journal' },
    { label: 'Team Mitglieder', value: '1', href: '/admin/team' },
  ];

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
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
          <h3 style={{ marginBottom: '1rem' }}>Willkommen im Admin-Bereich</h3>
          <p className="text-muted">
            Verwalten Sie Projekte, Leistungen, Journal-Artikel und Team-Mitglieder.
            Alle Änderungen werden direkt auf der Website sichtbar.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link href="/admin/projects" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
              Projekte verwalten
            </Link>
            <Link href="/admin/journal" className="btn btn-outline" style={{ fontSize: '0.8rem', color: 'var(--color-on-surface)' }}>
              Neuen Artikel schreiben
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
