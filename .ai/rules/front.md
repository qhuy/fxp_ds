# Rules — front

Règles pour le code frontend de fanxp-design-system.

## Obligation feature (systématique)

Toute feature front **DOIT** avoir son fichier `.docs/features/front/<id>.md` avant DONE.
Si la feature consomme une API back, lister la dépendance : `depends_on: ["back/<id>"]`.
Squelette : `.docs/FEATURE_TEMPLATE.md`. Enforcement : `.githooks/commit-msg` sur `feat:`.

## Bloquants avant DONE

- Checklist transverse `.ai/quality/QUALITY_GATE.md#checklist-systématique-anti-oubli` passée, en particulier les sections composant `@qhuy/react`, événements, Storybook, tokens et multitenant.
- Feature doc front créée / à jour, avec `depends_on` vers back/security si applicable.
- Build + typecheck verts.
- États loading / error / empty gérés explicitement.
- Accessibilité (labels, aria, contraste) respectée.
- Imports absolus plutôt que chaînes relatives profondes.

## Composants `@qhuy/react`

Tout composant public interactif doit vérifier explicitement :

- Fiche `.docs/features/front/<component-id>.md` synchronisée avec l'état courant du code, des dépendances, des tests, des stories et des tokens.
- Props natives React pass-through (`onClick`, hover, focus/blur si pertinent).
- États visuels et ARIA attendus (`disabled`, `loading`, `focus-visible`, `active`, `aria-invalid`, `aria-expanded` selon le composant).
- Navigation clavier et activation clavier.
- Stories couvrant variants, tailles, états et actions Storybook utiles.
- Tests unitaires et tests Storybook alignés avec les compteurs documentés.

## À éviter

- État serveur dupliqué dans l'état client — une source unique de vérité.
- Styles en ligne / classes magiques hors du design system.

> Enrichir avec la stack concrète (framework, state management, DS).
