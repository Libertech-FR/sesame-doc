---
lang: fr-FR
title: Agents
description: Documentation de la page /settings/agents (et écrans de détail associés) dans Sesame-Orchestrator
---

# Agents

Cette page documente la section des agents des paramètres de Sesame-Orchestrator (route `/settings/agents`).

## Contenu de l’interface

- **Table** : `sesame-core-twopan` (titre “Agents”).
- **Recherche** : `sesame-core-pan-filters` (placeholder “Rechercher par username, email, ...”).
- **Actions** :
  - **Créer** (bouton `+`) si permission `create` sur `/core/agents`
  - **Voir** (œil) → `/settings/agents/<id>`
  - **Supprimer** (menu) si permission `delete` sur `/core/agents` (avec confirmation)
- **Sous-pages** : `nuxt-page` (détail, debug, …)

## Données / API

- **Liste** : `GET /core/agents` (pagination via `usePagination({ name: 'settings-agents' })`)
- **Suppression** : `DELETE /core/agents/<id>`

## Détail d’un agent

Les écrans de détail (ex. `/settings/agents/:_id` et `/settings/agents/:_id/debug`) sont regroupés dans cette documentation.

