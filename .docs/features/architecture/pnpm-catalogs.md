---
id: pnpm-catalogs
scope: architecture
title: pnpm catalogs (centralisation versions cross-workspace)
status: active
depends_on:
  - architecture/monorepo-bootstrap
touches:
  - pnpm-workspace.yaml
  - packages/tokens/package.json
  - packages/react/package.json
  - packages/icons/package.json
  - apps/docs/package.json
  - .ai/rules/architecture.md
progress:
  phase: implement
  step: "audit P2.2 — exécution autopilot"
  blockers: []
  resume_hint: "Catalog défini dans pnpm-workspace.yaml. Packages utilisent 'catalog:' references. Bumps cohérents garantis."
  updated: "2026-04-28"
---

# pnpm catalogs

## Objectif

Audit P2.2 a relevé que chaque `package.json` répète les mêmes versions (`typescript: ^5.7.2`, `react: ^19.0.0`, `@types/react: ^19.0.0`, etc.) → bumps désynchronisés à terme. **pnpm catalogs** (mature en 2026) centralise ces versions en 1 source de vérité.

## Comportement attendu

```yaml
# pnpm-workspace.yaml
catalog:
  typescript: ^5.7.2
  react: ^19.0.0
```

```json
// packages/react/package.json
"devDependencies": {
  "typescript": "catalog:",
  "react": "catalog:"
}
```

`pnpm install` résout automatiquement `catalog:` → version définie centralement. Bump = 1 ligne dans `pnpm-workspace.yaml`.

## Contrats

### Deps catalogées (cross-workspace)

- `typescript` — utilisé par tokens, react, icons, docs, root
- `react`, `react-dom` — peer deps + dev deps de react ; deps de docs ; peer dep de icons
- `@types/react`, `@types/react-dom`, `@types/node` — types associés

### Deps NON catalogées (mono-package)

- `@biomejs/biome`, `@changesets/cli`, `turbo` → root only
- `tsup`, `vite`, `vitest`, `happy-dom`, `storybook`, `@storybook/*`, `@testing-library/react` → react package only
- `astro`, `@astrojs/check` → docs app only
- `@radix-ui/react-slot`, `cva`, `clsx`, `tailwind-merge` → react deps (production), pas catalogées car version-stable spécifique

→ Garder catalog **focalisé** sur ce qui sert plus de 2 packages, sinon on overfit.

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit le squelette workspace ; ajout du catalog est une évolution non-breaking

## Historique / décisions

- **2026-04-28** — Audit P2.2 a flaggué la duplication des versions. Décision : catalogs minimal (TypeScript + React + types associés). Extension future si autre dep transverse émerge.
- **2026-04-28** — Implémenté : `pnpm-workspace.yaml` enrichi avec 6 entrées catalog. Les 4 `package.json` (`@fxp/tokens`, `@fxp/react`, `@fxp/icons`, `@fxp/docs`) migrés vers `"catalog:"` references. `pnpm install` Already up to date (versions identiques résolues centralement). Bumps futurs = 1 ligne dans `pnpm-workspace.yaml`.

## Definition of Done

- [x] `pnpm-workspace.yaml` enrichi avec `catalog:` (6 entrées : typescript, react, react-dom, @types/react, @types/react-dom, @types/node)
- [x] Chaque `package.json` workspace utilise `"<dep>": "catalog:"` pour les deps catalogées
- [x] `pnpm install` clean (Already up to date)
- [x] `pnpm typecheck` (6/6) + `pnpm test` (6/6) + `pnpm build` (4/4) toujours verts
- [x] `pnpm lint` toujours clean (1 warning toléré, hérité)
- [x] Commit `feat(architecture): pnpm catalogs (centralisation versions cross-workspace)` à venir
