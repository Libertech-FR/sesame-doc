---
lang: fr-FR
title: Export
description: Documentation de la page /identities/export dans Sesame-Orchestrator
---

# Export

Cette page permet d’exporter des identités (route `/identities/export`).

## Contenu de l’interface

- **Bouton** “Exporter” : lance le téléchargement.
- **Sélecteur** de format : `CSV` ou `JSON`.
- **Filtres** : `sesame-core-pan-filters` (mode “complex”).
- **Table** : `q-table` affichant les lignes exportables selon les colonnes calculées.

## Données / API

- **Colonnes disponibles** : `GET /management/identities/validation` (liste des champs schemas → transformée en colonnes de table).
- **Données** : `GET /management/identities?sort[inetOrgPerson.cn]=asc` avec `limit: 9999` + query courante (hors `read`).

## Export

- **CSV** : génération côté client (séparateur `;`, séparateur tableau `,`, fin de ligne `\\r\\n`), téléchargement `sesame-export.csv`.
- **JSON** : téléchargement brut du payload API (avec `total`, `data`, …) en `sesame-export.json`.

