import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';
import { GALLERY_MAP } from '@/lib/gallery-map';

async function getHomeData() {
  const supabase = getSupabaseServer();
  const [projectsRes, servicesRes] = await Promise.all([
    supabase.from('projects').select('*').eq('is_featured', true).order('display_order').limit(6),
    supabase.from('services').select('*').eq('is_active', true).order('display_order'),
  ]);
  return {
    projects: projectsRes.data || [],
    services: servicesRes.data || [],
  };
}

const FALLBACK_SERVICES = [
  'Thiết kế kiến trúc', 'Thiết kế nội thất', 'Thi công xây dựng', 'Quy hoạch đô thị',
  'Tư vấn giám sát', 'Thiết kế cảnh quan', 'Cải tạo & Nâng cấp', 'Thiết kế BIM',
  'Lập dự án đầu tư', 'Xây dựng dân dụng', 'Xây dựng công nghiệp', 'Tư vấn thiết kế',
];

export default async function HomePage() {
  let data = { projects: [], services: [] };
  try {
    data = await getHomeData();
  } catch (e) {
    // Supabase not connected yet, use fallback
  }

  const services = data.services.length > 0
    ? data.services.map(s => s.title)
    : FALLBACK_SERVICES;

  const projects = data.projects.length > 0 ? data.projects : [];

  return (
    <>
      <Hero
        title="Lắng nghe – Phân tích – Sáng tạo – Phát triển giải pháp"
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
      />

      {/* About Section */}
      <section className="section-lg section-warm">
        <div className="container-narrow text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>
            VGARCO - Kiến trúc & Xây dựng chất lượng cao
          </h2>
          <p className="text-body-lg text-muted" style={{ marginBottom: '1rem' }}>
            VGARCO CO.,LTD là công ty kiến trúc và xây dựng với chuyên môn trong thiết kế,
            thi công các công trình giáo dục, văn hóa, dân dụng và công nghiệp. Chúng tôi phát triển
            kiến trúc hiện đại, tối ưu năng lượng và tạo ra không gian sống bền vững.
          </p>
          <p className="text-body-lg text-muted" style={{ marginBottom: '2rem' }}>
            Mỗi dự án bắt đầu từ phân tích rõ ràng và kết thúc bằng giải pháp
            hiệu quả về thiết kế, kỹ thuật và kinh tế.
          </p>
          <Link href="/gioi-thieu" className="btn btn-primary btn-icon">
            Về chúng tôi
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-lg section-warm" style={{ paddingTop: 0 }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>Dịch vụ của chúng tôi</h2>
          <p className="text-body-lg text-muted container-narrow" style={{ marginBottom: '2rem' }}>
            Chúng tôi đồng hành cùng dự án xây dựng qua tất cả các giai đoạn và cung cấp
            đầy đủ dịch vụ kiến trúc chuyên nghiệp.
          </p>
          <Link href="/dich-vu" className="btn btn-primary btn-icon" style={{ marginBottom: '3rem' }}>
            Tìm hiểu thêm
          </Link>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-outline-variant)' }}>
                <span style={{ fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Dự án nổi bật</h2>
          <div className="grid-3">
            {projects.map((p, i) => {
              const images = GALLERY_MAP[p.slug] || [];
              const coverPid = p.cover_image || (images.length > 0 ? images[0] : null);
              const thumbUrl = coverPid
                ? `https://res.cloudinary.com/dmjrk2fov/image/upload/f_auto,q_auto,w_600,h_400,c_fill/${coverPid}`
                : null;
              return (
              <Link key={i} href={`/du-an/${p.slug}`} className="card">
                <div
                  className="card-image"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, #2d3436 0%, #636e72 100%)`,
                    backgroundImage: thumbUrl ? `url(${thumbUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                </div>
                <div className="card-body">
                  <div className="card-tag">{p.category}</div>
                  <div className="card-title">{p.title}</div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
