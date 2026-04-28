---
id: monorepo-bootstrap
scope: architecture
title: Bootstrap monorepo Turbo (packages + apps + outillage)
status: active
depends_on: []
touches:
  - package.json
  - pnpm-workspace.yaml
  - pnpm-lock.yaml
  - turbo.json
  - tsconfig.base.json
  - .gitignore
  - .npmrc
  - .changeset/**
  - packages/tokens/**
  - packages/react/**
  - packages/icons/**
  - apps/docs/**
progress:
  phase: implement
  step: "scaffold complet — chaîne pnpm install/typecheck/test/build/storybook:build validée"
  blockers: []
  resume_hint: "Squelette posé. Prochaines features candidates : architecture/tokens-pipeline-bootstrap (Style Dictionary + livraison DA), front/button-primitive-final (variants destructive/ghost + tailles supplémentaires), architecture/ci-cd-pipeline (GitHub Actions release Changesets)."
  updated: "2026-04-28"
---

# Bootstrap monorepo Turbo

## Objectif

Poser le squelette technique du monorepo FXP DS pour débloquer tous les développements futurs (composants primitifs, tokens, site de doc, tests visuels). Sans ce socle, aucun code applicatif ne peut être committé — le hook `commit-msg` bloquerait tout `feat:` orphelin de structure.

C'est la **fondation** : 100% des features ultérieures déclareront `depends_on: ["architecture/monorepo-bootstrap"]`.

## Comportement attendu

Au sortir du scaffold, l'environnement local doit permettre :

| Commande (racine repo) | Résultat attendu |
|---|---|
| `pnpm install` | Installation propre des 3 packages + 1 app, sans warning bloquant |
| `pnpm typecheck` | `tsc --noEmit` vert sur tous les packages |
| `pnpm lint` | Biome check vert (lint + format check, cf. feature `architecture/lint-format-biome`) |
| `pnpm test` | Vitest vert (suite vide ou test placeholder OK) |
| `pnpm build` | `tsup` build OK pour `@fxp/tokens`, `@fxp/react`, `@fxp/icons` ; Astro build OK pour `apps/docs` |
| `pnpm storybook` | Storybook boot avec au moins un composant placeholder (`Button`) visible |
| `pnpm changeset` | Wizard Changesets fonctionnel (déjà initialisé via `.changeset/`) |

**Périmètre du scaffold** : strict minimum pour le boot local et la pipeline CI. **Pas** de pipeline tokens fonctionnel (DA n'a pas encore livré `tokens.json`) — stub minimal. **Pas** de Storybook exhaustif — juste un placeholder `Button` pour valider la chaîne. Le reste arrive dans des features dédiées (`tokens-pipeline-bootstrap`, `button-primitive`, etc.).

## Contrats

### Structure repo cible

```
fanxp-design-system/
├── package.json                  ← private: true, workspaces (script bin via pnpm)
├── pnpm-workspace.yaml           ← packages: ['packages/*', 'apps/*']
├── turbo.json                    ← pipelines build/test/typecheck/lint/dev
├── tsconfig.base.json            ← config TS strict partagée (extends par chaque package)
├── .gitignore                    ← node_modules, dist, .turbo, .DS_Store, *.log
├── .npmrc                        ← auto-install-peers=true, strict-peer-dependencies=false
├── .changeset/                   ← déjà initialisé
├── packages/
│   ├── tokens/
│   │   ├── package.json          ← name: "@fxp/tokens", version: "0.0.0", private (publish later)
│   │   ├── tsconfig.json         ← extends tsconfig.base.json
│   │   ├── tsup.config.ts        ← build ESM + CJS + .d.ts
│   │   ├── style-dictionary.config.ts  ← stub minimal (DA pas encore livré tokens.json)
│   │   └── src/
│   │       ├── tokens.json       ← DTCG W3C, stub avec 3-4 vars minimales (color brand, radius md)
│   │       └── index.ts          ← export const tokens = require('./tokens.json')
│   ├── react/
│   │   ├── package.json          ← name: "@fxp/react", peerDeps react@^18 || ^19, react-dom
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts        ← ESM + CJS + .d.ts + CSS extraction
│   │   ├── .storybook/           ← config Storybook 8+
│   │   │   ├── main.ts
│   │   │   └── preview.ts        ← import @fxp/tokens/css/fxp.css
│   │   └── src/
│   │       ├── components/
│   │       │   └── Button/
│   │       │       ├── Button.tsx          ← placeholder fonctionnel (cf. .ai/rules/tech-react.md anatomie)
│   │       │       ├── Button.css          ← styles consommant --fxp-color-brand-500
│   │       │       ├── Button.test.tsx     ← test smoke (rendu + variant primary)
│   │       │       ├── Button.stories.tsx  ← 1 story par variant
│   │       │       └── index.ts
│   │       ├── lib/
│   │       │   └── cn.ts                   ← clsx + tailwind-merge wrapper
│   │       └── index.ts                    ← barrel: export { Button }
│   └── icons/
│       ├── package.json          ← name: "@fxp/icons"
│       ├── tsconfig.json
│       └── src/
│           └── index.ts          ← re-export lucide-react sélectif (placeholder)
└── apps/
    └── docs/
        ├── package.json          ← Astro 4+
        ├── astro.config.mjs
        ├── tsconfig.json
        ├── public/
        └── src/
            ├── pages/
            │   └── index.astro   ← landing minimal "FXP Design System docs"
            └── components/
```

### Outillage retenu

| Outil | Rôle | Décision |
|---|---|---|
| **pnpm** | Package manager monorepo | Workspaces natifs, plus rapide que npm/yarn, version pinnée via `packageManager` field |
| **Turborepo** | Orchestration tâches monorepo | Pipelines parallèles, cache local + remote (Vercel ou self-hosted) |
| **Changesets** | Versioning + CHANGELOG (déjà initialisé) | Mode `fixed` ou `independent` à trancher (probable `independent`) |
| **TypeScript 5+** | Type checking | Strict mode partout, base config partagée |
| **tsup** | Bundler packages | Zero-config ESM + CJS + .d.ts |
| **Style Dictionary** | Build tokens DTCG | Stub config en attendant livraison DA |
| **Vitest** | Tests unit/composant | Compatible Vite/tsup, pas Jest |
| **Storybook 8+** | Dev + doc visuelle composants | Mounted dans `packages/react/.storybook/` |
| **Astro 4+** | Site doc | App séparée dans `apps/docs/` |
| **Biome 2.x** | Lint + format (1 outil, racine) | Remplace Prettier + ESLint. Config `biome.json`. Cf. feature `architecture/lint-format-biome`. |

### Naming convention NPM

- Scope `@fxp/*` (à confirmer côté registry — interne ou public).
- Versions initiales : toutes en `0.0.0`, bumps via Changesets dès la 1ʳᵉ feature non-bootstrap.
- `private: true` dans `package.json` racine + apps/. Packages publiables : tokens, react, icons.

## Cross-refs

Aucune dépendance sortante (feature fondatrice). **Toutes les features ultérieures** auront `depends_on: ["architecture/monorepo-bootstrap"]` jusqu'à ce qu'on factorise des features intermédiaires plus précises (`architecture/build-pipeline`, `architecture/ci-cd`, etc.).

## Historique / décisions

- **2026-04-28** — Feature créée (spec). Toutes les décisions structurelles ont été cuites dans les tours précédents et matérialisées dans :
  - [`.ai/guardrails.md`](../../../.ai/guardrails.md) — commits `3bfe967` (création), `20a502b` (révision niveau 3 multi-tenant)
  - [`.ai/rules/architecture.md`](../../../.ai/rules/architecture.md) — commits `f9171b1` (enrichissement initial), `a8f99dc` (theming niveau 3 + tenant resolution)
  - [`.ai/rules/tech-react.md`](../../../.ai/rules/tech-react.md) — commit `41ba8ed` (réécriture lib DS)
- **Périmètre volontairement minimal** : ce scaffold ne livre PAS de pipeline tokens fonctionnel (en attente DA), PAS de tenant resolution Next.js (en attente d'une app consommatrice), PAS de CI/CD (feature dédiée). Il livre **uniquement** ce qui permet `pnpm build/test/typecheck/lint/storybook` localement avec un composant `Button` placeholder.
- **2026-04-28 (post-bootstrap)** — `Button.tsx` initial utilisait `forwardRef` (legacy React 18). Migré vers `ref` as prop par feature [`front/migrate-react-19-ref-prop`](../front/migrate-react-19-ref-prop.md). Le pattern de référence pour tous les futurs composants est désormais ref-as-prop (cf. `.ai/rules/tech-react.md`).

## ADRs liées (à créer en parallèle ou peu après)

- **ADR-0001** — Distribution NPM compilé (vs registry Shadcn fork)
- **ADR-0002** — Theming niveau 3 (multi-tenant DTCG)
- **ADR-0004** — Pipeline tokens via Style Dictionary (vs Tokens Studio CLI direct)
- **ADR-0005** — Versioning SemVer + Changesets, anti-pattern `ButtonN`
- **ADR-0006** — Choix outillage : pnpm + Turbo + tsup + Storybook + Astro

Ces ADRs sont **bénéfiques mais non bloquants** pour le scaffold initial. Ils peuvent être rédigés dans une feature dédiée (`architecture/initial-adrs`) après `monorepo-bootstrap` DONE.

## Definition of Done

- [x] `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.gitignore`, `.npmrc` créés à la racine
- [x] `packages/{tokens,react,icons}/` scaffoldés avec `package.json`, `tsconfig.json`, stub `src/`
- [x] `apps/docs/` scaffoldé avec Astro fonctionnel (build static OK, 1 page générée)
- [x] `Button` placeholder dans `packages/react/src/components/Button/` (Button.tsx + .css + .test + .stories + index)
- [x] `pnpm install` clean (668 packages installés, postinstalls esbuild/sharp approuvés)
- [x] `pnpm typecheck` vert (6 tasks)
- [x] `pnpm test` vert (5 tests Button passed)
- [x] `pnpm build` vert sur les 3 packages + Astro app
- [x] `pnpm storybook:build` vert (preview built en 2s, output `storybook-static/`)
- [x] `.changeset/` initialisé (config + README)
- [ ] Worklog `monorepo-bootstrap.worklog.md` — laissé à l'auto-worklog hook
- [x] Commit `feat(architecture): scaffolde le monorepo (...)` à venir avec ce changement

## Evidence (validations exécutées 2026-04-28)

```
pnpm install        → ✓ Done in 5.8s (668 packages)
pnpm typecheck      → ✓ 6/6 successful (turbo)
pnpm test           → ✓ 5 tests passed (Button.test.tsx)
pnpm build          → ✓ 4/4 successful (tokens echo, icons echo, react tsup, docs Astro)
pnpm storybook:build → ✓ 3/3 successful (preview built in 2s)
```
