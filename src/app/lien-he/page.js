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
              <h3 style={{ marginBottom: '2rem' }}>VGARCO CO.,LTD</h3>

              <div style={{ marginBottom: '2rem' }}>
                <p>Hà Nội, Việt Nam</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p><a href="mailto:admin@vgarco.vn">admin@vgarco.vn</a></p>
                <p><a href="tel:+84123456789">+84 123 456 789</a></p>
              </div>

              <p className="text-label" style={{ marginBottom: '0.5rem', marginTop: '2rem' }}>Giờ làm việc</p>
              <p>Thứ 2 – Thứ 6, 08:00–17:00</p>

              <div
                style={{
                  marginTop: '2rem',
                  aspectRatio: '16/10',
                  background: 'var(--color-surface-container-high)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-on-surface-variant)',
                  fontSize: '0.875rem',
                }}
              >
                Google Maps — VGARCO, Hà Nội
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
