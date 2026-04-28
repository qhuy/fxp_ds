---
id: lint-format-biome
scope: architecture
title: Lint + Format via Biome (remplace Prettier, prépare ESLint custom rules)
status: active
depends_on:
  - architecture/monorepo-bootstrap
touches:
  - biome.json
  - package.json
  - pnpm-lock.yaml
  - turbo.json
  - .ai/rules/architecture.md
  - .ai/rules/tech-react.md
progress:
  phase: implement
  step: "audit P1.2 — exécution autopilot"
  blockers: []
  resume_hint: "Biome installé en racine, scripts lint/format câblés. Custom FXP guards (no-next-import, no-hardcoded-strings) reportés à une feature dédiée si besoin."
  updated: "2026-04-28"
---

# Lint + Format via Biome

## Objectif

Combler le trou critique identifié à l'audit P1.2 : aucune validation lint en place (`lint: echo "no lint yet"` dans tous les packages). Choix retenu : **Biome 2.x** pour :

- **Performance** : ~10× plus rapide qu'ESLint+Prettier
- **Outil unique** : lint + format intégrés (1 dep, 1 config)
- **Monorepo-aware** natif depuis Biome 2.x
- **Pas d'ambiguïté** des règles "Prettier vs ESLint" sur la même chose

Prettier était déclaré en devDep racine mais sans config — suppression sans coût.

## Comportement attendu

```bash
pnpm lint           # Biome check (lint + format violations) sur tout le repo
pnpm format         # Biome format --write (auto-fix formatage)
pnpm format:check   # Biome format (check seul, CI)
```

Turbo orchestre `lint` au niveau workspace racine (Biome est fast → pas besoin de cache per-package).

## Contrats

### `biome.json` (config workspace racine)

- `formatter` : indent 2 spaces, line width 100, single quote, no semi, trailing comma all
- `linter` : `recommended` + override `noDefaultExport: error` (cf. tech-react.md interdit)
- `vcs.useIgnoreFile: true` → respecte `.gitignore`
- Ignore explicite : `dist`, `.turbo`, `storybook-static`, `node_modules`

### Custom guards FXP (différés)

Les règles spécifiques à FXP listées dans `.ai/rules/tech-react.md` :
- `no-next-import` (interdit `next/*`)
- `no-hardcoded-strings` (composants exposés)
- `no-hardcoded-tokens` (couleurs/sizes en-dur)
- `stories-required` (composant sans story)

Ne sont **pas** implémentées dans cette feature. Biome 2.x a un système de plugins jeune. Options pour plus tard :
- Plugin Biome custom (à explorer)
- ESLint en complément pour ces 4 règles uniquement
- Code review manuel (gate qualité humain)

→ Feature dédiée `architecture/lint-fxp-custom-guards` à créer si/quand le besoin devient bloquant.

## Cross-refs

- `architecture/monorepo-bootstrap` — fournit le squelette workspace + scripts Turbo
- À créer plus tard : `architecture/lint-fxp-custom-guards` (custom rules)

## Historique / décisions

- **2026-04-28** — Audit P1.2 a flaggué l'absence de lint. Décision : Biome 2.x plutôt qu'ESLint+Prettier (performance + outil unique). Custom guards FXP reportés.
- **2026-04-28** — Implémenté : `biome.json` racine, `@biomejs/biome 2.4.13` installé, `prettier` retiré. Scripts `lint`/`lint:fix`/`format`/`format:check` câblés. Auto-fix appliqué (9 fichiers reformatés : import order, trailing commas, quote style cohérent). Rules `monorepo-bootstrap.md` (table outillage) et `tech-react.md` (section Validation) mis à jour. Pas de turbo.json modif (Biome runs en root, pas per-package — plus rapide qu'un lint distribué pour ce volume).

## Definition of Done

- [x] `biome.json` créé à la racine (formatter + linter + ignore + overrides stories/configs)
- [x] `@biomejs/biome` ajouté en devDep racine, `prettier` retiré
- [x] Scripts `lint`, `lint:fix`, `format`, `format:check` câblés au root
- [x] Run au workspace racine (Biome 6ms sur 29 fichiers — pas besoin de turbo per-package)
- [x] `.docs/features/architecture/monorepo-bootstrap.md` table outillage : Prettier→Biome, ESLint→Biome
- [x] `.ai/rules/tech-react.md` section Validation : `pnpm lint` mentionne Biome
- [x] `pnpm lint:fix` auto-applied (9 fichiers reformatés)
- [x] `pnpm lint` vert (0 errors)
- [x] `pnpm typecheck` + `pnpm test` + `pnpm build` toujours verts (6/6 + 6/6 + 4/4)
- [x] Commit `feat(architecture): lint + format via Biome (remplace Prettier)` à venir
