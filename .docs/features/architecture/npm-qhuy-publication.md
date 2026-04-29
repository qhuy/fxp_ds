---
id: npm-qhuy-publication
scope: architecture
title: Publication NPM publique sous scope @qhuy
status: active
depends_on:
  - architecture/ci-cd-pipeline
  - architecture/tokens-pipeline-bootstrap
  - front/button-primitive
  - front/icons-package
touches:
  - package.json
  - pnpm-lock.yaml
  - .changeset/**
  - packages/*/package.json
  - packages/*/README.md
  - packages/icons/tsup.config.ts
  - apps/*/package.json
  - apps/**/*
  - .ai/**
  - .docs/**
  - docs/**
  - README.md
progress:
  phase: review
  step: "packages publies et README npm ajoutes"
  blockers: []
  resume_hint: "Verifier la publication README lors du prochain bump npm."
  updated: 2026-04-29
---

# Publication NPM publique sous scope @qhuy

## Objectif

Publier tous les packages du design system sous le scope npm personnel `@qhuy` :

- `@qhuy/react`
- `@qhuy/tokens`
- `@qhuy/icons`

Le scope `@fxp` reste une cible future possible si une organisation npm dédiée est créée. Les variables CSS restent en `--fxp-*`, car elles décrivent le contrat design system FanXP et ne sont pas liées au scope npm.

## Comportement attendu

Les apps consommatrices peuvent installer :

```bash
pnpm add @qhuy/react @qhuy/tokens @qhuy/icons
```

Et importer :

```ts
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
```

## Contrats

- Les packages publiables ne sont plus `private`.
- Les trois packages exposent `publishConfig.access = "public"`.
- `@qhuy/icons` est compilé dans `dist/` via `tsup`, même si son contenu est encore placeholder.
- `@qhuy/docs` et `@qhuy/playground` restent privés et ignorés par Changesets.
- Changesets publie en public.
- Les packages publics sont versionnés en `0.1.0` pour la première publication.

## Cross-refs

- `architecture/ci-cd-pipeline` — release Changesets et `NPM_TOKEN`.
- `architecture/tokens-pipeline-bootstrap` — package `@qhuy/tokens`.
- `front/button-primitive` — package `@qhuy/react`.
- `front/icons-package` — package `@qhuy/icons`.

## Historique / décisions

- **2026-04-29** — Décision utilisateur : publier sous scope `@qhuy` plutôt que réserver `@fxp` immédiatement.
- **2026-04-29** — Les packages `react`, `tokens`, `icons` sont rendus publiables en public. `icons` passe d'un placeholder source-only à un build `tsup` pour éviter de publier du TypeScript brut.
- **2026-04-29** — `pnpm version-packages` exécuté : `@qhuy/react`, `@qhuy/tokens`, `@qhuy/icons` passent en `0.1.0` et leurs `CHANGELOG.md` sont créés.
- **2026-04-29** — Publication npm effectuee pour les trois packages `0.1.0`.
- **2026-04-29** — README npm ajoutes dans chaque package public pour documenter installation, imports CSS, theming, API et limites.

## Definition of Done

- [x] Packages renommés en `@qhuy/*`.
- [x] Imports workspace et docs alignés.
- [x] `private` retiré des packages publiables.
- [x] `publishConfig.access = "public"` ajouté.
- [x] `@qhuy/icons` compilé via `tsup`.
- [x] Changeset initial consommé par `pnpm version-packages`.
- [x] Versions initiales `0.1.0` prêtes à publier.
- [x] Publication npm effectuée.
- [x] README npm ajoutés pour `@qhuy/react`, `@qhuy/tokens` et `@qhuy/icons`.
