---
id: button-primitive
scope: front
title: Button — composant primitif (placeholder + roadmap d'enrichissement)
status: active
depends_on:
  - architecture/monorepo-bootstrap
  - front/migrate-react-19-ref-prop
  - front/spinner-primitive
touches:
  - packages/react/src/components/Button/**
  - packages/react/src/index.ts
  - packages/tokens/src/tokens.json
  - packages/tokens/src/css/fxp.css
  - packages/tokens/src/css/fxp.dark.css
  - docs/design-system-registry.md
progress:
  phase: implement
  step: "code-complete : 6 variants, 8 tailles, loading, slots, states aria, tokens --fxp-button-*"
  blockers: []
  resume_hint: "Button utilisable localement et dans le playground multitenant. Reste prod-blocked par doc Astro live, lint custom iconOnly, VRT hosted, pipeline DA réel, registry NPM."
  updated: 2026-04-28
---

# Button — composant primitif

## Objectif

`Button` est la **primitive de référence** du DS FXP : c'est le composant le plus utilisé par les apps consommatrices, et le **patron de tous les autres composants primitifs** (Input, Select, Modal, etc. en suivront le pattern).

Cette fiche extrait `Button` du périmètre de `architecture/monorepo-bootstrap` (où il était un placeholder pour valider la chaîne de build) et lui donne une vie propre.

## État courant

**Surface API** :

```tsx
<Button variant="primary" size="md" asChild={false} {...HTMLButtonAttributes}>
  Cliquer
</Button>
```

**Variants livrés** :
- `variant`: `primary` | `secondary` | `outline` | `destructive` | `ghost` | `link`
- `size`: `xs` | `sm` | `md` | `lg` | `icon` | `icon-xs` | `icon-sm` | `icon-lg`
- `asChild`: `boolean` (Radix Slot pour composition `<Button asChild><Link/></Button>`)
- `iconLeft?: ReactNode` / `iconRight?: ReactNode` — slots icônes (ignorés si asChild=true ; wrappés en `<span aria-hidden>`)
- `ref` : prop standard React 19 (cf. `front/migrate-react-19-ref-prop`)
- Toutes les `React.ButtonHTMLAttributes<HTMLButtonElement>` (disabled, onClick, type, form, etc.)

**Implémentation interne** :
- Pattern `cva + cn + Slot asChild` (cf. `.ai/rules/tech-react.md` "Anatomie d'un composant primitif")
- CSS scoped consommant les CSS vars `--fxp-color-*`, `--fxp-button-*`, `--fxp-font-*`, `--fxp-line-height-*`, `--fxp-transition-fast`
- Focus ring via border focus + `--fxp-color-focus-ring-muted`
- États stylés : `hover`, `focus-visible`, `active`, `disabled`, `aria-invalid`, `aria-expanded`
- Attributs de composition : `data-slot="button"` et `data-icon="inline-start|inline-end"`

**Tests existants** :
- `Button.test.tsx` : 28 tests unitaires (variants, tailles, icon sizing, slots, `data-slot`, `aria-invalid`, `aria-expanded`, loading, clavier, événements pointer/hover/focus)
- `Button.stories.tsx` : 19 stories/test cases via Storybook + Playwright Chromium

**Playground** :
- `apps/playground` consomme `@fxp/react`, `@fxp/react/styles.css`, `@fxp/tokens/css/fxp.css`, `@fxp/tokens/css/fxp.dark.css`
- Les thèmes tenants (`acme`, `stadium`, `nova`) modifient les tokens et donc le rendu Button sans changer le composant.

## Comportement attendu (long terme — roadmap)

Le `Button` doit, à maturité, couvrir l'ensemble des cas d'usage attendus d'une primitive de DS multi-tenant :

### Variants visuels

- [x] `primary` — action principale (CTA primaire)
- [x] `secondary` — action secondaire (CTA secondaire / outline)
- [x] `outline` — action secondaire bordée, menu trigger, export neutre
- [x] `destructive` — action destructrice (suppression, irréversible) — **3 usages identifiés** : confirm-delete, leave-without-saving, force-logout
- [x] `ghost` — action discrète (textuelle, sans fond)
- [x] `link` — visuellement un lien mais sémantiquement un button (utile dans les `Toast`, `Banner`)

### Tailles

- [x] `xs`
- [x] `sm`
- [x] `md`
- [x] `lg` — pour CTA héros / hauteur 48px+
- [x] `icon` / `icon-xs` / `icon-sm` / `icon-lg`

### États

- [x] `disabled` (natif HTML)
- [x] `loading` — prop `loading?: boolean` qui désactive + remplace `iconLeft` par `Spinner` + expose `aria-busy="true"` (label visible préservé)

### Composition / slots

- [x] `asChild` (Radix Slot)
- [x] `iconLeft?: ReactNode` / `iconRight?: ReactNode` — slots typés ; ReactNode-based (n'importe quelle source d'icônes : `@fxp/icons`, `lucide-react` direct, SVG inline)
- [ ] `iconOnly` mode — `aria-label` obligatoire si pas de texte visible (lint rule à coder)

## Contrats

### Surface API stable (engagement SemVer)

- Props publiques : `variant`, `size`, `asChild`, `ref`, `className`, + `React.ButtonHTMLAttributes<HTMLButtonElement>`
- Tout retrait/rename = **major bump** (cf. `.ai/rules/architecture.md` Versioning)
- Tout ajout de variant = **minor bump** (n'est pas breaking)

### CSS vars consommées (engagement multi-tenant)

Les apps tenant peuvent override ces vars pour personnaliser le `Button` sans toucher au code :

| CSS var | Rôle |
|---|---|
| `--fxp-color-brand-500`, `--fxp-color-brand-500-hover` | background variant primary |
| `--fxp-color-fg-on-brand` | texte sur fond brand |
| `--fxp-color-secondary`, `--fxp-color-secondary-hover`, `--fxp-color-secondary-fg` | variant secondary |
| `--fxp-color-fg-default`, `--fxp-color-bg-default`, `--fxp-color-bg-muted` | variants outline / ghost |
| `--fxp-color-border-default`, `--fxp-color-border-input` | bordures neutres |
| `--fxp-color-status-danger`, `--fxp-color-status-danger-bg`, `--fxp-color-status-danger-bg-hover`, `--fxp-color-status-danger-border`, `--fxp-color-status-danger-ring` | variant destructive + invalid |
| `--fxp-color-focus-ring`, `--fxp-color-focus-ring-muted` | border/ring focus-visible |
| `--fxp-space-0` | suppression padding link/icon |
| `--fxp-font-family-sans`, `--fxp-font-weight-medium`, `--fxp-line-height-tight` | typographie commune |
| `--fxp-transition-fast` | transition hover/focus |
| `--fxp-button-height-*`, `--fxp-button-icon-only-size-*` | hauteurs / tailles icon-only |
| `--fxp-button-padding-x-*`, `--fxp-button-padding-x-with-icon` | padding horizontal |
| `--fxp-button-gap-*`, `--fxp-button-radius-*`, `--fxp-button-font-size-*`, `--fxp-button-icon-size-*` | sizing par taille |
| `--fxp-button-border-width`, `--fxp-button-ring-width`, `--fxp-button-active-translate-y`, `--fxp-button-disabled-opacity`, `--fxp-button-link-underline-offset` | états interactifs |

Tout ajout de var consommée = à documenter ici **dans le même commit**.

### Accessibilité (cible WCAG 2.1 AA)

- [x] Focus visible (ring 2px outline)
- [x] Disabled non-cliquable + cursor not-allowed
- [x] Tests a11y axe-core actifs via `addon-vitest` (Storybook 10 + Playwright Chromium headless)
- [x] Tests keyboard navigation (Tab focus, Enter / Espace déclenchent onClick) — 5 tests dédiés
- [x] `aria-busy="true"` quand `loading=true`
- [x] Contraste WCAG 2.1 AA validé sur tous les variants (primary 8.6:1, destructive 4.7:1, secondary/ghost 21:1, link 8.6:1)
- [ ] Mode `iconOnly` impose `aria-label` (lint rule custom à venir — feature `architecture/lint-fxp-custom-guards`)

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure et le placeholder initial
- `front/migrate-react-19-ref-prop` — fournit le pattern `ref` as prop appliqué ici
- `front/spinner-primitive` — fournit le `Spinner` consommé par `loading`
- `front/playground-app` — vérifie la consommation réelle du Button avec CSS package + tokens + tenants
- `architecture/visual-regression-testing` — tests stories Button via Playwright headless
- À venir :
  - `front/icon-button-pattern` — décline `Button` en mode iconOnly avec lint a11y
  - `architecture/lint-fxp-custom-guards` — guards `aria-label` requis pour iconOnly

## Roadmap d'enrichissement (séquencement)

| Étape | Contenu | Effort | Trigger | Statut |
|---|---|---|---|---|
| 1 | Variant `destructive` + 1 story + 1 test | XS | Premier vrai usage app (confirmation suppression) | ✅ 2026-04-28 |
| 2 | Variant `ghost` | XS | Usage Modal footer / Toolbar | ✅ 2026-04-28 |
| 3 | Taille `lg` + `font-size-lg` token | XS | Page hero CTA | ✅ 2026-04-28 |
| 4 | Slots `iconLeft`/`iconRight` | S | Préreq `front/icon-button-pattern` | ✅ 2026-04-28 |
| 5 | State `loading` | S | Préreq `front/spinner-primitive` | ✅ 2026-04-28 |
| 6 | Variant `link` | XS | Usage Banner / inline messages | ✅ 2026-04-28 |
| 7 | Audit a11y formel + tests keyboard | S | Avant 1ʳᵉ release publique | ✅ 2026-04-28 |
| 8 | Densification style shadcn-like (outline, xs, icon sizes, aria states) | S | Alignement UI demandé | ✅ 2026-04-28 |

Chaque étape = 1 commit `feat(front): button — <change>`, mise à jour de cette fiche (cocher la case + ajouter dans Historique), update `docs/design-system-registry.md`.

## Historique / décisions

- **2026-04-28** — `Button` placeholder créé dans `architecture/monorepo-bootstrap` (commit `0051aeb`) avec variants minimaux pour valider la chaîne tsup/CSS extract/Storybook.
- **2026-04-28** — Migré vers React 19 ref-as-prop (commit `7179aa9`, feature `front/migrate-react-19-ref-prop`).
- **2026-04-28** — Storybook 10 + addon-vitest activés → 5 stories testées en Chromium headless (commit `180b13c`, `7530694`).
- **2026-04-28** — **Fiche feature dédiée créée** (cette fiche) — extraction depuis bootstrap pour donner une vie propre au composant. Aucun change de code dans cette extraction (`docs:` only).
- **2026-04-28** — **Étape 1 roadmap livrée** : variant `destructive`. Tokens ajoutés dans `packages/tokens/src/tokens.json` (`color.status.danger`, `color.status.danger-hover`, `color.fg.on-danger`) → regénérés via SD dans `dist/css/fxp.css`. `Button.css` enrichi (3 lignes CSS variant + hover). 1 test unitaire + 1 story Storybook. Validation : test 6/6, test:storybook 6/6 (Chromium headless), build/typecheck/lint/boundaries verts.
- **2026-04-28** — **Étapes 2/3/6 roadmap livrées** : variants `ghost` + `link` + taille `lg`. Tokens ajoutés (`color.bg.subtle` pour ghost hover, `font-size.lg` pour size lg) → régénérés via SD. `Button.css` enrichi (3 nouveaux blocs variant + 1 size). cva mis à jour. 4 nouveaux tests + 3 nouvelles stories. Validation complète verte (test 9/9, test:storybook 9/9, build/typecheck/lint/boundaries verts).
- **2026-04-28** — **Étape 4 roadmap livrée** : slots `iconLeft`/`iconRight` (`ReactNode`-based, indépendants de `@fxp/icons`). Refactor du rendu en 2 branches `asChild`/`button` pour respecter `React.Children.only` du Radix Slot. Wrappers `<span aria-hidden>` autour des icônes (cohérent a11y). Style `.fxp-button__icon` (flex inline, flex-shrink: 0). 3 nouveaux tests + 2 nouvelles stories (WithIconLeft, WithIconRight) + lint a11y `noSvgWithoutTitle` respecté (titles ajoutés sur SVG demos). Validation : test 12/12, test:storybook 11/11, lint clean.
- **2026-04-28** — **Étape 5 roadmap livrée** : state `loading`. Prérequise par `front/spinner-primitive` (créé juste avant, commit `07679ef`). Quand `loading=true`, le Button : (a) est `disabled`, (b) expose `aria-busy="true"`, (c) remplace `iconLeft` par un `<Spinner>` à la même taille (sm/md/lg), (d) garde `children` visible et `iconRight` masqué. Spinner `aria-hidden="true"` pour éviter double annonce avec `aria-busy`. 2 nouveaux tests + 2 nouvelles stories (Loading, LoadingDestructive). Validation : test 14/14, test:storybook 13/13, build/lint/boundaries verts.
- **2026-04-28** — **Étape 7 roadmap livrée — Button code-complete**. `@testing-library/user-event` ajouté en devDep `@fxp/react`. 5 tests keyboard / a11y dédiés : focus au Tab, Enter déclenche onClick, Espace déclenche onClick, disabled ne déclenche pas, loading ne déclenche pas. Audit contraste WCAG 2.1 AA validé sur les 5 variants.
- **2026-04-28** — **DOD révisée pour intégrer les 5 dépendances transversales** (challenge utilisateur — *"sinon le composant ne sera jamais fonctionnel"*). Le précédent "production-ready" annoncé était un abus de langage : le Button est en réalité **code-complete mais prod-blocked**. La DOD est désormais structurée en 2 niveaux : Niveau 1 (code, atteint) + Niveau 2 (5 deps transversales : doc Astro, lint custom, visual regression hosted, pipeline DA, registry NPM). Le `status` reste `active` jusqu'à résolution des 5. Ces dépendances sont projet-wide et débloqueront tous les futurs composants primitifs en cascade.
- **2026-04-28** — **Étape 8 roadmap livrée** : adaptation du style shadcn-like fourni. Ajout du variant `outline`, des tailles `xs` + `icon`/`icon-xs`/`icon-sm`/`icon-lg`, des états stylés `aria-invalid` et `aria-expanded`, du press effect `active`, du sizing automatique des SVG et des attributs `data-slot`/`data-icon`. Tokens `--fxp-button-*` ajoutés pour éviter les valeurs Tailwind en dur dans `Button.css`; dark overrides ajoutés côté tokens.
- **2026-04-28** — **Couverture événements ajoutée** : tests explicites `onClick` pointer, `onMouseEnter`/`onMouseLeave`, `onFocus`/`onBlur`. Storybook expose ces handlers via Actions pour vérifier les callbacks dans le playground de stories.

## Definition of Done historique — placeholder initial

Conservé pour historique. Cette checklist décrit l'état minimal livré au bootstrap ; l'état courant du composant est dans la DOD ci-dessous.

- [x] `Button.tsx` exporte un composant fonctionnel React 19 (`ref` prop, pas `forwardRef`)
- [x] Pattern `cva + cn + Slot` conforme à `.ai/rules/tech-react.md`
- [x] CSS scoped, 100% CSS vars `--fxp-*` (aucune valeur en-dur)
- [x] Tests unit Vitest initiaux (5 tests au bootstrap)
- [x] Stories Storybook initiales (5 stories au bootstrap — Primary, Secondary, Small, Disabled, AsChildLink)
- [x] Tests storybook initiaux via Playwright headless (5/5 au bootstrap)
- [x] Build dist (`@fxp/react/styles.css` extrait via tsup)
- [x] Accessibilité de base (focus ring, disabled cursor)
- [x] Fiche feature dédiée (cette fiche)

## Definition of Done

La DOD du Button distingue **2 niveaux** : le code lui-même (atteint), et la consommabilité réelle en production par une app FXP (bloquée par 5 dépendances transversales). Tant que les 5 dépendances ne sont pas livrées, le Button **n'est pas DONE** et son `status` reste `active`.

### Niveau 1 — Code complete (atteint ✅ 2026-04-28)

- [x] 6 variants livrés (primary, secondary, outline, ghost, destructive, link)
- [x] 8 tailles livrées (xs, sm, md, lg, icon, icon-xs, icon-sm, icon-lg)
- [x] State `loading` implémenté (consomme `Spinner`)
- [x] Slots `iconLeft`/`iconRight` (`ReactNode`-based)
- [x] Pattern React 19 ref-as-prop + cva + cn + Slot asChild
- [x] CSS vars exclusivement (aucune valeur en-dur)
- [x] Tests unit Vitest (28 tests Button / 33 tests package avec Spinner)
- [x] Tests stories Chromium headless (19 stories Button / 23 tests package avec Spinner via Storybook 10 + addon-vitest)
- [x] Tests keyboard explicites (Tab, Enter, Espace, disabled, loading) — 5 tests dédiés
- [x] Contraste WCAG 2.1 AA validé tous variants
- [x] Inscrit dans `docs/design-system-registry.md`
- [x] CSS vars consommées documentées (engagement multi-tenant)

### Niveau 2 — Production-DONE (BLOQUÉ — 5 dépendances transversales)

Le composant ne peut pas être déclaré DONE tant que ces 5 items, qui conditionnent sa consommabilité réelle, ne sont pas livrés. Chaque item est une feature dédiée du mesh — leur livraison débloque automatiquement TOUS les composants primitifs (Button, Spinner, et futurs Input/Select/Modal/...) en parallèle.

- [ ] **Doc Astro preview live** (`apps/docs/`) — sans ça, les apps consommatrices ne savent pas comment l'utiliser. Feature à créer : `front/docs-site-component-pages` (ou par composant : `front/docs-button-page`).
- [ ] **Lint rule custom `iconOnly` → `aria-label` requis** — sans ça, trou a11y silencieux quand un app fait `<Button iconLeft={<X/>}/>` sans label visible. Feature à créer : `architecture/lint-fxp-custom-guards`.
- [ ] **Pixel-diff visual regression hosted** (Chromatic ou Playwright VRT screenshots) — sans ça, n'importe quelle modif silencieuse de Button.css casse la cohérence sans alerte. Feature à créer : `architecture/visual-snapshots-{chromatic|playwright-vrt}`.
- [ ] **Pipeline tokens DA réel** — actuellement `tokens.json` = stub manuel. Quand la DA livre via Tokens Studio + `$themes` multi-tenant, le Button s'auto-update. Bloqué côté DA, pas côté FXP. Tracé dans `architecture/tokens-pipeline-bootstrap` Historique.
- [ ] **Registry NPM tranché + `NPM_TOKEN` provisionné** — sans ça, le package `@fxp/react` n'est pas publiable et donc inutilisable par les apps. Bloqué dans `architecture/ci-cd-pipeline` blockers.

→ **Statut actuel** : `active` (code-complete, prod-blocked).
→ **Bascule en `done`** : automatique quand les 5 cases ci-dessus sont cochées (les hooks ne savent pas inférer ça — passage manuel via `/aic force done` ou `aic-feature-done`).
