# Context Retrieval Exclusions — bobun-ds

Ces chemins ne sont jamais charges par defaut. Les ouvrir seulement sur demande
explicite ou par recherche ciblee liee a la tache.

## Never Default-Load

- `.claude/skills/**`
- `.ai/docs/**`
- `.ai/tests/**`
- `docs/reference/**`
- `.docs/reference/**`
- docs de migration et changelogs
- caches et index generes : `.ai/.feature-index.json`, `.ai/.progress-history.jsonl`
- logs et worklogs
- full diffs, gros listings recursifs, sorties de build volumineuses

## Retrieval Policy

- Commencer par la requete utilisateur, `.ai/index.md`, `git status --short`, puis `rg` cible.
- Charger une seule regle de scope sauf HANDOFF confirme.
- Charger `.ai/quality/QUALITY_GATE.md` pres de DONE, ou tot seulement si la tache est risquee.
- Charger les regles legacy/locales uniquement si leur glob ou leur chemin matche les fichiers touches.
