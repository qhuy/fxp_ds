# Roles tokens FXP

Ce document decrit les responsabilites par role. Il ne doit pas etre duplique par personne individuelle.

## DA

La DA est responsable de :

- Produire l'identite visuelle dans Figma.
- Maintenir les tokens dans Tokens Studio.
- Exporter les livraisons au format DTCG JSON.
- Fournir une capture ou preview de reference.
- Documenter les intentions visuelles propres au tenant.
- Signaler les changements de comportement visuel importants.

La DA ne modifie pas les composants React et ne cible pas leur markup interne.

## Equipe FXP Design System

L'equipe FXP DS est responsable de :

- Valider la structure DTCG.
- Integrer les exports dans `packages/tokens/src/`.
- Maintenir Style Dictionary et les sorties compilees.
- Verifier les contrats `--fxp-*` consommes par `@qhuy/react`.
- Refuser les tokens qui imposent un fork de composant.
- Mettre a jour les fiches `.docs/features/`.

## App consommatrice

L'app consommatrice est responsable de :

- Resoudre le tenant courant cote serveur.
- Charger le CSS tenant correspondant.
- Poser `data-tenant` sur `<html>`.
- Importer une seule fois `@qhuy/tokens/css/fxp.css` et `@qhuy/react/styles.css`.
- Ne pas override le markup, le comportement, ni l'API publique des composants FXP.

## Tenant / metier

Le representant tenant est responsable de :

- Valider que le rendu correspond a son besoin de marque.
- Confirmer les exceptions ou contraintes metier.
- Arbitrer les demandes qui sortent du perimetre tokens.

Une demande qui necessite un nouveau comportement UI devient une PR upstream sur `@qhuy/react`, pas un override tenant.
