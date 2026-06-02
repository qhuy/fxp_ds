# Tokens Bobun DS — contrat de livraison design

Ce dossier est le point d'entree des livraisons tokens fournies par la DA.

Le repo Bobun DS ne produit pas l'identite visuelle finale. Il consomme des exports Tokens Studio au format DTCG, les valide, puis les compile en CSS variables via Style Dictionary.

## Ce que la DA livre

Pour chaque tenant ou mise a jour de theme, la DA fournit :

- Un export Tokens Studio au format DTCG JSON (`$value`, `$type`).
- Le lien Figma source.
- Le tenant cible avec un identifiant stable (`acme`, `stadium`, `nova`, etc.).
- Les modes fournis : `light`, et `dark` si disponible.
- Les tokens semantiques attendus par Bobun DS, pas uniquement des primitives de palette.
- Une capture de reference ou un lien de preview Figma.
- Une version ou date de livraison.
- Un changelog court indiquant ce qui a change.

## Ce que la DA ne livre pas

La DA ne doit pas fournir :

- Du CSS ciblant directement `.fxp-button`, `.fxp-*` ou le markup interne des composants.
- Des composants React, variantes de composants, ou logique UI.
- Des noms de variables hors convention `--fxp-*`.
- Des overrides par application consommatrice.

Les composants Bobun DS restent generiques. La personnalisation passe uniquement par les tokens.

## Format attendu

Les exports doivent utiliser le format DTCG :

```json
{
  "color": {
    "brand": {
      "500": { "$value": "#14357a", "$type": "color" }
    }
  }
}
```

Les noms doivent rester semantiques quand ils exposent une intention publique :

- Bon : `color.brand.500`, `color.bg.default`, `color.fg.default`, `button.radius.md`
- A eviter : `color.blue.500` comme token public tenant, `button.primary.background.custom`

Les palettes primitives peuvent exister dans `core/`, mais les composants consomment des tokens semantiques compiles en CSS vars.

## Structure cible

```txt
packages/tokens/src/
├── README.md
├── ROLES.md
├── tokens.json
├── css/
│   ├── fxp.css
│   └── fxp.dark.css
└── tenants/
    ├── README.md
    ├── _TEMPLATE.md
    └── <tenant>/
        ├── tokens.json
        ├── README.md
        └── preview.png
```

`tokens.json` reste le stub/base courant tant que le pipeline multi-tenant complet n'est pas implemente. Les dossiers `tenants/<id>/` deviennent la source des livraisons tenant lorsque la feature `architecture/tokens-multi-tenant` sera ouverte.

## Validation Bobun DS

Chaque PR tokens doit verifier :

- Le JSON DTCG est valide.
- Les tokens requis par les composants existent.
- Les contrastes des composants critiques restent acceptables.
- `pnpm --filter @qhuy/tokens build` passe.
- `pnpm build` passe au monorepo.
- La fiche tenant est a jour.

## Import cote application

Une app consommatrice importe toujours les styles de base :

```ts
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/react/styles.css'
```

Puis elle charge le CSS tenant au runtime :

```html
<html data-tenant="acme">
  <head>
    <link rel="stylesheet" href="/_fxp/tenants/acme.css" />
  </head>
</html>
```

Le composant React ne connait jamais le tenant actif.
