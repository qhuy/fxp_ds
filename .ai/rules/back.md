# Rules — back

Règles pour le code backend de fanxp-design-system.

## Obligation feature (systématique)

Toute feature back **DOIT** avoir son fichier `.docs/features/back/<id>.md` avant DONE.
Squelette : `.docs/FEATURE_TEMPLATE.md`. Enforcement : `.githooks/commit-msg` sur `feat:`.

## Bloquants avant DONE

- Feature doc back créée / à jour (frontmatter + Contrats + Cross-refs).
- Validation des entrées (paramètres, body, query).
- Requêtes SQL paramétrées (jamais de concaténation).
- Transactions explicites pour les écritures multi-tables.
- Tests d'intégration sur le happy path + 1 edge case.

## À éviter

- Logique métier dans les contrôleurs / transports — déporter dans la couche use-case ou service.
- Exceptions silencieuses. Toujours wrap + log + rethrow ciblé.

> Enrichir avec la stack concrète (framework, ORM, conventions de nommage).
