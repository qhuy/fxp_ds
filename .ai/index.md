# AI Context Index — bobun-ds

> Bobun DS — design system personnel open source : composants React (bases Radix/Shadcn) + tokens DTCG, exposes via NPM (`@qhuy/react`, `@qhuy/tokens`). Site de doc Astro.

Entree unique des agents. Mode par defaut : **lean context**.

## Pack A — always load

Lire uniquement ceci au demarrage :

- Requete utilisateur.
- Ce fichier (`.ai/index.md`).
- `git status --short`.
- Fichiers d'implementation les plus proches, trouves par `rg` cible.

Invariants :
- Un scope primaire par tache. Cross-scope => `HANDOFF` explicite + confirmation.
- Ne charger que le contexte necessaire. Pas de docs/catalog/index/cache/logs/full diff par defaut.
- Avant `feat:` : une fiche `.docs/features/<scope>/<id>.md` doit etre creee ou mise a jour.
- Avant DONE : executer la delivery gate et mettre a jour les docs impactees.
- Commits en francais.

## Scope Routing

Ne charge `.ai/rules/<scope>.md` que si le scope est clair et utile a l'edition.
Si le scope est incertain, utiliser cette table puis charger **un seul** fichier de scope.

| Scope | Quand charger |
|---|---|
| `core` | Regles propres au scope `core` |
| `quality` | Regles qualite specifiques au projet, pres de DONE |
| `workflow` | Routage ou procedure si le flux est ambigu |
| `product` | Initiative, roadmap, decision produit, traceability |
| `back` | API, domaine, persistance, services backend |
| `front` | UI, routes frontend, etat client, design system |
| `architecture` | Structure transversale, contrats, ADR, migration |
| `security` | Auth, droits, secrets, donnees sensibles |
| `handoff` | Passage explicite entre scopes |

Regles tech a la demande :
- `.ai/rules/tech-react.md` seulement pour React/Next.

## On Demand

- Feature docs : charger seulement si l'intent ou les paths matchent une feature ; si un path est connu, preferer `bash .ai/scripts/features-for-path.sh <path> --with-docs` avant tout listing de dossiers.
- `depends_on` : suivre seulement les dependances necessaires a la decision ou a l'edition.
- Quality gate : charger `.ai/quality/QUALITY_GATE.md` ou `.ai/workflows/quality-gate.md` pres de DONE, ou tot pour taches risquees (contrat, doc canonique, securite, DB).
- Agent guidance : `.ai/agent/*` est optionnel, jamais Pack A.
- Guardrails projet : charger `.ai/guardrails.md` seulement pour cadrage produit, non-goals ou glossaire metier.
- Legacy/local rules : charger seulement le pointeur ou fichier local qui matche les paths touches.
- Catalogues, references, worklogs, changelogs, skills, indexes generes, caches et diffs complets : recherche ciblee uniquement.

## Exclusions

Pour la recuperation de contexte Codex, considerer on-demand seulement : `.claude/skills/**`, `.ai/docs/**`, `.ai/tests/**`, `docs/reference/**`, docs de migration, caches generes, logs/worklogs, diffs complets, larges listings recursifs. Detail : `.ai/context-ignore.md`.

## Identite du projet

Bobun DS remplace l'ancien cadrage FanXp. Les contrats techniques historiques `@qhuy/*`, `--fxp-*` et `.fxp-*` restent stables tant qu'aucune migration breaking dediee n'est validee.

## Source du template

Projet scaffolde depuis [`ai_context`](https://github.com/qhuy/ai_context). `copier update --vcs-ref=HEAD` remonte la derniere version GitHub.
