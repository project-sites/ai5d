'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Brain, GraduationCap, Cpu, ArrowRight } from 'lucide-react';

export const ServicesSection = () => {
  const t = useTranslations('services');

  const services = [
    {
      id: 'consulting',
      title: t('consulting_title'),
      desc: "On ne livre pas de PowerPoint. On prend vos opérations, on identifie ce qui peut être automatisé, et on le met en production. Quand on part, tout tourne.",
      icon: Brain,
    },
    {
      id: 'academy',
      title: t('academy_title'),
      desc: "Pas de slides théoriques. Vos collaborateurs apprennent en construisant de vrais projets, avec de vrais outils. Ils repartent avec des compétences durables.",
      icon: GraduationCap,
    },
    {
      id: 'labs',
      title: t('labs_title'),
      desc: "Workflows n8n, agents IA, pipelines de données. On construit les systèmes que personne d'autre ne sait créer. Et on vous apprend à les maintenir.",
      icon: Cpu,
    },
  ];

  return (
    <section id="services" className="bg-transparent py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Minimaliste, Badge + Phrase d'impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6 border border-primary/20">
            Nos Domaines d'Expertise
          </span>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Des systèmes autonomes, des formations immersives et du conseil stratégique conçus pour un impact réel.
          </p>
        </motion.div>

        {/* Mastered Grid - Cartes Améliorées et Trés Lisibles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)] hover:bg-white/[0.05] hover:border-primary/30 flex flex-col h-full overflow-hidden"
              >
                {/* Lueur subtile interne */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />

                {/* Container Icône Élégant */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-500">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Contenu textuel */}
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-10 flex-grow text-[15px] md:text-base font-medium">
                  {service.desc}
                </p>

                {/* Call to action fin de carte */}
                <div className="mt-auto flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform duration-300 pt-6 border-t border-white/5">
                  <span className="text-xs tracking-[0.2em] uppercase">Découvrir</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
