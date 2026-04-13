'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/routing';

const locales: { code: Locale; label: string; flag: string }[] = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

/**
 * Composant de changement de langue avec design moderne
 */
export const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Change la locale et redirige vers la nouvelle URL
   */
  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Remplace la locale dans le pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
      {locales.map((loc) => (
        <motion.button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            locale === loc.code
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {locale === loc.code && (
            <motion.div
              layoutId="activeLocale"
              className="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-fuchsia-600/50 rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <span>{loc.flag}</span>
            <span>{loc.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
};
