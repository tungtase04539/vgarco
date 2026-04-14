import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = { title: 'Liên hệ | VGARCO' };

export default function KontaktPage() {
  return (
    <>
      <Hero
        title="Liên hệ"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        small
      />

      <section className="section-lg section-warm">
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem' }}>
            {/* Contact Form */}
            <div>
              <h2 style={{ marginBottom: '2rem' }}>Gửi tin nhắn</h2>
              <ContactForm />
            </div>

            {/* Contact Details */}
            <div>
              <p className="text-label" style={{ marginBottom: '0.5rem' }}>Văn phòng</p>
              <h3 style={{ marginBottom: '0.5rem' }}>CÔNG TY TNHH TƯ VẤN XÂY DỰNG VGARCO</h3>
              <p className="text-muted" style={{ marginBottom: '2rem', fontSize: 'var(--font-body-sm)' }}>
                VGARCO CONSTRUCTION CONSULTING COMPANY LIMITED
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <p>Số 75, ngõ 6, đường Đặng Văn Ngữ,</p>
                <p>Phường Phương Liên, Quận Đống Đa,</p>
                <p>Thành phố Hà Nội, Việt Nam</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p><a href="mailto:admin@vgarco.vn">admin@vgarco.vn</a></p>
                <p><a href="tel:+84912345678">+84 912 345 678</a></p>
              </div>

              <p className="text-label" style={{ marginBottom: '0.5rem', marginTop: '2rem' }}>Thông tin pháp lý</p>
              <p>MST: 2901635947</p>
              <p>Người đại diện: Vũ Duy Hùng</p>
              <p>Thành lập: 19/08/2013</p>

              <p className="text-label" style={{ marginBottom: '0.5rem', marginTop: '2rem' }}>Giờ làm việc</p>
              <p>Thứ 2 – Thứ 6, 08:00–17:00</p>

              <div
                style={{
                  marginTop: '2rem',
                  aspectRatio: '16/10',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=75+ng%C3%B5+6+%C4%90%E1%BA%B7ng+V%C4%83n+Ng%E1%BB%AF+Ph%C6%B0%C6%A1ng+Li%C3%AAn+%C4%90%E1%BB%91ng+%C4%90a+H%C3%A0+N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="VGARCO - 75 ngõ 6 Đặng Văn Ngữ, Đống Đa, Hà Nội"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
