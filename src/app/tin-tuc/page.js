import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';

export const metadata = { title: 'Tin tức | VGARCO' };

const FALLBACK_POSTS = [
  { title: 'Thi công trường học chất lượng cao — Tiêu chuẩn VGARCO', excerpt: 'Mỗi công trình giáo dục đều cần đảm bảo chất lượng thi công và an toàn cho học sinh...', category: 'Xây dựng', slug: 'thi-cong-truong-hoc' },
  { title: 'Thiết kế bảo tàng — Kiến trúc phục vụ lịch sử', excerpt: 'Bảo tàng không chỉ là nơi lưu giữ, mà còn là không gian kể chuyện...', category: 'Thiết kế', slug: 'thiet-ke-bao-tang' },
  { title: 'VGARCO tại Lào — Mở rộng thị trường quốc tế', excerpt: 'Với nhiều dự án thành công tại Lào, VGARCO khẳng định năng lực thi công quốc tế...', category: 'Quốc tế', slug: 'vgarco-tai-lao' },
  { title: 'Xu hướng kiến trúc xanh 2024', excerpt: 'Kiến trúc bền vững không chỉ là xu hướng mà là yêu cầu bắt buộc...', category: 'Kiến trúc', slug: 'kien-truc-xanh-2024' },
  { title: 'Ứng dụng BIM trong quản lý dự án', excerpt: 'Công nghệ BIM giúp tối ưu hóa quy trình thiết kế và thi công...', category: 'Công nghệ', slug: 'ung-dung-bim' },
  { title: 'Khu nghỉ dưỡng HIDUMI — Dự án nghỉ dưỡng cao cấp', excerpt: 'Thiết kế hòa mình với thiên nhiên, tạo ra trải nghiệm nghỉ dưỡng đẳng cấp...', category: 'Dự án', slug: 'khu-nghi-duong-hidumi-news' },
];

export default function JournalPage() {
  return (
    <>
      <Hero
        title="Tin tức"
        backgroundImage="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1920&q=80"
        small
      />

      {/* Featured Article */}
      <section className="section-lg section-warm">
        <div className="container">
          <Link href={`/tin-tuc/${FALLBACK_POSTS[0].slug}`} style={{ display: 'block' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}>
              <div
                style={{
                  aspectRatio: '16/10',
                  background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                  borderRadius: '2px',
                }}
              />
              <div>
                <p className="text-label" style={{ marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>
                  {FALLBACK_POSTS[0].category}
                </p>
                <h2 style={{ marginBottom: '1rem' }}>{FALLBACK_POSTS[0].title}</h2>
                <p className="text-body-lg text-muted">{FALLBACK_POSTS[0].excerpt}</p>
                <span className="btn btn-primary btn-icon" style={{ marginTop: '1.5rem' }}>
                  Đọc thêm
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-lg">
        <div className="container">
          <div className="grid-3">
            {FALLBACK_POSTS.slice(1).map((post, i) => (
              <Link key={i} href={`/tin-tuc/${post.slug}`} className="card">
                <div
                  className="card-image"
                  style={{
                    background: `linear-gradient(${135 + i * 30}deg, #2d3436 0%, #636e72 100%)`,
                  }}
                />
                <div className="card-body">
                  <div className="card-tag">{post.category}</div>
                  <div className="card-title">{post.title}</div>
                  <p className="card-excerpt">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Bạn có ý tưởng cho dự án?"
        buttonLabel="Liên hệ"
        buttonHref="/lien-he"
      />
    </>
  );
}
