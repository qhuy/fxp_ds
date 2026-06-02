# Bobun DS

Bobun DS est un design system personnel et open source : composants React, tokens DTCG et assets d'interface livrés en packages NPM.

Ce README est la porte d'entrée humaine du projet. Si une personne ou une IA lit un seul fichier, elle doit lire celui-ci.

## Positionnement

Bobun DS sert de terrain de construction pour un design system publiable, maintenable et réutilisable dans plusieurs apps. Le projet reste volontairement pragmatique : une petite surface publique, des contrats clairs, des tokens CSS stables et une documentation exploitable.

Le repo ne produit pas une identité visuelle figée pour une marque cliente. Il fournit l'ossature technique et les contrats. L'identité visuelle vient des tokens, puis peut être adaptée par thème ou tenant.

## Ce que produit ce repo

- `@qhuy/react` : composants React compilés, basés sur des primitives accessibles et pilotés par tokens.
- `@qhuy/tokens` : tokens DTCG compilés en CSS variables `--fxp-*`.
- `@qhuy/icons` : package d'icônes React.
- `apps/docs` : documentation publique du design system.
- `apps/playground` : playground Next.js pour tester les composants, thèmes et tenants.

Les noms `@qhuy/*`, `--fxp-*` et `.fxp-*` sont conservés pour l'instant comme contrats techniques historiques. Les renommer demanderait une migration breaking dédiée.

## Open Source

Le projet est distribué sous licence MIT. Les packages publiables restent sous le scope personnel `@qhuy` tant qu'un scope npm dédié à Bobun DS n'est pas créé.

Contributions attendues :

- Changements petits et traçables.
- API publiques typées et documentées.
- Tests ciblés quand le comportement change.
- Respect du feature mesh `.docs/features/`.
- Commits en français.

## Ce que chaque intervenant doit faire

### Design

Les livrables design doivent être exploitables par le design system, pas par du CSS applicatif direct.

À fournir pour chaque thème ou tenant :

- Export Tokens Studio au format DTCG JSON (`$value`, `$type`).
- Identifiant stable : `acme`, `stadium`, `nova`, etc.
- Modes couverts : `light`, et `dark` si disponible.
- Tokens sémantiques, pas seulement des palettes brutes.
- États composants : default, hover, active, focus, disabled, invalid, loading.
- Lien Figma source si disponible.
- Capture ou preview de référence.
- Date/version de livraison.
- Changelog court des changements.

À ne pas fournir :

- CSS ciblant `.fxp-*`, `.fxp-button` ou le markup interne.
- Composants React.
- Noms de variables hors convention `--fxp-*`.
- Overrides spécifiques à une app consommatrice.

Références utiles :

- [Contrat tokens design](packages/tokens/src/README.md)
- [Rôles tokens](packages/tokens/src/ROLES.md)
- [Template tenant](packages/tokens/src/tenants/_TEMPLATE.md)

### Dev design system

Avant de coder :

1. Lire ce README.
2. Lire [.ai/index.md](.ai/index.md) si la tâche est faite avec une IA ou doit rester traçable.
3. Identifier le scope principal : `front`, `architecture`, `quality`, etc.
4. Ouvrir ou mettre à jour la fiche `.docs/features/<scope>/<id>.md` si le comportement change.
5. Vérifier le [Quality Gate](.ai/quality/QUALITY_GATE.md).

Pour un composant `@qhuy/react`, livrer systématiquement :

- API typée React 19.
- Props natives React pass-through si composant interactif (`onClick`, hover, focus/blur).
- États utiles : disabled, loading, focus-visible, active, aria-invalid, aria-expanded si pertinent.
- Navigation clavier : Tab, Enter, Space pour les actions.
- CSS sans valeur arbitraire quand un token `--fxp-*` doit exister.
- Stories Storybook pour variants, tailles, états et actions.
- Tests unitaires ciblés.
- Mise à jour de `docs/design-system-registry.md`.
- Validation playground si tokens, CSS ou tenant sont impactés.

### Dev application consommatrice

Installer les packages publiés :

```bash
pnpm add @qhuy/react @qhuy/tokens @qhuy/icons
```

Importer les CSS au root de l'application :

```ts
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
```

Charger ensuite le CSS tenant au runtime :

```html
<html data-tenant="acme">
  <head>
    <link rel="stylesheet" href="/_fxp/tenants/acme.css" />
  </head>
</html>
```

Règles côté app :

- Ne pas modifier le markup interne des composants.
- Ne pas copier/coller les composants depuis le package.
- Ne pas surcharger `.fxp-button` ou autre classe interne.
- Personnaliser uniquement via CSS variables `--fxp-*`.
- Si un besoin sort du périmètre, ouvrir une demande upstream dans ce repo.

### Agents IA, Claude, Codex

Avant toute action :

1. Lire [.ai/index.md](.ai/index.md).
2. Lire [.ai/quality/QUALITY_GATE.md](.ai/quality/QUALITY_GATE.md).
3. Lire [.ai/guardrails.md](.ai/guardrails.md).
4. Identifier un scope primaire.
5. Charger uniquement les règles et features nécessaires.

Avant de dire "terminé" :

- Repasser par la checklist anti-oubli dans [QUALITY_GATE.md](.ai/quality/QUALITY_GATE.md#checklist-systématique-anti-oubli).
- Mettre à jour la fiche feature si le comportement change.
- Lancer les checks pertinents.
- Dire explicitement ce qui a été validé et ce qui ne l'a pas été.

## Structure du repo

```txt
bobun-ds/
├── apps/
│   ├── docs/          # Documentation Astro
│   └── playground/    # Playground Next.js multi-tenant
├── packages/
│   ├── react/         # @qhuy/react
│   ├── tokens/        # @qhuy/tokens
│   └── icons/         # @qhuy/icons
├── docs/              # Registry et docs transverses lisibles humainement
├── .docs/features/    # Suivi des features par scope
└── .ai/               # Contexte obligatoire pour agents IA
```

## Commandes essentielles

Installer :

```bash
pnpm install
```

Développement :

```bash
pnpm dev
pnpm storybook
```

Validation :

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:storybook
pnpm build
pnpm boundaries
```

Checks contexte AI/docs :

```bash
bash .ai/scripts/check-ai-references.sh
bash .ai/scripts/check-features.sh
bash .ai/scripts/check-feature-coverage.sh
bash .ai/scripts/check-shims.sh
```

Playground seul :

```bash
pnpm --filter @qhuy/playground dev
```

Playground consommateur NPM publie :

```bash
pnpm playground:npm:install
pnpm playground:npm:dev
pnpm playground:npm:build
```

Build tokens :

```bash
pnpm --filter @qhuy/tokens build
```

## Règles tokens et theming

Tous les styles publics doivent passer par des variables `--fxp-*` quand ils relèvent du design system.

Convention :

```txt
--fxp-{category}-{role}-{shade-or-state?}
```

Exemples :

- `--fxp-color-brand-500`
- `--fxp-color-bg-default`
- `--fxp-color-fg-default`
- `--fxp-radius-md`
- `--fxp-space-2`
- `--fxp-button-height-md`

Le composant React ne connaît jamais le tenant actif. Les tenants modifient uniquement les CSS variables.

## Règles de contribution

- Un scope primaire par tâche.
- Toute évolution de comportement doit mettre à jour une fiche `.docs/features/<scope>/<id>.md`.
- Les commits sont en français.
- Les commits `feat:` doivent toucher une fiche feature.
- Pas de composant suffixé `Button2`, `ModalV2`, etc. Breaking change = SemVer major + migration.
- Pas de hardcoded strings user-visible dans les composants publics.
- Pas de styles inline ou valeurs magiques hors design system.

## Definition of Done

Une tâche est terminée uniquement si :

- La fiche feature est à jour quand le comportement public change.
- La doc racine ou le registry est à jour si le comportement public change.
- Les tests pertinents sont verts.
- `pnpm lint` est vert.
- `pnpm typecheck` est vert si TypeScript/API est touché.
- `pnpm test:storybook` est vert si Storybook ou le rendu composant change.
- Les checks `.ai` sont verts si docs/features ont changé.
- Les impacts tenant/tokens ont été vérifiés si le style change.

## Documents de référence

- [Quality Gate](.ai/quality/QUALITY_GATE.md)
- [Règles architecture](.ai/rules/architecture.md)
- [Règles front](.ai/rules/front.md)
- [Règles React](.ai/rules/tech-react.md)
- [Registry design system](docs/design-system-registry.md)
- [Atomic Design map](docs/atomic-design-map.md)
- [README NPM @qhuy/react](packages/react/README.md)
- [README NPM @qhuy/tokens](packages/tokens/README.md)
- [README NPM @qhuy/icons](packages/icons/README.md)
- [Contrat tokens design](packages/tokens/src/README.md)
