-- ============================================================
-- fbnSTUDIO CMS — Supabase Initial Schema
-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- ============================================================

-- 1. Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  client TEXT,
  location TEXT,
  area TEXT,
  phases TEXT,
  status TEXT DEFAULT 'In Planung',
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Journal Posts
CREATE TABLE IF NOT EXISTS journal_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  published_at DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  display_order INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Site Settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Row Level Security (RLS) — Public read, authenticated write
-- ============================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read journal_posts" ON journal_posts FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Authenticated write policies (for admin)
CREATE POLICY "Auth manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage journal_posts" ON journal_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Seed data (optional — matches fallback data in admin pages)
-- ============================================================

INSERT INTO site_settings (key, value) VALUES
  ('company_name', 'fbnSTUDIO Ferri Nguyen Architekten PartG mbB'),
  ('address', 'Viktoriastraße 12, 65189 Wiesbaden'),
  ('email', 'info@fbnstudio.de'),
  ('phone', '+49 611 360 93 694'),
  ('office_hours', 'Mo–Fr, 09:00–18:00 Uhr'),
  ('hero_title', 'Zuhören – Analysieren – Kreieren – Lösungen entwickeln'),
  ('about_text', 'fbnSTUDIO ist ein Architekturbüro in Wiesbaden mit Schwerpunkt auf Umbau, nachhaltiger Sanierung, Denkmalschutz, Neubau und Innenarchitektur.'),
  ('cta_text', 'Der richtige Zeitpunkt, Räume zu schaffen, die langfristig funktionieren.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO team_members (name, title, bio, display_order) VALUES
  ('Ferri Nguyen', 'Dipl.-Ing. Architekt', 'Gründer von fbnSTUDIO. Spezialisiert auf Denkmalschutz und Bauen im Bestand.', 1)
ON CONFLICT DO NOTHING;
