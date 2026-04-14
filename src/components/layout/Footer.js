'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                CÔNG TY TNHH TƯ VẤN XÂY DỰNG VGARCO
              </div>
              <div className="footer-address">
                Số 75, ngõ 6, đường Đặng Văn Ngữ,<br />
                Phường Phương Liên, Quận Đống Đa,<br />
                Thành phố Hà Nội, Việt Nam<br /><br />
                MST: 2901635947<br />
                Người đại diện: Vũ Duy Hùng<br /><br />
                <a href="mailto:admin@vgarco.vn">admin@vgarco.vn</a><br />
                <a href="tel:+84912345678">+84 912 345 678</a>
              </div>
            </div>

            <div>
              <div className="footer-heading">Điều hướng</div>
              <Link href="/gioi-thieu" className="footer-link">Giới thiệu</Link>
              <Link href="/dich-vu" className="footer-link">Dịch vụ</Link>
              <Link href="/du-an" className="footer-link">Dự án</Link>
              <Link href="/lien-he" className="footer-link">Liên hệ</Link>
            </div>

            <div>
              <div className="footer-heading">Pháp lý</div>
              <Link href="/gioi-thieu" className="footer-link">Giới thiệu công ty</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} VGARCO. All rights reserved.</span>
            <span>Công ty Kiến trúc &amp; Xây dựng</span>
          </div>
        </div>
      </footer>
      <a href="/lien-he" className="floating-contact" title="Liên hệ">
        &#9993;
      </a>
    </>
  );
}
