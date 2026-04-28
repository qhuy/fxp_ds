---
id: turborepo-boundaries
scope: architecture
title: Turborepo Boundaries — enforce le layering documenté
status: active
depends_on:
  - architecture/monorepo-bootstrap
touches:
  - turbo.json
  - packages/tokens/turbo.json
  - packages/react/turbo.json
  - packages/icons/turbo.json
  - apps/docs/turbo.json
progress:
  phase: implement
  step: "audit P2.3 — exécution autopilot"
  blockers: []
  resume_hint: "Tags par package + rules root. Layering enforcé : tokens/icons indépendants, react ↛ apps."
  updated: 2026-04-28
---

# Turborepo Boundaries

## Objectif

Audit P2.3 a relevé que le layering documenté dans `.ai/rules/architecture.md` ("layering") n'a aucun enforcement runtime. Si un dev ajoute par erreur `import x from '@fxp/docs'` dans `packages/react/`, rien ne le bloque.

**Turborepo Boundaries** (Turbo 2.x) lit la dépendance graph + tags par package + rules root pour :
- Détecter imports cross-package interdits
- Détecter deps déclarées mais non utilisées (cleanup)
- Détecter imports directs sans dep déclarée

## Comportement attendu

```bash
pnpm exec turbo boundaries
# → Checked N files in K packages, no issues found
```

Tentative d'ajouter `@fxp/docs` comme dep de `packages/react/` → **erreur boundaries** au CI/local.

## Contrats

### Tags par package (per-package `turbo.json`)

| Package | Tag | Sens |
|---|---|---|
| `@fxp/tokens` | `tokens-layer` | Couche basse — rien au-dessus n'a besoin de FXP, pas de deps cross-package |
| `@fxp/icons` | `icons-layer` | Pair de tokens, pas de deps cross-package |
| `@fxp/react` | `components-layer` | Peut consommer `tokens-layer` + `icons-layer`, jamais `app-layer` |
| `@fxp/docs` | `app-layer` | Top — consomme tout |

### Rules root (`turbo.json`)

```json
"boundaries": {
  "tags": {
    "tokens-layer": {
      "dependencies": { "deny": ["components-layer", "icons-layer", "app-layer"] }
    },
    "icons-layer": {
      "dependencies": { "deny": ["tokens-layer", "components-layer", "app-layer"] }
    },
    "components-layer": {
      "dependencies": { "deny": ["app-layer"] }
    }
  }
}
```

`app-layer` (docs) n'a **pas** de restriction sortante — c'est le consommateur final.

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit la structure packages/apps que cette feature enforce.
- `.ai/rules/architecture.md` section "Layering" — décrit la règle ; cette feature l'enforce techniquement.

## Historique / décisions

- **2026-04-28** — Audit P2.3 a flaggué l'absence d'enforce. Décision : tags `*-layer` cohérents avec architecture.md. Rules deny pure (pas allow) car app-layer doit garder toutes deps possibles.
- **2026-04-28** — Implémenté : 4 fichiers `turbo.json` per-package créés (`extends: ['//']` + `tags`). Root `turbo.json` enrichi avec `boundaries.tags`. Script racine `pnpm boundaries` câblé. `turbo boundaries` vert (37 files in 4 packages, no issues found).

## Definition of Done

- [x] Tags ajoutés dans 4 fichiers `turbo.json` par-package (créés)
- [x] Rules `boundaries.tags` ajoutées dans root `turbo.json`
- [x] Script racine `pnpm boundaries` câblé
- [x] `pnpm boundaries` vert (no issues found)
- [x] Build/test/typecheck/lint inchangés (build 4/4, typecheck 6/6)
- [x] Commit `feat(architecture): turbo boundaries (enforce layering tokens/icons/react/app)` à venir
