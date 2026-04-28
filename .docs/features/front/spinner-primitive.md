---
id: spinner-primitive
scope: front
title: Spinner — primitive de chargement (préreq Button loading + DataGrid)
status: active
depends_on:
  - architecture/monorepo-bootstrap
  - front/migrate-react-19-ref-prop
touches:
  - packages/react/src/components/Spinner/**
  - packages/react/src/index.ts
progress:
  phase: implement
  step: "primitive minimale livrée — taille variante, a11y conforme, animation CSS"
  blockers: []
  resume_hint: "Spinner livré comme primitive autonome. Sera consommé par Button loading (étape 5 roadmap button-primitive) et plus tard par DataGrid loading state."
  updated: 2026-04-28
---

# Spinner — primitive de chargement

## Objectif

`Spinner` est la primitive de **feedback de chargement** du DS. Préreq immédiat pour `Button` loading state (étape 5 roadmap), futur consommateur naturel du `DataGrid`, `EmptyState` (variant loading), et toute UI affichant une opération asynchrone.

## Comportement attendu

```tsx
<Spinner />                          // taille md par défaut, label "Loading" fallback
<Spinner size="sm" label="Chargement…" />
<Spinner size="lg" />
```

- Animation CSS pure (rotation 1s linear infinite)
- Pas de JS d'animation (RSC-compatible, performant)
- A11y : `role="status"` + `aria-label` (overridable via prop `label`)
- Tailles cohérentes avec Button : `sm` / `md` / `lg`

## Contrats

### Surface API

```tsx
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg'        // default: 'md'
  label?: string                    // a11y label, default 'Loading'
  ref?: React.Ref<HTMLSpanElement>
}
```

### CSS vars consommées

| CSS var | Rôle |
|---|---|
| `--fxp-color-brand-500` | couleur du tracé (overridable par parent via `color: …` également) |
| `--fxp-transition-fast` | non utilisé directement (rotation = animation, pas transition) |

Le SVG hérite de `currentColor` → l'app peut override la couleur via `style={{ color: '…' }}` ou className parent.

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure
- `front/migrate-react-19-ref-prop` — pattern `ref` as prop
- À venir : consommé par `front/button-primitive` étape 5 (state loading)

## Historique / décisions

- **2026-04-28** — Créé comme préreq de `front/button-primitive` étape 5 (state loading). Implémentation minimale : SVG circle + animation CSS keyframe. A11y `role="status"` + `aria-label` overridable. Tailles alignées sur Button (sm/md/lg).

## Definition of Done

- [x] Composant `Spinner` créé (`Spinner.tsx`, `Spinner.css`, `Spinner.test.tsx`, `Spinner.stories.tsx`, `index.ts`)
- [x] Pattern conforme à `.ai/rules/tech-react.md` (`use client`, `ref` prop, cva, no-strings via prop label)
- [x] A11y : `role="status"` + `aria-label`
- [x] CSS vars only (pas de couleur en-dur)
- [x] Tests unit (rendu, taille, label custom)
- [x] Stories (Default, Small, Large, CustomLabel)
- [x] Exporté depuis `src/index.ts`
- [x] Commit `feat(front): crée Spinner (primitive — préreq button loading)`
- [ ] Inscrit dans `docs/design-system-registry.md` (à faire dans le commit Button loading pour cohérence)
