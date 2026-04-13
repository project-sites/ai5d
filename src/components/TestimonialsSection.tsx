'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  image: string;
  quote: string;
};

/**
 * Divise un tableau en N sous-tableaux (colonnes masonry).
 */
const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

/**
 * Section Témoignages — Wall of Love en 3 colonnes masonry.
 */
export const TestimonialsSection = () => {
  const t = useTranslations('temoignages');

  const testimonials: Testimonial[] = [
    {
      name: t('1_name'),
      role: t('1_role'),
      initials: 'MA',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: t('1_quote'),
    },
    {
      name: t('2_name'),
      role: t('2_role'),
      initials: 'HS',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: t('2_quote'),
    },
    {
      name: t('3_name'),
      role: t('3_role'),
      initials: 'JR',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      quote: t('3_quote'),
    },
    {
      name: 'Sarah L.',
      role: 'Responsable Marketing — InnovaGroup',
      initials: 'SL',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      quote: "On a automatise toute notre veille concurrentielle en 2 semaines. Ce qui prenait 8 heures par semaine se fait maintenant tout seul. L'equipe peut enfin se concentrer sur la strategie.",
    },
    {
      name: 'Thomas B.',
      role: 'DAF — NordFinance',
      initials: 'TB',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      quote: "Le reporting financier mensuel est passe de 3 jours a 20 minutes. Mes analystes n'en reviennent toujours pas.",
    },
    {
      name: 'Amina K.',
      role: 'DRH — TalentFirst',
      initials: 'AK',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      quote: "La formation Academy a change la mentalite de toute l'equipe. On est passe de 'l'IA va nous remplacer' a 'l'IA nous libere'. Transformation culturelle reussie.",
    },
    {
      name: 'Pierre M.',
      role: 'CEO — LogiTrans',
      initials: 'PM',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      quote: "J'etais sceptique au debut. 90 jours plus tard, nos couts operationnels ont baisse de 35%. Le ROI est indiscutable.",
    },
    {
      name: 'Claire D.',
      role: 'Directrice Commerciale — SalesForward',
      initials: 'CD',
      image: 'https://randomuser.me/api/portraits/women/52.jpg',
      quote: "Nos propositions commerciales qui prenaient une demi-journee sortent maintenant en 15 minutes. La qualite est meilleure et l'equipe vend plus.",
    },
    {
      name: 'Olivier R.',
      role: 'CTO — DataStream',
      initials: 'OR',
      image: 'https://randomuser.me/api/portraits/men/86.jpg',
      quote: "Ce qui m'a impressionne c'est la documentation. Chaque workflow est documente, chaque decision est tracee. Quand l'equipe AI5D est partie, on etait 100% autonomes.",
    },
  ];

  const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3));

  return (
    <section id="temoignages" className="py-20 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
            Temoignages
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        {/* Wall of Love — 3 colonnes masonry */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonialChunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="space-y-3"
            >
              {chunk.map(({ name, role, quote, initials, image }, index) => (
                <Card key={index} className="border-border/30 bg-card/30 shadow-none">
                  <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={image}
                        alt={name}
                        loading="lazy"
                        width={120}
                        height={120}
                      />
                      <AvatarFallback className="text-xs font-bold bg-primary/15 text-primary">{initials}</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-medium text-sm">{name}</h3>
                      <span className="text-muted-foreground/60 block text-xs tracking-wide">{role}</span>

                      <blockquote className="mt-3">
                        <p className="text-muted-foreground leading-relaxed text-sm">{quote}</p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
