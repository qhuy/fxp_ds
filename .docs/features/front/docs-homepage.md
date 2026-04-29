---
id: docs-homepage
scope: front
title: Page d'accueil Astro exploitable
status: active
depends_on:
  - architecture/project-readme
  - front/button-primitive
touches:
  - apps/docs/src/pages/index.astro
  - apps/docs/public/examples/da/**
progress:
  phase: implement
  step: "page d'accueil enrichie avec kit DA téléchargeable"
  blockers: []
  resume_hint: "Ajouter ensuite des pages composant dédiées si besoin, notamment Button."
  updated: 2026-04-28
---

# Page d'accueil Astro exploitable

## Objectif

Remplacer le placeholder Astro par une page d'accueil utile pour comprendre le design system sans ouvrir les sous-dossiers.

## Comportement attendu

La page `http://localhost:4321/` affiche :

- Positionnement du design system.
- Instructions synthétiques par profil : DA, dev DS, dev app.
- Aperçu visuel du Button rendu avec les CSS réels `@fxp/react` et `@fxp/tokens`.
- Commandes utiles pour docs, Storybook et validation.
- Kit DA téléchargeable : exemple tokens DTCG, brief tenant, checklist livraison.

## Contrats

- Astro reste statique.
- La page importe `@fxp/react/styles.css`, `@fxp/tokens/css/fxp.css` et `@fxp/tokens/css/fxp.dark.css`.
- L'aperçu Button est une preview visuelle de docs ; Storybook reste la source interactive complète.
- Les fichiers d'exemple DA sont servis depuis `apps/docs/public/examples/da/`.

## Cross-refs

- `architecture/project-readme` — source de synthèse projet.
- `front/button-primitive` — primitive affichée dans la preview.

## Historique / décisions

- **2026-04-28** — Le placeholder Astro donnait l'impression d'une page vide. Remplacement par une vraie page d'accueil docs avec aperçu Button et workflows par profil.
- **2026-04-28** — Amélioration visuelle de la page et ajout d'un kit DA téléchargeable (`tenant-tokens.example.json`, `brief-tenant.md`, `checklist-livraison-da.md`).

## Definition of Done

- [x] `apps/docs/src/pages/index.astro` affiche une page lisible.
- [x] CSS `@fxp/react` et tokens importés.
- [x] Aperçu Button visible.
- [x] Kit DA téléchargeable visible.
- [x] Fiche feature créée.
