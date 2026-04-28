---
id: icons-package
scope: front
title: "@fxp/icons — set d'icônes (placeholder + roadmap)"
status: active
depends_on:
  - architecture/monorepo-bootstrap
touches:
  - packages/icons/**
progress:
  phase: spec
  step: "placeholder en place — choix re-export lucide-react vs SVG sprite custom à trancher"
  blockers:
    - "Décision pending : re-export sélectif lucide-react (rapide) vs SVG sprite custom (plus contrôle, plus d'effort)."
  resume_hint: "Trigger : 1er composant FXP qui consomme une icône (probablement Button avec slots iconLeft/iconRight, étape 4 de button-primitive). À ce moment, trancher la stratégie."
  updated: "2026-04-28"
---

# @fxp/icons — set d'icônes

## Objectif

`@fxp/icons` est l'un des 3 packages publics de FXP DS (avec `@fxp/tokens` et `@fxp/react`). Il fournit aux apps consommatrices les icônes utilisées par les composants FXP **et** celles exposées pour usage applicatif direct.

Cette fiche extrait `icons-package` du périmètre de `architecture/monorepo-bootstrap` (où il était un placeholder vide pour valider la structure workspace) et lui donne une vie propre.

## État actuel (post-bootstrap)

Le package `@fxp/icons` est un **stub volontaire** :

```ts
// packages/icons/src/index.ts
export const __PLACEHOLDER__ = true
```

- `package.json` configuré (name `@fxp/icons`, peerDep React, scripts placeholder)
- Tag Turbo `icons-layer` (cf. `architecture/turborepo-boundaries`)
- Pas de code applicatif, pas de tests, pas de stories

→ Le package est résolvable dans le workspace (utilisable comme `workspace:*` dep) mais n'expose rien d'utile encore.

## Décision pending — stratégie d'icônes

À trancher avant le 1ᵉʳ composant FXP qui consomme des icônes (probablement `Button` étape 4 de [`front/button-primitive`](./button-primitive.md) — slots `iconLeft`/`iconRight`).

### Option A — Re-export sélectif `lucide-react`

```ts
// packages/icons/src/index.ts
export {
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Plus,
  Minus,
  /* … */
} from 'lucide-react'
```

**Pros** :
- Rapide (1 jour de setup pour ~50 icônes courantes)
- Bibliothèque mature, ~1000+ icônes disponibles
- Style cohérent (24×24, stroke 2, rounded)
- Tree-shakable nativement

**Cons** :
- Couplage versionnel `lucide-react` (bump = potentiel breaking visuel)
- Pas de contrôle sur le set (FXP-specific symbols impossibles)
- Dépendance externe pour les apps (toutes héritent `lucide-react`)

### Option B — SVG sprite custom

```ts
// packages/icons/src/Icon.tsx
'use client'
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: 'chevron-right' | 'check' | 'x' | …
}
export function Icon({ name, ...props }: IconProps) {
  return <svg ref={ref} {...props}><use href={`#fxp-icon-${name}`} /></svg>
}
```

**Pros** :
- Contrôle total du set (icônes FXP-specific possibles)
- Pas de dépendance externe
- Bundle minimal (1 sprite SVG, déduplication automatique)
- Branding cohérent (style FXP dès le départ)

**Cons** :
- Effort de design ~3-5 jours pour 50 icônes (DA fournit SVG)
- Maintenance manuelle (ajout d'icônes = PR avec SVG + entry en union type)
- Tooling à mettre en place (sprite generator via `svg-sprite` ou similaire)

### Option C — Hybride (recommandé long terme)

Re-export `lucide-react` pour le **80% générique** + composant `Icon` custom pour les FXP-specific (logo, illustrations métier).

→ **Recommandation autopilot** : commencer par Option A (déblocage rapide) ; migrer vers C quand la DA fournit ses 5-10 premières icônes custom.

## Comportement attendu (post-décision)

```tsx
// App consommatrice
import { ChevronRight, Check } from '@fxp/icons'

<ChevronRight className="text-blue-500" size={16} />
```

API stable (peerDep React seul) ; aucun runtime FXP autre que les SVGs.

## Contrats

### Dépendances

- **PeerDep** : `react@^18 || ^19`
- **Dep si Option A/C** : `lucide-react@^0.x` (avec `peerDep` côté apps évalué case-by-case)

### Naming

- Composants en `PascalCase` (cohérent avec lucide-react) : `<ChevronRight />`, `<Check />`, etc.
- Pas de préfixe `Fxp` (déjà namespacé via le package `@fxp/icons`).

### Tests / Storybook

- Au moins 1 story par icône exposée (visualisation rapide via Storybook)
- Tests minimaux : rendu SVG correct, props `width`/`height`/`color` propagées

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure du package
- `architecture/turborepo-boundaries` — tag `icons-layer` (peer de `tokens-layer`, indépendant)
- À venir : `front/button-primitive` étape 4 (slots `iconLeft`/`iconRight`) — premier consommateur réel
- À venir : `architecture/icons-pipeline-svg-sprite` (si Option B/C choisie) — outillage sprite generator

## Historique / décisions

- **2026-04-28** — Placeholder créé dans `architecture/monorepo-bootstrap` (`__PLACEHOLDER__ = true`) pour résoudre le package dans le workspace.
- **2026-04-28** — **Fiche feature dédiée créée** (cette fiche) — extraction du périmètre bootstrap, blocker explicite sur le choix de stratégie A/B/C.

## Definition of Done (placeholder actuel)

- [x] Package résolvable dans le workspace (`@fxp/icons` workspace:*)
- [x] Tag Turbo `icons-layer` correct
- [x] Build/typecheck/test scripts placeholders verts
- [x] Fiche feature dédiée (cette fiche)

## Definition of Done (cible production)

- [ ] Stratégie A/B/C tranchée (`docs/adr/<NNNN>-icons-strategy.md` à créer)
- [ ] Set d'icônes initial livré (~30-50 icônes couvrant Button/Input/Modal/Toaster/EmptyState)
- [ ] 1 story par icône
- [ ] Tests rendu + props passthrough
- [ ] Inscrit dans `docs/design-system-registry.md`
- [ ] Documenté dans Astro doc-site (galerie visuelle filtrable)
