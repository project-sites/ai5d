"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);

  // Utilisation de l'IntersectionObserver pour tracker physiquement quand un texte
  // arrive à la bonne hauteur (autour de 25vh) par rapport à l'écran. 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Dès que l'élément croise la ligne virtuelle située à 25% du haut de l'écran
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveCard(index);
          }
        });
      },
      {
        // La zone active se situe entre 20% et 50% en partant du haut de l'écran.
        // Cela correspond parfaitement à la hauteur où se trouve notre terminal (top-[25vh]).
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0,
      }
    );

    const elements = document.querySelectorAll(".sticky-scroll-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-full flex justify-between items-start relative space-x-10 rounded-md py-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4 w-1/2">
        <div className="max-w-xl w-full">
          {content.map((item, index) => (
            <div 
              key={item.title + index} 
              className="sticky-scroll-item mb-40 pt-4 relative"
              data-index={index}
            >
              {/* Numérotation géante neutre (gris) remplissant l'espace */}
              <div className="absolute -top-20 -left-16 text-[280px] leading-none font-black text-muted-foreground/[0.12] tracking-tighter pointer-events-none select-none -z-10">
                0{index + 1}
              </div>

              <motion.h2
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
                className="text-3xl md:text-5xl font-serif font-bold text-foreground"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
                className="text-lg text-muted-foreground mt-8 max-w-lg leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          {/* Spacer de fin de section pour que le dernier élément ait le temps de scroller */}
          <div className="h-[40vh]" />
        </div>
      </div>
      
      {/* Container Sticky pour le Terminal */}
      <div className="w-1/2 flex justify-end sticky top-[25vh] self-start">
        <div
          className={cn(
            "hidden lg:block h-[600px] w-full max-w-[600px] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.05)]",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </div>
    </div>
  );
};