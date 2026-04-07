'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const FALLBACK_PROJECTS = [
  { id: '1', code: 'V12', title: 'Umbau und Sanierung Kulturdenkmal in Wiesbaden', category: 'Bauen im Bestand', status: 'In Umsetzung', is_featured: true },
  { id: '2', code: 'VLW', title: 'Neubau Villa in Niedernhausen', category: 'Wohnen', status: 'Abgeschlossen', is_featured: true },
  { id: '3', code: 'RR1', title: 'Umbau Wohn- und Geschäftshaus in Montabaur', category: 'Bauen im Bestand', status: 'In Umsetzung', is_featured: true },
  { id: '4', code: 'M17', title: 'Sanierung und Fassadenwiederherstellung in Wiesbaden', category: 'Wohnen', status: 'Abgeschlossen', is_featured: false },
  { id: '5', code: 'N9C', title: 'Nhà 9NCK Café und Bar Konzept Hanoi', category: 'Gewerbe', status: 'Abgeschlossen', is_featured: true },
  { id: '6', code: 'CC1', title: 'Connecting Cube Hotelanlage Göttingen', category: 'Bauen im Bestand', status: 'In Planung', is_featured: false },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({
    code: '', title: '', slug: '', category: '', client: '',
    location: '', area: '', phases: '', status: '', description: '',
    is_featured: false, display_order: 0,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const { data } = await supabase.from('projects').select('*').order('display_order');
      if (data?.length > 0) setProjects(data);
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
    const slug = form.slug || form.code.toLowerCase();

    if (editingProject) {
      try {
        await supabase.from('projects').update({ ...form, slug }).eq('id', editingProject.id);
        showToast('Projekt aktualisiert');
      } catch (e) {
        setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...form, slug } : p));
        showToast('Projekt lokal aktualisiert');
      }
    } else {
      try {
        const { data } = await supabase.from('projects').insert({ ...form, slug }).select().single();
        showToast('Projekt erstellt');
      } catch (e) {
        setProjects([...projects, { ...form, id: Date.now().toString(), slug }]);
        showToast('Projekt lokal erstellt');
      }
    }
    setShowForm(false);
    loadProjects();
  }

  async function handleDelete(id) {
    if (!confirm('Projekt wirklich löschen?')) return;
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {}
    setProjects(projects.filter(p => p.id !== id));
    showToast('Projekt gelöscht');
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <>
      <div className="admin-header">
        <h1>Projekte</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Neues Projekt</button>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflow: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingProject ? 'Projekt bearbeiten' : 'Neues Projekt'}</h2>
            <form onSubmit={handleSave}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Code</label>
                  <input className="form-input-bordered" value={form.code} onChange={e => setForm({...form, code: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Kategorie</label>
                  <select className="form-input-bordered" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">Wählen</option>
                    {['Bauen im Bestand', 'Gewerbe', 'Innenarchitektur', 'Kultur', 'Städtebau', 'Wohnen'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Titel</label>
                <input className="form-input-bordered" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Bauherr</label>
                  <input className="form-input-bordered" value={form.client} onChange={e => setForm({...form, client: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Standort</label>
                  <input className="form-input-bordered" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>
              </div>
              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Fläche</label>
                  <input className="form-input-bordered" value={form.area} onChange={e => setForm({...form, area: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">LPH</label>
                  <input className="form-input-bordered" value={form.phases} onChange={e => setForm({...form, phases: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input-bordered" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option value="">Wählen</option>
                    <option value="In Planung">In Planung</option>
                    <option value="In Umsetzung">In Umsetzung</option>
                    <option value="Abgeschlossen">Abgeschlossen</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Beschreibung</label>
                <textarea className="form-input-bordered" style={{ minHeight: '100px' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} />
                  Auf Homepage anzeigen (Featured)
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary">Speichern</button>
                <button type="button" className="btn btn-outline" style={{ color: 'var(--color-on-surface)' }} onClick={() => setShowForm(false)}>Abbrechen</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Titel</th>
            <th>Kategorie</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Aktionen</th>
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
