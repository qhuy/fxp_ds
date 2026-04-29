# Design System Registry (`@qhuy/react`)

Source de vérité unique sur les composants UI exposés par `@qhuy/react` aux apps consommatrices, leur rôle fonctionnel et leurs règles de comportement.

## Règle mandatory

- Tout composant ajouté à `packages/react/src/components/` est **inscrit ici dans le même commit** (cf. `.ai/rules/tech-react.md`).
- Cette source de vérité est consultée **avant** la création d'un nouveau composant : si un équivalent existe, l'enrichir plutôt que dupliquer.
- Toute règle de comportement non évidente (ex : "Button.asChild délègue le rendu à l'enfant via Radix Slot") DOIT être documentée ici, pas seulement déduite du code.
- Une fiche feature dédiée vit en parallèle dans `.docs/features/front/<id>.md` pour la roadmap, l'engagement SemVer, et l'historique.

## Format d'entrée

```
- NomComposant : rôle fonctionnel (1 ligne). Variants exposés. Règle(s) de comportement non évidente(s).
  → Fiche : .docs/features/front/<id>.md
```

Garder chaque entrée courte (1-4 lignes max). Détails d'implémentation = lire le code ; détails de roadmap = lire la fiche feature.

## Primitives (atomes)

- **Button** : action utilisateur (click). 6 variants (`primary` / `secondary` / `outline` / `destructive` / `ghost` / `link`) × 8 tailles (`xs` / `sm` / `md` / `lg` / `icon` / `icon-xs` / `icon-sm` / `icon-lg`). Slots `iconLeft` / `iconRight` (`ReactNode`). Prop `loading` qui désactive + remplace `iconLeft` par `<Spinner>` + expose `aria-busy="true"`. Prop `asChild` (Radix Slot) pour composition (`<Button asChild><Link/></Button>` — slots et loading ignorés). États `aria-invalid` / `aria-expanded` stylés. ref = prop standard React 19.
  → Fiche : [.docs/features/front/button-primitive.md](../.docs/features/front/button-primitive.md)

- **Spinner** : feedback de chargement. Tailles `sm` / `md` / `lg`. `role="status"` + `aria-label` overridable (fallback `"Loading"`). Animation CSS pure (rotation 1s linear ; ralentie à 3s en `prefers-reduced-motion`). Couleur via `currentColor` (override par parent CSS). Consommé par `Button` loading state ; futur `DataGrid`, `EmptyState`.
  → Fiche : [.docs/features/front/spinner-primitive.md](../.docs/features/front/spinner-primitive.md)

## Composites (molécules / organismes)

*(à venir : FormEditSection, DataGrid, Filters, Modal compound, …)*

## Patterns UX

*(à venir : EmptyState, Toaster, Skeleton, ErrorBoundary, …)*

## Notes transverses

- **API surface stable engagée SemVer** — tout retrait/rename de prop publique = major bump ; ajout de variant = minor bump (cf. `.ai/rules/architecture.md` Versioning).
- **Theming exclusivement via CSS vars `--fxp-*`** — les apps tenant overrident les variables dans leur `:root`, ne touchent jamais le code FXP (cf. `.ai/guardrails.md` non-goal "Customisation au-delà des tokens DTCG").
- **i18n agnostique** — aucun string user-visible hardcodé dans les composants. Tout texte transite par une prop. Cf. `.ai/rules/tech-react.md` "No-strings rule".
- **Storybook obligatoire** par composant exposé (`<Name>.stories.tsx` voisin). Tests built-in (interaction + a11y) via `@storybook/addon-vitest` + Playwright Chromium headless.
- **Compound components** (Radix-style) pour tout composant à sous-zones (`Modal`, `Card`, `Tabs`, …) — pas de props slot (`headerSlot`, `footerSlot`).
