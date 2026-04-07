import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';

const CLOUD = 'dmjrk2fov';

// Gallery image counts per project (from WordPress extraction)
const GALLERY_MAP = {
  'truong-tieu-hoc-co-nhue-2b': ['00','01','02','03','04','05','FEATURED_PCG_4-Photo-modified','PC-TT_11-Photo','PCG_1-Photo','PCG_2-Photo','PCG_4-Photo','PCG_5-Photo','PCG_7-Photo','Screenshot-48','Screenshot-49','Screenshot-50','Screenshot-51','Untitled-design-28','z4489609612081_05d56996a8c2868c2515e456f43251a5','z4489609612081_05d56996a8c2868c2515e456f43251a5-1'],
  'truong-trung-hoc-co-so-chat-luong-cao': ['00','01-4','02-4','03-4','04-4','05-1','06-1','07','08','09','10','11','12','13','14','FEATURED_TT_10-Photo-modified','IMG_0672','PC_1-Photo','PC_2-Photo','PC_3-Photo','PC_4-Photo','PC_5-Photo','PC_7-Photo','PC_8-Photo','PC_9-Photo','TT_10-Photo','TT_11-Photo','Untitled-design-32','z4503234562154_7418eedbb53f9c54513a517f74323328','z4503234564175_19c03d9fd859a71c961669bf70fe0833','z4503234571382_674789611b08d13b6ad2730210e0a0fc','z4503329588708_f82f557ddeeeff1a9c5aef8d4df93ed3'],
  'nha-may-nhua-grand-plastic': ['01','01-5','01-modified-2','01-modified-3','02','03','04','10_5-Photo','10_6-Photo','10_7-Photo','10_7-Photo-modified','10_8-Photo','FEATURED_z5242212710797_af52a73f88b1331fb5dda317e44db4be-modified','z5242212709395_a3565e0d6906b5f8200f4f1c29beda37','z5242212710797_af52a73f88b1331fb5dda317e44db4be','z5242212722302_95e0df081be9af7aab9d0810a9da56d9'],
  'trung-hoc-co-so-tay-tuu': ['01-1','02-1','03-1','04-1','05','06','FEATURED_PCG_4-Photo-modified-1','PCG_4-Photo','PCG_6-Photo','PCTT_1-Photo','PCTT_2-Photo','z4503868810019_c508583f063ecc31f1bf8cb3fc03aa0a','z4520499487623_edf641e5914aea7eebddbf7bb46262f4'],
  'to-ngoc-van': ['01-2','01-3','02-2','02-3','03-2','03-3','04-2','04-3','1','2','2-modified','3','4','4-modified','FEATURED_Untitled-design-29','Untitled-design-22','Untitled-design-23','Untitled-design-25'],
  'trung-tam-boi-duong-chinh-tri-bac-tu-liem': ['4A','4B','4B-modified','4B-modified-ezgif.com-crop','FEATURED_01-modified','z4504027479557_9e33603c747a03f49e67358849f20f1a','z4504031593648_f6eaed31806383c1ec4658ebc400c297','z5299368585164_454bd2d782c1851d1c82e6dec07f0483','z5299368594374_c748890e764bfd539531757372bd2f14'],
  'bao-tang-lich-su-qdnd-lao': ['1-2','2-2','3-2','4-2','5-2','6-1','7-1','8-1','A1-1','A1-2','A2-1','B1-1','B2-1','B3-1','B4-1','C1-1','C2-1','C3-1','C4-1','C5-1','C6-1','FEATURED_1-modified','Untitled-design-12','Untitled-design-13','Untitled-design-14'],
  'cuc-thi-hanh-an-dan-su-binh-chanh': ['download-2-modified','FEATURED_Picture2-modified-2','Picture1','Picture2','Picture2-modified','Untitled-design-10','Untitled-design-17','Untitled-design-20','Untitled-design-21','Untitled-design-9'],
  'khu-nghi-duong-hidumi': ['FEATURED_IMG_1255-modified','IMG_1254','IMG_1254-modified','IMG_1255','IMG_1256','IMG_1256-modified','Untitled-design-18','Untitled-design-19','Untitled-design-3-1','Untitled-design-6-1','Untitled-design-7','Untitled-design-7-1'],
  'tieu-doan-dac-cong-phan-ung-nhanh-qdnd-lao': ['00','01','02','03','04','05','05-1','06','A2-3','download-modified','FEATURED_00-modified','NHA-CH','NHA-CH-modified','PC-TT-1','PC-TT-2','PC-TT-3','PC-TT-5','PC-TT-6','Untitled-design-15','Untitled-design-16','Untitled-design-21-1','Untitled-design-3','Untitled-design-30','Untitled-design-31','Untitled-design-4'],
  'truong-ly-luan-chinh-tri-qdnd-lao': ['01-1','02-1','03-1','04-1','05-2','06-1','1-1','2-1','2-modified','3-1','4-1','5-1','download-1-modified','FEATURED_01-1-2048x1249-modified','KHANH-THANH','Untitled-design-5','Untitled-design-6','Untitled-design-8'],
  'apartment-building': ['1-3','2-3','3','4','5','FEATURED_1-modified-1'],
};

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

  // Build gallery images from known file map
  const imageNames = GALLERY_MAP[slug] || [];
  const galleryImages = imageNames.map(name => 
    `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/vgarco/projects/${slug}/${name}`
  );

  // Get the featured image
  const featuredName = imageNames.find(n => n.startsWith('FEATURED_')) || imageNames[0];
  const heroImage = featuredName 
    ? `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1920/vgarco/projects/${slug}/${featuredName}`
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
