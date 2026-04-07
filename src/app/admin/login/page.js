'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Login fehlgeschlagen');
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-surface-warm)',
    }}>
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem',
        width: '100%',
        maxWidth: '420px',
        boxShadow: 'var(--shadow-ambient)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 700 }}>fbn</span>
            <span style={{ fontWeight: 200, letterSpacing: '0.15em' }}>STUDIO</span>
          </h1>
          <p className="text-muted">Admin Login</p>
        </div>

        {error && (
          <div style={{
            background: '#ffdad6',
            color: 'var(--color-error)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1rem',
            fontSize: '0.875rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">E-Mail</label>
            <input
              type="email"
              className="form-input-bordered"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Passwort</label>
            <input
              type="password"
              className="form-input-bordered"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Einen Moment...' : 'Anmelden'}
          </button>
        </form>
      </div>
    </div>
  );
}
