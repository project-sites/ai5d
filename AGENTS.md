# Instructions Projet — AI5D

## Contexte

Landing page one-page premium pour AI5D (conseil, formation & labs en IA).
Stack : Next.js 16, TypeScript, Tailwind CSS v4, Bun.

## Acces au contexte (MCP obligatoire)

Ce projet utilise les serveurs MCP pour acceder au contexte :

### Obsidian (vault PARA)

- **Au debut de chaque session** : lire ces 2 fichiers via MCP Obsidian
  - `10_PROJETS/Freelance/Sites/AI5D/09-Context.md` → contexte complet (sections, copywriting, composants, strategie)
  - `10_PROJETS/Freelance/Sites/AI5D/07-Status.md` → etat actuel + prochaine action
- **A la fin de chaque session** : mettre a jour via MCP Obsidian
  - `07-Status.md` → progression + log de session
  - `06-Decisions.md` → nouvelles decisions (append-only)
  - `09-Context.md` → si le contexte change

### Linear (execution)

- Projet : **Freelance Execution**
- Issues : prefixees `[AI5D]` (ex: `[AI5D] Coder la section Hero`)
- Labels : `🔧 Dev` · `🎨 Design` · `📝 Contenu` · `⚙️ Setup` · `📦 Livrable`
- Statuts : `Backlog` → `Todo` → `In Progress` → `Done`
- **Debut** : Passer l'issue `Todo` en `In Progress` immediatement
- **Pendant** : Issue terminee → `Done` immediatement. Decision prise → `06-Decisions.md` immediatement.
- **Fin de session** : Mettre a jour `07-Status.md` (log) + `09-Context.md` (si change)

Voir `00_SYSTEM/Linear-Workflow.md` dans le vault Obsidian pour les conventions completes.

## Stack technique

| Composant | Technologie | Notes |
|---|---|---|
| Framework | Next.js 16 | App Router, Turbopack |
| Langage | TypeScript | Strict mode |
| Styles | Tailwind CSS v4 | `@import "tailwindcss"` dans globals.css |
| UI | shadcn/ui | `bunx --bun shadcn@latest add` |
| Composants avances | Magic UI / Aceternity | Installes par projet, documentes dans `09-Context.md` |
| Animations | Framer Motion | |
| i18n | next-intl | Multilingue natif (voir section i18n ci-dessous) |
| Runtime | Bun | **Pas npm/yarn.** Commandes : `bun install`, `bun run dev` |

## i18n — Conventions multilingues

L'internationalisation est un element central du template. **Chaque texte affiche** doit passer par `next-intl`, jamais de texte en dur dans les composants.

### Architecture

```
messages/
├── fr.json          # Francais (locale par defaut)
├── en.json          # Anglais
└── {locale}.json    # Ajouter une langue = ajouter un fichier ici
src/i18n/
├── routing.ts       # Locales supportees + locale par defaut
└── request.ts       # Chargement des messages cote serveur
src/proxy.ts         # Routing middleware (next-intl/middleware)
```

### Structure des fichiers JSON

Les fichiers de traduction sont organises **par section de la page** pour faciliter la maintenance. Chaque section a sa propre cle de premier niveau :

```json
{
  "metadata": { "title": "...", "description": "..." },
  "nav": { "home": "...", "about": "...", "contact": "..." },
  "hero": { "badge": "...", "title": "...", "subtitle": "...", "cta": "..." },
  "services": { "title": "...", "items": [...] },
  "footer": { "rights": "..." }
}
```

### Regles i18n

1. **Jamais de texte en dur** dans les composants — toujours `t('cle')`
2. **Organisation par section** — pas de cles plates, grouper par section
3. **Symetrie stricte** — `fr.json` et `en.json` doivent avoir la meme structure
4. **Ajouter une langue** = 3 etapes :
   - Creer `messages/{locale}.json`
   - Ajouter la locale dans `src/i18n/routing.ts`
   - Mettre a jour le matcher dans `src/proxy.ts`

### Usage dans les composants

```tsx
// Server Component (page.tsx)
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('hero');
return <HeroContent title={t('title')} />;

// Client Component
import { useTranslations } from 'next-intl';
const t = useTranslations('nav');
return <span>{t('home')}</span>;
```

## Regles projet

- **Langue** : Francais (commentaires, variables descriptives)
- **Syntaxe** : ES6+, Arrow Functions
- **Pas d'images stock** : Utiliser icones Lucide, animations, gradients, avatars initiales
- **Composants** : Documentes dans `09-Context.md` d'Obsidian (specifiques a chaque projet)
- **Design system** : Palette et polices definies dans `globals.css` (Amber/Gold pour AI5D)
- **Runtime** : Bun (pas npm/yarn). Commandes shadcn : `bunx --bun shadcn@latest add`

## Structure du code

```
├── .agents/skills/         # Skills IA (Vercel patterns, React best practices, web design)
├── messages/               # Fichiers de traduction (fr.json, en.json)
├── public/                 # Assets statiques
├── src/
│   ├── app/
│   │   ├── [locale]/       # Pages avec support i18n
│   │   │   ├── layout.tsx  # Layout principal (polices, metadata, providers)
│   │   │   └── page.tsx    # Page d'accueil (Server Component)
│   │   └── globals.css     # Design system (couleurs, spacing, animations)
│   ├── components/         # Composants React
│   ├── i18n/
│   │   ├── routing.ts      # Config des locales
│   │   └── request.ts      # Chargement des messages
│   └── proxy.ts            # Middleware i18n (remplace middleware.ts en Next.js 16)
├── AGENTS.md               # Ce fichier — instructions IA
├── DESIGN_SYSTEM.md        # Referentiel du design system genere
└── AI_DESIGN_GUIDE.md      # Guide pour regenerer un design system
```

## Workflow

1. Lire `09-Context.md` + `07-Status.md` via MCP Obsidian
2. Passer l'issue Linear en `In Progress`
3. Coder / resoudre — marquer `Done` + ecrire decisions au fur et a mesure
4. Fin de session : mettre a jour `07-Status.md` (log) + `09-Context.md` via MCP Obsidian
