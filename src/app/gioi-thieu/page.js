import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';

export const metadata = { title: 'Giới thiệu | VGARCO' };

export default function StudioPage() {
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

      {/* Founder Section */}
      <section className="section-lg">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div
              style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.25rem',
              }}
            >
              VGARCO Team
            </div>
            <div>
              <p className="text-label" style={{ marginBottom: '0.5rem' }}>Ban lãnh đạo</p>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>VGARCO CO.,LTD</h3>
              <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Kiến trúc & Xây dựng</p>
              <p className="text-body-lg text-muted">
                VGARCO được thành lập với tầm nhìn tạo ra kiến trúc tôn trọng không gian hiện hữu
                và đồng thời phát triển giải pháp hiện đại. Với kinh nghiệm phong phú trong 
                thiết kế và thi công, chúng tôi kết hợp sự chính xác kỹ thuật 
                với tư duy thiết kế sáng tạo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-lg section-warm">
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

      <CTASection
        title="Hãy trao đổi về dự án của bạn."
        buttonLabel="Liên hệ"
        buttonHref="/lien-he"
      />
    </>
  );
}
