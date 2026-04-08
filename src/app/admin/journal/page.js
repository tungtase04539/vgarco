'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminJournalPage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: '', is_featured: false, published_at: '' });

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    try {
      const { data } = await supabase.from('journal_posts').select('*').order('published_at', { ascending: false });
      if (data) setPosts(data);
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
    const slug = form.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (editing) {
      try { await supabase.from('journal_posts').update({ ...form, slug }).eq('id', editing.id); } catch(e) {}
    } else {
      try { await supabase.from('journal_posts').insert({ ...form, slug }); } catch(e) {}
    }
    setShowForm(false);
    loadPosts();
    showToastMsg(editing ? 'Đã cập nhật bài viết' : 'Đã tạo bài viết mới');
  }

  async function handleDelete(id) {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
    try { await supabase.from('journal_posts').delete().eq('id', id); } catch(e) {}
    setPosts(posts.filter(p => p.id !== id));
    showToastMsg('Đã xóa bài viết');
  }

  function showToastMsg(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  return (
    <>
      <div className="admin-header">
        <h1>Tin tức</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Thêm bài viết</button>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflow: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editing ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Tiêu đề</label>
                <input className="form-input-bordered" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Danh mục</label>
                  <input className="form-input-bordered" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày đăng</label>
                  <input type="date" className="form-input-bordered" value={form.published_at} onChange={e => setForm({...form, published_at: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Tóm tắt</label>
                <textarea className="form-input-bordered" style={{ minHeight: '60px' }} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Nội dung</label>
                <textarea className="form-input-bordered" style={{ minHeight: '200px' }} value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} />
                  Bài viết nổi bật
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-outline" style={{ color: 'var(--color-on-surface)' }} onClick={() => setShowForm(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr><th>Tiêu đề</th><th>Danh mục</th><th>Ngày đăng</th><th>Nổi bật</th><th>Thao tác</th></tr>
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
                  <button className="admin-btn-sm admin-btn-edit" onClick={() => openEdit(p)}>Sửa</button>
                  <button className="admin-btn-sm admin-btn-delete" onClick={() => handleDelete(p.id)}>Xóa</button>
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
