# Atomic Design Map

Cartographie atomique de l'UI exposée par `@fxp/react` et des surfaces applicatives de demo.

Scope courant : `packages/react/src/components/**`, `apps/docs/**`, `apps/playground/**`.

## Légende

- **Niveaux** : `atom`, `molecule`, `organism`, `template`, `page`.
- **Tags** (exemples) : `form`, `grid`, `list`, `nav`, `layout`, `overlay`, `theme`, `routing`, `auth`, `chart`, `<lib-name>` (ex. `kendo`, `mui`).

## Notes

- Classification initiale basée sur la structure et le nommage ; affiner au fil du refactor.
- Les primitives FXP vivent dans `packages/react/src/components/*`.
- Les apps `apps/*` consomment `@fxp/react` via le barrel public et importent `@fxp/react/styles.css` une seule fois à la racine.

## Summary

<!-- À tenir à jour (script ou manuel). Exemple :
- UI components : 0
- Feature components : 0
- App route components : 0
- Kendo / MUI / AntD direct usage hors adapters : 0
- Adapter files : 0
-->

- UI components : 2
- Feature components : 0
- App route components : 3
- Imports libs tierces hors adapters : 0
- Adapter files : 0

## Adapter Layer (seules portes d'entrée autorisées pour les libs tierces lourdes)

<!-- Lister ici les fichiers d'adapter si une lib tierce est utilisée. Exemple :
- ui/adapters/kendo/react-grid.ts
- ui/adapters/kendo/react-buttons.ts
-->

## UI Components

| Component | Level | Tags | Notes |
|---|---|---|---|
| packages/react/src/components/Button/Button.tsx | atom | action, form, theme | 6 variants, 8 tailles, slots icônes, loading, asChild, aria-invalid/expanded |
| packages/react/src/components/Spinner/Spinner.tsx | atom | feedback, loading | Tailles sm/md/lg, role status, label accessible |

## Feature Components

| Component | Level | Tags | Notes |
|---|---|---|---|
<!-- Exemple :
| features/users/components/userProfileCard.tsx | molecule | — | — |
-->

## App Route Components

| Route | Level | Tags | Notes |
|---|---|---|---|
| apps/docs/src/pages/index.astro | page | docs | Placeholder doc Astro |
| apps/playground/app/page.tsx | page | playground, theme | Demo Button/Spinner + sélecteur tenant |
| apps/playground/app/tenant/route.ts | route | theme, cookie | Pose le cookie `fxp-tenant` puis redirige vers `/` |
