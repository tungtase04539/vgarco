'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const FALLBACK_SERVICES = [
  { id: '1', title: 'Bestandsaufnahme', description: 'Erfassung und Bewertung der bestehenden Bausubstanz.', display_order: 1, is_active: true },
  { id: '2', title: 'Bauen im Bestand', description: 'Umbau, Sanierung und Weiterentwicklung bestehender Gebäude.', display_order: 2, is_active: true },
  { id: '3', title: 'Denkmalschutz', description: 'Sensible Planung und denkmalgerechte Sanierung.', display_order: 3, is_active: true },
  { id: '4', title: 'Energieberatung', description: 'Analyse energetischer Potenziale und Fördermittelberatung.', display_order: 4, is_active: true },
  { id: '5', title: 'Machbarkeitsstudien', description: 'Prüfung von Nutzungspotenzial und Genehmigungsfähigkeit.', display_order: 5, is_active: true },
  { id: '6', title: 'Konzept & Entwurf', description: 'Entwicklung architektonischer Konzepte.', display_order: 6, is_active: true },
  { id: '7', title: 'Innenarchitektur', description: 'Gestaltung funktionaler und atmosphärischer Innenräume.', display_order: 7, is_active: true },
  { id: '8', title: 'BIM und digitale Planung', description: 'Digitale Planung mit BIM und 3D-Modellen.', display_order: 8, is_active: true },
  { id: '9', title: 'Ausführungsplanung', description: 'Detaillierte Ausführungsplanung und Koordination.', display_order: 9, is_active: true },
  { id: '10', title: 'Neubau', description: 'Entwurf und Realisierung hochwertiger Neubauten.', display_order: 10, is_active: true },
  { id: '11', title: 'Sanierung & Modernisierung', description: 'Sanierung mit Fokus auf Energieeffizienz.', display_order: 11, is_active: true },
  { id: '12', title: 'Beratung', description: 'Beratung zu Machbarkeit, Kosten und Genehmigungen.', display_order: 12, is_active: true },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', description: '', display_order: 0, is_active: true });

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const { data } = await supabase.from('services').select('*').order('display_order');
      if (data?.length > 0) setServices(data);
    } catch (e) {}
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: '', description: '', display_order: services.length + 1, is_active: true });
    setShowForm(true);
  }

  function openEdit(s) {
    setEditing(s);
    setForm({ ...s });
    setShowForm(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editing) {
      try { await supabase.from('services').update({ ...form, slug }).eq('id', editing.id); } catch(e) {}
      setServices(services.map(s => s.id === editing.id ? { ...s, ...form, slug } : s));
    } else {
      const newItem = { ...form, id: Date.now().toString(), slug };
      try { const { data } = await supabase.from('services').insert({ ...form, slug }).select().single(); if (data) newItem.id = data.id; } catch(e) {}
      setServices([...services, newItem]);
    }
    setShowForm(false);
    showToastMsg(editing ? 'Leistung aktualisiert' : 'Leistung erstellt');
  }

  async function handleDelete(id) {
    if (!confirm('Leistung wirklich löschen?')) return;
    try { await supabase.from('services').delete().eq('id', id); } catch(e) {}
    setServices(services.filter(s => s.id !== id));
    showToastMsg('Leistung gelöscht');
  }

  function showToastMsg(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  return (
    <>
      <div className="admin-header">
        <h1>Leistungen</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Neue Leistung</button>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '540px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editing ? 'Leistung bearbeiten' : 'Neue Leistung'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Titel</label>
                <input className="form-input-bordered" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Beschreibung</label>
                <textarea className="form-input-bordered" style={{ minHeight: '100px' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Reihenfolge</label>
                  <input type="number" className="form-input-bordered" value={form.display_order} onChange={e => setForm({...form, display_order: parseInt(e.target.value)})} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'end', paddingBottom: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} />
                    Aktiv
                  </label>
                </div>
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
          <tr><th>#</th><th>Titel</th><th>Beschreibung</th><th>Aktiv</th><th>Aktionen</th></tr>
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
                  <button className="admin-btn-sm admin-btn-edit" onClick={() => openEdit(s)}>Bearbeiten</button>
                  <button className="admin-btn-sm admin-btn-delete" onClick={() => handleDelete(s.id)}>Löschen</button>
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
