'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { GALLERY_MAP } from '@/lib/gallery-map';

const CLOUD = 'dmjrk2fov';
const CATEGORIES = ['Tất cả', 'Giáo dục', 'Công nghiệp', 'Văn hóa', 'Nhà ở'];

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
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
              const images = (p.gallery && p.gallery.length > 0) ? p.gallery : (GALLERY_MAP[p.slug] || []);
              const coverPid = p.cover_image || (images.length > 0 ? images[0] : null);
              const thumbUrl = coverPid
                ? `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_600,h_400,c_fill/${coverPid}`
                : null;

              return (
                <Link key={p.id || i} href={`/du-an/${p.slug}`} className="card">
                  <div
                    className="card-image"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      background: `linear-gradient(${135 + i * 25}deg, #2d3436 0%, #636e72 100%)`,
                      backgroundImage: thumbUrl ? `url(${thumbUrl})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
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
  );
}
