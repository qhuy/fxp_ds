# Règles tech — React (lib DS `@fxp/react`)

À charger pour toute tâche touchant `packages/react/`. Ce fichier remplace les règles `react-next` du preset (orientées **app Next.js consommatrice**) par des règles **lib DS** (orientées **publication NPM**).

Cf. [`.ai/rules/architecture.md`](architecture.md) pour le périmètre monorepo, distribution, theming, versioning. Cf. [`.ai/guardrails.md`](../guardrails.md) pour les non-goals projet.

## Stack & runtime

- **React 18+ / 19+** — peerDeps `react@^18 || ^19`, `react-dom@^18 || ^19`. Jamais bundler React.
- **`"use client"` par défaut** — directive en tête de chaque fichier composant exposé. RSC-compatible (Next.js App Router) sans intervention de l'app. Exception (composants purement structurels sans state/effect/event) à valider en review.
- **TypeScript strict** — `strict: true` partout. `tsc --noEmit` bloquant en CI.
- **Bundle output** — ESM (`.mjs`) + CJS (`.cjs`) + `.d.ts`, généré par `tsup`. `sideEffects: false` dans `package.json` → tree-shaking agressif.
- **Pas de Next.js / Vite spécifique** — la lib doit fonctionner dans Next.js (App Router + Pages), Vite, Remix, Astro, Webpack legacy. **Pas** d'import `next/*`, pas d'utilisation `useRouter`/`usePathname`/`useSearchParams`. Si un composant a besoin d'un routing, l'app le passe en prop (ex : `Link` accepté en `asChild`).
- **Primitives bas-niveau** — Radix UI. `lucide-react` pour les icônes (ou `@fxp/icons` si forké). Pas d'autre lib UI lourde.

## Layout & nommage

```
packages/react/src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx           ← composant principal (named export)
│   │   ├── Button.css           ← styles scoped (extraits au build)
│   │   ├── Button.test.tsx      ← Vitest + Testing Library
│   │   ├── Button.stories.tsx   ← Storybook (OBLIGATOIRE)
│   │   └── index.ts             ← barrel: export { Button } from './Button'
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   ├── ModalHeader.tsx
│   │   ├── ModalBody.tsx
│   │   ├── ModalFooter.tsx
│   │   ├── Modal.css
│   │   ├── Modal.test.tsx
│   │   ├── Modal.stories.tsx
│   │   └── index.ts             ← export Modal compound + sous-éléments typés
│   └── …
├── lib/
│   ├── cn.ts                    ← clsx + tailwind-merge wrapper
│   └── …
└── index.ts                     ← barrel root: re-export public surface
```

- **Un dossier par composant**. Pas de fichier "fourre-tout" avec plusieurs composants.
- **Named exports uniquement** — pas de `export default`. Tree-shaking + autocomplete exigent les named.
- **Barrel `src/index.ts`** = unique surface publique. Ce qui n'y est pas exporté n'est pas API publique.
- **Imports absolus `@/`** dans `packages/react/` interne. Pas de `../../` profonds.

## Anatomie d'un composant primitif

```tsx
// packages/react/src/components/Button/Button.tsx
'use client'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva('fxp-button', {
  variants: {
    variant: {
      primary: 'fxp-button--primary',
      secondary: 'fxp-button--secondary',
      ghost: 'fxp-button--ghost',
      destructive: 'fxp-button--destructive',
    },
    size: { sm: 'fxp-button--sm', md: 'fxp-button--md', lg: 'fxp-button--lg' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
          VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** ref React 19 — prop standard, plus de forwardRef */
  ref?: React.Ref<HTMLButtonElement>
}

export function Button({
  className,
  variant,
  size,
  asChild,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

**Conventions imposées** :

- **`ref` comme prop standard** — pattern React 19. **Plus de `forwardRef`** (deprecated). Typer via `React.Ref<HTMLElementXxx>` dans l'interface. Le `displayName` est auto-dérivé du nom de la fonction, pas besoin de l'écrire.
- `asChild` (pattern Radix Slot) sur tout composant où la composition fait sens (`Button`, `Link`, `Trigger`, `Item`...). Permet `<Button asChild><Link href="/x">Aller</Link></Button>`.
- Variants typés via **`cva` (class-variance-authority)** — `VariantProps<typeof xxxVariants>` injecte les types automatiquement.
- `cn()` interne combine classes via clsx + tailwind-merge → la prop `className` de l'app override toujours les classes par défaut.

## Composition & slots — compound components

Pour tout composant ayant des sous-zones logiques (`Modal`, `Card`, `Tabs`, `Accordion`...), pattern **compound components** (Radix-style) :

```tsx
// Usage côté app consommatrice
<Modal open={open} onOpenChange={setOpen}>
  <Modal.Header>
    <Modal.Title>Confirmer la suppression</Modal.Title>
    <Modal.Description>Cette action est irréversible.</Modal.Description>
  </Modal.Header>
  <Modal.Body>{/* contenu libre */}</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
    <Button variant="destructive" onClick={handleDelete}>Supprimer</Button>
  </Modal.Footer>
</Modal>
```

- **Implémentation** : sous-composants exportés en propriétés statiques du composant racine, ou via `Object.assign(Modal, { Header, Body, ... })`. Préférer Radix primitives sous le capot quand pertinent (`Dialog.Root`, `Dialog.Trigger`...).
- **Avantages** : ordre flexible, app peut omettre des slots, sub-components typés indépendamment, refs accessibles slot par slot.
- **Anti-pattern** : props slot (`headerSlot`, `footerSlot`) — explicitement écarté lors du cadrage projet.

## Tokens & styling

- **CSS vars uniquement** pour toute valeur visuelle. Aucune couleur, taille, rayon, ombre, transition **en-dur** dans le CSS d'un composant.
  - ❌ `background: #1e40af`
  - ✅ `background: var(--fxp-color-brand-500)`
- **Convention naming** des CSS vars : cf. [`.ai/rules/architecture.md`](architecture.md) section "Convention de naming CSS vars".
- **Tailwind** est un détail d'implémentation **interne** au build de `packages/react`. Utilisé via `cn()` + classes utilitaires *qui consomment des CSS vars*. **Pas exposé** aux apps consommatrices.
- **Pas de `style={{...}}` inline** dans un composant exposé — tout passe par className + CSS scoped.
- **Pas de CSS-in-JS** (Emotion, styled-components, vanilla-extract) — incompatible avec le pipeline tokens compilé et SSR-safe par défaut.

## No-strings rule (i18n-agnostic)

Aucun string user-visible **hardcodé** dans un composant exposé. Cohérence avec [`.ai/guardrails.md`](../guardrails.md) non-goal i18n.

```tsx
// ❌ Interdit
<button>Précédent</button>
<p>Aucune donnée</p>

// ✅ Obligatoire — l'app fournit le texte
<Pagination
  previousLabel="Précédent"
  nextLabel="Suivant"
  labelTemplate={(c, t) => `Page ${c} sur ${t}`}
/>
<DataGrid emptyMessage={<EmptyState>Aucune donnée</EmptyState>} />
```

**Composants concernés** (à ne pas oublier en review) : `Pagination`, `DataGrid`, `Combobox` (no-results), `DatePicker`, `FileUpload`, `EmptyState`, `Toaster`, `ErrorBoundary`.

**Cas spécial Date / Number** — utiliser `Intl.DateTimeFormat` / `Intl.NumberFormat` natif navigateur, avec une prop `locale?: string` (default `undefined` = locale navigateur). Zero dépendance i18n.

```tsx
<DatePicker locale="fr-FR" />   // override explicite
<DatePicker />                   // navigator.language par défaut
```

**Tolérance** : `aria-*` peut avoir un fallback en anglais si la prop n'est pas fournie (ex : `aria-label="Close"` par défaut, override possible via prop).

## Accessibilité (WCAG 2.1 AA)

- **Radix UI sous le capot** pour toute primitive interactive (Dialog, Popover, Tooltip, Select, Tabs, Accordion, RadioGroup, Switch...). Radix gère focus, keyboard, ARIA, escape, click-outside.
- **Focus visible** par défaut (ring CSS via `--fxp-color-focus-ring`) — jamais `outline: none` sans alternative visible.
- **Navigation clavier** fonctionnelle sur tout composant interactif. Tests Storybook avec `play` function pour vérifier.
- **Labels accessibles** — `Input` avec `<label>` lié, ou `aria-label` si pas de texte visible (cf. no-strings rule : prop `aria-label` overridable).
- **Cible WCAG 2.1 AA** uniquement (cf. guardrails). AAA et RGAA hors scope.

## API surface & évolution

- **Variants justifiés par 3 cas d'usage concrets** minimum avant ajout. Pas de variant "au cas où". Cf. [`.ai/rules/architecture.md`](architecture.md) section ADRs.
- **Props minimales** — chaque prop sert un usage clair. Ajouter une prop = élargir API surface = potentiel breaking futur.
- **Breaking change = SemVer major + Changeset major + entry MIGRATION.md**. Jamais `Button2` (cf. guardrails).
- **Cycle de dépréciation** : `@deprecated` JSDoc dans la major en cours → suppression à la major suivante.
- **Composants exposés via `src/index.ts`** uniquement. Sub-imports profonds (`@fxp/react/components/Button/Button`) interdits côté apps — sinon on bloque les renames internes.

## Storybook (OBLIGATOIRE — Storybook 9+ / 10+)

- Chaque composant exposé `packages/react/src/components/<Name>/<Name>.tsx` DOIT avoir un voisin `<Name>.stories.tsx`.
- **Lint guard CI** : `lint:stories-required` — un nouveau composant sans story = build CI rouge.
- Stories consomment les **vrais tokens** (pas de thème mock). Le Storybook charge `@fxp/tokens/css/fxp.css` + `fxp.dark.css` au boot.
- Couvrir au minimum : variants, tailles, états (hover/focus/disabled/loading), edge cases (empty, long content).
- **Imports types depuis `@storybook/react-vite`** (pas `@storybook/react`) — pattern framework-based SB9+.
- **`initialGlobals`** (pas `parameters.backgrounds`) pour configurer les contextes par défaut — API SB9+ globals.
- **Tests built-in SB9+** : visual regression, a11y, interaction, coverage automatique. Servent de base à la régression visuelle.
- **Story globals toolbar** (`backgrounds`, `viewport`) : test dark mode, mobile/tablet, RTL en 1 click.
- **Tags** custom (`alpha`, `deprecated`, `feature-flag`) pour filtrer les stories.
- Sert de **terrain de jeu interactif** pendant le dev — `pnpm storybook` à la racine.

## Tests

- **Unit/composant** — Vitest + `@testing-library/react`. Couvrir variantes principales + comportement documenté.
- **Régression visuelle** — outil TBD (Chromatic via Storybook, ou Playwright VRT). Bloquant avant 1ʳᵉ release publique.
- **Type checking** — `tsc --noEmit` bloquant en CI.
- **Pas de tests E2E** dans `packages/react/` — c'est le job des apps consommatrices.

### Seuil minimum par composant exposé

- Test des variantes visuelles principales (1 test par variant majeur).
- Test du comportement clavier (Tab, Enter, Escape selon le composant).
- Test de la prop `asChild` quand applicable.
- Test des callbacks (`onClick`, `onChange`...) déclenchés correctement.

## Documentation

- **`docs/design-system-registry.md`** (à la racine repo, créé par scaffold) — tout composant ajouté à `packages/react/src/components/` est inscrit dans le **même commit**. Format : nom + rôle 1-3 lignes + variants exposés.
- **`docs/atomic-design-map.md`** — classification atom/molecule/organism. À tenir à jour dès 30 composants (déjà recommandé par le scaffold).
- **Site Astro `apps/docs/`** — doc visuelle exhaustive avec preview live (MDX), props, CSS vars consommées par composant. Built par-dessus Storybook ou indépendant — à trancher dans une feature dédiée.

## Interdits explicites

- ❌ Import `next/*` (router, image, link, font, headers...) — la lib doit fonctionner partout.
- ❌ `useState` / `useReducer` / `useContext` pour de la **logique métier** (queries, forms, state global) — strictement état local UI (open/closed, hover, controlled inputs...).
- ❌ `useEffect` réseau / data fetching — la lib ne fait jamais d'appel HTTP.
- ❌ `useRouter`, `usePathname`, `useSearchParams` — la lib ignore le routing.
- ❌ Texte user-visible hardcodé (cf. no-strings rule).
- ❌ Couleur / radius / ombre / transition en-dur (cf. tokens & styling).
- ❌ `style={{...}}` inline dans un composant exposé.
- ❌ Import direct de Radix (ou autre lib bas-niveau) **exposé** côté apps. Radix vit sous le capot, jamais re-exporté.
- ❌ `export default` (named only).
- ❌ `forwardRef` — deprecated en React 19. Utiliser `ref` comme prop standard (cf. anatomie composant).
- ❌ `displayName` explicite — auto-dérivé du nom de la fonction. Inutile depuis ref-as-prop.
- ❌ Composants exposés sans Storybook story (`lint:stories-required` rouge).
- ❌ Sub-imports profonds depuis les apps (`@fxp/react/components/Button/Button`) — uniquement le barrel root.

## Validation (commandes monorepo Turbo)

- `pnpm typecheck` — `tsc --noEmit` sur `packages/react`. Bloquant.
- `pnpm lint` — **Biome** (lint + format check). Règles activées : `recommended` + `noDefaultExport: error` + `useImportType` + `noUnusedImports`. Guards FXP custom (`no-next-import`, `no-hardcoded-strings`, `no-hardcoded-tokens`, `stories-required`) à venir dans une feature dédiée — pour l'instant code review manuelle.
- `pnpm format` / `pnpm format:check` — Biome formatter (single quote, no semi, trailing comma all, indent 2).
- `pnpm test` — Vitest. Bloquant.
- `pnpm build` — tsup. Bloquant.
- `pnpm storybook:build` — bloquant si Storybook ne build pas.

Skip accepté uniquement avec raison explicite + commande à rejouer.
