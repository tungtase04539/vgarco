import Link from 'next/link';

export default function CTASection({
  title = 'Thời điểm thích hợp để tạo nên không gian bền vững.',
  buttonLabel = 'Tìm hiểu thêm',
  buttonHref = '/lien-he',
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
