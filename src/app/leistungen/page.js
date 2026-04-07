import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';

export const metadata = { title: 'Leistungen | fbnSTUDIO' };

const FALLBACK_SERVICES = [
  { title: 'Bestandsaufnahme', description: 'Erfassung und Bewertung der bestehenden Bausubstanz als verlässliche Grundlage für alle weiteren Planungsschritte.' },
  { title: 'Bauen im Bestand', description: 'Umbau, Sanierung und Weiterentwicklung bestehender Wohn- und Gewerbegebäude. Analyse der vorhandenen Substanz, strukturelle Neuordnung und nachhaltige Konzepte.' },
  { title: 'Denkmalschutz', description: 'Sensible Planung und denkmalgerechte Sanierung historischer Gebäude in enger Abstimmung mit den zuständigen Behörden.' },
  { title: 'Energieberatung', description: 'Analyse energetischer Potenziale, Entwicklung wirtschaftlicher Maßnahmen, Fördermittelberatung sowie Planung energieeffizienter Lösungen.' },
  { title: 'Machbarkeitsstudien', description: 'Prüfung von Grundstücken und Bestandsimmobilien hinsichtlich Nutzungspotenzial, Genehmigungsfähigkeit und Kostenrahmen.' },
  { title: 'Konzept & Entwurf', description: 'Entwicklung architektonischer Konzepte auf Basis von Ort, Nutzung, Wirtschaftlichkeit und Nachhaltigkeit.' },
  { title: 'Innenarchitektur', description: 'Gestaltung funktionaler und atmosphärischer Innenräume. Material-, Farb- und Möblierungskonzepte für Wohn- und Arbeitswelten.' },
  { title: 'BIM und digitale Planung', description: 'Digitale Planung mit BIM und 3D-Modellen für transparente Prozesse und präzise Koordination.' },
  { title: 'Ausführungsplanung', description: 'Detaillierte Ausführungsplanung und Koordination aller Beteiligten. Schnittstellenmanagement und Qualitätssicherung.' },
  { title: 'Neubau', description: 'Entwurf und Realisierung hochwertiger Neubauten für Wohn- und Gewerbenutzung.' },
  { title: 'Sanierung & energetische Modernisierung', description: 'Planung und Umsetzung von Sanierungsmaßnahmen mit Fokus auf Energieeffizienz und langfristige Nutzungssicherheit.' },
  { title: 'Beratung im Bau- und Immobilienwesen', description: 'Beratung von Bauherren, Käufern und Investoren zu Machbarkeit, Kosten, Genehmigungen und Projektstruktur.' },
];

export default async function LeistungenPage() {
  let services = FALLBACK_SERVICES;
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase.from('services').select('*').eq('is_active', true).order('display_order');
    if (data?.length > 0) services = data;
  } catch (e) {}

  return (
    <>
      <Hero
        title="Leistungen"
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
        small
      />

      <section className="section-lg section-warm">
        <div className="container-narrow text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>Unser Leistungsspektrum</h2>
          <p className="text-body-lg text-muted">
            Wir begleiten Bauvorhaben durch alle Leistungsphasen der HOAI und bieten das
            gesamte Spektrum klassischer Architekturleistungen. Unsere Schwerpunkte liegen
            im Bauen im Bestand, im Denkmalschutz, in der nachhaltigen Sanierung, im
            hochwertigen Neubau sowie in der Innenarchitektur.
          </p>
        </div>
      </section>

      <section className="section-lg">
        <div className="container">
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                padding: '3rem 0',
                borderBottom: i < services.length - 1 ? '1px solid var(--color-outline-variant)' : 'none',
              }}
            >
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <p className="text-label" style={{ marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 style={{ marginBottom: '1rem' }}>{s.title}</h3>
                <p className="text-body-lg text-muted">{s.description}</p>
              </div>
              <div
                style={{
                  order: i % 2 === 0 ? 2 : 1,
                  aspectRatio: '16/10',
                  background: `linear-gradient(${135 + i * 15}deg, #2d3436 0%, #636e72 100%)`,
                  borderRadius: '2px',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Planen Sie ein Bauvorhaben? Wir beraten Sie gerne."
        buttonLabel="Kontakt"
        buttonHref="/kontakt"
      />
    </>
  );
}
