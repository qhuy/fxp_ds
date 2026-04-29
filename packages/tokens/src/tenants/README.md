# Tenants tokens

Chaque tenant doit avoir un dossier dedie sous `packages/tokens/src/tenants/<tenant-id>/`.

L'identifiant tenant est stable, en kebab-case, sans espace ni majuscule. Il sert a generer :

- Le scope DOM : `[data-tenant='<tenant-id>']`
- Le fichier CSS compile : `dist/css/tenants/<tenant-id>.css`
- Le chemin CDN ou applicatif : `/_fxp/tenants/<tenant-id>.css`

## Dossier attendu

```txt
tenants/<tenant-id>/
├── tokens.json
├── README.md
└── preview.png
```

`preview.png` est optionnel mais recommande pour faciliter la revue.

## Checklist de livraison

Avant review FXP, chaque tenant doit fournir :

- [ ] `tokens.json` exporte depuis Tokens Studio en DTCG.
- [ ] `README.md` rempli depuis `_TEMPLATE.md`.
- [ ] Lien Figma source.
- [ ] Modes fournis listes (`light`, `dark` si disponible).
- [ ] Version/date de livraison.
- [ ] Changelog court.
- [ ] Capture ou preview de reference.
- [ ] Aucun CSS ciblant les classes internes FXP.

## Exemple de CSS compile attendu

La DA ne fournit pas ce CSS directement. Il est genere par Style Dictionary.

```css
[data-tenant='acme'] {
  --fxp-color-brand-500: #14357a;
  --fxp-color-brand-500-hover: #0d265b;
  --fxp-color-fg-on-brand: #ffffff;
}
```

## Regle de compatibilite

Un tenant peut changer des valeurs de tokens. Il ne peut pas renommer ou supprimer des tokens publics sans coordination FXP, car ces noms sont consommes par `@qhuy/react`.
