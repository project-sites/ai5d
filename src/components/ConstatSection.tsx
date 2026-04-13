'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// --- Compteur Animé ---
const AnimatedNumber = ({ value, suffix = '%' }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 30, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>{suffix}
    </span>
  );
};

// --- Barre de progression animée ---
const ProgressBar = ({ value, delay, color }: { value: number; delay: number; color: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="h-2 bg-foreground/[0.06] rounded-full overflow-hidden">
      <motion.div
        className={cn("h-full rounded-full", color)}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

// --- Carte Stat Animée ---
interface StatCardProps {
  number: string;
  value: number;
  label: string;
  sublabel: string;
  color: string;
  barColor: string;
  delay: number;
}

const StatCard = ({ number, value, label, sublabel, color, barColor, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={cn(
      "relative group p-8 md:p-10 rounded-3xl overflow-hidden",
      "bg-card/40 backdrop-blur-sm border border-border/30",
      "hover:border-border/60 transition-all duration-500"
    )}
  >
    {/* Numéro énorme en fond */}
    <div className="absolute -top-8 -right-4 text-[140px] font-black text-foreground/[0.03] leading-none pointer-events-none select-none">
      {number}
    </div>

    {/* Chiffre animé principal */}
    <div className={cn("text-5xl md:text-6xl font-mono font-bold mb-4", color)}>
      <AnimatedNumber value={value} />
    </div>

    {/* Label */}
    <p className="text-lg font-semibold text-foreground mb-1">{label}</p>
    <p className="text-sm text-muted-foreground/60 mb-6">{sublabel}</p>

    {/* Barre */}
    <ProgressBar value={value} delay={delay + 0.3} color={barColor} />
  </motion.div>
);

// --- Section Principale ---

export const ConstatSection = () => {
  const t = useTranslations('constat');

  const problems = [
    {
      number: '01',
      title: t('col1_title'),
      value: 85,
      pain: "Ils produisent des rapports de 200 pages et des roadmaps ambitieuses. Mais quand le PDF est livré, personne ne sait par où commencer. Les recommandations restent en suspens pendant des mois. Le budget est consommé, la transformation n'a pas bougé d'un centimètre.",
      cardLabel: "Taux d'inaction post-rapport",
      cardSublabel: "des recommandations restent lettre morte.",
      color: "text-red-500/70",
      barColor: "bg-red-500/40",
    },
    {
      number: '02',
      title: t('col2_title'),
      value: 72,
      pain: "Elles codent vite et bien. Des dashboards, des APIs, des automatisations. Mais elles partent du principe que vos équipes vont s'adapter. Résultat : des outils puissants que personne n'utilise. L'adoption interne stagne à 15% et la frustration s'installe.",
      cardLabel: "Taux d'abandon des outils",
      cardSublabel: "des solutions livrées sont sous-utilisées à 6 mois.",
      color: "text-orange-500/70",
      barColor: "bg-orange-500/40",
    },
    {
      number: '03',
      title: t('col3_title'),
      value: 90,
      pain: "Ils automatisent en un temps record. Un workflow ici, un agent IA là. Mais tout repose sur leur expertise personnelle. Quand la mission se termine, le savoir-faire s'envole. Votre organisation redevient dépendante, incapable de maintenir ou d'itérer sur ce qui a été construit.",
      cardLabel: "Perte de compétence au départ",
      cardSublabel: "du savoir-faire disparaît avec le prestataire.",
      color: "text-amber-600/70",
      barColor: "bg-amber-600/40",
    },
  ];

  return (
    <section id="constat" className="relative py-12 md:py-16 lg:py-20 px-6">
      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Le chiffre choc central */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[120px] md:text-[180px] lg:text-[220px] font-serif font-bold leading-none tracking-tighter text-foreground/[0.04] select-none">
            70%
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight -mt-12 md:-mt-16 lg:-mt-20">
            des projets IA echouent.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-3xl mx-auto leading-relaxed">
            {t('title')}
          </p>
        </motion.div>

        {/* Les 3 problèmes : Texte à gauche + Carte à droite */}
        <div className="space-y-12 md:space-y-16">
          {problems.map((problem, i) => (
            <div
              key={problem.number}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                i % 2 === 1 && "lg:[direction:rtl]"
              )}
            >
              {/* Texte explicatif */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={cn(i % 2 === 1 && "lg:order-2 lg:[direction:ltr]")}
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-sm font-mono text-muted-foreground/40">{problem.number}</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    {problem.title}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {problem.pain}
                </p>
              </motion.div>

              {/* Carte statistique animée */}
              <div className={cn(i % 2 === 1 && "lg:order-1")}>
                <StatCard
                  number={problem.number}
                  value={problem.value}
                  label={problem.cardLabel}
                  sublabel={problem.cardSublabel}
                  color={problem.color}
                  barColor={problem.barColor}
                  delay={i * 0.15}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Phrase de transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="h-px w-24 bg-primary/30 mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-serif italic text-foreground/60 max-w-xl mx-auto leading-relaxed">
            {t('transition')}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
