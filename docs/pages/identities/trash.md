---
lang: fr-FR
title: Corbeille
description: Documentation de la page /identities/trash dans Sesame-Orchestrator
---

# Corbeille

Cette page liste les identités supprimées (route `/identities/trash`) et permet de **consulter** ou **restaurer** une identité.

## Contenu de l’interface

- **Table + panneau** : `sesame-core-twopan` avec titre “Suivi des identités supprimées”.
- **Actions ligne** :
  - voir la fiche supprimée → `/identities/trash/<id>`
  - restaurer (`mdi-restore`) si permission `update` sur `/management/identities`

## Données / API

- **Liste** : `GET /management/identities/getdeleted`
- **Restaurer** : `POST /core/backends/undelete` (payload `[id]`)

## Détail d’une identité supprimée (`/identities/trash/:_id`)

- Barre d’actions : retour vers la liste + bouton restaurer.
- Lecture : chargement via `GET /management/identities/<id>` puis affichage en lecture seule via `sesame-core-jsonforms-renderer`.
- Sauvegarde (bouton “disquette”) : `PATCH /management/identities/<id>` (utile pour corriger/compléter avant restauration).

