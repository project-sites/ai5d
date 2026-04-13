import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Proxy de routing pour l'internationalisation
 * Remplace middleware.ts (déprécié dans Next.js 16)
 */
export const proxy = createMiddleware(routing);

export const config = {
  // Match uniquement les chemins internationalisés
  matcher: ['/', '/(fr|en)/:path*'],
};
