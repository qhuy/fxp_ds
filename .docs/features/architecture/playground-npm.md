---
id: playground-npm
scope: architecture
title: Playground consommateur NPM
status: active
depends_on:
  - architecture/npm-qhuy-publication
touches:
  - apps/playground_npm/**
  - pnpm-lock.yaml
progress:
  phase: implement
  step: "Playground Next.js duplique pour verifier les packages publies"
  blockers: []
  resume_hint: "Verifier que apps/playground_npm consomme les tarballs npm @qhuy/* et build sans workspace:*"
  updated: "2026-04-29"
---

# Playground consommateur NPM

## Objectif

Ajouter une app de verification qui consomme les packages publies sur npm, sans utiliser les liens workspace du monorepo.

Elle sert de smoke test cote consommateur reel apres publication de `@qhuy/react`, `@qhuy/tokens` et `@qhuy/icons`.

## Comportement attendu

- `apps/playground` reste le terrain de jeu local base sur `workspace:*`.
- `apps/playground_npm` reprend la meme interface mais installe les packages depuis le registry npm publie.
- Le build Next.js doit valider les imports publics :
  - `@qhuy/react`
  - `@qhuy/icons`
  - `@qhuy/react/styles.css`
  - `@qhuy/tokens/css/fxp.css`
  - `@qhuy/tokens/css/fxp.dark.css`
- Les themes tenants doivent continuer a fonctionner via les CSS vars `--fxp-*`.

## Contrats

- App workspace privee : `@qhuy/playground-npm`.
- Dependances DS consommees depuis npm publie, pas via `workspace:*` : `@qhuy/react`, `@qhuy/tokens`, `@qhuy/icons`.
- Aucun package DS local ne doit etre requis pour executer ce playground comme app consommatrice.

## Cross-refs

- `architecture/npm-qhuy-publication` : source des versions npm publiees consommees par ce playground.

## Historique / decisions

- 2026-04-29 : Creation du playground npm pour verifier les packages publies `@qhuy/*` dans un contexte Next.js consommateur, y compris `@qhuy/icons` avant son alimentation fonctionnelle.
