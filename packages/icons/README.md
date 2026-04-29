# @qhuy/icons

Package d'icones React du design system FanXP.

La version `0.1.0` publie un package resolvable et compile, mais le set d'icones fonctionnel est encore a alimenter. Le package existe deja pour stabiliser l'installation npm et permettre aux apps consommatrices d'ajouter la dependance sans changer plus tard leur architecture.

## Installation

```bash
pnpm add @qhuy/icons
```

Avec npm :

```bash
npm install @qhuy/icons
```

`react` est une peer dependency. L'application consommatrice doit l'installer.

## Etat actuel

Export disponible en `0.1.0` :

```ts
import { __PLACEHOLDER__ } from '@qhuy/icons'
```

Cet export est volontairement temporaire. Les icones publiques arriveront dans une version ulterieure avec des exports nommes stables.

## Contrat cible

Les futures icones seront exposees via des named exports :

```tsx
import { PlusIcon, DownloadIcon } from '@qhuy/icons'
```

Regles cible :

- icones React tree-shakables
- pas de deep imports
- taille et couleur pilotables par `currentColor` et CSS
- props SVG natives pass-through
- accessibilite geree par l'application (`aria-hidden` pour decoratif, label pour informatif)

## Usage recommande a terme

Icone decorative :

```tsx
<PlusIcon aria-hidden="true" />
```

Icone informative :

```tsx
<DownloadIcon role="img" aria-label="Telecharger" />
```

Dans un bouton `@qhuy/react` :

```tsx
import { Button } from '@qhuy/react'
import { PlusIcon } from '@qhuy/icons'

<Button iconLeft={<PlusIcon aria-hidden="true" />}>Ajouter</Button>
```

## Versioning

Quand les vraies icones seront ajoutees :

- ajout d'une icone = minor
- correction d'une icone sans changement d'API = patch
- suppression ou rename d'une icone = major

Ne pas dependre de l'export `__PLACEHOLDER__` dans du code applicatif durable.
