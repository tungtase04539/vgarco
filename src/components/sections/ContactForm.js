'use client';

import { useState } from 'react';

export default function ContactForm() {
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

  if (sent) {
    return (
      <div style={{ padding: '2rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Cảm ơn bạn!</h3>
        <p className="text-muted">Chúng tôi đã nhận được tin nhắn và sẽ liên hệ lại sớm nhất.</p>
      </div>
    );
  }

  return (
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
  );
}
