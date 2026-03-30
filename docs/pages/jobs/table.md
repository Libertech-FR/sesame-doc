---
lang: fr-FR
title: Table jobs
description: Documentation de la page /jobs/table dans Sesame-Orchestrator
---

# Table jobs

Cette page affiche le **journal des jobs** (route `/jobs/table`) sous forme de table paginée, avec filtre d’état et aperçu du résultat.

## Contenu de l’interface

- **Filtre d’état** : select “Filtrer par état” (valeurs typiques : Ok / En erreur).
- **Table** (pagination serveur) :
  - statut
  - n° job
  - identité concernée (chip cliquable si connue)
  - action
  - date
- **Résultat** :
  - bouton par ligne pour afficher/masquer le résultat (`props.row.result`)
  - affichage JSON dans `LazyMonacoEditor`

## Données / API

- **Liste** : `GET /core/jobs` (tri `sort[metadata.lastUpdatedAt]=desc`, pagination via `page/limit/skip`).
- **Filtre d’état** : query `filters[:state]` (ex. `9` = OK, `-1` = erreur).

