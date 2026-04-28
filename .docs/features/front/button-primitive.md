---
id: button-primitive
scope: front
title: Button — composant primitif (placeholder + roadmap d'enrichissement)
status: active
depends_on:
  - architecture/monorepo-bootstrap
  - front/migrate-react-19-ref-prop
touches:
  - packages/react/src/components/Button/**
  - packages/react/src/index.ts
progress:
  phase: implement
  step: "placeholder en place (2 variants, 2 tailles, asChild) — roadmap d'enrichissement à dérouler"
  blockers: []
  resume_hint: "Composant fonctionnel mais minimal. Prochain enrichissement : variant destructive + tests a11y. Voir 'Roadmap d'enrichissement' ci-dessous pour le séquencement."
  updated: 2026-04-28
---

# Button — composant primitif

## Objectif

`Button` est la **primitive de référence** du DS FXP : c'est le composant le plus utilisé par les apps consommatrices, et le **patron de tous les autres composants primitifs** (Input, Select, Modal, etc. en suivront le pattern).

Cette fiche extrait `Button` du périmètre de `architecture/monorepo-bootstrap` (où il était un placeholder pour valider la chaîne de build) et lui donne une vie propre.

## État actuel (post-bootstrap)

**Surface API** :

```tsx
<Button variant="primary" size="md" asChild={false} {...HTMLButtonAttributes}>
  Cliquer
</Button>
```

**Variants livrés** :
- `variant`: `primary` | `secondary` | `destructive` | `ghost` | `link`
- `size`: `sm` | `md` | `lg`
- `asChild`: `boolean` (Radix Slot pour composition `<Button asChild><Link/></Button>`)
- `ref` : prop standard React 19 (cf. `front/migrate-react-19-ref-prop`)
- Toutes les `React.ButtonHTMLAttributes<HTMLButtonElement>` (disabled, onClick, type, form, etc.)

**Implémentation interne** :
- Pattern `cva + cn + Slot asChild` (cf. `.ai/rules/tech-react.md` "Anatomie d'un composant primitif")
- CSS scoped consommant les CSS vars `--fxp-color-brand-*`, `--fxp-radius-md`, `--fxp-space-*`, `--fxp-font-*`, `--fxp-transition-fast`
- Focus ring via `--fxp-color-focus-ring`

**Tests existants** (5 tests `Button.test.tsx`, unit + storybook via Playwright) :
- Rendu variant primary par défaut
- Variant secondary sur demande
- `className` passthrough
- `asChild` rend l'élément enfant
- `disabled` respecté

**Stories existantes** (5 stories `Button.stories.tsx`) :
- `Primary`, `Secondary`, `Small`, `Disabled`, `AsChildLink`

## Comportement attendu (long terme — roadmap)

Le `Button` doit, à maturité, couvrir l'ensemble des cas d'usage attendus d'une primitive de DS multi-tenant :

### Variants visuels

- [x] `primary` — action principale (CTA primaire)
- [x] `secondary` — action secondaire (CTA secondaire / outline)
- [x] `destructive` — action destructrice (suppression, irréversible) — **3 usages identifiés** : confirm-delete, leave-without-saving, force-logout
- [x] `ghost` — action discrète (textuelle, sans fond)
- [x] `link` — visuellement un lien mais sémantiquement un button (utile dans les `Toast`, `Banner`)

### Tailles

- [x] `sm`
- [x] `md`
- [x] `lg` — pour CTA héros / hauteur 48px+

### États

- [x] `disabled` (natif HTML)
- [ ] `loading` — prop `loading?: boolean` qui désactive + remplace contenu par `Spinner` (à créer en feature séparée)

### Composition / slots

- [x] `asChild` (Radix Slot)
- [ ] `iconLeft?: ReactNode` / `iconRight?: ReactNode` — slots typés pour icône avant/après le label (consomme `@fxp/icons`)
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
| `--fxp-color-fg-default` | texte variant secondary |
| `--fxp-color-bg-default` | background variant secondary |
| `--fxp-color-status-danger`, `--fxp-color-status-danger-hover` | background variant destructive |
| `--fxp-color-fg-on-danger` | texte sur fond danger |
| `--fxp-color-bg-subtle` | hover variant ghost |
| `--fxp-color-focus-ring` | ring focus-visible |
| `--fxp-radius-md` | border-radius |
| `--fxp-space-2`/`-3`/`-4` | padding |
| `--fxp-font-family-sans`, `--fxp-font-weight-medium`, `--fxp-font-size-sm`/`-md`/`-lg` | typographie |
| `--fxp-transition-fast` | transition hover/focus |

Tout ajout de var consommée = à documenter ici **dans le même commit**.

### Accessibilité (cible WCAG 2.1 AA)

- [x] Focus visible (ring 2px outline)
- [x] Disabled non-cliquable + cursor not-allowed
- [ ] Tests a11y axe-core via Storybook stories (déjà actifs implicitement via `addon-vitest`, à vérifier explicitement)
- [ ] Mode `iconOnly` impose `aria-label` (lint rule custom à venir)
- [ ] Tests keyboard navigation (Tab, Enter, Espace)

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure et le placeholder initial
- `front/migrate-react-19-ref-prop` — fournit le pattern `ref` as prop appliqué ici
- `architecture/visual-regression-testing` — tests stories Button via Playwright headless
- À venir :
  - `front/spinner-primitive` — préreq pour state `loading` du Button
  - `front/icon-button-pattern` — décline `Button` en mode iconOnly avec lint a11y
  - `architecture/lint-fxp-custom-guards` — guards `aria-label` requis pour iconOnly

## Roadmap d'enrichissement (séquencement)

| Étape | Contenu | Effort | Trigger | Statut |
|---|---|---|---|---|
| 1 | Variant `destructive` + 1 story + 1 test | XS | Premier vrai usage app (confirmation suppression) | ✅ 2026-04-28 |
| 2 | Variant `ghost` | XS | Usage Modal footer / Toolbar | ✅ 2026-04-28 |
| 3 | Taille `lg` + `font-size-lg` token | XS | Page hero CTA | ✅ 2026-04-28 |
| 4 | Slots `iconLeft`/`iconRight` | S | Préreq `front/icon-button-pattern` | — |
| 5 | State `loading` | S | Préreq `front/spinner-primitive` | — |
| 6 | Variant `link` | XS | Usage Banner / inline messages | ✅ 2026-04-28 |
| 7 | Audit a11y formel + tests keyboard | S | Avant 1ʳᵉ release publique | — |

Chaque étape = 1 commit `feat(front): button — <change>`, mise à jour de cette fiche (cocher la case + ajouter dans Historique), update `docs/design-system-registry.md`.

## Historique / décisions

- **2026-04-28** — `Button` placeholder créé dans `architecture/monorepo-bootstrap` (commit `0051aeb`) avec variants minimaux pour valider la chaîne tsup/CSS extract/Storybook.
- **2026-04-28** — Migré vers React 19 ref-as-prop (commit `7179aa9`, feature `front/migrate-react-19-ref-prop`).
- **2026-04-28** — Storybook 10 + addon-vitest activés → 5 stories testées en Chromium headless (commit `180b13c`, `7530694`).
- **2026-04-28** — **Fiche feature dédiée créée** (cette fiche) — extraction depuis bootstrap pour donner une vie propre au composant. Aucun change de code dans cette extraction (`docs:` only).
- **2026-04-28** — **Étape 1 roadmap livrée** : variant `destructive`. Tokens ajoutés dans `packages/tokens/src/tokens.json` (`color.status.danger`, `color.status.danger-hover`, `color.fg.on-danger`) → regénérés via SD dans `dist/css/fxp.css`. `Button.css` enrichi (3 lignes CSS variant + hover). 1 test unitaire + 1 story Storybook. Validation : test 6/6, test:storybook 6/6 (Chromium headless), build/typecheck/lint/boundaries verts.
- **2026-04-28** — **Étapes 2/3/6 roadmap livrées** : variants `ghost` + `link` + taille `lg`. Tokens ajoutés (`color.bg.subtle` pour ghost hover, `font-size.lg` pour size lg) → régénérés via SD. `Button.css` enrichi (3 nouveaux blocs variant + 1 size). cva mis à jour. 4 nouveaux tests + 3 nouvelles stories. Validation complète verte (test 9/9, test:storybook 9/9, build/typecheck/lint/boundaries verts).

## Definition of Done (du placeholder actuel — déjà fait)

- [x] `Button.tsx` exporte un composant fonctionnel React 19 (`ref` prop, pas `forwardRef`)
- [x] Pattern `cva + cn + Slot` conforme à `.ai/rules/tech-react.md`
- [x] CSS scoped, 100% CSS vars `--fxp-*` (aucune valeur en-dur)
- [x] Tests unit Vitest (5 tests passing)
- [x] Stories Storybook (5 stories — Primary, Secondary, Small, Disabled, AsChildLink)
- [x] Tests storybook via Playwright headless (5/5 passing)
- [x] Build dist (`@fxp/react/styles.css` extrait via tsup)
- [x] Accessibilité de base (focus ring, disabled cursor)
- [x] Fiche feature dédiée (cette fiche)

## Definition of Done (cible production-ready)

- [ ] 5 variants livrés (primary, secondary, ghost, destructive, link)
- [ ] 3 tailles livrées (sm, md, lg)
- [ ] State `loading` implémenté (préreq Spinner)
- [ ] Slots `iconLeft`/`iconRight` (préreq icons-package)
- [ ] Tests a11y axe-core verts sur toutes les stories
- [ ] Tests keyboard (Tab, Enter, Espace) explicites
- [ ] Inscrit dans `docs/design-system-registry.md` avec rôle + variants
- [ ] Documentation dans Astro doc-site avec preview live
- [ ] CSS vars consommées documentées dans la doc rendue
