---
id: tokens-pipeline-bootstrap
scope: architecture
title: Pipeline tokens Style Dictionary 4 (DTCG → CSS + TS)
status: active
depends_on:
  - architecture/monorepo-bootstrap
touches:
  - packages/tokens/package.json
  - packages/tokens/style-dictionary.config.mjs
  - packages/tokens/src/tokens.json
  - packages/tokens/src/README.md
  - packages/tokens/src/ROLES.md
  - packages/tokens/src/tenants/**
  - turbo.json
progress:
  phase: implement
  step: "audit P2.4 — exécution autopilot"
  blockers: []
  resume_hint: "SD4 génère dist/css/fxp.css + dist/tokens.{js,d.ts} depuis src/tokens.json. fxp.dark.css copié post-build (dark variant via $themes à itérer plus tard)."
  updated: 2026-04-28
---

# Pipeline tokens Style Dictionary 4

## Objectif

Audit P2.4 a flaggué que `style-dictionary.config.ts` était cité dans la spec mais inexistant — `tokens.json` était statique, les CSS vars hardcodées dans `fxp.css` à la main.

Cette feature pose le **vrai pipeline** :
- Source : `packages/tokens/src/tokens.json` (DTCG W3C, format $value/$type)
- Builder : Style Dictionary 4 (first-class DTCG)
- Outputs `dist/` :
  - `dist/css/fxp.css` (CSS vars, généré)
  - `dist/css/fxp.dark.css` (copié de `src/`, multi-thème via SD `$themes` reporté)
  - `dist/tokens.js` + `dist/tokens.d.ts` (export TS pour code interne / tooling)

Avantage : la DA peut désormais livrer un `tokens.json` mis à jour → les CSS vars sont régénérées automatiquement.

## Comportement attendu

```bash
pnpm build  # → tokens build via SD + copy dark css
ls packages/tokens/dist/
#   css/fxp.css        ← généré
#   css/fxp.dark.css   ← copié de src
#   tokens.js          ← généré
#   tokens.d.ts        ← généré
```

Le scope `--fxp-color-brand-500: #1e40af` etc. est **identique** au stub précédent (mêmes valeurs depuis `tokens.json`). **Aucun breaking** côté Storybook ni Astro docs ; ils continuent à importer `@qhuy/tokens/css/fxp.css`.

## Contrats

### `packages/tokens/style-dictionary.config.mjs`

- Source : `src/tokens.json`
- Platforms :
  - `css` : `transformGroup: 'css'`, output `dist/css/fxp.css` au format `css/variables`
  - `js` : `transformGroup: 'js'`, output `dist/tokens.js` (`javascript/es6`) + `dist/tokens.d.ts` (`typescript/es6-declarations`)

### Mises à jour `package.json` `@qhuy/tokens`

| Champ | Avant | Après |
|---|---|---|
| `main` | `./src/index.ts` | `./dist/tokens.js` |
| `types` | `./src/index.ts` | `./dist/tokens.d.ts` |
| `exports['.'] ` | `./src/index.ts` | `./dist/tokens.js` |
| `exports['./css/fxp.css']` | `./src/css/fxp.css` | `./dist/css/fxp.css` |
| `exports['./css/fxp.dark.css']` | `./src/css/fxp.dark.css` | `./dist/css/fxp.dark.css` |
| `exports['./tokens.json']` | inchangé (`./src/tokens.json`) | inchangé |
| `files` | `["src"]` | `["dist", "src/tokens.json"]` |
| `scripts.build` | `echo "..."` | `style-dictionary build && cp ...dark.css` |

### Mise à jour `turbo.json` racine

`storybook` task gagne `dependsOn: ["^build"]` pour s'assurer que `@qhuy/tokens` (build) est fait avant que Storybook ne tente de résoudre les imports `@qhuy/tokens/css/*`.

### Suppression `packages/tokens/src/index.ts`

Plus nécessaire — les exports TS viennent maintenant de `dist/tokens.js` généré par SD.

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure `packages/tokens` initiale (stub manuel)
- À venir : `architecture/tokens-multi-tenant` (P2.5 niveau 3) — étendra avec `$themes` Tokens Studio et N tenants CSS

## Historique / décisions

- **2026-04-28** — Audit P2.4 a flaggué l'absence de pipeline. Décision : SD 4 minimal (1 source `tokens.json`, 2 platforms : css + js). `fxp.dark.css` reste copié source-only — dark via `$themes` SD reporté à la feature multi-tenant pour traiter les 2 (dark + tenants) cohéremment.
- **Choix `tokens.js` + `tokens.d.ts`** plutôt que `tokens.ts` direct : SD 4 produit du JS + déclarations TS, la conso interne (Storybook globals, future doc) y accède en `import { tokens } from '@qhuy/tokens'` typé.
- **2026-04-28** — Extension tokens pour l'adaptation `Button` shadcn-like : couleurs `secondary`, `border`, focus muted, danger soft states, `space-0`, `line-height-*`, et namespace composant `--fxp-button-*` (heights, icon-only sizes, padding, gaps, radius, font/icon sizes, ring/active/disabled). Dark overrides source-only ajoutés pour les états neutres et destructive soft.
- **2026-04-28** — Contrat de livraison DA documenté : `packages/tokens/src/README.md` pour le workflow Tokens Studio/DTCG, `ROLES.md` pour les responsabilités par rôle, `tenants/README.md` et `tenants/_TEMPLATE.md` pour les fiches tenant. La documentation est organisée par rôle et tenant, pas par intervenant individuel.

## Definition of Done

- [x] `style-dictionary` ^4.4.0 ajouté en devDep `@qhuy/tokens`
- [x] `style-dictionary.config.mjs` créé (2 platforms : css + js)
- [x] `package.json` `@qhuy/tokens` mis à jour (main/types/exports/files/scripts.build avec `--config ./style-dictionary.config.mjs` explicite)
- [x] `turbo.json` racine : `storybook` task gagne `dependsOn: ["^build"]`
- [x] `pnpm build` génère `dist/css/fxp.css` (tokens base + namespace `--fxp-button-*`), `dist/css/fxp.dark.css` (copié), `dist/tokens.js`, `dist/tokens.d.ts`
- [x] `pnpm storybook:build` toujours vert (resolve `@qhuy/tokens/css/fxp.css` post-build)
- [x] `pnpm test` + `pnpm typecheck` + `pnpm lint` + `pnpm boundaries` toujours verts
- [x] Commit `feat(architecture): pipeline tokens Style Dictionary 4 (DTCG → CSS + TS)` à venir

## Suite (post-implem)

- **2026-04-28** — Implémenté : Style Dictionary 4 pose le pipeline. Adjustements en cours d'exécution :
  - `--config ./style-dictionary.config.mjs` explicite (CLI ne détecte pas auto le `.mjs`)
  - `packages/tokens/src/index.ts` supprimé (obsolète, re-export TS vient maintenant de `dist/tokens.js`)
  - `packages/tokens/tsconfig.json` supprimé (plus de TS source ; `.d.ts` générés par SD)
  - `typecheck` script remplacé par echo no-op (cohérent avec absence de TS source)
- CSS généré depuis `tokens.json`; le nombre de vars a augmenté avec les tokens Button et les états multitenant. Aucun breaking attendu côté Storybook, Astro ou playground.
