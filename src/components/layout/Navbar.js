'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/du-an', label: 'Dự án' },
  { href: '/tin-tuc', label: 'Tin tức' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <Link href="/" className="navbar-logo">
        <span className="navbar-logo-bold">VGAR</span>
        <span className="navbar-logo-light">CO</span>
      </Link>

      <button
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="navbar-links">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-link ${pathname === link.href ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <span className="navbar-lang">VN</span>
        <Link
          href="/lien-he"
          className="navbar-link-cta"
          onClick={() => setIsOpen(false)}
        >
          LIÊN HỆ
        </Link>
      </div>
    </nav>
  );
}
