# fanxp-design-system — Guardrails agent

> Ce que l'agent doit savoir pour rester dans les rails.
> Pour la vision/utilisateurs/architecture : voir [README](../README.md).
> Ré-exécuter `/aic-project-guardrails` pour réviser.

## Non-goals (explicitement hors-scope)

L'agent ne doit *pas* proposer ou implémenter :

- **Production de l'identité visuelle** (logo, couleurs marque, typographies) — *fournie par la DA, ce repo consomme uniquement (Figma + Tokens Studio).*
- **Wrappers non-React** : Vanilla Web Components, Vue, Svelte, Angular — *cible exclusive React 18+.*
- **i18n côté FXP** : aucun dictionnaire fourni, aucune dépendance i18n (`react-aria/i18n`, `formatjs`, `i18next`, etc.) — *chaque app consommatrice gère sa propre stratégie.*
- **Strings user-visible hardcodés** dans les composants — *contrainte induite par le no-i18n : tout texte affichable doit transiter par une prop (string ou ReactNode), ex. `emptyMessage`, `previousLabel`, `labelTemplate`. Exception tolérée : strings `aria-*` avec fallback sensé.*
- **RTL, locales hors LTR** — *flow LTR par défaut, pas de logical CSS properties imposées.*
- **WCAG AAA, conformité RGAA** — *cible WCAG 2.1 AA via Radix UI primitives. Plus haut = trop coûteux pour le ROI.*
- **Browser legacy** : IE, Safari < 2 dernières versions, navigateurs hors evergreen — *aucune polyfill stratégique livrée.*
- **Templates / pages complètes** — *le DS livre des composants atomiques + composites + patterns ; les pages, layouts métier et flows sont du ressort des apps consommatrices.*
- **Customisation au-delà des tokens DTCG** par les apps consommatrices — *les apps overrident exclusivement les CSS vars `--fxp-*` (couleurs, typo, spacing, radius, shadows, transitions, et catégories à venir). Ni le markup interne, ni le comportement, ni l'API publique des composants ne sont customisables sans PR upstream. Le theming multi-tenant (niveau 3) via Tokens Studio + Style Dictionary est, à l'inverse, le mode standard du projet (4+ apps consommatrices, 5+ tenants par app — cf. `.ai/rules/architecture.md`).*
- **SLA contractuel mainteneur, deprecation policy stricte** — *composants simples, cadence opportuniste, pas d'engagement formel envers les apps consommatrices.*
- **Composants suffixés numériquement** (`Button2`, `Button3`, `ButtonV2`) — *breaking change = SemVer major + entry MIGRATION.md + Changesets. Jamais de nouveau composant pour briser une API.*
- **Distribution registry-style copy/paste** (mécanisme original Shadcn CLI) — *NPM compilé exclusif (`@fxp/react`, `@fxp/tokens`). "Shadcn-like" décrit la philosophie (Radix dessous, tokens-driven), pas le mécanisme de distribution.*

## Glossaire métier

Vocabulaire à utiliser tel quel :

- **FXP** : nom de l'entreprise / brand portée par ce design system. *(à préciser si acronyme spécifique — ex. `FanXp`)*
- **DA** : Direction Artistique — équipe externe à ce repo qui produit l'identité visuelle, les maquettes Figma et les tokens DTCG (via Tokens Studio). Ce repo *consomme* leurs livrables.
- **DS** : Design System — l'ensemble cohérent {tokens DTCG + composants React + patterns UX} livré par ce repo aux apps consommatrices via NPM.

---
*Généré/mis à jour par `/aic-project-guardrails` le 2026-04-28.*
