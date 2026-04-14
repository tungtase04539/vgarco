'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/du-an', label: 'Dự án' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <Link href="/" className="navbar-logo">
        <img src="/logo.svg" alt="VGARCO" className="navbar-logo-img" />
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
      </div>
    </nav>
  );
}
