'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub, IconMail } from '@tabler/icons-react';
import Link from 'next/link';

export const Footer = () => {
  const t = useTranslations('footer');

  const navigation = {
    company: [
      { name: t('links.vision'), href: '#constat' },
      { name: t('links.services'), href: '#services' },
      { name: t('links.impact'), href: '#resultats' },
    ],
    support: [
      { name: t('links.about'), href: '#about' },
      { name: t('links.contact'), href: 'mailto:contact@ai5d.consulting' },
    ],
    social: [
      { name: 'LinkedIn', href: '#', icon: IconBrandLinkedin },
      { name: 'Twitter', href: '#', icon: IconBrandTwitter },
      { name: 'Email', href: 'mailto:contact@ai5d.consulting', icon: IconMail },
    ],
  };

  return (
    <footer className="relative bg-background border-t border-border/40 pt-24 pb-12 px-6 overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-2 space-y-8">
            <Link href="#hero" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all group-hover:scale-110">
                <span className="font-mono text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-3xl font-serif font-bold tracking-tight">
                AI<span className="text-primary italic">5D</span>
              </span>
            </Link>
            
            <p className="text-muted-foreground text-lg max-w-sm leading-relaxed font-serif italic">
               "{t('tagline')}"
            </p>

            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 group"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="space-y-6">
            <h4 className="font-serif font-bold text-xl text-foreground">
              {t('col1_title')}
            </h4>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-serif font-bold text-xl text-foreground">
              {t('col2_title')}
            </h4>
            <ul className="space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Contact Quick Info (Desktop Only) */}
          <div className="hidden lg:block space-y-6">
            <h4 className="font-serif font-bold text-xl text-foreground">
              Direct
            </h4>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">info@ai5d.consulting</p>
              <p className="text-sm border-l-2 border-primary/40 pl-4 py-1">
                Disponible 9h - 18h<br/>CET Timezone
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-sm tracking-wide">{t('copyright')}</p>
            <Link href="#" className="text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary/40 pb-0.5">
              {t('legal')}
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <motion.div 
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">System Online v1.02</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};
