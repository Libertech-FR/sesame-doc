---
lang: fr-FR
title: Health
description: Documentation de la page /settings/health dans Sesame-Orchestrator
---

# Health

Cette page affiche une **vue temps réel** de la santé backend (route `/settings/health`) : statut global, métriques, tendances et support/maintenance.

## Contenu de l’interface

- **Cartes de synthèse** : statut global, services UP, CPU, RSS, mémoire système, cores (et “statut inconnu” si applicable).
- **Tendances** : graphiques CPU/Heap/RSS (via `vue-echarts`).
- **Support & maintenance** :
  - lecture de la clé à partir du DSN Sentry
  - statut (ACTIF / INACTIF / VERIFICATION / INVALIDE)
  - vérification “réelle” via envoi d’une enveloppe Sentry
- **Détails services** : carte par dépendance avec statut UP/DOWN et tableau de métriques, mini-trends.
- **Détails système** : CPU/mémoire (tables + jauges + mini-trends).

## Données / temps réel

- **HTTP** : `GET /core/health`
- **SSE** : écoute de `/api/core/health/sse` (avec reconnexion) pour mises à jour live.

## Notes

- Les métriques sont enrichies (unités, labels “human friendly”, tooltips).

