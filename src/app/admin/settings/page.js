'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DEFAULT_SETTINGS = [
  { key: 'company_name', value: 'VGARCO CO.,LTD' },
  { key: 'address', value: 'Hà Nội, Việt Nam' },
  { key: 'email', value: 'admin@vgarco.vn' },
  { key: 'phone', value: '+84 123 456 789' },
  { key: 'office_hours', value: 'Thứ 2 – Thứ 6, 08:00–17:00' },
  { key: 'hero_title', value: 'Lắng nghe – Phân tích – Sáng tạo – Phát triển giải pháp' },
  { key: 'about_text', value: 'VGARCO CO.,LTD là công ty kiến trúc và xây dựng với chuyên môn trong thiết kế, thi công các công trình giáo dục, văn hóa, dân dụng và công nghiệp.' },
  { key: 'cta_text', value: 'Thời điểm thích hợp để tạo nên không gian bền vững.' },
];

const LABELS = {
  company_name: 'Tên công ty',
  address: 'Địa chỉ',
  email: 'Email',
  phone: 'Điện thoại',
  office_hours: 'Giờ làm việc',
  hero_title: 'Tiêu đề Hero',
  about_text: 'Giới thiệu ngắn',
  cta_text: 'Nội dung CTA',
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
    setToast('Đã lưu cài đặt');
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <>
      <div className="admin-header">
        <h1>Cài đặt</h1>
        <button className="btn btn-primary" onClick={handleSave}>Lưu</button>
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
