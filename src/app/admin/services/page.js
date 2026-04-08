'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', description: '', display_order: 0, is_active: true });

  useEffect(() => { loadServices(); }, []);

  async function loadServices() {
    try {
      const { data } = await supabase.from('services').select('*').order('display_order');
      if (data) setServices(data);
    } catch (e) {}
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: '', description: '', display_order: services.length + 1, is_active: true });
    setShowForm(true);
  }

  function openEdit(s) { setEditing(s); setForm({ ...s }); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (editing) {
      try { await supabase.from('services').update({ ...form, slug }).eq('id', editing.id); } catch(e) {}
    } else {
      try { await supabase.from('services').insert({ ...form, slug }); } catch(e) {}
    }
    setShowForm(false);
    loadServices();
    showToastMsg(editing ? 'Đã cập nhật dịch vụ' : 'Đã tạo dịch vụ mới');
  }

  async function handleDelete(id) {
    if (!confirm('Bạn có chắc muốn xóa dịch vụ này?')) return;
    try { await supabase.from('services').delete().eq('id', id); } catch(e) {}
    setServices(services.filter(s => s.id !== id));
    showToastMsg('Đã xóa dịch vụ');
  }

  function showToastMsg(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  return (
    <>
      <div className="admin-header">
        <h1>Dịch vụ</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Thêm dịch vụ</button>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '540px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editing ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Tên dịch vụ</label>
                <input className="form-input-bordered" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Mô tả</label>
                <textarea className="form-input-bordered" style={{ minHeight: '100px' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Thứ tự hiển thị</label>
                  <input type="number" className="form-input-bordered" value={form.display_order} onChange={e => setForm({...form, display_order: parseInt(e.target.value)})} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'end', paddingBottom: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} />
                    Hiển thị
                  </label>
                </div>
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
          <tr><th>#</th><th>Tên dịch vụ</th><th>Mô tả</th><th>Hiển thị</th><th>Thao tác</th></tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>{s.display_order}</td>
              <td><strong>{s.title}</strong></td>
              <td style={{ maxWidth: '300px' }}>{s.description?.substring(0, 80)}...</td>
              <td>{s.is_active ? '✓' : '—'}</td>
              <td>
                <div className="admin-actions">
                  <button className="admin-btn-sm admin-btn-edit" onClick={() => openEdit(s)}>Sửa</button>
                  <button className="admin-btn-sm admin-btn-delete" onClick={() => handleDelete(s.id)}>Xóa</button>
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
