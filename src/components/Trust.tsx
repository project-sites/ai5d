"use client"

import { useTranslations } from 'next-intl'
import { useTheme } from "next-themes"
import { Sparkles } from "@/components/ui/sparkles"
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

// --- Logos Entreprises Marocaines (SVG simplifiés & Premium) ---

const OCP = () => (
  <div className="flex items-center space-x-2 opacity-30 hover:opacity-80 transition-opacity">
    <div className="w-8 h-8 flex items-center justify-center font-serif font-black text-xl border-2 border-current rounded-full">O</div>
    <span className="font-serif font-black text-xl tracking-tighter">OCP GROUP</span>
  </div>
)

const Attijari = () => (
  <div className="flex items-center space-x-2 opacity-30 hover:opacity-80 transition-opacity">
    <div className="w-8 h-8 bg-current rounded-sm rotate-45 flex items-center justify-center">
      <div className="w-3 h-3 bg-background" />
    </div>
    <span className="font-sans font-black text-lg tracking-tight">Attijariwafa bank</span>
  </div>
)

const MarocTelecom = () => (
  <div className="flex items-center space-x-2 opacity-30 hover:opacity-80 transition-opacity">
    <div className="w-8 h-8 rounded-full border-4 border-current flex items-center justify-center">
      <div className="w-3 h-3 bg-current rounded-full" />
    </div>
    <span className="font-sans font-bold text-lg">Maroc Telecom</span>
  </div>
)

const BCP = () => (
  <div className="flex items-center space-x-2 opacity-30 hover:opacity-80 transition-opacity">
    <div className="w-8 h-8 flex items-center justify-center border-b-4 border-current">
      <div className="w-4 h-5 bg-current rounded-t-full" />
    </div>
    <span className="font-sans font-black text-xl italic uppercase">BCP</span>
  </div>
)

const RAM = () => (
  <div className="flex items-center space-x-2 opacity-30 hover:opacity-80 transition-opacity">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8">
      <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.13c-.31.14-.66.14-.97 0l-7.97-4.13c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.13c.31-.14.66-.14.97 0l7.97 4.13c.32.17.53.5.53.88v9z" />
    </svg>
    <span className="font-serif font-bold text-lg">Royal Air Maroc</span>
  </div>
)

const MAROC_CORPORATE = [
  { id: "ocp", component: OCP },
  { id: "attijari", component: Attijari },
  { id: "iam", component: MarocTelecom },
  { id: "bcp", component: BCP },
  { id: "ram", component: RAM },
]

export function Trust() {
  const t = useTranslations('trust')
  const { theme } = useTheme()

  return (
    <section id="trust" className="relative py-4 md:py-6 overflow-hidden border-t border-zinc-900/10 dark:border-white/10">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Text - Très compact */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground/90">
            <span className="text-primary tracking-tight">
              {t('title')}
            </span>
          </h2>
        </div>

        {/* Logos Slider - Hauteur réduite */}
        <div className="relative h-[60px] w-full flex items-center justify-center">
          <InfiniteSlider 
            className='flex h-full w-full items-center' 
            duration={60}
            gap={60}
          >
            {MAROC_CORPORATE.map(({ id, component: Logo }) => (
              <div key={id} className="flex items-center px-10">
                <Logo />
              </div>
            ))}
          </InfiniteSlider>
          
          {/* Edge Blurs - Plus discrets car section plus petite */}
          <ProgressiveBlur
            className='pointer-events-none absolute top-0 left-0 h-full w-[100px] z-20'
            direction='left'
            blurIntensity={1}
          />
          <ProgressiveBlur
            className='pointer-events-none absolute top-0 right-0 h-full w-[100px] z-20'
            direction='right'
            blurIntensity={1}
          />
        </div>
      </div>

      {/* Decorative Glow - Extrêmement subtil (Effet Smart) */}
      <div className="absolute inset-x-0 bottom-0 h-24 w-full overflow-hidden pointer-events-none [mask-image:radial-gradient(50%_50%,white,transparent)] -z-10 opacity-20">
        <Sparkles
          density={200}
          className="absolute inset-x-0 bottom-0 h-full w-full"
          color={theme === "dark" ? "#ffffff" : "#f59e0b"}
        />
      </div>
    </section>
  )
}
