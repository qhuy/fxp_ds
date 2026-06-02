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

- **Alert** : message d'information ou d'erreur. Composition `Alert` / `AlertTitle` / `AlertDescription`. Variants `default` / `destructive`. Rendu avec `role="alert"`.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Avatar** : image utilisateur avec fallback obligatoire côté usage. Composition `Avatar` / `AvatarImage` / `AvatarFallback`, basée Radix Avatar.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Badge** : statut court ou label. Variants `default` / `secondary` / `outline` / `destructive`.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Button** : action utilisateur (click). 6 variants (`primary` / `secondary` / `outline` / `destructive` / `ghost` / `link`) × 8 tailles (`xs` / `sm` / `md` / `lg` / `icon` / `icon-xs` / `icon-sm` / `icon-lg`). Slots `iconLeft` / `iconRight` (`ReactNode`). Prop `loading` qui désactive + remplace `iconLeft` par `<Spinner>` + expose `aria-busy="true"`. Prop `asChild` (Radix Slot) pour composition (`<Button asChild><Link/></Button>` — slots et loading ignorés). États `aria-invalid` / `aria-expanded` stylés. ref = prop standard React 19.
  → Fiche : [.docs/features/front/button-primitive.md](../.docs/features/front/button-primitive.md)

- **Card** : conteneur de contenu. Composition `Card` / `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Checkbox** : contrôle booléen accessible basé Radix Checkbox. États `checked`, `disabled`, `aria-invalid`, focus-visible.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Dialog** : modal overlay accessible basé Radix Dialog. Composition `Dialog` / `DialogTrigger` / `DialogContent` / `DialogHeader` / `DialogTitle` / `DialogDescription` / `DialogFooter` / `DialogClose`. Focus trap, scroll lock, escape close, animations via `--fxp-transition-base`.
  → Fiche : [.docs/features/front/dialog-primitive.md](../.docs/features/front/dialog-primitive.md)

- **Input** : champ texte natif stylé. Props natives pass-through, états `disabled`, `focus-visible`, `aria-invalid`.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Label** : label accessible basé Radix Label. À utiliser avec `htmlFor` pour les contrôles de formulaire.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Progress** : barre de progression basée Radix Progress. Prop `value` 0-100, ARIA gérée par Radix.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Separator** : séparateur horizontal ou vertical basé Radix Separator. Décoratif par défaut.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Skeleton** : placeholder de chargement visuel. Animation CSS pure, styling via tokens.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Spinner** : feedback de chargement. Tailles `sm` / `md` / `lg`. `role="status"` + `aria-label` overridable (fallback `"Loading"`). Animation CSS pure (rotation 1s linear ; ralentie à 3s en `prefers-reduced-motion`). Couleur via `currentColor` (override par parent CSS). Consommé par `Button` loading state ; futur `DataGrid`, `EmptyState`.
  → Fiche : [.docs/features/front/spinner-primitive.md](../.docs/features/front/spinner-primitive.md)

- **Switch** : contrôle booléen on/off basé Radix Switch. États `checked`, `disabled`, focus-visible.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Tabs** : navigation de contenu basée Radix Tabs. Composition `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent`.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

- **Textarea** : champ texte multi-ligne natif stylé. Props natives pass-through, états `disabled`, `focus-visible`, `aria-invalid`.
  → Fiche : [.docs/features/front/shadcn-core-primitives.md](../.docs/features/front/shadcn-core-primitives.md)

## Composites (molécules / organismes)

*(à venir : FormEditSection, DataGrid, Filters, Modal compound, …)*

## Patterns UX

*(à venir : EmptyState, Toaster, ErrorBoundary, …)*

## Notes transverses

- **API surface stable engagée SemVer** — tout retrait/rename de prop publique = major bump ; ajout de variant = minor bump (cf. `.ai/rules/architecture.md` Versioning).
- **Theming exclusivement via CSS vars `--fxp-*`** — les apps tenant overrident les variables dans leur `:root`, ne touchent jamais le code des composants (cf. `.ai/guardrails.md` non-goal "Customisation au-delà des tokens DTCG").
- **i18n agnostique** — aucun string user-visible hardcodé dans les composants. Tout texte transite par une prop. Cf. `.ai/rules/tech-react.md` "No-strings rule".
- **Storybook obligatoire** par composant exposé (`<Name>.stories.tsx` voisin). Tests built-in (interaction + a11y) via `@storybook/addon-vitest` + Playwright Chromium headless.
- **Compound components** (Radix-style) pour tout composant à sous-zones (`Modal`, `Card`, `Tabs`, …) — pas de props slot (`headerSlot`, `footerSlot`).
