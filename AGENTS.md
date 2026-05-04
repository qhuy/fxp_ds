# AGENTS.md — bobun-ds

> **Tu DOIS lire [`.ai/index.md`](.ai/index.md) avant toute action.**

Shim lean Codex : ne charge pas `.ai/quality/QUALITY_GATE.md`, `.ai/agent/*`,
catalogues, references, worklogs, skills, indexes ou full diffs au demarrage.

Hard rules :
- Un scope primaire par tache ; cross-scope => HANDOFF explicite.
- Contexte juste-a-temps ; recherche ciblee avec `rg`.
- Avant `feat:` : fiche feature sous `.docs/features/`.
- Avant DONE : quality gate + docs impactees.
- Commits en francais.

Source unique : `.ai/`.
