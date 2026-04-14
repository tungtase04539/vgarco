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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.832!3d21.0065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAwJzIzLjQiTiAxMDXCsDQ5JzU1LjIiRQ!5e0!3m2!1svi!2s!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VGARCO - Bản đồ"
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
