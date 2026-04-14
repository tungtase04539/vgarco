/**
 * Migrate GALLERY_MAP data into projects.gallery column in Supabase
 * Run after adding gallery column: ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;
 *
 * Usage: node migrate_gallery.cjs
 */

const { GALLERY_MAP } = require('./src/lib/gallery-map.js');

const SUPABASE_URL = 'https://chqzzfumbjgznmkdbxat.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNocXp6ZnVtYmpnem5ta2RieGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMjc3OTUsImV4cCI6MjA4ODYwMzc5NX0.qA58Y8e1tpvKVh6c8JjC_3jmBuICIvhD-vXjpU2Gsp0';

async function run() {
  // Login
  const login = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: { 'apikey': ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@vgarco.vn', password: 'VgarCo@2026!' }),
  });
  const { access_token } = await login.json();
  if (!access_token) { console.error('Login failed'); return; }

  const headers = {
    'apikey': ANON_KEY,
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };

  // Get all projects
  const res = await fetch(SUPABASE_URL + '/rest/v1/projects?select=id,slug,gallery', { headers });
  const projects = await res.json();
  console.log('Found', projects.length, 'projects');

  let migrated = 0;
  for (const p of projects) {
    const images = GALLERY_MAP[p.slug];
    if (images && images.length > 0) {
      const updateRes = await fetch(SUPABASE_URL + '/rest/v1/projects?id=eq.' + p.id, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ gallery: images }),
      });
      if (updateRes.ok) {
        console.log('  ✅', p.slug, '—', images.length, 'images');
        migrated++;
      } else {
        console.log('  ❌', p.slug, '—', await updateRes.text());
      }
    } else {
      console.log('  ⏭️', p.slug, '— no images in GALLERY_MAP');
    }
  }
  console.log('\nDone! Migrated', migrated, 'projects.');
}

run();
