import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';
import { GALLERY_MAP } from '@/lib/gallery-map';

const CLOUD = 'dmjrk2fov';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = getSupabaseServer();
  const { data: project } = await supabase
    .from('projects')
    .select('title')
    .eq('slug', slug)
    .single();
  
  return {
    title: project ? `${project.title} | VGARCO` : 'Chi tiết dự án | VGARCO',
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

  if (!project) {
    return (
      <>
        <section className="hero hero-sm">
          <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title" style={{ fontSize: 'var(--font-display-md)' }}>
              Không tìm thấy dự án
            </h1>
            <p className="hero-subtitle">Dự án này không tồn tại hoặc đã bị xóa.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Link href="/projekte" className="btn btn-primary btn-icon">
              Tất cả dự án
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Build gallery images from the Cloudinary public IDs map
  const publicIds = GALLERY_MAP[slug] || [];
  const galleryImages = publicIds.map(pid => 
    `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${pid}`
  );
  const heroImage = publicIds.length > 0
    ? `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1920/${publicIds[0]}`
    : null;

  return (
    <>
      {/* Hero with featured image */}
      <section className="hero hero-sm" style={{ position: 'relative' }}>
        <div
          className="hero-bg"
          style={{
            backgroundImage: heroImage ? `url(${heroImage})` : undefined,
            background: !heroImage ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="text-label" style={{ marginBottom: '0.5rem', opacity: 0.7 }}>Dự án</p>
          <h1 className="hero-title" style={{ fontSize: 'var(--font-display-md)' }}>
            {project.title}
          </h1>
        </div>
      </section>

      {/* Project Meta */}
      <section className="section-lg section-warm">
        <div className="container">
          <div className="project-meta">
            {[
              { label: 'Chủ đầu tư', value: project.client },
              { label: 'Địa điểm', value: project.location },
              { label: 'Giai đoạn', value: project.phases },
              { label: 'Diện tích', value: project.area },
              { label: 'Trạng thái', value: project.status },
              { label: 'Danh mục', value: project.category },
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

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="gallery-grid">
              {galleryImages.map((url, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '16/10',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '2px',
                    backgroundImage: `url(${url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#2d3436',
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Link href="/projekte" className="btn btn-primary btn-icon">
            Tất cả dự án
          </Link>
        </div>
      </section>

      <CTASection
        title="Hãy trao đổi về dự án của bạn."
        buttonLabel="Liên hệ"
        buttonHref="/kontakt"
      />
    </>
  );
}
