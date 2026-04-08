'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Tổng quan', icon: '◫' },
  { href: '/admin/projects', label: 'Dự án', icon: '▦' },
  { href: '/admin/services', label: 'Dịch vụ', icon: '◇' },
  { href: '/admin/journal', label: 'Tin tức', icon: '▤' },
  { href: '/admin/team', label: 'Đội ngũ', icon: '◎' },
  { href: '/admin/settings', label: 'Cài đặt', icon: '⚙' },
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
        <Link href="/admin" style={{ color: 'inherit' }}>VGAR<span style={{ fontWeight: 200 }}>CO</span></Link>
        <span style={{ display: 'block', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginTop: '4px' }}>
          Quản trị
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
          ↗ Xem website
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
          ⏻ Đăng xuất
        </button>
      </div>
    </aside>
  );
}
