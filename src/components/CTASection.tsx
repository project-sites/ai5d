'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, Video, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// --- Composant Factice de Calendrier (Thème Blanc Calendly) ---
const CalendarMock = () => {
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const times = ['09:00', '10:00', '11:30', '14:00', '15:30', '17:00'];

  return (
    <div className="w-full h-full flex flex-col justify-center bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl">
      {/* Profil Calendly-like */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden shadow-sm border border-zinc-200">
           {/* Photo Random (Pravatar) */}
           <img src="https://i.pravatar.cc/150?img=11" alt="Stratégiste" className="w-full h-full object-cover" />
        </div>
        <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Karamo Sylla</p>
        <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 font-serif">Audit Stratégique IA</h3>
        
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-zinc-500 font-medium">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-zinc-400" /> 30 min</span>
          <span className="flex items-center gap-1.5"><Video className="w-4 h-4 text-zinc-400" /> Visioconférence</span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 border-t border-zinc-100 pt-8 mt-2">
        {/* Interface Choix de jour */}
        <div className="flex-[2]">
          <h4 className="text-lg font-bold text-zinc-900 mb-4 px-2">Choisissez un jour</h4>
          
          <div className="flex items-center justify-between mb-4 px-2">
            <button className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors bg-zinc-50"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm font-semibold text-zinc-800">Avril 2026</span>
            <button className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors bg-zinc-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-400 mb-2 font-bold uppercase tracking-wider">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => <div key={d}>{d}</div>)}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
             <div className="aspect-square"></div>
             <div className="aspect-square"></div>
            {days.slice(0, 28).map((day) => {
              const isSelected = selectedDay === day;
              const isPast = day < 12;
              return (
                <button
                  key={day}
                  disabled={isPast}
                  onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                  className={cn(
                    "aspect-square rounded-full text-sm font-bold transition-colors flex items-center justify-center mx-auto w-full max-w-[40px]",
                    isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : 
                    isPast ? "text-zinc-300 cursor-not-allowed" : "text-zinc-700 hover:bg-zinc-100"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interface Choix Heure */}
        <div className="flex-[1.5] xl:border-l border-zinc-100 xl:pl-8">
           <AnimatePresence mode="wait">
            {selectedDay !== null ? (
              <motion.div 
                key={selectedDay}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full flex flex-col"
              >
                <h4 className="text-base font-medium text-zinc-600 mb-4 h-[28px] flex items-center">
                   Vendredi {selectedDay} Avril
                </h4>
                <div className="flex flex-col gap-2 overflow-y-auto pr-2" style={{ maxHeight: '250px' }}>
                  {times.map(t => {
                     const isTimeSelected = selectedTime === t;
                     return (
                        <div key={t} className="flex gap-2">
                           <button 
                             onClick={() => setSelectedTime(t)} 
                             className={cn(
                               "py-3 font-semibold rounded-lg border transition-all flex-grow",
                               isTimeSelected 
                                 ? "bg-zinc-600 border-zinc-600 text-white w-1/2" 
                                 : "border-blue-200 text-blue-600 hover:border-blue-600 w-full"
                             )}
                           >
                             {t}
                           </button>
                           {isTimeSelected && (
                              <motion.button
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: '50%' }}
                                className="bg-blue-600 text-white font-bold rounded-lg shadow-md"
                              >
                                Suivant
                              </motion.button>
                           )}
                        </div>
                     );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const CTASection = () => {
  const t = useTranslations('cta_final');

  return (
    <section id="contact" className="relative py-16 md:py-24 px-6 bg-transparent">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-12 min-h-[700px]">
          
          {/* Carte Gauche : Le Pitch (Ambre ultra foncé) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden"
          >
            {/* Décoration interne */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            {/* Avis / Rating */}
            <div className="flex flex-col items-start gap-2 mb-10">
              <div className="flex gap-1 text-primary">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-primary" />)}
              </div>
              <span className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
                Déjà + de 50 audits menés à bien
              </span>
            </div>

            {/* Textes purs */}
            <h2 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-white mb-6 leading-tight">
              {t('punchline')}
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-md font-medium">
              {t('subtext')}
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto relative z-10">
              <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/20 gap-2 w-max">
                Prendre RDV
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Carte Droite : Le Calendrier Blanc (Calendly Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex items-stretch"
          >
            <CalendarMock />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
