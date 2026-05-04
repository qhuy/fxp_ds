# Quality Gate — bobun-ds

Critères **BLOQUANTS** avant de déclarer une tâche DONE. À lire avec `.ai/index.md`.

Ce fichier est le point qualité unique : evidence, feature mesh, commits et checklist anti-oubli.

## Evidence (obligatoire)

Avant DONE, fournir :

1. **Diff ciblé** des fichiers touchés (pas de `git diff` complet).
2. **Build** vert (commande locale + nom).
3. **Tests** passés sur le périmètre touché (commande + résultat).
4. **Lint / format** OK si le projet en a.

## Risk Ledger (par tâche non triviale)

Lister explicitement :

- Changements breaking ?
- Migrations de données / schéma ?
- Impact sur la sécurité / auth / tenancy ?
- Compatibilité arrière cassée ?

Si une case est cochée → confirmation utilisateur avant merge.

## Doc Impact Decision (obligatoire)

Avant DONE, déclarer l'une des décisions suivantes :

- **A — Aucun impact doc** : changement interne sans effet comportemental, justifié en une ligne.
- **B — Worklog seulement** : avancement, fix mineur ou décision locale sans changement de contrat.
- **C — Fiche feature mise à jour** : comportement, contrat, dépendance, scope, permission, API, UX ou règle métier modifiée.

Si la décision est **C**, la fiche feature concernée doit être modifiée dans le même changement. Si un fichier couvert par `touches:` est modifié, le hook `commit-msg` bloque le commit tant que la fiche feature ou son worklog associé n'est pas staged.

## Checklist systématique anti-oubli

À passer avant d'annoncer qu'une tâche est terminée. Cette checklist complète les règles de scope sans les remplacer.

### Scope et docs

- Scope primaire identifié (`front`, `architecture`, `security`, etc.).
- Feature `.docs/features/<scope>/<id>.md` créée ou mise à jour si le comportement change.
- Historique et compteurs mis à jour quand les tests/stories évoluent.
- Les anciennes valeurs restent uniquement si elles sont explicitement marquées comme historiques.

### Composant `@qhuy/react`

Pour tout composant public :

- Fiche `.docs/features/front/<component-id>.md` relue et synchronisée avec le code avant DONE.
- Frontmatter `depends_on` synchronisé avec les dépendances réelles du composant, sans cycle.
- Sections `État courant`, `Contrats`, `Accessibilité`, `Historique` et `Definition of Done` mises à jour si l'API, le style, les tokens, les tests ou les stories changent.
- API React 19 typée, avec `ref` prop si pertinent.
- Props natives React pass-through vérifiées (`onClick`, hover, focus/blur si interactif).
- États couverts : `disabled`, `loading` si applicable, `focus-visible`, `active`, `aria-invalid`, `aria-expanded` si pertinent.
- Accessibilité clavier couverte : Tab, Enter, Space pour les composants actionnables.
- Storybook expose les variants, tailles, états et actions utiles.
- Tests unitaires et tests Storybook reflètent l'état courant.
- `docs/design-system-registry.md` mis à jour si composant ajouté ou enrichi.

### Tokens, CSS et theming

- Aucun style public n'utilise de valeur arbitraire si un token `--fxp-*` doit exister.
- Les nouveaux styles passent par `packages/tokens/src/tokens.json` quand ils relèvent du design system.
- CSS light, dark et tenant restent cohérents si la variable est themable.
- L'app consommatrice importe les CSS requis dans l'ordre :
  1. `@qhuy/react/styles.css`
  2. `@qhuy/tokens/css/fxp.css`
  3. `@qhuy/tokens/css/fxp.dark.css`
  4. CSS tenant éventuel

### Multitenant

- Le composant ne connaît pas les tenants en code React.
- Les différences tenant passent par des overrides de CSS vars.
- Le playground vérifie au moins un tenant non-default si la tâche touche les styles, tokens ou thèmes.

### Contrat DA

Si la tâche touche les tokens ou un thème, vérifier que la documentation précise ce que la DA doit fournir :

- Tokens DTCG ou mapping explicite vers tokens.
- Valeurs light/dark si concernées.
- Overrides tenant si concernées.
- États composant : default, hover, active, focus, disabled, invalid, loading.

### Validation avant DONE

Exécuter le minimum pertinent :

- `pnpm lint`
- `pnpm typecheck` si TS/API touchée.
- Tests unitaires ciblés.
- `pnpm test:storybook` si stories ou rendu composant changent.
- Checks `.ai` : `check-ai-references`, `check-features`, et `check-feature-coverage` si documentation/feature mesh modifiés.

Ne pas annoncer "terminé" si une validation pertinente n'a pas été exécutée ou si son résultat n'est pas explicité.

## Feature mesh (BLOQUANT — aucune dérogation)

**Toute** tâche qui ajoute ou modifie du comportement **DOIT** créer / mettre à jour un fichier feature sous `.docs/features/<scope>/<id>.md`.

- Un fichier par feature, nommé par `id` stable (ex : `authz-tenant-guard.md`).
- Rangé dans le dossier du **scope** qui l'implémente (`back/`, `front/`, `architecture/`, `security/`).
- Frontmatter YAML complet : voir `.docs/FEATURE_TEMPLATE.md`.
- Cross-refs obligatoires si la feature dépend d'une autre (`depends_on: ["back/foo", "security/bar"]`).

Cette règle est **systématique** — pas de seuil de complexité, pas de "trop petit pour documenter". Le maillage ne devient puissant que s'il est complet.

## Fraîcheur documentaire (BLOQUANT au commit)

- `bash .ai/scripts/check-feature-freshness.sh --staged --strict` vérifie qu'un changement staged sur du code couvert par `touches:` inclut aussi la fiche feature ou son worklog.
- `bash .ai/scripts/check-feature-freshness.sh --warn` signale les features dont le code couvert est plus récent que la documentation.
- `bash .ai/scripts/check-feature-docs.sh` signale les sections manquantes ou trop vides ; `--strict` est à utiliser avant DONE sur les features nouvelles ou risquées.
- En CI, le mode `--warn` reste informatif pour éviter les faux positifs sur l'historique importé ; le blocage strict se fait au commit.

## Commits — Conventional Commits (BLOQUANT)

Tous les commits respectent le format :

```
<type>[(scope)][!]: <description>
```

Types autorisés : `feat`, `fix`, `refactor`, `chore`, `test`, `docs`, `style`, `perf`, `ci`, `build`, `revert`.

Règles :

- **`feat:`** → oblige à toucher un fichier `.docs/features/<scope>/*.md` dans le même commit. Bloqué par `.githooks/commit-msg`.
- **`fix:` / `refactor:`** sur du code de feature → mettre à jour la section **Historique** du fichier feature concerné.
- Tout autre type (`chore`, `docs`, `test`, ...) → pas d'obligation feature, mais le type doit refléter la nature réelle du commit.

Pas de "skip doc" implicite : si tu hésites entre `feat` et `refactor`, c'est probablement `feat`.

## Scope checklist (par scope)

| Scope | Items bloquants |
|---|---|
| core | Pack A chargé, HANDOFF clair si cross-scope |
| quality | Evidence + feature mesh + Conventional Commits |
| workflow | Commits fr, pas de full diff |
| product | Initiative produit liée aux features dev via `product.initiative`, décision suivante explicite |
| back | Feature doc sous `.docs/features/back/` à jour, validation paramètres, injection SQL, transactions, tests d'intégration |
| front | Feature doc sous `.docs/features/front/` à jour (avec `depends_on` vers back si applicable), build/typecheck OK, états loading/error gérés, a11y |
| architecture | Feature doc sous `.docs/features/architecture/` à jour, layering respecté, pas de dépendance circulaire, ADR si changement structurel |
| security | Feature doc sous `.docs/features/security/` à jour, authz vérifiée, secrets non logués, rate limit si exposé, CORS à jour |
| handoff | Template HANDOFF rempli (scope, status, fichiers, risques, état validation) |
