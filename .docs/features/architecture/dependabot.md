---
id: dependabot
scope: architecture
title: Dependabot — automation bumps deps groupés par catégorie
status: active
depends_on:
  - architecture/monorepo-bootstrap
touches:
  - .github/dependabot.yml
progress:
  phase: implement
  step: "audit P2.6 — exécution autopilot"
  blockers: []
  resume_hint: "Dependabot config en place. Première PR auto à attendre dans 24h après push origin."
  updated: "2026-04-28"
---

# Dependabot

## Objectif

Audit P2.6 a relevé l'absence d'automation des updates de dépendances. Sans cela : dérive deps inéluctable, vulnérabilités non patchées, dette croissante.

**Dependabot** (GitHub-natif, gratuit) ouvre des PRs automatiques pour bumps de versions. Groupé par catégorie pour réduire le bruit (1 PR « React stack » plutôt que 5 PRs séparés).

## Comportement attendu

Une fois pushé sur GitHub :
- Scan hebdomadaire des deps (`schedule.interval: weekly`)
- Ouverture de PRs groupées :
  - **react-stack** : `react`, `react-dom`, `@types/react*`
  - **storybook** : `storybook`, `@storybook/*`
  - **testing** : `vitest`, `@testing-library/*`, `happy-dom`
  - **build-tooling** : `tsup`, `vite`, `turbo`, `@biomejs/biome`, `typescript`, `@types/node`
  - **radix** : `@radix-ui/*`
  - **changesets** : `@changesets/*`
- Major bumps : 1 PR séparée par dep majeure (review humaine obligatoire)
- Patch/minor : groupés dans la PR catégorielle correspondante

## Contrats

### `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      react-stack: [react, react-dom, "@types/react", "@types/react-dom"]
      storybook: ["storybook", "@storybook/*"]
      ...
    open-pull-requests-limit: 5
    labels: ["deps", "automated"]
```

- `directory: /` couvre le workspace pnpm via auto-detection
- `package-ecosystem: github-actions` ajouté plus tard quand on aura des workflows (Point #4 — CI/CD)

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit le `package.json` racine + workspace structure
- À venir : `architecture/ci-cd-pipeline` (Point #4) — ajoutera l'écosystème `github-actions` à Dependabot

## Historique / décisions

- **2026-04-28** — Audit P2.6 a flaggué l'absence d'automation. Décision : Dependabot natif GitHub plutôt que Renovate (zéro infra à gérer, suffisant pour notre volume).
- **2026-04-28** — Implémenté : `.github/dependabot.yml` créé avec 8 groups (`react-stack`, `storybook`, `testing`, `build-tooling`, `radix`, `changesets`, `astro`, `component-utils`). Stratégie : minor/patch groupés (1 PR/sem/groupe), majors PR séparées par dep (revue humaine obligatoire) via `update-types: [minor, patch]` sur chaque groupe. `package-ecosystem: github-actions` reporté à la feature CI/CD pipeline (Point #4 audit).

## Definition of Done

- [x] `.github/dependabot.yml` créé avec 8 groups par catégorie
- [x] Stratégie minor/patch groupés vs majors séparés (via `update-types` per groupe)
- [x] Commit `feat(architecture): dependabot (bumps groupés hebdomadaires)` à venir
- [ ] (Post-push, hors scope local) Première PR auto sous 24h après push origin
- [ ] (Future) `package-ecosystem: github-actions` ajouté quand workflows CI créés (cf. feature CI/CD à venir)
