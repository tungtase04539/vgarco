import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';

export const metadata = { title: 'Giới thiệu | VGARCO' };

const FALLBACK_TEAM = [
  { name: 'Thành viên 1', title: 'Chức vụ', photo_url: '/team/member-1.jpg' },
  { name: 'Thành viên 2', title: 'Chức vụ', photo_url: '/team/member-2.jpg' },
  { name: 'Thành viên 3', title: 'Chức vụ', photo_url: '/team/member-3.jpg' },
  { name: 'Thành viên 4', title: 'Chức vụ', photo_url: '/team/member-4.jpg' },
];

export default async function StudioPage() {
  let team = FALLBACK_TEAM;
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase.from('team_members').select('*').eq('is_active', true).order('display_order');
    if (data?.length > 0) team = data;
  } catch (e) {}

  return (
    <>
      <Hero
        title="Giới thiệu"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        small
      />

      <section className="section-lg section-warm">
        <div className="container-narrow text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>Kiến trúc hiện đại, chất lượng bền vững</h2>
          <p className="text-body-lg text-muted">
            VGARCO CO.,LTD là công ty kiến trúc và xây dựng với chuyên môn trong thiết kế,
            thi công các công trình giáo dục, văn hóa, dân dụng và công nghiệp. Chúng tôi
            cam kết mang đến những giải pháp kiến trúc sáng tạo, tiết kiệm năng lượng
            và tạo ra không gian sống bền vững cho cộng đồng.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-lg">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '4rem' }}>Giá trị cốt lõi</h2>
          <div className="grid-3">
            {[
              { title: 'Chính xác', desc: 'Mỗi chi tiết đều quan trọng. Chúng tôi lên kế hoạch cẩn thận và thực hiện với độ chính xác cao nhất — từ phân tích đầu tiên đến triển khai cuối cùng.' },
              { title: 'Bền vững', desc: 'Chúng tôi tư duy dài hạn. Hiệu quả năng lượng, vật liệu tiết kiệm tài nguyên và các khái niệm bền vững là phần không thể thiếu trong công việc.' },
              { title: 'Trách nhiệm', desc: 'Chúng tôi chịu trách nhiệm về các dự án, về con người sống và làm việc trong đó, và về bối cảnh xây dựng xung quanh.' },
            ].map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem' }}>{v.title}</h3>
                <p className="text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-lg section-warm">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '4rem' }}>Đội ngũ</h2>
          <div className="grid-4">
            {team.map((m, i) => (
              <div key={i} className="team-card">
                <div
                  className="team-photo"
                  style={{
                    backgroundImage: m.photo_url ? `url(${m.photo_url})` : undefined,
                  }}
                >
                  {!m.photo_url && (
                    <span style={{ color: 'white', fontSize: '0.875rem' }}>Ảnh</span>
                  )}
                </div>
                <div className="team-info">
                  <div className="team-name">{m.name}</div>
                  <div className="team-title">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Hãy trao đổi về dự án của bạn."
        buttonLabel="Liên hệ"
        buttonHref="/lien-he"
      />
    </>
  );
}
