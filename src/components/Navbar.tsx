'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { href: '#constat', label: t('constat') },
    { href: '#services', label: t('services') },
    { href: '#protocole', label: t('protocole') },
    { href: '#resultats', label: t('resultats') },
    { href: '#about', label: t('about') },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* Floating Pill Container */}
        <div 
          className={`pointer-events-auto flex items-center justify-between px-4 py-2 rounded-full border transition-all duration-500 w-full max-w-5xl ${
            isScrolled 
              ? 'bg-background/70 backdrop-blur-xl border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)]' 
              : 'bg-background/40 backdrop-blur-md border-transparent shadow-none'
          }`}
        >
          {/* Logo AI5D */}
          <Link href="#hero" className="flex items-center gap-2 pl-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all">
              <span className="font-mono text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-foreground hidden sm:block">
              AI5D
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1 mx-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button className="hidden sm:inline-flex rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
              {t('cta')}
            </Button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif font-medium text-foreground py-2 border-b border-border/20"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button className="w-full mt-4 bg-primary text-primary-foreground font-bold py-6 rounded-full text-lg">
            {t('cta')}
          </Button>
        </div>
      )}
    </>
  );
}
