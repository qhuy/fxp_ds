# Worklog — architecture/ai-context-template-integration

## 2026-05-04 — creation
- Feature creee via `.ai/workflows/feature-new.md`
- Scope : architecture
- Intent initial : Integration du template qhuy/ai_context

## 2026-05-04 — update template
- Recuperation du HEAD `qhuy/ai_context` : `ea1adac97f5f48e45339b845ccb91f467fe188fb`
- Pack A bascule en lean context.
- Ajout de `.ai/context-ignore.md`.
- `check-shims.sh` verifie maintenant que Pack A reste lean.
- `project-guardrails.md` conserve `guardrails.md` en on-demand.

## 2026-05-04 — update template
- Recuperation du HEAD `qhuy/ai_context` : `8c25f271ab8fd80b0a68e236653a675dd5ac0438`
- Ajout de `.ai/scripts/check-feature-docs.sh`.
- Ajout du champ frontmatter `doc.*` dans le schema et le template feature.
- Les workflows `feature-new`, `feature-done` et `quality-gate` integrent le check documentaire.
