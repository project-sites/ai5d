# Guide : Générer un Design System par IA (UI/UX Pro Max)

Ce projet utilise le skill **UI/UX Pro Max** pour générer automatiquement des chartes graphiques, des palettes de couleurs et des choix typographiques basés sur des mots-clés sémantiques.

## Prérequis

Le skill doit être installé dans votre environnement Gemini (via `uipro-cli`).

## Commande

Pour générer un nouveau Design System, utilisez le script `search.py` inclus dans le skill.

### Syntaxe de base

```powershell
python ".../search.py" "VOS_MOTS_CLÉS" --design-system -p "NOM_DU_PROJET"
```

### Exemples

#### Style "Premium Corporate"

Pour un cabinet de conseil, une entreprise de services ou du B2B premium.

```powershell
python ".../scripts/search.py" "premium corporate consulting authority trust warm gold" --design-system -p "MonProjet"
```

→ **Résultat** : Palette Amber/Gold, Police Inter, Layout centré.

#### Style "Futuristic Innovation"

Pour une startup IA, Web3 ou Gaming.

```powershell
python ".../scripts/search.py" "futuristic innovation high-tech sleek dark ai" --design-system -p "MonProjet"
```

→ **Résultat** : Dark Mode, Néons, Typo Outfit/Syncopate, Layout horizontal.

#### Style "Clean Minimal"

Pour un portfolio, un site vitrine simple.

```powershell
python ".../scripts/search.py" "minimal clean elegant whitespace modern professional" --design-system -p "MonProjet"
```

→ **Résultat** : Palette neutre, beaucoup d'espace, typo fine.

## Où trouver le script ?

```
C:\Users\user\AppData\Local\nvm\v24.11.1\node_modules\uipro-cli\assets\.gemini\skills\ui-ux-pro-max\scripts\search.py
```

## Contenu du fichier généré

Le flag `--design-system` génère un fichier Markdown (`DESIGN_SYSTEM.md`) contenant :

1. **Pattern** : Structure de page recommandée (ex: Single Column, Bento Grid)
2. **Style** : Ambiance générale
3. **Couleurs** : Codes HEX pour Primary, Secondary, Background, CTA
4. **Typography** : Paires de polices Google Fonts optimisées
5. **Anti-patterns** : Ce qu'il faut absolument éviter pour ce style

## FAQ

### Dois-je générer un système pour chaque page ?

**NON.** Une marque forte doit être cohérente.

- **1 Projet = 1 Design System**
- Le système définit les règles globales (Typo, Couleurs, Espacements)
- Chaque section utilise ces règles pour construire des layouts différents

### Quand régénérer le design system ?

- Nouveau projet (après clonage du template)
- Pivot complet de la marque
- Sous-produit radicalement différent

### Lien avec globals.css

Le fichier `DESIGN_SYSTEM.md` est une **référence**. Les variables réelles sont dans `src/app/globals.css`. Après génération, adapter les variables CSS dans `globals.css` pour correspondre.
