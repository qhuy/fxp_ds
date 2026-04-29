# @qhuy/tokens

Tokens du design system FanXP.

Le package expose les variables CSS `--fxp-*`, les types TypeScript generes et le fichier source `tokens.json`.

## Installation

```bash
pnpm add @qhuy/tokens
```

Avec npm :

```bash
npm install @qhuy/tokens
```

## CSS disponibles

Importer les CSS au root de l'application :

```ts
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
```

Dans une app utilisant `@qhuy/react`, importer d'abord les styles composants :

```ts
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
```

## Contrat des variables

Les variables publiques suivent cette convention :

```txt
--fxp-{category}-{role}-{shade-or-state?}
```

Exemples :

- `--fxp-color-brand-500`
- `--fxp-color-bg-default`
- `--fxp-color-fg-default`
- `--fxp-color-border-default`
- `--fxp-color-focus-ring`
- `--fxp-space-2`
- `--fxp-radius-md`
- `--fxp-button-height-md`

Les apps consommatrices doivent personnaliser l'interface en redefinissant ces variables, pas en ciblant le markup interne des composants.

## Theming light / dark

`fxp.css` fournit les valeurs par defaut.

`fxp.dark.css` fournit les overrides dark mode. L'activation depend de l'application consommatrice et de ses attributs/theme selectors.

Exemple :

```tsx
<html data-theme="dark">
  <body>{children}</body>
</html>
```

## Multi-tenant

Le package fournit la base. Les tenants sont ensuite geres par l'application consommatrice via des CSS additionnels :

```html
<html data-tenant="acme">
  <head>
    <link rel="stylesheet" href="/_fxp/tenants/acme.css" />
  </head>
</html>
```

Exemple de CSS tenant :

```css
[data-tenant='acme'] {
  --fxp-color-brand-500: #123ea8;
  --fxp-color-brand-600: #0d2f82;
  --fxp-button-radius-md: 0.5rem;
}
```

Regles :

- Un tenant modifie uniquement des variables `--fxp-*`.
- Le code React ne doit pas contenir de logique par tenant.
- Le CSS tenant doit etre charge apres les CSS de base.

## Usage TypeScript

```ts
import { tokens } from '@qhuy/tokens'
```

Le contenu exporte sert aux outils internes, previews ou diagnostics. Pour le styling runtime, preferer les CSS variables.

## Source JSON

Le fichier source est expose pour les pipelines d'integration :

```ts
import tokensJson from '@qhuy/tokens/tokens.json'
```

## Contrat DA

La DA doit fournir des tokens semantiques, pas seulement des palettes brutes.

Pour chaque tenant ou theme :

- export Tokens Studio au format DTCG JSON
- tenant cible avec identifiant stable
- valeurs light et dark si le dark mode existe
- etats composants : default, hover, active, focus, disabled, invalid, loading
- lien Figma source
- capture ou preview de reference
- changelog court

La DA ne fournit pas de CSS ciblant `.fxp-*` ou le markup interne des composants.

## Troubleshooting

### Rien ne change quand je modifie un tenant

Verifiez que :

- le selector du CSS tenant matche l'attribut HTML (`data-tenant`)
- le fichier tenant est charge apres `fxp.css`
- les noms de variables commencent par `--fxp-`

### Un composant ne prend pas une couleur

Verifiez que le composant consomme une variable semantique existante. Si une variable manque, elle doit etre ajoutee dans le pipeline tokens puis exposee dans une nouvelle version du package.
