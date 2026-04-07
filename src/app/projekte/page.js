'use client';

import { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';

const CATEGORIES = ['Alle', 'Bauen im Bestand', 'Gewerbe', 'Innenarchitektur', 'Kultur', 'Städtebau', 'Wohnen'];

const FALLBACK_PROJECTS = [
  { code: 'V12', title: 'Umbau und Sanierung Kulturdenkmal in Wiesbaden', category: 'Bauen im Bestand', slug: 'v12' },
  { code: 'VLW', title: 'Neubau Villa in Niedernhausen', category: 'Wohnen', slug: 'vlw' },
  { code: 'RR1', title: 'Umbau Wohn- und Geschäftshaus zum Mehrfamilienhaus in Montabaur', category: 'Bauen im Bestand', slug: 'rr1' },
  { code: 'P01', title: 'Umbau Einfamilienhaus Limburg', category: 'Bauen im Bestand', slug: 'p01' },
  { code: 'M17', title: 'Sanierung und Fassadenwiederherstellung in Wiesbaden', category: 'Wohnen', slug: 'm17' },
  { code: 'N9C', title: 'Nhà 9NCK Café und Bar Konzept Hanoi', category: 'Gewerbe', slug: 'n9c' },
  { code: 'CC1', title: 'Connecting Cube Hotelanlage Göttingen', category: 'Bauen im Bestand', slug: 'cc1' },
  { code: 'BB1', title: 'Blumenbunker Haus der Baukultur', category: 'Kultur', slug: 'bb1' },
  { code: 'UZ1', title: 'Urban Zipper Mixed Use Konzept', category: 'Gewerbe', slug: 'uz1' },
  { code: 'ZS1', title: 'Zollspeicher Kultursteg am Rheinufer', category: 'Innenarchitektur', slug: 'zs1' },
  { code: 'N08', title: 'Neubau Reihenhäuser in Dornheim', category: 'Wohnen', slug: 'n08' },
  { code: 'SK1', title: 'Siedlung Klarenthal Stadtentwicklung und Sanierung', category: 'Städtebau', slug: 'sk1' },
];

export default function ProjektePage() {
  const [activeCategory, setActiveCategory] = useState('Alle');

  const filtered = activeCategory === 'Alle'
    ? FALLBACK_PROJECTS
    : FALLBACK_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Hero
        title="Projekte"
        backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
        small
      />

      <section className="section-lg section-warm">
        <div className="container">
          <div className="filter-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((p, i) => (
              <Link key={i} href={`/projekte/${p.slug}`} className="card">
                <div
                  className="card-image"
                  style={{
                    background: `linear-gradient(${135 + i * 25}deg, #2d3436 0%, #636e72 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {p.code}
                </div>
                <div className="card-body">
                  <div className="card-tag">{p.category}</div>
                  <div className="card-title">{p.code} – {p.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
