import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = getSupabaseServer();
  const { data: project } = await supabase
    .from('projects')
    .select('title,code')
    .eq('slug', slug)
    .single();
  
  return {
    title: project ? `${project.code} – ${project.title} | fbnSTUDIO` : 'Projektdetail | fbnSTUDIO',
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const supabase = getSupabaseServer();

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  // Fallback if project not found in DB
  if (!project) {
    return (
      <>
        <section className="hero hero-sm">
          <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title" style={{ fontSize: 'var(--font-display-md)' }}>
              Projekt nicht gefunden
            </h1>
            <p className="hero-subtitle">Dieses Projekt existiert nicht oder wurde entfernt.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Link href="/projekte" className="btn btn-primary btn-icon">
              Alle Projekte
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="hero hero-sm">
        <div
          className="hero-bg"
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="text-label" style={{ marginBottom: '0.5rem', opacity: 0.7 }}>Projekt</p>
          <h1 className="hero-title" style={{ fontSize: 'var(--font-display-md)' }}>
            {project.code}
          </h1>
          <p className="hero-subtitle">{project.title}</p>
        </div>
      </section>

      {/* Project Meta */}
      <section className="section-lg section-warm">
        <div className="container">
          <div className="project-meta">
            {[
              { label: 'Bauherr', value: project.client },
              { label: 'Standort', value: project.location },
              { label: 'Leistungsphasen', value: project.phases },
              { label: 'Fläche', value: project.area },
              { label: 'Status', value: project.status },
              { label: 'Kategorie', value: project.category },
            ].filter(m => m.value).map((m, i) => (
              <div key={i} className="project-meta-item">
                <div className="project-meta-label">{m.label}</div>
                <div className="project-meta-value">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      {project.description && (
        <section className="section-lg">
          <div className="container-narrow">
            <p className="text-body-lg text-muted">{project.description}</p>
          </div>
        </section>
      )}

      {/* Gallery Placeholder */}
      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                style={{
                  aspectRatio: '16/10',
                  background: `linear-gradient(${100 + i * 30}deg, #2d3436, #636e72)`,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.875rem',
                }}
              >
                Projektfoto {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Link href="/projekte" className="btn btn-primary btn-icon">
            Alle Projekte
          </Link>
        </div>
      </section>

      <CTASection
        title="Sprechen wir über Ihr Projekt."
        buttonLabel="Kontakt"
        buttonHref="/kontakt"
      />
    </>
  );
}
