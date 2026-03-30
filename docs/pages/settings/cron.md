---
lang: fr-FR
title: Cron
description: Documentation de la page /settings/cron dans Sesame-Orchestrator
---

# Cron

Cette page permet de gérer les **tâches planifiées** (route `/settings/cron`) : activer/désactiver, lancer immédiatement, consulter les logs.

## Contenu de l’interface

- **Table** : `sesame-core-twopan` (titre “Tâches Cron”).
- **Actions par tâche** :
  - activer/désactiver (`PATCH /core/cron/<name>/enabled`) — permission `update` sur `/core/cron`
  - exécuter immédiatement (`POST /core/cron/<name>/run-immediately`) — permission `update` sur `/core/cron`
  - consulter les logs (dialog maximisé) — permission `read` sur `/core/cron`
- **Viewer de logs** :
  - lecture “tail” (par défaut 250 lignes)
  - auto-refresh (toutes les 60s)
  - chargement progressif en scrollant en haut (jusqu’à 5000 lignes)
  - affichage via `LazyMonacoEditor` (shell, lecture seule)

## Données / API

- **Liste** : `GET /core/cron`
- **Logs** : `GET /core/cron/<name>/logs?tail=<n>`

