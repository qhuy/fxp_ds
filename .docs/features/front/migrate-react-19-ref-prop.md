---
id: migrate-react-19-ref-prop
scope: front
title: Migration forwardRef → ref as prop (React 19)
status: active
depends_on:
  - architecture/monorepo-bootstrap
touches:
  - packages/react/src/components/Button/Button.tsx
  - .ai/rules/tech-react.md
progress:
  phase: implement
  step: "audit P1.1 — exécution autopilot"
  blockers: []
  resume_hint: "Refactor Button + update rule anatomie composant. Nouveaux composants primitifs adopteront le pattern."
  updated: 2026-04-28
---

# Migration forwardRef → ref as prop (React 19)

## Objectif

Aligner les composants `@fxp/react` sur le pattern moderne React 19 où `ref` est un prop standard. `forwardRef` est **deprecated** en React 19 (encore fonctionnel pour compat, retiré dans une future major).

Bénéfices :
- Code plus simple (-1 wrapper, -1 import)
- Pas de `displayName` manuel (auto-dérivé de `function Button()`)
- Aligné docs React 19 + ESLint plugin `eslint-react/no-forward-ref`
- Aucune dette technique pré-React 20

## Comportement attendu

Après migration, l'usage côté app reste **strictement identique** :

```tsx
const ref = useRef<HTMLButtonElement>(null)
<Button ref={ref} variant="primary">OK</Button>
```

Aucun breaking change pour les consommateurs. Refactor purement interne.

## Contrats

```tsx
// Pattern à adopter
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>
  // … autres props
}

export function Button({ ref, className, ...props }: ButtonProps) {
  return <button ref={ref} className={...} {...props} />
}
```

- `ref` typé via `React.Ref<HTMLElementXxx>`
- Pas de `forwardRef`
- Pas de `displayName` explicite (auto)

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit le composant Button initial à migrer
- Toutes les futures features `front/*` introduisant un composant primitif doivent suivre le pattern (cf. `.ai/rules/tech-react.md` post-migration)

## Historique / décisions

- **2026-04-28** — Audit best practices 2026 a identifié `forwardRef` comme dette React 19. Décision : migration immédiate (effort XS, 1 fichier composant + update rule).
- **2026-04-28** — Implémenté : `Button.tsx` refactoré (suppression `forwardRef`, `ref` typé en prop, plus de `displayName`). `.ai/rules/tech-react.md` mise à jour : section anatomie composant + interdits explicites (`forwardRef` ❌, `displayName` ❌). Pattern à appliquer à tous les futurs composants primitifs.

## Definition of Done

- [x] `Button.tsx` refactoré sans `forwardRef`
- [x] `.ai/rules/tech-react.md` section "Anatomie d'un composant primitif" + "Interdits explicites" mises à jour
- [x] `pnpm typecheck` vert (6/6 turbo tasks)
- [x] `pnpm test` vert (5 tests Button passed)
- [x] `pnpm build` vert (`dist/index.d.ts` reflète la nouvelle interface ref-as-prop)
- [x] Commit `feat(front): migre Button vers ref as prop (React 19)` à venir avec ce changement
