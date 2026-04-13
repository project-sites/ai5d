'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from '@/components/ui/terminal';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

/**
 * Section Protocole - Affiche la méthode propriétaire AI5D (5 dimensions)
 * Utilise un Design Accordéon + Terminal réactif.
 */
export const ProtocolSection = () => {
  const t = useTranslations('protocole');
  
  // Par défaut, le premier item est ouvert
  const [activeItem, setActiveItem] = useState("item-0");

  const content = [
    {
      title: t('1_title'),
      description: t('1_desc'),
      content: (
        <Terminal 
          commands={["AI5D.audit('operations_quotidiennes');", "AI5D.deploy('automatisation_process');"]}
          outputs={{
            0: ["[WARN] 30% du temps perdu sur des tâches administratives.", "[WARN] Goulots d'étranglement ralentissant la croissance."],
            1: ["[OK] Processus manuels automatisés avec succès.", "[OK] Équipe libérée de la charge mentale.", ">>> STATUT : Productivité maximale, +40% temps libre."]
          }}
          isLight={true}
          isStatic={true}
          username="ai5d-protocole"
          className="w-full h-full shadow-2xl shadow-primary/10 border-white/40"
        />
      )
    },
    {
      title: t('2_title'),
      description: t('2_desc'),
      content: (
        <Terminal 
          commands={["Market.scan('opportunites_non_explorees');", "Lab.generate('nouveaux_services');"]}
          outputs={{
            0: ["[INFO] Analyse des tendances du marché en cours...", "[OK] Besoins clients non satisfaits identifiés."],
            1: ["[OK] Création de concepts viables et disruptifs.", "[OK] Cycle de création et test divisé par 10.", ">>> STATUT : Innovation prête au lancement."]
          }}
          isLight={true}
          isStatic={true}
          username="ai5d-protocole"
          className="w-full h-full shadow-2xl shadow-primary/10 border-white/40"
        />
      )
    },
    {
      title: t('3_title'),
      description: t('3_desc'),
      content: (
        <Terminal 
          commands={["Team.assess('competences_internes');", "Academy.train({ mode: 'accelere' });"]}
          outputs={{
            0: ["[WARN] Dépendance coûteuse aux prestataires externes.", "[WARN] Equipe non formée à la puissance des nouveaux outils."],
            1: ["[OK] Formation ultra-pratique et sur-mesure déployée.", "[OK] L'équipe crée désormais ses propres solutions.", ">>> STATUT : Équipe 100% autonome et sur-qualifiée."]
          }}
          isLight={true}
          isStatic={true}
          username="ai5d-protocole"
          className="w-full h-full shadow-2xl shadow-primary/10 border-white/40"
        />
      )
    },
    {
      title: t('4_title'),
      description: t('4_desc'),
      content: (
        <Terminal 
          commands={["Data.collect('signaux_concurrentiels');", "Strategy.build('plan_action_immédiat');"]}
          outputs={{
            0: ["[INFO] Croisement de milliers de données en temps réel...", "[OK] Angles morts de la concurrence détectés."],
            1: ["[OK] Feuille de route tactique et stratégique générée.", "[OK] Décisions fondées sur des faits tangibles.", ">>> STATUT : Stratégie claire générant du ROI rapide."]
          }}
          isLight={true}
          isStatic={true}
          username="ai5d-protocole"
          className="w-full h-full shadow-2xl shadow-primary/10 border-white/40"
        />
      )
    },
    {
      title: t('5_title'),
      description: t('5_desc'),
      content: (
        <Terminal 
          commands={["Watch.init('surveillance_echélle_mondiale');", "Watch.filter({ remove_noise: true });"]}
          outputs={{
            0: ["[INFO] Monitoring de 500+ sources d'innovation...", "[OK] Signaux faibles technologiques interceptés."],
            1: ["[OK] Extraction d'informations stratégiques décisives.", "[OK] Transfert immédiat aux décideurs du projet.", ">>> STATUT : Position de leader du marché sécurisée."]
          }}
          isLight={true}
          isStatic={true}
          username="ai5d-protocole"
          className="w-full h-full shadow-2xl shadow-primary/10 border-white/40"
        />
      )
    }
  ];

  // Calcul du composant terminal actif
  const activeIndex = activeItem ? parseInt(activeItem.split('-')[1]) : 0;
  const activeTerminal = content[activeIndex]?.content || content[0].content;

  return (
    <section id="protocole" className="relative pt-12 md:pt-16 pb-0 border-t border-border/10 bg-background/30 backdrop-blur-2xl">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header (Même style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-6 block font-bold">
             Logic Framework
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-8">
            {t('title')}
          </h2>
          <div className="h-0.5 w-32 bg-primary/40 mb-10" />
          <p className="text-muted-foreground text-xl md:text-2xl font-serif italic max-w-2xl leading-relaxed">
            "Nous ne changeons pas vos outils, nous changeons votre rapport au temps et à la création."
          </p>
        </motion.div>

        {/* Cœur du Layout : Accordéon à gauche, Terminal à droite */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Colonne Gauche : L'Accordéon */}
          <div className="w-full lg:w-1/2">
            <Accordion 
              type="single" 
              className="w-full" 
              value={activeItem}
              onValueChange={(val) => {
                if (val) setActiveItem(val); // empêche la fermeture complète
              }}
            >
              {content.map((item, i) => (
                <AccordionItem 
                  key={`item-${i}`} 
                  value={`item-${i}`} 
                  className="border-border/20 data-[state=open]:border-primary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left group py-6 md:py-8 hover:no-underline">
                    <div className="flex items-start gap-4 md:gap-6">
                      <span className="text-sm font-mono text-muted-foreground mt-1.5 opacity-40 group-data-[state=open]:text-primary group-data-[state=open]:opacity-100 transition-colors">
                        0{i + 1}
                      </span>
                      <span className="text-2xl md:text-3xl font-serif font-bold text-foreground group-data-[state=open]:text-primary transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed text-lg pb-8 pl-[3.25rem] md:pl-[4rem] pr-4">
                      {item.description}
                    </p>
                    
                    {/* Mobile Only: Affiche le terminal sous le texte ouvert (car colonnes empilées) */}
                    <div className="lg:hidden w-full h-[400px] mb-8 pl-[3.25rem]">
                      {item.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Colonne Droite : Le Terminal Principal (Sticky, Desktop Only) */}
          <div className="hidden lg:block w-full lg:w-1/2 relative pt-16">
            <div className="sticky top-32 w-full max-w-[600px] h-[700px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 mx-auto">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  {activeTerminal}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 pointer-events-none" />
    </section>
  );
};
