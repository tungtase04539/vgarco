'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DEFAULT_SETTINGS = [
  { key: 'company_name', value: 'fbnSTUDIO Ferri Nguyen Architekten PartG mbB' },
  { key: 'address', value: 'Viktoriastraße 12, 65189 Wiesbaden' },
  { key: 'email', value: 'info@fbnstudio.de' },
  { key: 'phone', value: '+49 611 360 93 694' },
  { key: 'office_hours', value: 'Mo–Fr, 09:00–18:00 Uhr' },
  { key: 'hero_title', value: 'Zuhören – Analysieren – Kreieren – Lösungen entwickeln' },
  { key: 'about_text', value: 'fbnSTUDIO ist ein Architekturbüro in Wiesbaden mit Schwerpunkt auf Umbau, nachhaltiger Sanierung, Denkmalschutz, Neubau und Innenarchitektur.' },
  { key: 'cta_text', value: 'Der richtige Zeitpunkt, Räume zu schaffen, die langfristig funktionieren.' },
];

const LABELS = {
  company_name: 'Firmenname',
  address: 'Adresse',
  email: 'E-Mail',
  phone: 'Telefon',
  office_hours: 'Bürozeiten',
  hero_title: 'Hero Titel',
  about_text: 'Über-uns Text',
  cta_text: 'CTA Text',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [toast, setToast] = useState('');

  useEffect(() => { loadSettings(); }, []);

  async function loadSettings() {
    try {
      const { data } = await supabase.from('site_settings').select('*');
      if (data?.length > 0) setSettings(data);
    } catch (e) {}
  }

  function updateSetting(key, value) {
    setSettings(settings.map(s => s.key === key ? { ...s, value } : s));
  }

  async function handleSave() {
    try {
      for (const s of settings) {
        await supabase.from('site_settings').upsert({ key: s.key, value: s.value });
      }
    } catch (e) {}
    setToast('Einstellungen gespeichert');
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <>
      <div className="admin-header">
        <h1>Einstellungen</h1>
        <button className="btn btn-primary" onClick={handleSave}>Speichern</button>
      </div>

      <div className="card">
        <div className="card-body">
          {settings.map(s => (
            <div key={s.key} className="form-group">
              <label className="form-label">{LABELS[s.key] || s.key}</label>
              {s.value.length > 80 ? (
                <textarea
                  className="form-input-bordered"
                  style={{ minHeight: '80px' }}
                  value={s.value}
                  onChange={e => updateSetting(s.key, e.target.value)}
                />
              ) : (
                <input
                  className="form-input-bordered"
                  value={s.value}
                  onChange={e => updateSetting(s.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
