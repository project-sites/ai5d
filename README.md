# Template Site Demo

> Template Next.js premium pour sites one-page et landing pages.
> Intégré au workflow Obsidian (PARA) + Linear.

---

## Stack

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16 | Framework (App Router, Turbopack) |
| TypeScript | 5 | Typage |
| Tailwind CSS | v4 | Styles |
| Framer Motion | 12+ | Animations |
| next-intl | 4+ | Internationalisation (FR/EN par défaut) |
| Bun | 1.3+ | Runtime et gestionnaire de paquets |

## Démarrage rapide

### Cloner pour un nouveau projet

```bash
# Cloner le template dans le dossier du projet
git clone https://github.com/project-sites/template-site-demo mon-projet
cd mon-projet

# Installer les dépendances
bun install

# Lancer en dev
bun run dev
```

Le site est accessible sur `http://localhost:3000`.

### Personnaliser après le clonage

1. **`AGENTS.md`** — Remplacer les `{{NOM_PROJET}}` par le nom réel
2. **`DESIGN_SYSTEM.md`** — Régénérer avec UI Pro Max pour la palette du projet
3. **`src/app/globals.css`** — Adapter les couleurs et polices
4. **`src/app/[locale]/layout.tsx`** — Remplacer la police (Outfit → celle du projet)
5. **`messages/fr.json` / `en.json`** — Adapter les textes
6. **shadcn/ui** — `bunx --bun shadcn@latest init` puis ajouter les composants

## Structure du projet

```
├── .agents/skills/         # Skills IA (restent dans le template)
│   ├── vercel-composition-patterns/
│   ├── vercel-react-best-practices/
│   └── web-design-guidelines/
├── messages/               # Traductions i18n
│   ├── fr.json             # Français (défaut)
│   └── en.json             # Anglais
├── src/
│   ├── app/
│   │   ├── [locale]/       # Pages avec routing i18n
│   │   │   ├── layout.tsx  # Layout (polices, metadata, providers)
│   │   │   └── page.tsx    # Page d'accueil
│   │   └── globals.css     # Design system (variables CSS)
│   ├── components/         # Composants React
│   ├── i18n/               # Config internationalisation
│   │   ├── routing.ts      # Locales supportées
│   │   └── request.ts      # Chargement des messages
│   └── proxy.ts            # Middleware i18n (Next.js 16)
├── AGENTS.md               # Instructions IA (à personnaliser)
├── AI_DESIGN_GUIDE.md      # Guide pour générer un design system
└── DESIGN_SYSTEM.md        # Design system de référence (exemple)
```

## Internationalisation (i18n)

Le template utilise `next-intl` avec routing par locale (`/fr/`, `/en/`).

**Ajouter une nouvelle langue :**

1. Créer `messages/{locale}.json` avec la même structure que `fr.json`
2. Ajouter la locale dans `src/i18n/routing.ts`
3. Mettre à jour le matcher dans `src/proxy.ts`

## Skills IA inclus

Le dossier `.agents/skills/` contient 3 skills qui guident l'IA :

| Skill | Utilité |
|---|---|
| `vercel-composition-patterns` | Patterns de composition React (compound components, render props) |
| `vercel-react-best-practices` | Optimisation performance React/Next.js |
| `web-design-guidelines` | Audit UI/UX et bonnes pratiques web |

Ces skills restent dans le template — ils sont utiles pour tous les projets.

## Intégration Obsidian + Linear

Ce template est conçu pour s'intégrer au système PARA (Obsidian) + Linear :

1. **Obsidian** : Chaque projet a ses fichiers `09-Context.md`, `07-Status.md`, `06-Decisions.md`
2. **Linear** : Les issues sont préfixées `[NOM-PROJET]` et liées au projet Linear
3. **MCP** : Antigravity accède au vault Obsidian et à Linear via les serveurs MCP

Voir `AGENTS.md` pour le workflow complet.

## Commandes

| Commande | Action |
|---|---|
| `bun install` | Installer les dépendances |
| `bun run dev` | Serveur de développement |
| `bun run build` | Build de production |
| `bun run start` | Serveur de production |
| `bun run lint` | Linter ESLint |
| `bunx --bun shadcn@latest init` | Initialiser shadcn/ui |
| `bunx --bun shadcn@latest add [composant]` | Ajouter un composant shadcn |

---

_Template maintenu par [@project-sites](https://github.com/project-sites)_
