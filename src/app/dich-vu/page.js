import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import { getSupabaseServer } from '@/lib/supabase';

export const metadata = { title: 'Dịch vụ | VGARCO' };

const FALLBACK_SERVICES = [
  { title: 'Thiết kế kiến trúc', description: 'Thiết kế kiến trúc công trình dân dụng, công nghiệp, giáo dục và văn hóa với phong cách hiện đại, tối ưu công năng.' },
  { title: 'Thiết kế nội thất', description: 'Thiết kế không gian nội thất chuyên nghiệp, đẹp mắt và tiện nghi cho mọi loại công trình.' },
  { title: 'Thi công xây dựng', description: 'Thi công xây dựng trọn gói từ móng đến hoàn thiện, đảm bảo chất lượng và tiến độ.' },
  { title: 'Quy hoạch đô thị', description: 'Lập quy hoạch và thiết kế đô thị bền vững, thân thiện với môi trường.' },
  { title: 'Tư vấn giám sát', description: 'Dịch vụ tư vấn giám sát thi công, đảm bảo chất lượng công trình theo tiêu chuẩn kỹ thuật.' },
  { title: 'Thiết kế cảnh quan', description: 'Thiết kế cảnh quan sân vườn, công viên và không gian xanh cho các dự án.' },
  { title: 'Cải tạo & Nâng cấp', description: 'Cải tạo, nâng cấp và mở rộng các công trình hiện hữu với giải pháp tối ưu.' },
  { title: 'Thiết kế BIM', description: 'Ứng dụng công nghệ BIM trong thiết kế và quản lý dự án, tăng hiệu quả phối hợp.' },
  { title: 'Lập dự án đầu tư', description: 'Tư vấn lập dự án đầu tư, phân tích khả thi và lập kế hoạch tài chính cho dự án.' },
  { title: 'Xây dựng dân dụng', description: 'Thiết kế và xây dựng nhà ở, chung cư, biệt thự và các công trình dân dụng chất lượng cao.' },
  { title: 'Xây dựng công nghiệp', description: 'Thiết kế và thi công nhà máy, kho xưởng, nhà xưởng công nghiệp.' },
  { title: 'Tư vấn thiết kế', description: 'Tư vấn thiết kế toàn diện cho chủ đầu tư, từ lập kế hoạch đến hoàn thiện giải pháp.' },
];

export default async function DichVuPage() {
  let services = FALLBACK_SERVICES;
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase.from('services').select('*').eq('is_active', true).order('display_order');
    if (data?.length > 0) services = data;
  } catch (e) {}

  return (
    <>
      <Hero
        title="Dịch vụ"
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
        small
      />

      <section className="section-lg section-warm">
        <div className="container-narrow text-center">
          <h2 style={{ marginBottom: '1.5rem' }}>Dịch vụ của chúng tôi</h2>
          <p className="text-body-lg text-muted">
            Chúng tôi đồng hành cùng dự án xây dựng qua tất cả các giai đoạn và cung cấp
            đầy đủ dịch vụ kiến trúc - xây dựng chuyên nghiệp. Trọng tâm của chúng tôi là
            thiết kế công trình giáo dục, văn hóa, dân dụng và công nghiệp.
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
                gridTemplateColumns: '1fr 1fr',
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
        title="Bạn đang lên kế hoạch xây dựng? Hãy để chúng tôi tư vấn."
        buttonLabel="Liên hệ"
        buttonHref="/lien-he"
      />
    </>
  );
}
