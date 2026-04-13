import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Trust } from '@/components/Trust';
import { ConstatSection } from '@/components/ConstatSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ProtocolSection } from '@/components/ProtocolSection';
import { ResultsSection } from '@/components/ResultsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { AboutSection } from '@/components/AboutSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Active le rendu statique pour cette locale
  setRequestLocale(locale);

  return (
    <main className="relative flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Trust />
      
      <div className="space-y-0">
        <ConstatSection />
        <ServicesSection />
        <ProtocolSection />
        <ResultsSection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection />
      </div>

      <Footer />
    </main>
  );
}
