'use client';

import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';

export default function KontaktPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setSending(false);
  };

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
              {sent ? (
                <div style={{ padding: '2rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Cảm ơn bạn!</h3>
                  <p className="text-muted">Chúng tôi đã nhận được tin nhắn và sẽ liên hệ lại sớm nhất.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-input" placeholder="Họ và tên" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <input type="tel" className="form-input" placeholder="Số điện thoại" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-input" placeholder="Tiêu đề" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <textarea className="form-textarea form-input" placeholder="Nội dung tin nhắn" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-icon" disabled={sending}>
                    {sending ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </button>
                </form>
              )}
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
