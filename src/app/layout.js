import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'fbnSTUDIO | Architekt in Wiesbaden',
  description: 'Architekturbüro in Wiesbaden für Umbau, Sanierung, Denkmalschutz, Neubau & Innenarchitektur. Präzise Planung für hochwertige Wohn- und Gewerbeprojekte.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <a href="/kontakt" className="floating-contact" title="Kontakt">
          ✉
        </a>
      </body>
    </html>
  );
}
