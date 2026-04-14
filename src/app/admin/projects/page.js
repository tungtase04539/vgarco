'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { GALLERY_MAP } from '@/lib/gallery-map';

const CLOUD = 'dmjrk2fov';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({
    code: '', title: '', slug: '', category: '', client: '',
    location: '', area: '', phases: '', status: '', description: '',
    is_featured: false, display_order: 0, cover_image: '',
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
    setForm({ code: '', title: '', slug: '', category: '', client: '', location: '', area: '', phases: '', status: '', description: '', is_featured: false, display_order: projects.length, cover_image: '' });
    setShowForm(true);
  }

  function openEdit(project) {
    setEditingProject(project);
    setForm({ ...project, cover_image: project.cover_image || '' });
    setShowForm(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = { ...form, slug };
    if (!payload.cover_image) payload.cover_image = null;

    if (editingProject) {
      try {
        await supabase.from('projects').update(payload).eq('id', editingProject.id);
        showToast('Đã cập nhật dự án');
      } catch (e) {
        showToast('Lỗi cập nhật');
      }
    } else {
      try {
        await supabase.from('projects').insert(payload);
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

  // Get the effective slug for gallery lookup
  const formSlug = form.slug || (form.title ? form.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');
  const galleryImages = GALLERY_MAP[formSlug] || [];

  // Get cover image url for table display
  function getCoverUrl(project) {
    const coverPid = project.cover_image;
    if (coverPid) {
      return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_120,h_80,c_fill/${coverPid}`;
    }
    const images = GALLERY_MAP[project.slug] || [];
    if (images.length > 0) {
      return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_120,h_80,c_fill/${images[0]}`;
    }
    return null;
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
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflow: 'auto' }}>
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

              {/* ===== COVER IMAGE PICKER ===== */}
              <div className="form-group">
                <label className="form-label">Ảnh đại diện dự án</label>
                {galleryImages.length > 0 ? (
                  <>
                    {/* Current cover preview */}
                    {form.cover_image && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <div style={{
                          display: 'inline-block',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '3px solid var(--color-primary, #2d3436)',
                          position: 'relative',
                        }}>
                          <img
                            src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_300,h_200,c_fill/${form.cover_image}`}
                            alt="Cover preview"
                            style={{ display: 'block', width: '300px', height: '200px', objectFit: 'cover' }}
                          />
                          <button
                            type="button"
                            onClick={() => setForm({...form, cover_image: ''})}
                            style={{
                              position: 'absolute', top: '6px', right: '6px',
                              background: 'rgba(0,0,0,0.7)', color: 'white',
                              border: 'none', borderRadius: '50%',
                              width: '28px', height: '28px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '14px', fontWeight: 'bold',
                            }}
                            title="Bỏ chọn ảnh đại diện"
                          >✕</button>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
                          Đang chọn làm ảnh đại diện
                        </div>
                      </div>
                    )}

                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                      Chọn một ảnh từ gallery ({galleryImages.length} ảnh có sẵn):
                    </p>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                      gap: '8px',
                      maxHeight: '260px',
                      overflowY: 'auto',
                      padding: '4px',
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      background: '#fafafa',
                    }}>
                      {galleryImages.map((pid, idx) => {
                        const isSelected = form.cover_image === pid;
                        return (
                          <div
                            key={idx}
                            onClick={() => setForm({...form, cover_image: pid})}
                            style={{
                              cursor: 'pointer',
                              borderRadius: '6px',
                              overflow: 'hidden',
                              border: isSelected ? '3px solid var(--color-primary, #2d3436)' : '2px solid transparent',
                              opacity: isSelected ? 1 : 0.7,
                              transition: 'all 0.2s ease',
                              position: 'relative',
                            }}
                            title={`Ảnh ${idx + 1}`}
                            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'scale(1)'; }}
                          >
                            <img
                              src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_120,h_80,c_fill/${pid}`}
                              alt={`Ảnh ${idx + 1}`}
                              style={{ display: 'block', width: '100%', height: '80px', objectFit: 'cover' }}
                              loading="lazy"
                            />
                            {isSelected && (
                              <div style={{
                                position: 'absolute', top: '4px', right: '4px',
                                background: 'var(--color-primary, #2d3436)', color: 'white',
                                borderRadius: '50%', width: '20px', height: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '12px', fontWeight: 'bold',
                              }}>✓</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{
                    padding: '1.5rem',
                    background: '#f5f5f5',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#999',
                    fontSize: '0.875rem',
                  }}>
                    {formSlug ? (
                      <>Chưa có ảnh trong gallery cho slug &quot;{formSlug}&quot;. Hãy upload ảnh lên Cloudinary trước.</>
                    ) : (
                      <>Nhập tên dự án để xem gallery ảnh có sẵn.</>
                    )}
                  </div>
                )}
              </div>
              {/* ===== END COVER IMAGE PICKER ===== */}

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
            <th style={{ width: '140px' }}>Ảnh đại diện</th>
            <th>Mã</th>
            <th>Tên dự án</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Nổi bật</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => {
            const coverUrl = getCoverUrl(p);
            return (
              <tr key={p.id}>
                <td>
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={p.title}
                      style={{
                        width: '120px', height: '80px',
                        objectFit: 'cover', borderRadius: '6px',
                        border: p.cover_image ? '2px solid var(--color-primary, #333)' : '1px solid #eee',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '120px', height: '80px',
                      background: '#f0f0f0', borderRadius: '6px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ccc', fontSize: '0.75rem',
                    }}>Chưa có ảnh</div>
                  )}
                </td>
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
            );
          })}
        </tbody>
      </table>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
