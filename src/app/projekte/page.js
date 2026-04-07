'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import { supabase } from '@/lib/supabase';

const CATEGORIES = ['Tất cả', 'Bildung', 'Gewerbe', 'Kultur', 'Wohnen'];

export default function ProjektePage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filtered = activeCategory === 'Tất cả'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <Hero
        title="Dự án"
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

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <p className="text-muted">Đang tải dự án...</p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((p, i) => {
                // Build featured image URL from Cloudinary
                const folderFiles = [];
                const featuredUrl = `https://res.cloudinary.com/dmjrk2fov/image/upload/f_auto,q_auto,w_600/vgarco/projects/${p.slug}/FEATURED_${p.slug}`;
                // Use a fallback gradient
                const hasFeatured = p.is_featured !== undefined;

                return (
                  <Link key={p.id || i} href={`/projekte/${p.slug}`} className="card">
                    <div
                      className="card-image"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        background: `linear-gradient(${135 + i * 25}deg, #2d3436 0%, #636e72 100%)`,
                      }}
                    >
                      <img
                        src={`https://res.cloudinary.com/dmjrk2fov/image/upload/f_auto,q_auto,w_600,h_400,c_fill/vgarco/projects/${p.slug}`}
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <span style={{
                        position: 'relative',
                        color: 'white',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                      }}>
                        {p.code}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="card-tag">{p.category}</div>
                      <div className="card-title">{p.title}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
