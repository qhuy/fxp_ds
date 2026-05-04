---
id: ai-context-template-integration
scope: architecture
title: Integration du template qhuy/ai_context
status: active
depends_on: []
touches:
  - .ai/context-ignore.md
  - .ai/index.md
  - .ai/quality/QUALITY_GATE.md
  - .ai/rules/core.md
  - .ai/rules/quality.md
  - .ai/rules/workflow.md
  - .ai/schema/feature.schema.json
  - .ai/scripts/ai-context.sh
  - .ai/scripts/check-feature-docs.sh
  - .ai/scripts/check-shims.sh
  - .ai/workflows/feature-done.md
  - .ai/workflows/feature-new.md
  - .ai/workflows/project-guardrails.md
  - .ai/workflows/quality-gate.md
  - .docs/FEATURE_TEMPLATE.md
  - .github/workflows/ai-context-check.yml
  - AGENTS.md
  - CLAUDE.md
  - README_AI_CONTEXT.md
  - .copier-answers.yml
  - .githooks/**
  - .github/workflows/ai-context-check.yml
touches_shared: []
product: {}
external_refs:
  github: https://github.com/qhuy/ai_context
doc:
  level: brief
  requires:
    auth: false
    data: false
    ux: false
    api_contract: false
    rollout: false
    observability: false
progress:
  phase: implement
  step: "template ai_context remonte vers HEAD 8c25f27 — check-feature-docs"
  blockers: []
  resume_hint: "Verifier les checks .ai apres update template. Garder les regles projet detaillees on-demand, pas dans Pack A."
  updated: "2026-05-04"
---

# Integration du template qhuy/ai_context

## Résumé

Bobun DS consomme `qhuy/ai_context` comme template Copier pour maintenir les shims agents, les hooks, les workflows `.ai` et les checks de feature mesh.

## Objectif

Tracer l'adoption locale du template `qhuy/ai_context` dans Bobun DS sans transformer ses fichiers generes en spec concurrente.

Cette feature couvre les surfaces de runtime qui relient le projet aux agents et aux checks de contexte IA : shims racine, hooks Git, workflow CI et metadata Copier.

## Décisions

- Les fichiers generes par `qhuy/ai_context` restent traites comme une integration template, pas comme une spec locale concurrente.
- Les updates upstream sont recuperees via Copier ou via une copie temporaire propre quand le worktree courant est sale.
- Les adaptations Bobun DS doivent rester compatibles avec une future mise a jour du template.

## Comportement attendu

Le repo garde une entree agent mince et stable :

- `AGENTS.md` et `CLAUDE.md` imposent la lecture de `.ai/index.md` sans dupliquer les regles projet.
- `README_AI_CONTEXT.md` explique le demarrage, les checks et la mise a jour depuis le template.
- `.githooks/` applique les garde-fous locaux, notamment le feature mesh au commit.
- `.github/workflows/ai-context-check.yml` verifie les shims, references IA et features en CI.
- `.copier-answers.yml` conserve la source template et le commit utilise pour permettre `copier update`.

## Contrats

- Les fichiers couverts viennent du template `qhuy/ai_context` ou de son integration locale.
- Les evolutions structurelles upstream doivent passer par `copier update --vcs-ref=HEAD` quand elles relevent du template.
- Les customisations locales doivent rester minimales, explicites et compatibles avec une prochaine update Copier.
- La source des regles projet reste `.ai/index.md` et ses fichiers canoniques ; les shims racine ne deviennent pas des sources de verite.

## Validation

- `bash .ai/scripts/check-shims.sh`
- `bash .ai/scripts/build-feature-index.sh --write`
- `bash .ai/scripts/check-features.sh`
- `bash .ai/scripts/check-ai-references.sh`
- `bash .ai/scripts/check-feature-docs.sh architecture/ai-context-template-integration --strict`

## Cross-refs

- `architecture/ai-systematic-checklist` — consomme les shims et le Quality Gate pour rendre les controles repetables.
- `architecture/project-readme` — expose le contexte Bobun DS aux humains ; `README_AI_CONTEXT.md` reste centre sur le runtime IA.

## Historique / décisions

- **2026-04-28** — Scaffold initial depuis `qhuy/ai_context`, avec shims agents, hooks Git et workflow `ai-context-check`.
- **2026-04-28** — Update du template vers `v0.11.0`.
- **2026-05-04** — Retro-documentation apres audit `discover architecture` : les fichiers runtime IA etaient orphelins du mesh architecture. Decision : creer une fiche d'integration template, pas une spec locale concurrente au projet upstream.
- **2026-05-04** — Recuperation du HEAD `qhuy/ai_context` (`ea1adac97f5f48e45339b845ccb91f467fe188fb`) : Pack A lean, nouveau `.ai/context-ignore.md`, `check-shims` renforce et `guardrails.md` garde en on-demand.
- **2026-05-04** — Recuperation du HEAD `qhuy/ai_context` (`8c25f271ab8fd80b0a68e236653a675dd5ac0438`) : ajout de `check-feature-docs.sh`, enrichissement du schema `doc.*`, du template feature et des workflows DONE/quality gate.

## Definition of Done

- [x] Les shims agents racine sont couverts par une fiche architecture.
- [x] Les hooks Git ai_context sont couverts par une fiche architecture.
- [x] Le workflow CI `ai-context-check` est couvert par une fiche architecture.
- [x] Le contrat de mise a jour via Copier est documente.
