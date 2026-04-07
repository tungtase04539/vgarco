'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: '◫' },
  { href: '/admin/projects', label: 'Projekte', icon: '▦' },
  { href: '/admin/services', label: 'Leistungen', icon: '◇' },
  { href: '/admin/journal', label: 'Journal', icon: '▤' },
  { href: '/admin/team', label: 'Team', icon: '◎' },
  { href: '/admin/settings', label: 'Einstellungen', icon: '⚙' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <Link href="/admin" style={{ color: 'inherit' }}>fbn<span style={{ fontWeight: 200 }}>STUDIO</span></Link>
        <span style={{ display: 'block', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginTop: '4px' }}>
          Admin Panel
        </span>
      </div>

      <nav>
        {ADMIN_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-nav-link ${pathname === link.href ? 'active' : ''}`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Link href="/" className="admin-nav-link" target="_blank" rel="noopener">
          ↗ Website anzeigen
        </Link>
        <button
          onClick={handleLogout}
          className="admin-nav-link"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
            font: 'inherit',
            color: 'inherit',
            padding: 'inherit',
          }}
        >
          ⏻ Abmelden
        </button>
      </div>
    </aside>
  );
}
