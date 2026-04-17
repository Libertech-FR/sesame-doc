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

## Tâche liée aux rappels d’expiration mot de passe

- **Nom de tâche** : `identities-password-expiration-reminder`
- **Défaut** : désactivée (`enabled: false`) dans `defaults/cron/identities-password-expiration-reminder.yml`
- **Planification par défaut** : `0 8 * * *` (tous les jours à 08:00)
- **Handler** : `identities-password-expiration-reminder-send`
- **Commande appelée** : `yarn run console identities password expiration reminder send`
- **Comportement** :
  - lit les jalons/sujets/templates dans `settings.passwordpolicies`
  - envoie les emails pour les jalons correspondants (`J-30`, `J-7`, `J-1`, `J0`, etc.)
  - évite les doublons via l’historique (`passwordExpiryReminderSentDays`)

