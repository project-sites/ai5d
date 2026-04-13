'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { RadialOrbitalTimeline } from '@/components/ui/radial-orbital-timeline';
import { Terminal } from '@/components/ui/terminal';
import { 
  Search, 
  Settings, 
  BarChart4, 
  ShieldCheck 
} from 'lucide-react';

export const ProcessSection = () => {
  const t = useTranslations('process');

  const processNodes = [
    {
      id: 'week1',
      title: 'Semaine 1',
      description: 'Diagnostic complet, cartographie des processus et identification des 3 premiers cas d\'usage IA.',
      icon: Search,
      energy: 30,
      connectedTo: ['day30'],
    },
    {
      id: 'day30',
      title: 'Jour 30',
      description: 'Déploiement des premières automatisations en production. Gain de temps immédiat sur les tâches répétitives.',
      icon: Settings,
      energy: 55,
      connectedTo: ['day90'],
    },
    {
      id: 'day90',
      title: 'Jour 90',
      description: 'Systèmes IA opérationnels et adoptés par les équipes. Mesure du ROI et ajustements stratégiques.',
      icon: BarChart4,
      energy: 85,
      connectedTo: ['month6'],
    },
    {
      id: 'month6',
      title: 'Mois 6',
      description: 'Indépendance totale des équipes. Culture IA ancrée et ROI documenté dépassant les objectifs initiaux.',
      icon: ShieldCheck,
      energy: 100,
      connectedTo: [],
    },
  ];

  const terminalCommands = [
    "ai5d audit --organization \"ClientSME\"",
    "ai5d status --target production",
  ];

  const terminalOutputs = {
    0: [
      "Diagnostic : Analyse des flux en cours...",
      "Processus : 12 cas d'usage identifies",
      "Maturite : Niveau 2 (Intermediaire)",
      "Livrable : Roadmap IA v1.pdf genere"
    ],
    1: [
      "Deploiement :",
      "  - Workflow Marketing : [OPTIMISE] +310%",
      "  - Reporting Hebdo : [AUTOMATISE] 0m vs 4h",
      "  - Support Client : [AUGMENTE] -70% temps",
      "Validation : Transformation 90 jours complete."
    ]
  };

  return (
    <section id="process" className="relative py-24 px-6 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
            Accompagnement
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
            Vitesse d'exécution
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto italic">
            "De la vision stratégique à l'infrastructure opérationnelle en 90 jours."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Orbital Timeline */}
          <div className="relative order-2 lg:order-1">
            <RadialOrbitalTimeline 
              nodes={processNodes} 
              centerTitle="AI5D Path"
              centerDescription="Transform Timeline"
            />
          </div>

          {/* Right: Technical Terminal */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="max-w-lg">
              <h3 className="text-3xl font-serif font-semibold mb-6">Expertise en action</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Nous ne livrons pas de rapports, nous livrons des systèmes. Le Terminal AI5D illustre le diagnostic technique effectué sur vos infrastructures pour garantir un ROI immédiat.
              </p>
              
              <Terminal 
                commands={terminalCommands}
                outputs={terminalOutputs}
                username="ai5d-consultant"
                className="shadow-primary/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};
