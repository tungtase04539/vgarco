import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import ProjectsGrid from '@/components/sections/ProjectsGrid';

export const metadata = { title: 'Dự án | VGARCO' };

export default function DuAnPage() {
  return (
    <>
      <Hero
        title="Dự án"
        backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
        small
      />

      <ProjectsGrid />

      <CTASection />
    </>
  );
}
