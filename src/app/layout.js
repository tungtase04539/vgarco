import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'VGARCO | Kiến trúc & Xây dựng',
  description: 'VGARCO CO.,LTD - Công ty Kiến trúc và Xây dựng hàng đầu. Chuyên thiết kế, thi công các công trình dân dụng, công nghiệp, giáo dục và văn hóa.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <a href="/kontakt" className="floating-contact" title="Liên hệ">
          ✉
        </a>
      </body>
    </html>
  );
}
