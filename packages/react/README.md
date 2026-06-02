# @qhuy/react

Composants React du design system Bobun DS.

Le package est compile en ESM, CJS et types TypeScript. Il est concu pour etre consomme par des apps React 18 ou 19, notamment Next.js, Vite, Remix et Astro.

## Installation

```bash
pnpm add @qhuy/react @qhuy/tokens
```

Avec npm :

```bash
npm install @qhuy/react @qhuy/tokens
```

`react` et `react-dom` sont des peer dependencies. L'application consommatrice doit les installer.

## CSS obligatoire

Importer les CSS une seule fois, au root de l'application, dans cet ordre :

```ts
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
```

Sans ces imports, les composants fonctionnent techniquement mais ne portent pas le theme Bobun DS.

## Usage rapide

```tsx
import { Button, Spinner } from '@qhuy/react'

export function Example() {
  return (
    <div>
      <Button onClick={() => console.log('click')}>Continuer</Button>
      <Button variant="secondary" iconLeft={<span aria-hidden>+</span>}>
        Ajouter
      </Button>
      <Spinner label="Chargement en cours" />
    </div>
  )
}
```

## Next.js App Router

Dans `app/layout.tsx` :

```tsx
import type { ReactNode } from 'react'
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" data-theme="light" data-tenant="acme">
      <body>{children}</body>
    </html>
  )
}
```

Les composants exportes sont des composants client. Dans une app Next.js, utilisez-les dans un fichier avec `"use client"` si vous attachez des handlers comme `onClick`.

## Vite / React

Dans `src/main.tsx` ou `src/App.tsx` :

```tsx
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
```

Puis utilisez les composants normalement :

```tsx
import { Button } from '@qhuy/react'

export function App() {
  return <Button>Action</Button>
}
```

## Astro

Dans un layout Astro ou dans le point d'entree React :

```astro
---
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
---
```

Les composants React interactifs doivent etre rendus avec une directive client Astro (`client:load`, `client:visible`, etc.).

## Theming et tenants

Les composants ne connaissent jamais le tenant actif. Le theming passe uniquement par les variables CSS `--fxp-*` fournies par `@qhuy/tokens` et par les CSS tenant de l'application.

Exemple :

```html
<html data-tenant="acme">
  <head>
    <link rel="stylesheet" href="/_fxp/tenants/acme.css" />
  </head>
</html>
```

Regles cote application :

- Ne pas modifier le markup interne des composants.
- Ne pas copier/coller le code source du package.
- Ne pas surcharger les classes internes comme `.fxp-button`.
- Personnaliser via les variables `--fxp-*`.

## API actuelle

### Button

```tsx
import { Button } from '@qhuy/react'
```

Variants :

- `primary`
- `secondary`
- `outline`
- `destructive`
- `ghost`
- `link`

Tailles :

- `xs`
- `sm`
- `md`
- `lg`
- `icon`
- `icon-xs`
- `icon-sm`
- `icon-lg`

Props utiles :

- Toutes les props natives de `button`, dont `onClick`, `onFocus`, `onBlur`, `disabled`, `aria-*`.
- `asChild` pour composer avec un lien ou une primitive compatible Radix Slot.
- `iconLeft`, `iconRight`.
- `loading`, qui desactive le bouton et expose `aria-busy`.
- `ref` comme prop React 19.

Exemples :

```tsx
<Button onClick={save}>Sauvegarder</Button>
<Button variant="destructive" loading>
  Suppression
</Button>
<Button asChild>
  <a href="/billing">Facturation</a>
</Button>
```

### Spinner

```tsx
import { Spinner } from '@qhuy/react'
```

Tailles :

- `sm`
- `md`
- `lg`

Props utiles :

- `label` pour le nom accessible.
- Props natives de `span` sauf `role`, qui reste `status`.
- `ref` comme prop React 19.

```tsx
<Spinner size="sm" label="Chargement" />
```

## Accessibilite

- `Button` conserve les comportements natifs clavier : Tab, Enter, Space.
- `disabled` et `loading` desactivent l'action.
- `loading` expose `aria-busy="true"`.
- `Spinner` expose `role="status"` et un label accessible.
- Les textes visibles sont fournis par l'application consommatrice.

## Troubleshooting

### Les boutons n'ont pas le bon style

Verifiez que les trois CSS sont importes au root, dans cet ordre :

```ts
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
```

### Le theme tenant ne s'applique pas

Verifiez que :

- `<html data-tenant="...">` correspond au selector du CSS tenant.
- Le CSS tenant est charge apres les CSS de base.
- Le CSS tenant redefinit bien des variables `--fxp-*`.

### Next.js indique un probleme serveur/client

Les composants interactifs doivent etre utilises dans un composant client si vous passez des handlers :

```tsx
'use client'

import { Button } from '@qhuy/react'
```

## Versioning

Le package suit SemVer :

- patch : correction compatible
- minor : ajout compatible
- major : changement breaking

Ne pas utiliser de deep imports. Toute API publique passe par :

```ts
import { Button, Spinner } from '@qhuy/react'
```
