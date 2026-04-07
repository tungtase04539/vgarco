import Link from 'next/link';

export default function CTASection({
  title = 'Der richtige Zeitpunkt, Räume zu schaffen, die langfristig funktionieren.',
  buttonLabel = 'Erfahren Sie mehr',
  buttonHref = '/kontakt',
}) {
  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="cta-title">{title}</h2>
        <Link href={buttonHref} className="btn btn-outline btn-icon">
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
