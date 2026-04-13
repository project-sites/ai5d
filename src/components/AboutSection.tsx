'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Section About — Portrait du fondateur + texte éditorial.
 * Photo à droite, copywriting direct à gauche.
 */
export const AboutSection = () => {
  const t = useTranslations('about');

  const credentials = [
    { label: t('stats.missions'), value: "40+" },
    { label: t('stats.training'), value: "500+" },
    { label: t('stats.retention'), value: "95%" },
  ];

  return (
    <section id="about" className="relative py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Gauche : Texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
                {t('badge')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-8">
                {t('founder_name')}
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {t('pitch_focus')}
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              {t('pitch_vision')}
            </p>
            <p className="text-lg text-muted-foreground/60 leading-relaxed border-l-2 border-primary/30 pl-6 italic">
              {t('quote')}
            </p>

            {/* Chiffres credibilite */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {credentials.map((cred, i) => (
                <div key={i} className="text-center lg:text-left">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-foreground">{cred.value}</span>
                  <p className="text-xs text-muted-foreground/50 mt-1 uppercase tracking-wider">{cred.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Droite : Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] max-w-md mx-auto relative rounded-3xl overflow-hidden">
              <Image
                src="/images/founder.png"
                alt="Karamo Sylla — Fondateur AI5D"
                fill
                className="object-cover object-top grayscale-[20%]"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
              {/* Overlay subtil ambré en bas */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Double cadre décoratif */}
            <div className="absolute -inset-3 border border-border/15 rounded-[2rem] pointer-events-none max-w-[calc(28rem+1.5rem)] mx-auto" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
