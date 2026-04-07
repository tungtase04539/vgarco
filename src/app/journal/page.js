import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';

export const metadata = { title: 'Journal | fbnSTUDIO' };

const FALLBACK_POSTS = [
  { title: 'Bestandsanalyse vor dem Umbau: Warum LPH 1 im Altbau über Erfolg oder Folgeschäden entscheidet', excerpt: 'Im Bestand wird nie auf leerer Wiese geplant. Jedes Gebäude bringt Geschichte, Eigenheiten und verdeckte Risiken mit...', category: 'Bauen im Bestand', slug: 'bestandsanalyse-lph1' },
  { title: 'Denkmal energetisch sanieren: Die größten Fehler und wie Bauherren sie vermeiden', excerpt: 'Viele Bauherren starten mit einer simplen Erwartung: Wir sanieren energetisch wie beim Neubau...', category: 'Energetisch Sanieren', slug: 'denkmal-energetisch-sanieren' },
  { title: 'Denkmal gekauft und dann Ärger mit dem Amt? Der Klassiker ist vermeidbar.', excerpt: 'Viele Bauherren verlieben sich in ein Denkmal wegen Charme, Lage und Geschichte und merken erst nach...', category: 'Denkmalschutz', slug: 'denkmal-gekauft' },
  { title: 'Bauen im Bestand: Warum der Altbau oft mehr kann als gedacht', excerpt: 'Bestehende Gebäude haben Qualitäten, die sich in keinem Neubau reproduzieren lassen...', category: 'Bauen im Bestand', slug: 'altbau-potential' },
  { title: 'Nachhaltigkeit im Neubau: Worauf es wirklich ankommt', excerpt: 'Nachhaltiges Bauen ist mehr als Dämmung und Solarpanels. Es beginnt bei der Planung...', category: 'Neubau', slug: 'nachhaltigkeit-neubau' },
  { title: 'BIM in der Praxis: Wie digitale Planung Projekte verändert', excerpt: 'Building Information Modeling revolutioniert die Art, wie wir planen und bauen...', category: 'Digitale Planung', slug: 'bim-praxis' },
];

export default function JournalPage() {
  return (
    <>
      <Hero
        title="Journal"
        backgroundImage="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1920&q=80"
        small
      />

      {/* Featured Article */}
      <section className="section-lg section-warm">
        <div className="container">
          <Link href={`/journal/${FALLBACK_POSTS[0].slug}`} style={{ display: 'block' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}>
              <div
                style={{
                  aspectRatio: '16/10',
                  background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                  borderRadius: '2px',
                }}
              />
              <div>
                <p className="text-label" style={{ marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>
                  {FALLBACK_POSTS[0].category}
                </p>
                <h2 style={{ marginBottom: '1rem' }}>{FALLBACK_POSTS[0].title}</h2>
                <p className="text-body-lg text-muted">{FALLBACK_POSTS[0].excerpt}</p>
                <span className="btn btn-primary btn-icon" style={{ marginTop: '1.5rem' }}>
                  Weiterlesen
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-lg">
        <div className="container">
          <div className="grid-3">
            {FALLBACK_POSTS.slice(1).map((post, i) => (
              <Link key={i} href={`/journal/${post.slug}`} className="card">
                <div
                  className="card-image"
                  style={{
                    background: `linear-gradient(${135 + i * 30}deg, #2d3436 0%, #636e72 100%)`,
                  }}
                />
                <div className="card-body">
                  <div className="card-tag">{post.category}</div>
                  <div className="card-title">{post.title}</div>
                  <p className="card-excerpt">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Haben Sie ein Projekt im Kopf?"
        buttonLabel="Kontakt"
        buttonHref="/kontakt"
      />
    </>
  );
}
