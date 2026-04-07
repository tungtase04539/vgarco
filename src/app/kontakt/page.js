'use client';

import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';

export default function KontaktPage() {
  const [form, setForm] = useState({ name: '', email: '', telefon: '', betreff: '', nachricht: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // TODO: Send to API route / email service
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setSending(false);
  };

  return (
    <>
      <Hero
        title="Kontakt"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        small
      />

      <section className="section-lg section-warm">
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem' }}>
            {/* Contact Form */}
            <div>
              <h2 style={{ marginBottom: '2rem' }}>Schreiben Sie uns</h2>
              {sent ? (
                <div style={{ padding: '2rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Vielen Dank!</h3>
                  <p className="text-muted">Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-input"
                      placeholder="E-Mail"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Telefon"
                      value={form.telefon}
                      onChange={e => setForm({ ...form, telefon: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Betreff"
                      value={form.betreff}
                      onChange={e => setForm({ ...form, betreff: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-textarea form-input"
                      placeholder="Nachricht"
                      value={form.nachricht}
                      onChange={e => setForm({ ...form, nachricht: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-icon" disabled={sending}>
                    {sending ? 'Wird gesendet...' : 'Nachricht senden'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div>
              <p className="text-label" style={{ marginBottom: '0.5rem' }}>Studio</p>
              <h3 style={{ marginBottom: '2rem' }}>fbnSTUDIO Ferri Nguyen Architekten PartG mbB</h3>

              <div style={{ marginBottom: '2rem' }}>
                <p>Viktoriastraße 12</p>
                <p>65189 Wiesbaden</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p><a href="mailto:info@fbnstudio.de">info@fbnstudio.de</a></p>
                <p><a href="tel:+4961136093694">+49 611 360 93 694</a></p>
              </div>

              <p className="text-label" style={{ marginBottom: '0.5rem', marginTop: '2rem' }}>Bürozeiten</p>
              <p>Mo–Fr, 09:00–18:00 Uhr</p>

              {/* Map placeholder */}
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
                Google Maps — Viktoriastraße 12, Wiesbaden
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
