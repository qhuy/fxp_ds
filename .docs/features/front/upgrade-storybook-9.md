---
id: upgrade-storybook-9
scope: front
title: Upgrade Storybook 8 → 9 (visual + a11y + interaction tests built-in, bundle 2× allégé)
status: active
depends_on:
  - architecture/monorepo-bootstrap
  - front/migrate-react-19-ref-prop
touches:
  - packages/react/package.json
  - packages/react/.storybook/**
  - .ai/rules/tech-react.md
  - pnpm-lock.yaml
progress:
  phase: implement
  step: "audit P1.3 — exécution autopilot"
  blockers: []
  resume_hint: "Upgrade via pnpm dlx storybook@latest upgrade. Vérifier story Button rend toujours, storybook:build vert."
  updated: 2026-04-28
---

# Upgrade Storybook 8 → 9

## Objectif

Combler la dette identifiée à l'audit P1.3 — Storybook 8.4 obsolète depuis juillet 2025 (SB9 GA). Bénéfices :

- **Bundle 2× plus léger** → install plus rapide, moins de conflits deps
- **Tests built-in** : visual regression + a11y + interaction (réduit la dépendance Chromatic au démarrage — voir P2.5)
- **Test coverage automatique** par composant
- **Story globals** : test dark mode, mobile/tablet, RTL, langue en 1 click toolbar
- **Tags** custom (`alpha`, `deprecated`, `feature-flag`) pour filtrer les stories
- **Next.js Vite integration** moderne (pour les apps consommatrices testant FXP en preview Astro/Next)

## Comportement attendu

Après upgrade :
- `pnpm storybook` boot sans warning de version
- `pnpm storybook:build` produit `storybook-static/` avec un bundle plus petit
- Stories `Button` rendent à l'identique
- `.storybook/main.ts` plus court (addon-essentials désormais intégré au core SB9)

## Contrats

### Versions cibles

```json
"storybook": "^9.x",
"@storybook/react": "^9.x",
"@storybook/react-vite": "^9.x"
// @storybook/addon-essentials retiré (intégré core SB9)
```

### `.storybook/main.ts` post-upgrade

L'`addons` array devient vide ou ne contient que les addons explicitement opt-in. Le reste est dans le core.

### Migrations automatiques attendues

Le CLI `storybook upgrade` applique les codemods nécessaires :
- Suppression imports `@storybook/addon-essentials` redondants
- Adaptation framework config si nécessaire
- Ajustements `tags`/`parameters` si breaking

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit le squelette Storybook initial (SB 8.4)
- `front/migrate-react-19-ref-prop` — Button refactoré, stories doivent toujours marcher
- À venir : `architecture/visual-regression-testing` (P2.5) — exploitera les visual tests built-in SB9

## Historique / décisions

- **2026-04-28** — Audit P1.3 a flaggué SB 8.4 obsolète. Décision : upgrade direct vers SB 9 (effort S, codemods auto via CLI).
- **2026-04-28** — Implémenté via `pnpm dlx storybook@latest upgrade --yes` qui a installé **SB 10.3.5** (au-delà de l'objectif initial — SB10 GA depuis l'audit). Codemods auto-appliqués : (a) `addon-essentials` remplacé par `@storybook/addon-docs`, (b) `.storybook/main.ts` utilise `getAbsolutePath` (workaround monorepo), (c) imports types passent à `@storybook/react-vite` (renderer-to-framework migration), (d) `parameters.backgrounds` → `initialGlobals.backgrounds` (globals API). `@types/node` ajouté pour `node:url`/`node:path` dans `.storybook/main.ts`. 1 warning Biome toléré (`any` dans helper auto-généré).

## Definition of Done

- [x] Deps `storybook@^10.3.5`, `@storybook/react@^10.3.5`, `@storybook/react-vite@^10.3.5` installées
- [x] `@storybook/addon-essentials` supprimé, `@storybook/addon-docs` ajouté (intégration SB10)
- [x] `.storybook/main.ts` migré (getAbsolutePath + framework path résolu)
- [x] `.storybook/preview.ts` migré (initialGlobals API)
- [x] `pnpm storybook:build` vert (3/3 turbo tasks)
- [x] Stories `Button` (5 stories) rendent inchangées (imports types adaptés)
- [x] `.ai/rules/tech-react.md` section Storybook updated (SB9+/10+ APIs)
- [x] `pnpm typecheck` (6/6) + `pnpm test` (6/6) + `pnpm build` (4/4) toujours verts
- [x] `pnpm lint` clean (1 warning toléré sur `any` dans helper Storybook auto-généré)
- [x] Commit `feat(front): upgrade Storybook 8 → 10 (codemods auto, addons intégrés core)` à venir
