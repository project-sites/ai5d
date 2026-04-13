# 🎨 Design System — AI5D

> Design System officiel pour AI5D, basé sur le contexte Obsidian.
> Mots-clés : premium consulting AI strategy executive authority trust warm amber gold dark one-page landing

## Motif & Concept Visuel

- **Nom:** Authority & Premium Expertise
- **Focus:** Convaincre des décideurs (dirigeants, CEO). Le design doit refléter l'expertise technologique (terminaux, grids) sans paraître trop "SaaS" générique.
- **Atmosphère:** Sombre, rassurant, technique mais humain (grâce à la chaleur de la couleur Amber).
- **Pas d'images:** L'absence d'images photographiques est un choix fort. L'interface utilise des abstractions (terminaux JSON, grilles complexes, lueurs) pour symboliser l'Intelligence Artificielle.

## Couleurs (Mode Sombre par défaut)

| Rôle | Hex (Approximation) | Application Tailwind |
|------|--------------------|----------------------|
| **Brand (Amber)** | `#f59e0b` | `bg-amber-500` / `text-amber-500` |
| **Accent Glow** | `#d97706` | Effets lumineux / `to-amber-600` |
| **Background Principal** | `#020617` | `bg-slate-950` |
| **Surface Element** | `#0f172a` | `bg-slate-900` |
| **Background Terminal** | `#09090b` | `bg-zinc-950` |
| **Texte Principal** | `#f8fafc` | `text-slate-50` |
| **Texte Muté** | `#94a3b8` | `text-slate-400` |

*Note: Le mode sombre est au cœur de l'esthétique. L'Amber sert de point de focalisation (boutons, lumière, icônes clés).*

## Typographie

Nous utilisons une combinaison sophistiquée de 3 polices :

### 1. Inter
- **Usage:** Corps de texte, éléments d'interface générale (boutons, menus, cartes).
- **Style:** Clair, lisible, objectif. Sans-serif moderne.
- **Tailles clés:** 14px (UI), 16px (Body), 18px (Lead).

### 2. Source Serif 4
- **Usage:** Grands titres (H1, H2) ou citations (Témoignages).
- **Style:** Authority, premium, éditorial. Apporte la touche "Consultant de haut niveau" face au "Tech".
- **Tailles clés:** 48px+ (Hero), 36px (Section).

### 3. JetBrains Mono
- **Usage:** Bloc de code, Terminal, Chiffres clés ou petits labels "Tech".
- **Style:** Monospace de développeur.
- **Tailles clés:** 12px (Labels), 14px (Terminal).

## Éléments Clés de Design

- **Glow & Dotted Patterns:** Au lieu de dégradés solides, utilisation de grilles (dots) avec une lumière diffuse à l'arrière-plan.
- **Le Terminal:** Fausse fenêtre de code (JSON, sorties structurées) pour illustrer la méthode AI5D (Phase 1, Phase 2, etc.) sans longs paragraphes.
- **Avatars "Initiales":** Pas de photos de profil pour les témoignages. Uniquement un cercle sombre avec des initiales en couleur ou un léger "glow" (ex: KS pour Karamo Sylla).
- **Animations:**
  - *Fade-in Up* (Apparition des sections)
  - *Count-Up* (Chiffres de la section Résultats)
  - *Marquee* (Logos ou noms de clients qui défilent en continu)

## Anti-Patterns (À éviter absolument)

- ❌ Images de banques d'images (gens qui sourient devant un ordinateur).
- ❌ Bleu SaaS générique.
- ❌ Trop de couleurs (rester strictement sur du Slate/Zinc foncé + Amber + nuances de blanc/gris).
- ❌ Boutons évidés sans contraste.

---

_Design System généré & adapté pour AI5D._
