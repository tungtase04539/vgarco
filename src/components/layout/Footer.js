import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              fbnSTUDIO Ferri Nguyen Architekten PartG mbB
            </div>
            <div className="footer-address">
              Viktoriastraße 12<br />
              65189 Wiesbaden<br /><br />
              <a href="mailto:info@fbnstudio.de">info@fbnstudio.de</a><br />
              <a href="tel:+4961136093694">+49 611 360 93 694</a>
            </div>
          </div>

          <div>
            <div className="footer-heading">Navigation</div>
            <Link href="/studio" className="footer-link">Studio</Link>
            <Link href="/leistungen" className="footer-link">Leistungen</Link>
            <Link href="/projekte" className="footer-link">Projekte</Link>
            <Link href="/journal" className="footer-link">Journal</Link>
            <Link href="/kontakt" className="footer-link">Kontakt</Link>
          </div>

          <div>
            <div className="footer-heading">Rechtliches</div>
            <Link href="/impressum" className="footer-link">Impressum</Link>
            <Link href="/datenschutz" className="footer-link">Datenschutzerklärung</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} fbnSTUDIO. Alle Rechte vorbehalten.</span>
          <span>Architekturbüro in Wiesbaden</span>
        </div>
      </div>
    </footer>
  );
}
