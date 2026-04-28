---
id: ci-cd-pipeline
scope: architecture
title: CI/CD GitHub Actions (PR validation + release Changesets)
status: active
depends_on:
  - architecture/monorepo-bootstrap
  - architecture/lint-format-biome
  - architecture/turborepo-boundaries
  - architecture/dependabot
touches:
  - .github/workflows/ci.yml
  - .github/workflows/release.yml
  - .github/dependabot.yml
progress:
  phase: implement
  step: "audit P2.1 — exécution autopilot"
  blockers:
    - "Registry NPM non configuré (interne FXP via Verdaccio/JFrog/GitHub Packages, ou public npmjs) — release.yml utilise un placeholder; à finaliser quand le registry est tranché."
  resume_hint: "CI runs sur PR + push main. Release sur push main exécute changeset publish via NPM_TOKEN secret (à provisionner)."
  updated: 2026-04-28
---

# CI/CD pipeline

## Objectif

Audit P2.1 a flaggué l'absence de CI réelle (seul `.github/workflows/ai-context-check.yml` existe — généré par scaffold ai_context, audit feature mesh uniquement, pas le code JS).

Ajouter :
1. **CI** sur chaque PR + push main : lint, typecheck, test, build, storybook:build, turbo boundaries
2. **Release** sur push main : `changeset publish` automatique vers le registry FXP

## Comportement attendu

### Sur ouverture/maj d'une PR

1. Checkout
2. Setup Node 22+, pnpm 10
3. `pnpm install --frozen-lockfile`
4. `pnpm boundaries`
5. `pnpm lint`
6. `pnpm typecheck`
7. `pnpm test`
8. `pnpm build`
9. `pnpm storybook:build`

Échec d'une étape → PR bloquée (status check rouge).

### Sur push main

Si des fichiers `.changeset/*.md` non vides existent → `changeset publish` :
1. Bump versions (selon level dans changesets)
2. Génère CHANGELOG
3. Publie packages au registry NPM
4. Tag git + push tags

Sinon, simple no-op.

## Contrats

### `.github/workflows/ci.yml`

- Trigger : `pull_request`, `push` to `main`
- Cache : pnpm store + turbo cache (via `pnpm-lock.yaml` hash)
- Matrix Node : juste `22` pour l'instant (extension multi-versions plus tard si besoin)
- Concurrency : annule les runs précédents sur la même PR

### `.github/workflows/release.yml`

- Trigger : `push` to `main` uniquement
- Step `changesets/action@v1` (officiel) qui :
  - Si changesets pending → ouvre/met à jour PR "Version Packages"
  - Si version PR mergée → publie au registry
- `secrets.NPM_TOKEN` requis (à provisionner par admin du repo)
- `secrets.GITHUB_TOKEN` natif

### `.github/dependabot.yml` mise à jour

Ajouter ecosystem `github-actions` pour bumper les versions des actions tierces.

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit les scripts `pnpm <task>` câblés
- `architecture/lint-format-biome` — fournit `pnpm lint`
- `architecture/turborepo-boundaries` — fournit `pnpm boundaries`
- `architecture/dependabot` — sera enrichi (`github-actions` ecosystem)

## Historique / décisions

- **2026-04-28** — Audit P2.1 a flaggué l'absence de CI réelle. Décision : 2 workflows séparés (`ci.yml` + `release.yml`) plutôt qu'un mono-workflow (séparation responsabilités, déclencheurs distincts).
- **Blocker explicite** : registry NPM non tranché (cf. `.ai/rules/architecture.md` "Distribution"). `release.yml` utilise `NPM_TOKEN` placeholder — à provisionner et tester end-to-end après push origin.

## Definition of Done

- [x] `.github/workflows/ci.yml` créé (PR + push main, jobs : boundaries / lint / typecheck / test / build / storybook:build, artifact storybook upload)
- [x] `.github/workflows/release.yml` créé (push main, changesets/action@v1)
- [x] `.github/dependabot.yml` enrichi avec ecosystem `github-actions` (groupé patch/minor)
- [x] Validation locale YAML syntaxique (`python3 yaml.safe_load` OK sur les 3 fichiers)
- [x] Commit `feat(architecture): ci/cd pipeline (PR validation + release Changesets)` à venir
- [ ] (Post-push, hors scope local) Premier run CI vert sur la PR du push initial
- [ ] (Post-push) `NPM_TOKEN` secret provisionné par admin
- [ ] (Post-push) `registry-url` à fixer dans `release.yml` quand registry tranché

## Historique / suite

- **2026-04-28** — Implémenté : 2 workflows + dependabot enrichi. Validation YAML locale OK. Runtime test → post-push GitHub.
- **2026-04-28 (post Point #8)** — `ci.yml` enrichi par la feature `architecture/visual-regression-testing` : ajout étape `playwright install --with-deps chromium` + step `pnpm test:storybook` après le `pnpm test` unit. Le runner GitHub Actions doit installer Chromium (~150 Mo) avant chaque CI ; cache Playwright à envisager si CI devient lent.
