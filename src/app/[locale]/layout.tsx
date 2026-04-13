import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

/**
 * Génère les paramètres statiques pour chaque locale
 */
export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

/**
 * Génère les métadonnées dynamiques selon la locale
 */
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { title: string; description: string };

  return {
    title: metadata?.title || 'AI5D — Strategie IA',
    description: metadata?.description || 'Transformez votre organisation',
  };
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

import { ThemeProvider } from '@/components/ThemeProvider';
import { DotPattern } from '@/components/ui/dot-pattern';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Valide la locale
  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  // Active le rendu statique
  setRequestLocale(locale);

  // Charge les messages
  const messages = await getMessages();

  return (
    <html 
      lang={locale} 
      className={`${inter.variable} ${jetBrainsMono.variable} ${sourceSerif4.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen selection:bg-amber-500/30 transition-colors duration-300 relative">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* Global Background Layer - Aceternity Style */}
            <div className="fixed inset-0 pointer-events-none -z-50">
               <DottedGlowBackground 
                 className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)] opacity-20 dark:opacity-100"
                 opacity={1}
                 gap={10}
                 radius={1.6}
                 color="rgb(115, 115, 115)" /* Neutral 500 */
                 glowColor="rgb(82, 82, 82)" /* Neutral 600 */
                 darkColor="rgb(115, 115, 115)" 
                 darkGlowColor="rgb(7, 89, 133)" /* Sky 800 (from demo) */
                 backgroundOpacity={0}
                 speedMin={0.3}
                 speedMax={1.6}
                 speedScale={1}
               />
            </div>
            
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
