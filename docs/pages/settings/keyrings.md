---
lang: fr-FR
title: Keyrings
description: Documentation de la page /settings/keyrings dans Sesame-Orchestrator
---

# Keyrings

Cette page liste et permet de supprimer des **clés API** (route `/settings/keyrings`).

## Contenu de l’interface

- **Table** : `sesame-core-twopan` (titre “Trousseau de clés API”).
- **Recherche** : `sesame-core-pan-filters` (nom, rôle, réseaux autorisés…).
- **Action** : suppression d’une clé (icône poubelle) si permission `delete` sur `/core/keyrings`.

## Données / API

- **Liste** : `GET /core/keyrings` (pagination via `usePagination({ name: 'settings-keyrings' })`)
- **Suppression** : `DELETE /core/keyrings/<id>` (avec confirmation)

