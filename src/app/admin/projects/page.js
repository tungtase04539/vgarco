'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({
    code: '', title: '', slug: '', category: '', client: '',
    location: '', area: '', phases: '', status: '', description: '',
    is_featured: false, display_order: 0,
  });

  useEffect(() => { loadProjects(); }, []);

  async function loadProjects() {
    try {
      const { data } = await supabase.from('projects').select('*').order('display_order');
      if (data) setProjects(data);
    } catch (e) {}
  }

  function openCreate() {
    setEditingProject(null);
    setForm({ code: '', title: '', slug: '', category: '', client: '', location: '', area: '', phases: '', status: '', description: '', is_featured: false, display_order: projects.length });
    setShowForm(true);
  }

  function openEdit(project) {
    setEditingProject(project);
    setForm({ ...project });
    setShowForm(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingProject) {
      try {
        await supabase.from('projects').update({ ...form, slug }).eq('id', editingProject.id);
        showToast('Đã cập nhật dự án');
      } catch (e) {
        showToast('Lỗi cập nhật');
      }
    } else {
      try {
        await supabase.from('projects').insert({ ...form, slug });
        showToast('Đã tạo dự án mới');
      } catch (e) {
        showToast('Lỗi tạo dự án');
      }
    }
    setShowForm(false);
    loadProjects();
  }

  async function handleDelete(id) {
    if (!confirm('Bạn có chắc muốn xóa dự án này?')) return;
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {}
    setProjects(projects.filter(p => p.id !== id));
    showToast('Đã xóa dự án');
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <>
      <div className="admin-header">
        <h1>Dự án</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Thêm dự án</button>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflow: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingProject ? 'Sửa dự án' : 'Thêm dự án mới'}</h2>
            <form onSubmit={handleSave}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Mã dự án</label>
                  <input className="form-input-bordered" value={form.code} onChange={e => setForm({...form, code: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Danh mục</label>
                  <select className="form-input-bordered" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">Chọn danh mục</option>
                    {['Giáo dục', 'Công nghiệp', 'Văn hóa', 'Nhà ở'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Tên dự án</label>
                <input className="form-input-bordered" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Slug (URL)</label>
                <input className="form-input-bordered" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="Tự động tạo từ tên dự án" />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Chủ đầu tư</label>
                  <input className="form-input-bordered" value={form.client} onChange={e => setForm({...form, client: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Địa điểm</label>
                  <input className="form-input-bordered" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>
              </div>
              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Diện tích</label>
                  <input className="form-input-bordered" value={form.area} onChange={e => setForm({...form, area: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Giai đoạn</label>
                  <input className="form-input-bordered" value={form.phases} onChange={e => setForm({...form, phases: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Trạng thái</label>
                  <select className="form-input-bordered" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option value="">Chọn</option>
                    <option value="Đang thiết kế">Đang thiết kế</option>
                    <option value="Đang thi công">Đang thi công</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Mô tả</label>
                <textarea className="form-input-bordered" style={{ minHeight: '100px' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} />
                  Hiển thị trên trang chủ
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-outline" style={{ color: 'var(--color-on-surface)' }} onClick={() => setShowForm(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên dự án</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Nổi bật</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td><strong>{p.code}</strong></td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.status}</td>
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
