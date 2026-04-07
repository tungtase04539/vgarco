'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const FALLBACK_POSTS = [
  { id: '1', title: 'Bestandsanalyse vor dem Umbau', category: 'Bauen im Bestand', excerpt: 'Im Bestand wird nie auf leerer Wiese geplant...', published_at: '2025-12-15', is_featured: true },
  { id: '2', title: 'Denkmal energetisch sanieren', category: 'Energetisch Sanieren', excerpt: 'Viele Bauherren starten mit einer simplen Erwartung...', published_at: '2025-11-20', is_featured: false },
  { id: '3', title: 'Denkmal gekauft und dann Ärger mit dem Amt?', category: 'Denkmalschutz', excerpt: 'Viele Bauherren verlieben sich in ein Denkmal...', published_at: '2025-10-10', is_featured: false },
];

export default function AdminJournalPage() {
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: '', is_featured: false, published_at: '' });

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data } = await supabase.from('journal_posts').select('*').order('published_at', { ascending: false });
      if (data?.length > 0) setPosts(data);
    } catch (e) {}
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', category: '', is_featured: false, published_at: new Date().toISOString().split('T')[0] });
    setShowForm(true);
  }

  function openEdit(p) { setEditing(p); setForm({ ...p }); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.title.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-').replace(/^-|-$/g, '');
    if (editing) {
      try { await supabase.from('journal_posts').update({ ...form, slug }).eq('id', editing.id); } catch(e) {}
      setPosts(posts.map(p => p.id === editing.id ? { ...p, ...form, slug } : p));
    } else {
      const newItem = { ...form, id: Date.now().toString(), slug };
      try { const { data } = await supabase.from('journal_posts').insert({ ...form, slug }).select().single(); if (data) newItem.id = data.id; } catch(e) {}
      setPosts([newItem, ...posts]);
    }
    setShowForm(false);
    showToastMsg(editing ? 'Artikel aktualisiert' : 'Artikel erstellt');
  }

  async function handleDelete(id) {
    if (!confirm('Artikel wirklich löschen?')) return;
    try { await supabase.from('journal_posts').delete().eq('id', id); } catch(e) {}
    setPosts(posts.filter(p => p.id !== id));
    showToastMsg('Artikel gelöscht');
  }

  function showToastMsg(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  return (
    <>
      <div className="admin-header">
        <h1>Journal</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Neuer Artikel</button>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflow: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editing ? 'Artikel bearbeiten' : 'Neuer Artikel'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Titel</label>
                <input className="form-input-bordered" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Kategorie</label>
                  <input className="form-input-bordered" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Datum</label>
                  <input type="date" className="form-input-bordered" value={form.published_at} onChange={e => setForm({...form, published_at: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Auszug</label>
                <textarea className="form-input-bordered" style={{ minHeight: '60px' }} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Inhalt</label>
                <textarea className="form-input-bordered" style={{ minHeight: '200px' }} value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} />
                  Featured Artikel
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">Speichern</button>
                <button type="button" className="btn btn-outline" style={{ color: 'var(--color-on-surface)' }} onClick={() => setShowForm(false)}>Abbrechen</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr><th>Titel</th><th>Kategorie</th><th>Datum</th><th>Featured</th><th>Aktionen</th></tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td><strong>{p.title}</strong></td>
              <td>{p.category}</td>
              <td>{p.published_at}</td>
              <td>{p.is_featured ? '✓' : '—'}</td>
              <td>
                <div className="admin-actions">
                  <button className="admin-btn-sm admin-btn-edit" onClick={() => openEdit(p)}>Bearbeiten</button>
                  <button className="admin-btn-sm admin-btn-delete" onClick={() => handleDelete(p.id)}>Löschen</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
