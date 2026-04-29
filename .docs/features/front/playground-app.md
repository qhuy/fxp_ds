---
id: playground-app
scope: front
title: apps/playground — consumer Next.js pour tester @qhuy/react localement
status: active
depends_on:
  - architecture/monorepo-bootstrap
  - front/button-primitive
  - front/spinner-primitive
touches:
  - apps/playground/**
  - turbo.json
progress:
  phase: implement
  step: "scaffold Next.js minimal — consomme @qhuy/react via workspace:* pour valider le DX import"
  blockers: []
  resume_hint: "Permet de tester le DX consumer avant que le registry NPM ne soit tranché. Itérer ici pour valider chaque nouveau composant primitif."
  updated: "2026-04-28"
---

# apps/playground — consumer Next.js

## Objectif

Débloquer le test concret du DX consumer **sans dépendre d'un registry NPM** (qui n'est pas encore tranché — cf. blocker P2 du Button DOD Niv. 2 et `architecture/ci-cd-pipeline` blockers).

L'app `apps/playground/` :
- Consomme `@qhuy/react` via `workspace:*` (pnpm symlink interne au monorepo)
- Importe les CSS tokens (`@qhuy/tokens/css/fxp.css`)
- Charge un CSS tenant dynamique (`public/_fxp/tenants/<tenant>.css`) et pose `data-tenant` sur `<html>`
- Présente un terrain de jeu de chaque composant primitif livré (actuellement Button + Spinner)
- Sert de **preuve visuelle** que le packaging exposé fonctionne dans un vrai consumer Next.js (App Router + RSC + `"use client"`)

Reste **strictement interne au monorepo** — pas publié, pas accessible aux apps consommatrices externes (qui devront passer par le registry une fois celui-ci tranché).

## Comportement attendu

```bash
pnpm --filter @qhuy/playground dev    # → http://localhost:3000 avec preview Button + Spinner
pnpm --filter @qhuy/playground build  # → build static / SSR Next.js
```

Multitenant local :
- Tenant par défaut : `acme`
- Cookie `fxp-tenant` lu dans `app/layout.tsx`
- CSS tenant injecté en SSR via `<link rel="stylesheet" href="/_fxp/tenants/{tenant}.css">`
- `<html data-tenant="{tenant}">` active le scope CSS tenant
- Le sélecteur sur la page écrit le cookie puis recharge pour simuler une résolution serveur réelle

Cas testés visuellement :
- Tous les variants Button (primary, secondary, outline, destructive, ghost, link)
- Toutes les tailles (xs, sm, md, lg, icon)
- States (disabled, loading)
- Slots iconLeft / iconRight
- asChild composition
- Spinner standalone (sm, md, lg, custom label)
- Changement de tenant (`acme`, `stadium`, `nova`) avec couleurs/radius propres

## Contrats

### Stack

- **Next.js 15+** (App Router par défaut)
- **React 19** (via catalog)
- **TypeScript strict** (extends `tsconfig.base.json`)
- Pas de Tailwind côté playground (test la consommation pure CSS de FXP)
- Pas de tests automatisés ici (les tests vivent dans `@qhuy/react`)

### Structure

```
apps/playground/
├── package.json          ← name: "@qhuy/playground", deps: workspace:* + next/react/react-dom
├── next.config.mjs
├── tsconfig.json         ← extends tsconfig.base.json + Next.js conventions
├── turbo.json            ← tag app-layer (cohérent avec apps/docs)
├── app/                  ← App Router Next.js
│   ├── tenant-config.ts  ← tenants autorisés + default
│   ├── layout.tsx        ← import @qhuy/tokens/css + html data-theme/data-tenant + CSS tenant
│   ├── globals.css       ← reset minimal + styles playground
│   └── page.tsx          ← terrain de jeu Button + Spinner + switch tenant ("use client")
└── public/_fxp/tenants/  ← CSS tenants statiques
    ├── acme.css
    ├── stadium.css
    └── nova.css
```

### Dépendances Turbo

Tag `app-layer` (cohérent avec `apps/docs`). Peut consommer `@qhuy/react` (`components-layer`), `@qhuy/tokens` (`tokens-layer`), `@qhuy/icons` (`icons-layer`). Aucune dépendance inverse autorisée.

### Cohérence avec layering existant

Le Turbo `boundaries.tags` actuel autorise `app-layer` → `*-layer` (sans restriction sortante). `apps/playground` rentre exactement dans le même slot que `apps/docs`.

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure pnpm workspaces
- `front/button-primitive` — composant principal présenté
- `front/spinner-primitive` — composant secondaire présenté
- À venir : pour chaque nouveau composant primitif livré, on ajoute une section dans `app/page.tsx`

## Historique / décisions

- **2026-04-28** — Créé pour débloquer le test concret du DX consumer **sans attendre la décision registry NPM**. Choix Next.js (vs Vite simple) : représente le 1ᵉʳ cas d'usage des apps FXP consommatrices (App Router + RSC + `"use client"`). Pas de Tailwind volontairement — vérifie que les apps non-Tailwind consomment proprement.
- **2026-04-28** — Alignement lint/format : formatage Biome appliqué sur `layout.tsx`, `page.tsx` et `tsconfig.json`; override Biome global ajouté pour respecter les default exports requis par Next App Router.
- **2026-04-28** — Multitenant local implémenté : `layout.tsx` lit le cookie `fxp-tenant`, whitelist via `tenant-config.ts`, pose `data-tenant` sur `<html>` et injecte le CSS tenant depuis `public/_fxp/tenants`. La page expose un sélecteur qui persiste le tenant et recharge pour tester le flux SSR.

## Definition of Done

- [ ] `apps/playground/package.json` créé (deps Next.js 15 + React 19 catalog + workspace:* deps)
- [ ] `next.config.mjs` minimal
- [ ] `tsconfig.json` extends base
- [ ] `apps/playground/turbo.json` avec tag `app-layer`
- [ ] `app/layout.tsx` avec import CSS tokens FXP + lang fr
- [ ] `app/page.tsx` avec usage de chaque variant/taille/state Button + Spinner
- [x] `public/_fxp/tenants/{acme,stadium,nova}.css` avec overrides `--fxp-*`
- [x] Résolution tenant par cookie + `data-tenant` SSR
- [x] Sélecteur tenant dans le playground
- [ ] `pnpm install` clean
- [x] `pnpm --filter @qhuy/playground build` vert
- [x] `pnpm boundaries` toujours vert (51 files)
- [x] `pnpm lint` toujours clean
- [ ] Commit `feat(front): crée apps/playground (Next.js consumer pour tester @qhuy/react)`
- [ ] (Manuel post-commit) `pnpm --filter @qhuy/playground dev` boot et affiche les composants
