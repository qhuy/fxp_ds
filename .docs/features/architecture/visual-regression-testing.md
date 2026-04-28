---
id: visual-regression-testing
scope: architecture
title: Tests Storybook built-in (interaction + a11y, base visual regression)
status: active
depends_on:
  - architecture/monorepo-bootstrap
  - front/upgrade-storybook-9
touches:
  - packages/react/package.json
  - packages/react/.storybook/**
  - packages/react/vitest.config.ts
  - packages/react/vitest.shims.d.ts
progress:
  phase: implement
  step: "audit P2.5 — exécution autopilot"
  blockers:
    - "Visual regression à proprement parler (snapshots pixel-diff hosted) → feature dédiée Chromatic OU Playwright-VRT à venir. Cette feature pose les fondations : interaction + a11y tests built-in via @storybook/addon-vitest + Playwright headless."
  resume_hint: "addon-vitest installé, smoke test sur Button stories. Visual snapshots = next step."
  updated: "2026-04-28"
---

# Tests Storybook built-in (visual regression P0)

## Objectif

Audit P2.5 a flaggué l'absence de régression visuelle obligatoire. SB10 propose `@storybook/addon-vitest` qui exécute chaque story comme test Vitest dans un navigateur Playwright headless → tests interaction + a11y automatiques.

Cette feature pose le **socle** :
- Chaque story devient un test (rendu OK + a11y OK)
- Lance les `play` functions (interaction)
- Catch les erreurs de rendu / accessibilité

Le **vrai visual diff pixel-perfect** (Chromatic snapshot service ou Playwright VRT screenshots) reste une feature ultérieure (`architecture/visual-snapshots-chromatic` ou `-playwright-vrt`).

## Comportement attendu

```bash
pnpm test:storybook  # Vitest + Playwright headless run sur toutes les stories
```

Pour le `Button` actuel (5 stories) :
- Chaque story rendue dans un browser Chromium headless
- Aucune erreur de console / rendu / a11y
- `play` functions exécutées si présentes

## Contrats

### Deps ajoutées (`@fxp/react`)

- `@storybook/addon-vitest` (intégration SB↔Vitest)
- `@vitest/browser` + `playwright` (browser testing infra)

### Config ajoutée

- `packages/react/.storybook/main.ts` : addon `@storybook/addon-vitest` enregistré
- `packages/react/vitest.config.ts` : `projects.storybook` avec `storybookTest()` plugin + browser Playwright Chromium headless
- `packages/react/.storybook/vitest.setup.ts` : setup Vitest pour Storybook

### Script ajouté

- `packages/react/package.json` : `"test:storybook": "vitest --project=storybook"`
- `package.json` racine : `"test:storybook": "turbo run test:storybook"`

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure
- `front/upgrade-storybook-9` — fournit SB10 (prérequis pour `addon-vitest`)
- À venir : `architecture/visual-snapshots-chromatic` (ou `-playwright-vrt`) — vrai pixel-diff hosted

## Historique / décisions

- **2026-04-28** — Audit P2.5 : décision d'utiliser le **built-in SB10** d'abord (zéro infra hosted), pixel-diff différé. Choix : `@storybook/addon-vitest` (nouvelle voie SB10) plutôt que `@storybook/test-runner` (legacy).

## Definition of Done

- [x] `pnpm dlx storybook@latest add @storybook/addon-vitest --yes` exécuté (auto-config)
- [x] Vitest 2 → 3 + Vite 5 → 6 (prérequis addon-vitest) — bump cohérent (déjà cataloged à part)
- [x] `playwright` ajouté à `pnpm.onlyBuiltDependencies` racine (pour autoriser postinstall)
- [x] Binaire Chromium installé via `pnpm --filter @fxp/react exec playwright install chromium`
- [x] `vitest.config.ts` réécrit en `projects[]` (project `unit` happy-dom + project `storybook` Playwright Chromium headless)
- [x] `.storybook/main.ts` enregistre `@storybook/addon-vitest`
- [x] Script `test:storybook` câblé : `package.json` racine + `@fxp/react` ; turbo task `test:storybook` (dependsOn ^build)
- [x] `pnpm test:storybook` vert : 5/5 stories Button passées en chromium headless
- [x] `pnpm test` (unit Vitest) toujours vert : 5/5
- [x] `pnpm typecheck` (6/6) + `pnpm build` (4/4) + `pnpm lint` (clean, 1 warning toléré) + `pnpm boundaries` toujours verts
- [x] CI workflow `.github/workflows/ci.yml` enrichi : étape `playwright install --with-deps chromium` + `pnpm test:storybook` (cf. feature `architecture/ci-cd-pipeline`)
- [x] Commit `feat(architecture): tests Storybook built-in (interaction + a11y via addon-vitest)` à venir

## Suite (post-implem)

- **2026-04-28** — Implémenté : socle de visual regression posé via SB10 `@storybook/addon-vitest`. Chaque story devient un test Vitest qui s'exécute dans Chromium headless via Playwright. Fonctionnalités built-in actives : interaction (`play` functions), a11y (warnings axe-core), rendu sans erreur. Pixel-diff hosted (Chromatic snapshot service ou Playwright VRT screenshots) reste une feature ultérieure dédiée.
