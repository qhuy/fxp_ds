---
id: ai-systematic-checklist
scope: architecture
title: Checklist systématique AI pour composants, tokens et multitenant
status: active
depends_on:
  - architecture/tokens-pipeline-bootstrap
  - front/button-primitive
  - front/playground-app
touches:
  - .ai/index.md
  - .ai/reminder.md
  - .ai/quality/QUALITY_GATE.md
  - .ai/rules/front.md
  - .ai/rules/architecture.md
progress:
  phase: implement
  step: "checklist transverse fusionnée dans QUALITY_GATE.md"
  blockers: []
  resume_hint: "Vérifier que les shims Claude/Codex continuent à pointer vers .ai/index.md."
  updated: 2026-04-28
---

# Checklist systématique AI

## Objectif

Capitaliser les oublis détectés pendant l'implémentation Button + tokens + playground multitenant dans un passage obligatoire commun à Claude, Codex et tout agent qui charge `.ai/index.md`.

## Comportement attendu

À chaque tâche, l'agent lit le Pack A puis passe par `.ai/quality/QUALITY_GATE.md`, section "Checklist systématique anti-oubli", avant de déclarer DONE.

La checklist couvre :

- Scope et feature mesh.
- Composants `@fxp/react` interactifs.
- Fiches composants front maintenues comme documents vivants, synchronisées avec API, dépendances, tokens, tests et stories.
- Tokens CSS vars, dark mode et tenant overrides.
- Contrat de livraison DA.
- Validations minimales avant DONE.

## Contrats

- `.ai/index.md` reste l'entrée unique.
- Les shims `AGENTS.md` et `CLAUDE.md` ne dupliquent pas les règles ; ils pointent vers `.ai/index.md`.
- La checklist est courte et transverse. Les détails restent dans les règles de scope.

## Cross-refs

- `architecture/tokens-pipeline-bootstrap` — pipeline tokens et contrat DA.
- `front/button-primitive` — cas concret qui a révélé les oublis events/states/tests/stories.
- `front/playground-app` — validation multitenant et import CSS consommateur.

## Historique / décisions

- **2026-04-28** — Création d'une checklist systématique commune Claude/Codex, chargée via Pack A, pour rendre répétables les contrôles composants/tokens/multitenant/docs/validation.
- **2026-04-28** — Fusion de la checklist dans `.ai/quality/QUALITY_GATE.md` pour conserver un seul point qualité obligatoire.
- **2026-04-28** — Renforcement du Quality Gate : toute modification d'un composant public doit relire et synchroniser sa fiche `.docs/features/front/<component-id>.md` avant DONE.

## Definition of Done

- [x] Checklist transverse intégrée dans `.ai/quality/QUALITY_GATE.md`.
- [x] `.ai/index.md` charge le quality gate unique dans le Pack A.
- [x] `.ai/reminder.md` rappelle le passage obligatoire.
- [x] Règles `front` et `architecture` référencent la checklist pour les sujets composants/tokens.
- [x] Les fiches composants front sont explicitement bloquantes dans le Quality Gate.
