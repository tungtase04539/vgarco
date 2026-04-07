import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';

export const metadata = { title: 'Studio | fbnSTUDIO' };

export default function StudioPage() {
  return (
    <>
      <Hero
        title="Studio"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        small
      />

      <section className="section-lg section-warm">
        <div className="container-narrow text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>Architektur, die Bestand weiterdenkt</h2>
          <p className="text-body-lg text-muted">
            fbnSTUDIO ist ein Architekturbüro in Wiesbaden mit Schwerpunkt auf Umbau,
            nachhaltiger Sanierung, Denkmalschutz, Neubau und Innenarchitektur. Unser Anspruch
            ist eine Architektur, die Bestand weiterdenkt, Energie reduziert und Lebensräume
            schafft, die langfristig überzeugen. Jedes Projekt beginnt mit einer klaren Analyse
            und endet mit einer Lösung, die gestalterisch, technisch und wirtschaftlich
            tragfähig ist.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-lg">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div
              style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.25rem',
              }}
            >
              Foto — Ferri Nguyen
            </div>
            <div>
              <p className="text-label" style={{ marginBottom: '0.5rem' }}>Gründer & Geschäftsführer</p>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Ferri Nguyen</h3>
              <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Dipl.-Ing. Architekt</p>
              <p className="text-body-lg text-muted">
                Ferri Nguyen gründete fbnSTUDIO mit der Vision, Architektur zu schaffen, die
                den bestehenden Raum respektiert und gleichzeitig zeitgemäße Lösungen entwickelt.
                Mit umfassender Erfahrung in der Sanierung denkmalgeschützter Gebäude und im
                nachhaltigen Neubau verbindet er technische Präzision mit gestalterischer Haltung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-lg section-warm">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '4rem' }}>Unsere Werte</h2>
          <div className="grid-3">
            {[
              { title: 'Präzision', desc: 'Jedes Detail zählt. Wir planen sorgfältig und setzen mit höchster Genauigkeit um — von der ersten Analyse bis zur finalen Umsetzung.' },
              { title: 'Nachhaltigkeit', desc: 'Wir denken langfristig. Energieeffizienz, ressourcenschonende Materialien und zukunftssichere Konzepte sind fester Bestandteil unserer Arbeit.' },
              { title: 'Verantwortung', desc: 'Wir übernehmen Verantwortung für unsere Projekte, für die Menschen, die darin leben und arbeiten, und für den baulichen Kontext.' },
            ].map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem' }}>{v.title}</h3>
                <p className="text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Sprechen wir über Ihr Projekt."
        buttonLabel="Kontakt"
        buttonHref="/kontakt"
      />
    </>
  );
}
