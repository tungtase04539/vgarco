'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/studio', label: 'Studio' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/projekte', label: 'Projekte' },
  { href: '/journal', label: 'Journal' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <Link href="/" className="navbar-logo">
        <span className="navbar-logo-bold">fbn</span>
        <span className="navbar-logo-light">STUDIO</span>
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
        <span className="navbar-lang">DE</span>
        <Link
          href="/kontakt"
          className="navbar-link-cta"
          onClick={() => setIsOpen(false)}
        >
          KONTAKT
        </Link>
      </div>
    </nav>
  );
}
