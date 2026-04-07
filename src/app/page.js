import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';

async function getHomeData() {
  const supabase = getSupabaseServer();
  const [projectsRes, servicesRes, postsRes] = await Promise.all([
    supabase.from('projects').select('*').eq('is_featured', true).order('display_order').limit(6),
    supabase.from('services').select('*').eq('is_active', true).order('display_order'),
    supabase.from('journal_posts').select('*').order('published_at', { ascending: false }).limit(3),
  ]);
  return {
    projects: projectsRes.data || [],
    services: servicesRes.data || [],
    posts: postsRes.data || [],
  };
}

// Fallback data when Supabase is not yet connected
const FALLBACK_SERVICES = [
  'Bestandsaufnahme', 'Bauen im Bestand', 'Denkmalschutz', 'Energieberatung',
  'Machbarkeitsstudien', 'Konzept & Entwurf', 'Innenarchitektur', 'BIM und digitale Planung',
  'Ausführungsplanung', 'Neubau', 'Sanierung & Modernisierung', 'Beratung',
];

const FALLBACK_PROJECTS = [
  { code: 'V12', title: 'Umbau und Sanierung Kulturdenkmal in Wiesbaden', category: 'Bauen im Bestand', slug: 'v12' },
  { code: 'VLW', title: 'Neubau Villa in Niedernhausen', category: 'Wohnen', slug: 'vlw' },
  { code: 'RR1', title: 'Umbau Wohn- und Geschäftshaus in Montabaur', category: 'Bauen im Bestand', slug: 'rr1' },
  { code: 'M17', title: 'Sanierung und Fassadenwiederherstellung in Wiesbaden', category: 'Wohnen', slug: 'm17' },
  { code: 'N9C', title: 'Nhà 9NCK Café und Bar Konzept Hanoi', category: 'Gewerbe', slug: 'n9c' },
  { code: 'CC1', title: 'Connecting Cube Hotelanlage Göttingen', category: 'Bauen im Bestand', slug: 'cc1' },
];

export default async function HomePage() {
  let data = { projects: [], services: [], posts: [] };
  try {
    data = await getHomeData();
  } catch (e) {
    // Supabase not connected yet, use fallback
  }

  const services = data.services.length > 0
    ? data.services.map(s => s.title)
    : FALLBACK_SERVICES;

  const projects = data.projects.length > 0 ? data.projects : FALLBACK_PROJECTS;

  return (
    <>
      <Hero
        title="Zuhören – Analysieren – Kreieren – Lösungen entwickeln"
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
      />

      {/* About Section */}
      <section className="section-lg section-warm">
        <div className="container-narrow text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>
            Architekt in Wiesbaden für Umbau Sanierung und Neubau
          </h2>
          <p className="text-body-lg text-muted" style={{ marginBottom: '1rem' }}>
            fbnSTUDIO ist ein Architekturbüro in Wiesbaden mit Schwerpunkt auf Umbau,
            nachhaltiger Sanierung, Denkmalschutz, Neubau und Innenarchitektur. Wir entwickeln
            Architektur, die Bestand weiterdenkt, Energie reduziert und Lebensräume schafft,
            die langfristig überzeugen.
          </p>
          <p className="text-body-lg text-muted" style={{ marginBottom: '2rem' }}>
            Wir gestalten Architektur, die funktioniert und Mehrwert schafft. Jedes Projekt
            beginnt mit einer klaren Analyse und endet mit einer Lösung, die gestalterisch,
            technisch und wirtschaftlich tragfähig ist.
          </p>
          <Link href="/studio" className="btn btn-primary btn-icon">
            Über Uns
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-lg section-warm" style={{ paddingTop: 0 }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>Unsere Leistungen</h2>
          <p className="text-body-lg text-muted container-narrow" style={{ marginBottom: '2rem' }}>
            Wir begleiten Bauvorhaben durch alle Leistungsphasen der HOAI und bieten das
            gesamte Spektrum klassischer Architekturleistungen.
          </p>
          <Link href="/leistungen" className="btn btn-primary btn-icon" style={{ marginBottom: '3rem' }}>
            Erfahren Sie mehr
          </Link>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-outline-variant)' }}>
                <span style={{ fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Projekte</h2>
          <div className="grid-3">
            {projects.map((p, i) => (
              <Link key={i} href={`/projekte/${p.slug}`} className="card">
                <div
                  className="card-image"
                  style={{
                    background: `linear-gradient(135deg, #2d3436 0%, #636e72 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                >
                  {p.code}
                </div>
                <div className="card-body">
                  <div className="card-tag">{p.category}</div>
                  <div className="card-title">{p.code} – {p.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
