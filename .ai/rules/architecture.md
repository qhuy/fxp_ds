# Rules — architecture

Règles de structure, de layering et de décisions.

## Obligation feature (systématique)

Toute évolution structurelle qui introduit ou modifie un pattern, une couche, un contrat transverse **DOIT** avoir son fichier `.docs/features/architecture/<id>.md` avant DONE.
Squelette : `.docs/FEATURE_TEMPLATE.md`. Enforcement : `.githooks/commit-msg` sur `feat:`.

## Bloquants

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

## Theming & pipeline tokens

Niveau actuel = **niveau 2** (light + dark via CSS vars). Upgrade niveau 3 (multi-tenant DTCG transforms) plus tard sans rewrite — Style Dictionary supporte les deux.

Pipeline :

```
DA / Figma + Tokens Studio plugin (export DTCG W3C natif)
        ↓
packages/tokens/src/tokens.json     (committed via PR par DA)
        ↓ Style Dictionary build
packages/tokens/dist/
    fxp.css                  → :root { --fxp-color-brand-500: ... }
    fxp.dark.css             → [data-theme="dark"] { ... }
    tokens.ts                → export const colors = { brand: { 500: '#...' } }
    tailwind.preset.js       → consommé interne au build packages/react
```

- **Source de vérité** : `packages/tokens/src/tokens.json` au format DTCG W3C.
- **Builder** : Style Dictionary (Salesforce) — standard de facto, plugins pour les 4 sorties.
- **Pas de runtime token resolution** côté `@fxp/react` — tokens compilés au build, exposés en CSS vars.
- **Customisation par les apps** : redéfinir `--fxp-*` dans leur `:root`. **Seul** mécanisme supporté (cf. `.ai/guardrails.md` non-goal "Distribution registry-style").

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
