# CLAUDE.md — bobun-ds

> **Tu DOIS lire [`.ai/index.md`](.ai/index.md) avant toute action.**

Shim lean. Les hooks/skills Claude restent disponibles via `.claude/`, mais ils ne
sont pas du contexte obligatoire pour Codex ni pour les autres agents.

Hard rules :
- Un scope primaire par tache ; cross-scope => HANDOFF explicite.
- Contexte juste-a-temps ; pas de catalogues, worklogs, full diffs par defaut.
- Avant `feat:` : fiche feature sous `.docs/features/`.
- Avant DONE : quality gate + docs impactees.
- Commits en francais.

Configuration Claude Code : `.claude/settings.json`.
