---
lang: fr-FR
title: Rôles
description: Documentation de la page /settings/roles (et écrans de détail associés) dans Sesame-Orchestrator
---

# Rôles

Cette page documente la section des rôles des paramètres de Sesame-Orchestrator (route `/settings/roles`).

## Contenu de l’interface

- **Table** : composant `sesame-core-twopan` avec titre “Rôles”.
- **Recherche** : filtre en haut de table (`sesame-core-pan-filters`) avec placeholder “Rechercher par username, email, ...”.
- **Actions** :
  - **Créer** un rôle (bouton `+`) si permission `create` sur `/core/roles`
  - **Voir** un rôle (icône “œil”) → `/settings/roles/<id>`
  - **Supprimer** un rôle (menu) si permission `delete` sur `/core/roles` (avec confirmation)
- **Sous-pages** : la zone `after-content` affiche un `nuxt-page` (détails d’un rôle, debug, …).

## Données / API

- **Liste** : chargée via `GET /core/roles` (pagination gérée via `usePagination({ name: 'settings-roles' })`).

## Détail d’un rôle

Les écrans de détail (ex. `/settings/roles/:_id` et `/settings/roles/:_id/debug`) sont regroupés dans cette documentation.

