---
lang: fr-FR
title: Table des cycles de vie
description: Documentation de la page /lifecycles/table dans Sesame-Orchestrator
---

# Table des cycles de vie

Cette page affiche les **derniers cycles déclenchés** (route `/lifecycles/table`) avec filtres et détail JSON.

## Contenu de l’interface

- **Filtre** “Filtrer par cycle” (select clearable).
- **Table** (pagination serveur) :
  - identité (chip cliquable vers la fiche identité)
  - cycle déclenché (nom + icône/couleur)
  - date
- **Détail** :
  - bouton “+/-” par ligne
  - JSON complet affiché dans `LazyMonacoEditor`.

## Données / API

- **Liste** : `GET /management/lifecycle/recent` (tri `sort[date]=desc`, pagination via `page/limit`).
- **Libellés cycles** : `useIdentityLifecycles()` (nom, icône, couleur, liste des cycles).

