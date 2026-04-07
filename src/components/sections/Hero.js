import Link from 'next/link';

export default function Hero({ title, subtitle, backgroundImage, cta, small }) {
  return (
    <section className={`hero ${small ? 'hero-sm' : ''}`}>
      <div
        className="hero-bg"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {cta && (
          <Link href={cta.href} className="btn btn-outline btn-icon" style={{ marginTop: '2rem' }}>
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
