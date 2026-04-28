# Rules — architecture

Règles de structure, de layering et de décisions.

## Obligation feature (systématique)

Toute évolution structurelle qui introduit ou modifie un pattern, une couche, un contrat transverse **DOIT** avoir son fichier `.docs/features/architecture/<id>.md` avant DONE.
Squelette : `.docs/FEATURE_TEMPLATE.md`. Enforcement : `.githooks/commit-msg` sur `feat:`.

## Bloquants

- Feature doc architecture créée / à jour (contrats + Cross-refs vers les scopes impactés).
- Pas de dépendance circulaire entre modules.
- Layering respecté (ex : domain ne dépend pas de transport).
- Toute décision structurelle → ADR dans `.docs/adr/`.

## À éviter

- Nouvelles abstractions sans 3 cas d'usage concrets.
- Refactors hors scope de la tâche en cours.

> Enrichir avec les diagrammes de référence et les patterns imposés sur fanxp-design-system.
