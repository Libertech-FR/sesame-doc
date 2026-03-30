---
lang: fr-FR
title: Détails job
description: Documentation de la page /jobs/details dans Sesame-Orchestrator
---

# Détails job

Cette page affiche les jobs sous forme de **timeline** avec défilement infini (route `/jobs/details`).

## Contenu de l’interface

- **Regroupement** : select “Regrouper par” (Jour / Mois / Année) via `jobsBy`.
- **Timeline** :
  - chaque entrée affiche `[jobId]` + nom/prénom (si disponibles)
  - sous-titre : action + date/heure
  - onglets : “Paramètres d'appel” (params) et “Résultat” (result), affichés via `LazyMonacoEditor`.
- **Défilement infini** : charge 10 jobs par page.

## Données / API

- **Chargement incrémental** : `GET /core/jobs/` avec `limit=10`, `skip=(index-1)*10`, tri `sort[metadata.lastUpdatedAt]=desc` + query courante.

