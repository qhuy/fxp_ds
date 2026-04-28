---
id: project-readme
scope: architecture
title: README racine opérationnel pour DA, devs et agents IA
status: active
depends_on:
  - architecture/ai-systematic-checklist
  - architecture/tokens-pipeline-bootstrap
  - front/button-primitive
  - front/playground-app
touches:
  - README.md
progress:
  phase: implement
  step: "README racine créé"
  blockers: []
  resume_hint: "Maintenir le README racine comme porte d'entrée humaine ; les sous-docs restent des références."
  updated: 2026-04-28
---

# README racine opérationnel

## Objectif

Créer une porte d'entrée visible à la racine pour les DA, devs design system, devs applications consommatrices et agents IA.

Les documents profonds restent utiles comme références, mais le README racine doit expliquer quoi faire sans obliger à explorer `.ai/`, `.docs/` ou `packages/tokens/src/`.

## Comportement attendu

Une personne qui lit `README.md` comprend :

- Ce que produit le repo.
- Ce que la DA doit fournir.
- Ce que les devs design system doivent faire.
- Ce que les devs consommateurs doivent importer et ne pas surcharger.
- Ce que les agents IA doivent charger avant d'agir.
- Quelles commandes lancer pour développer et valider.
- Quels critères bloquent le DONE.

## Contrats

- Le README racine est une synthèse opérationnelle, pas la source exhaustive de toutes les règles.
- Les règles bloquantes restent dans `.ai/quality/QUALITY_GATE.md`.
- Les détails tokens DA restent dans `packages/tokens/src/README.md`.
- Les décisions d'architecture restent dans `.ai/rules/architecture.md` et les futures ADR.

## Cross-refs

- `architecture/ai-systematic-checklist` — qualité et checklist anti-oubli.
- `architecture/tokens-pipeline-bootstrap` — contrat tokens et DA.
- `front/button-primitive` — exemple de composant public complet.
- `front/playground-app` — validation multitenant.

## Historique / décisions

- **2026-04-28** — Création d'un README racine opérationnel pour éviter que les consignes importantes restent cachées dans les sous-répertoires.

## Definition of Done

- [x] `README.md` créé à la racine.
- [x] Instructions DA explicites.
- [x] Instructions dev design system explicites.
- [x] Instructions dev app consommatrice explicites.
- [x] Instructions agents IA explicites.
- [x] Commandes et critères DONE listés.
