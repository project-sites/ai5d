'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { cn } from '@/lib/utils';

export const ResultsSection = () => {
  const t = useTranslations('resultats');

  const stats = [
    {
      value: 12,
      suffix: "h",
      desc: t('stat1_desc'),
      delay: 0,
    },
    {
      value: 90,
      suffix: " jours",
      desc: t('stat2_desc'),
      delay: 0.1,
    },
    {
      value: 94,
      suffix: "%",
      desc: t('stat3_desc'),
      delay: 0.2,
    },
    {
      value: 5,
      prefix: "",
      suffix: "x",
      desc: t('stat4_desc'),
      delay: 0.3,
    },
  ];

  return (
    <section id="resultats" className="relative pt-0 pb-12 md:pb-16 px-6 overflow-hidden border-t border-border/5">
      <div className="max-w-4xl mx-auto container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
            Impact Reel
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, duration: 0.5 }}
              className={cn(
                "group relative flex flex-col items-center text-center p-10 rounded-[2rem]",
                "bg-card/30 backdrop-blur-xl border border-white/5 dark:border-white/[0.03]",
                "hover:bg-card/50 hover:border-primary/20 transition-all duration-500"
              )}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-700 blur-2xl -z-10" />
              
              <div className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-500">
                <AnimatedCounter 
                  value={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-[180px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl -z-20 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] blur-[120px]" />
      </div>
    </section>
  );
};
