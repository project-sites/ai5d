'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const FAQSection = () => {
  const t = useTranslations('faq');

  const faqs = [
    { id: 1, q: t('1_q'), a: t('1_a') },
    { id: 2, q: t('2_q'), a: t('2_a') },
    { id: 3, q: t('3_q'), a: t('3_a') },
    { id: 4, q: t('4_q'), a: t('4_a') },
    { id: 5, q: t('5_q'), a: t('5_a') },
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
            Foire Aux Questions
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        <Accordion type="single" className="w-full" collapsible defaultValue="item-1">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem value={`item-${faq.id}`} className="border-border/40">
                <AccordionTrigger className="text-left group py-8">
                  <span className="text-xl md:text-2xl font-serif font-medium transition-colors group-hover:text-primary pr-8 duration-300">
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed text-lg pb-6 pr-12">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
