"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Tesseract } from '@/components/ui/tesseract';
import HeroBadge from '@/components/ui/hero-badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal } from 'lucide-react';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const loadingStates = [
  { text: "Audit stratégique de la donnée..." },
  { text: "Cartographie des processus métiers..." },
  { text: "Qualification des cas d'usage à fort ROI..." },
  { text: "Preuve de valeur (POC) systémique..." },
  { text: "Déploiement à l'échelle & Formation..." },
  { text: "Transformation AI5D accomplie." }
];

const heroStats = [
  { value: 70, suffix: "%", label: "ÉCHEC SANS MÉTHODE" },
  { value: 90, suffix: "J", label: "DÉLAI D'EXÉCUTION" },
  { value: 5, suffix: "X", label: "ROI MINIMUM" },
  { value: 78, suffix: "%", label: "ADOPTION IA" },
];

export function Hero() {
  const t = useTranslations('hero');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <section id="hero" className="relative flex flex-col min-h-screen overflow-hidden pt-24 pb-4 font-sans">
      <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={1500} loop={false} />
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-30"></div>

      {/* Tesseract 4D Centerpiece */}
      <Tesseract 
        className="z-0 opacity-40 translate-y-[-10%]" 
        color="#d97706" 
        wireOpacity={0.2}
        rotationSpeed={0.08}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center -translate-y-8 px-6">
        <div className="container relative z-10 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center gap-8"
          >
            {/* Badge Premium */}
            <HeroBadge 
              text={t('badge')}
              icon={<Terminal className="w-3.5 h-3.5" />}
              className="border-primary/20 bg-primary/5 text-primary py-1.5 px-4"
            />

            {/* Typography Section */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-foreground leading-[1.05]">
                {t('title').split('AI5D')[0]}
                <span className="text-primary italic">AI5D</span>
                {t('title').split('AI5D')[1]}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <Button size="lg" className="h-16 px-10 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                {t('cta_primary')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="h-16 px-10 text-lg font-light text-muted-foreground hover:text-foreground hover:bg-transparent group"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 10000);
                }}
              >
                <span className="underline-offset-8 group-hover:underline">{t('cta_secondary')}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ STATS BAR — SLEEK HORIZONTAL BAR (ELONGATED) ═══ */}
      <div className="w-full relative z-10 px-2 md:px-4 max-w-[1600px] mx-auto mb-4 lg:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-background/30 dark:bg-card/30 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-2xl md:rounded-full overflow-hidden"
        >
          {/* Subtle line glow inside */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 py-6 md:py-8 lg:py-7">
            {heroStats.map((stat, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-center gap-4 px-6 ${
                  i < 3 ? 'lg:border-r border-white/10' : ''
                } ${
                  i % 2 === 0 ? 'border-r border-white/10 lg:border-r' : ''
                } ${
                  i < 2 ? 'border-b border-white/10 lg:border-b-0' : ''
                }`}
              >
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                    <AnimatedCounter value={stat.value} className="text-foreground" />
                  </span>
                  <span className="text-xl md:text-3xl font-serif italic text-primary">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-[10px] md:text-[11px] text-muted-foreground/60 font-mono tracking-[0.2em] leading-tight text-left max-w-[100px] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
