'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const FALLBACK_TEAM = [
  { id: '1', name: 'Ferri Nguyen', title: 'Dipl.-Ing. Architekt', bio: 'Gründer von fbnSTUDIO. Spezialisiert auf Denkmalschutz und Bauen im Bestand.', display_order: 1, is_active: true },
];

export default function AdminTeamPage() {
  const [members, setMembers] = useState(FALLBACK_TEAM);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', title: '', bio: '', display_order: 1, is_active: true });

  useEffect(() => { loadTeam(); }, []);

  async function loadTeam() {
    try {
      const { data } = await supabase.from('team_members').select('*').order('display_order');
      if (data?.length > 0) setMembers(data);
    } catch (e) {}
  }

  function openCreate() { setEditing(null); setForm({ name: '', title: '', bio: '', display_order: members.length + 1, is_active: true }); setShowForm(true); }
  function openEdit(m) { setEditing(m); setForm({ ...m }); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    if (editing) {
      try { await supabase.from('team_members').update(form).eq('id', editing.id); } catch(e) {}
      setMembers(members.map(m => m.id === editing.id ? { ...m, ...form } : m));
    } else {
      const newItem = { ...form, id: Date.now().toString() };
      try { const { data } = await supabase.from('team_members').insert(form).select().single(); if (data) newItem.id = data.id; } catch(e) {}
      setMembers([...members, newItem]);
    }
    setShowForm(false);
    showToastMsg(editing ? 'Mitglied aktualisiert' : 'Mitglied hinzugefügt');
  }

  async function handleDelete(id) {
    if (!confirm('Mitglied wirklich entfernen?')) return;
    try { await supabase.from('team_members').delete().eq('id', id); } catch(e) {}
    setMembers(members.filter(m => m.id !== id));
    showToastMsg('Mitglied entfernt');
  }

  function showToastMsg(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  return (
    <>
      <div className="admin-header">
        <h1>Team</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Neues Mitglied</button>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '100%', maxWidth: '540px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editing ? 'Mitglied bearbeiten' : 'Neues Mitglied'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input-bordered" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Titel / Position</label>
                <input className="form-input-bordered" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea className="form-input-bordered" style={{ minHeight: '100px' }} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Reihenfolge</label>
                  <input type="number" className="form-input-bordered" value={form.display_order} onChange={e => setForm({...form, display_order: parseInt(e.target.value)})} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'end', paddingBottom: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          <tr><th>#</th><th>Name</th><th>Titel</th><th>Aktiv</th><th>Aktionen</th></tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.display_order}</td>
              <td><strong>{m.name}</strong></td>
              <td>{m.title}</td>
              <td>{m.is_active ? '✓' : '—'}</td>
              <td>
                <div className="admin-actions">
                  <button className="admin-btn-sm admin-btn-edit" onClick={() => openEdit(m)}>Bearbeiten</button>
                  <button className="admin-btn-sm admin-btn-delete" onClick={() => handleDelete(m.id)}>Löschen</button>
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
