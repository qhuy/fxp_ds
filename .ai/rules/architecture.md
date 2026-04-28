# Rules — architecture

Règles de structure, de layering et de décisions.

## Obligation feature (systématique)

Toute évolution structurelle qui introduit ou modifie un pattern, une couche, un contrat transverse **DOIT** avoir son fichier `.docs/features/architecture/<id>.md` avant DONE.
Squelette : `.docs/FEATURE_TEMPLATE.md`. Enforcement : `.githooks/commit-msg` sur `feat:`.

## Bloquants

- Checklist transverse `.ai/quality/QUALITY_GATE.md#checklist-systématique-anti-oubli` passée, surtout pour tokens, theming, multitenant et contrat DA.
- Feature doc architecture créée / à jour (contrats + Cross-refs vers les scopes impactés).
- Pas de dépendance circulaire entre modules.
- Layering respecté (ex : domain ne dépend pas de transport).
- Toute décision structurelle → ADR dans `.docs/adr/`.

## À éviter

- Nouvelles abstractions sans 3 cas d'usage concrets.
- Refactors hors scope de la tâche en cours.

---

## Architecture cible — monorepo Turbo

Structure verrouillée :

```
fanxp-design-system/
├── packages/
│   ├── tokens/           # @fxp/tokens — DTCG → CSS vars + TS exports
│   ├── react/            # @fxp/react — composants compilés
│   └── icons/            # @fxp/icons — re-export lucide-react ou custom
├── apps/
│   └── docs/             # site Astro (consomme @fxp/react)
├── .changeset/           # Changesets (déjà initialisé)
├── turbo.json            # pipelines build/lint/test
└── package.json          # workspace root (pnpm)
```

Outillage : **Turborepo** + **pnpm workspaces** + **Changesets**.

**Layering** : `apps/*` → dépend de `packages/*`. `packages/react` → dépend de `packages/tokens` et `packages/icons`. **Aucune dépendance inverse** (`tokens` → `react` interdit). `packages/icons` indépendant des deux autres.

## Distribution — NPM compilé

Stratégie A retenue (cf. ADR à créer) : `@fxp/react` est une lib NPM compilée, **pas** un registry copy/paste. "Shadcn-like" = philosophie (Radix + tokens-driven), pas mécanisme de distribution.

| Package | Format | Peer deps |
|---|---|---|
| `@fxp/tokens` | CSS + TS + (interne) Tailwind preset | — |
| `@fxp/react` | ESM + CJS + `.d.ts` | `react@^18 \|\| ^19`, `react-dom` |
| `@fxp/icons` | ESM + CJS + `.d.ts` | `react@^18 \|\| ^19` |

- **Build** : `tsup` (zero-config ESM + CJS + types).
- **`sideEffects: false`** dans chaque `package.json` → tree-shaking agressif.
- **Styles livrés** : `@fxp/react/styles.css` (un seul import à la racine de l'app consommatrice). Pas de Tailwind preset obligatoire pour les consommateurs (couplage fragile). Tailwind utilisé **en interne** au build de `packages/react` uniquement.
- **`"use client"` par défaut** sur tout composant exporté → 100% RSC-compatible. Détail dans `.ai/rules/tech-react.md`.
- **Registry NPM** : à confirmer avant 1ʳᵉ release (interne FXP via Verdaccio/JFrog/GitHub Packages, ou public npmjs sous scope `@fxp`).

## Theming — niveau 3 (multi-tenant DTCG)

**Niveau retenu dès jour 1 : niveau 3.** Cible : 4+ apps consommatrices, 5+ tenants par app, white-label scalable. Le niveau 2 (light/dark mono-tenant) est un cas dégradé du niveau 3.

**Philosophie** : FXP ne fournit pas une *identité* — FXP fournit l'*ossature* (composants + structure tokens). Toute la couche visuelle (couleurs, typo, spacing, radius, shadows, transitions, motion, z-index, opacity, breakpoints) est **tenant-owned** via tokens DTCG.

### Pipeline tokens

```
Tokens Studio (Figma plugin, format DTCG W3C natif)
   ├── core/                        ← FXP-owned (échelles primitives + sémantiques)
   │   ├── color-primitives.json    (gray-50…900, blue-50…900, etc.)
   │   ├── typography-scales.json
   │   ├── spacing-scale.json
   │   ├── radius-scale.json
   │   ├── shadow-scale.json
   │   └── transition-scale.json
   ├── theme-base/                  ← FXP-owned (mappings sémantiques par défaut)
   │   └── semantic.json            (--fxp-color-brand-500 → core.blue.500, etc.)
   └── tenants/                     ← DA + tenant-owned (overrides)
       ├── tenant-acme.json
       ├── tenant-bcd.json
       └── …
            ↓ Style Dictionary build (1 commande, N sorties)
packages/tokens/dist/
    fxp.base.css                    → :root { --fxp-* (defaults) }
    tenants/acme.css                → [data-tenant="acme"] { --fxp-* (overrides) }
    tenants/bcd.css                 → [data-tenant="bcd"] { --fxp-* }
    tenants/_index.json             → manifest { id, name, version, hash } pour discovery runtime
    tokens.ts                       → export const tokens = { … } (typesafe pour code interne)
    tailwind.preset.js              → consommé en interne au build packages/react UNIQUEMENT
```

- **Source de vérité** : Tokens Studio côté DA, exporté en JSON DTCG W3C, committé dans `packages/tokens/src/` via PR.
- **Builder** : [Style Dictionary](https://styledictionary.com) (Salesforce) — standard de facto, supporte natif les `$themes` Tokens Studio (1 base + N tenants → N fichiers CSS scopés).
- **Pas de runtime token resolution** côté `@fxp/react` — tokens compilés au build, exposés en CSS vars. Les composants ne savent rien des tenants.

### Convention de naming CSS vars (figée — rename = breaking major)

```
--fxp-{category}-{role}-{shade-or-state?}
```

Exemples canoniques :

| Catégorie | Exemples |
|---|---|
| `color` | `--fxp-color-brand-500`, `--fxp-color-brand-500-hover`, `--fxp-color-fg-default`, `--fxp-color-fg-on-brand`, `--fxp-color-bg-subtle`, `--fxp-color-status-success`, `--fxp-color-status-danger` |
| `space` | `--fxp-space-0`…`--fxp-space-24` (échelle 0/1/2/3/4/5/6/8/10/12/16/20/24) |
| `radius` | `--fxp-radius-sm`, `--fxp-radius-md`, `--fxp-radius-lg`, `--fxp-radius-full` |
| `shadow` | `--fxp-shadow-sm`, `--fxp-shadow-md`, `--fxp-shadow-lg` |
| `font-family` | `--fxp-font-family-sans`, `--fxp-font-family-mono` |
| `font-size` | `--fxp-font-size-xs`…`--fxp-font-size-2xl` |
| `font-weight` | `--fxp-font-weight-regular`, `--fxp-font-weight-medium`, `--fxp-font-weight-bold` |
| `line-height` | `--fxp-line-height-tight`, `--fxp-line-height-normal`, `--fxp-line-height-loose` |
| `transition` | `--fxp-transition-fast`, `--fxp-transition-base`, `--fxp-transition-slow` |
| `z` | `--fxp-z-dropdown`, `--fxp-z-sticky`, `--fxp-z-modal`, `--fxp-z-popover`, `--fxp-z-toast` |

**Règle d'or** : sémantique > valeur brute. `--fxp-color-bg-default` est meilleur que `--fxp-color-gray-50` (un tenant peut mapper `bg-default` à du sable, du gris, du noir). Les `core/color-primitives` sont privées au pipeline tokens, pas exposées en CSS vars publiques.

**Future-proof** : nouvelles catégories ajoutables sans breaking si la convention `--fxp-{category}-…` est respectée. La règle est inviolable.

### Tenant resolution côté apps (Next.js)

Avec 5+ tenants par app, les CSS de tous les tenants ne peuvent pas vivre dans le bundle. Stratégie standard :

1. **Detection tenant côté serveur** — `middleware.ts` Next.js lit subdomain (`acme.app.fxp.com`), header (`X-Tenant-Id`), ou cookie → injecte `tenantId` dans la request.
2. **Loading dynamique du CSS tenant** — le layout root injecte `<link rel="stylesheet" href="/_fxp/tenants/{tenantId}.css">` (asset servi par CDN, pas dans le bundle JS).
3. **Annotation DOM** — `<html data-tenant={tenantId}>` pour activer le scope `[data-tenant="…"]` du CSS chargé.
4. **Anti-FOUC** — le `<link>` est en `<head>` (rendu serveur), donc présent avant le first paint. Pas de flash.

Le CDN sert les fichiers `tenants/<id>.css` générés par Style Dictionary. Versioning via hash (`tenants/acme.a3f9c2.css`) pour cache busting indépendant du bundle JS.

### Customisation par les apps consommatrices

**Seul mécanisme supporté** : redéfinir `--fxp-*` (via Tokens Studio + Style Dictionary, ou exceptionnellement directement dans le CSS de l'app).

**Pas** d'override de markup, comportement, API publique, ou code source des composants — cf. [`.ai/guardrails.md`](../guardrails.md) non-goal "Customisation au-delà des tokens DTCG". Si un besoin sort de ce périmètre → PR upstream sur `@fxp/react` ou composant applicatif local non-FXP.

### Gouvernance tokens (à formaliser en ADR)

À cadrer avec la DA dès l'amorçage :

- Qui peut écrire dans `core/` (FXP-owned) ? → équipe FXP uniquement.
- Qui peut écrire dans `theme-base/` (FXP-owned) ? → équipe FXP, avec review DA.
- Qui peut écrire dans `tenants/<id>.json` ? → DA, ou tenant lui-même via formulaire/UI ? À trancher.
- Qui valide la PR de bump tokens ? → équipe FXP (cohérence) + DA (fidélité visuelle) à co-review.

## Versioning & breaking changes

- **SemVer strict** : major = breaking, minor = ajout API, patch = bugfix.
- **Changesets** (déjà sous `.changeset/`) : chaque PR avec impact public ajoute un `.changeset/*.md` (level + résumé). Release CI génère le CHANGELOG et bump les versions automatiquement.
- **`MIGRATION.md`** racine repo, mis à jour par major (1-2 h de rédaction → économise 50 h aux apps consommatrices).
- **Cycle de dépréciation** : `@deprecated` JSDoc dans la major en cours → suppression à la major suivante. Les IDE warnent les consommateurs en temps réel.
- **Codemods** (optionnel, pour majors lourdes) : `@fxp/codemods/vN-to-vM` via `jscodeshift`.
- **Coexistence** rare mais possible via alias npm : `npm install @fxp/react-legacy@npm:@fxp/react@1`. **Jamais** de composant suffixé numériquement — anti-pattern formel (cf. `.ai/guardrails.md` non-goal `Button2`).

## Tests & régression visuelle

- **Régression visuelle obligatoire** sur tout composant `@fxp/react` exporté avant 1ʳᵉ release publique. Outil à trancher dans une feature dédiée (`Storybook + Chromatic` vs `Playwright VRT`).
- **Tests unitaires** : Vitest + React Testing Library.
- **Type checking** : `tsc --noEmit` strict en CI, bloquant.

## ADRs (Architecture Decision Records)

Toute décision **structurelle** → fichier sous `.docs/adr/<NNNN>-<slug>.md` (numéroté en continu, jamais renuméroté). Format : Context / Decision / Consequences ([adr.github.io](https://adr.github.io/)).

ADRs à formaliser dès que possible (tâches dédiées) :

- ADR-0001 — Distribution NPM compilé vs registry Shadcn fork
- ADR-0002 — Theming niveau 2 (CSS vars) vs niveau 3 (DTCG transforms)
- ADR-0003 — i18n : aucun dictionnaire FXP, contrainte "no hardcoded strings"
- ADR-0004 — Pipeline tokens Tokens Studio → Style Dictionary
- ADR-0005 — Versioning SemVer + Changesets, anti-pattern `ButtonN`

> Cf. `.ai/guardrails.md` pour les non-goals projet et `.ai/rules/tech-react.md` pour les conventions React (à enrichir, scope `front`).
