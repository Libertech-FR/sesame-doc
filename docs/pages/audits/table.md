---
lang: fr-FR
title: Table audits
description: Documentation de la page /audits/table dans Sesame-Orchestrator
---

# Table audits

Cette page affiche l’historique global des changements (route `/audits/table`) avec recherche, filtres, et visualisation de diff.

## Contenu de l’interface

- **Barre d’outils** :
  - titre “Historique global des changements”
  - bouton refresh
- **Filtres** :
  - `sesame-core-pan-filters` (recherche simple : collection, auteur, opération, …)
  - sélection “Collection” (chargée dynamiquement, clearable)
- **Table** : pagination serveur (page/limit tri), chips pour :
  - opération (couleur + label)
  - collection
  - document (cliquable pour certaines collections)
  - aperçu des changements (jusqu’à 4 chips + compteur)
- **Diff** : bouton loupe ouvre un dialog maximisé avec `LazyMonacoDiffEditor` (JSON).

## Données / API

- **Collections** : `GET /core/audits/collections`
- **Liste** : `GET /core/audits` (avec query `page`, `limit`, `search`, `coll`, tri)
- **Détail** : `GET /core/audits/<id>` (via `fetchAuditDetails`)

## Raccourcis

- Si `coll === "Identities"` : lien vers `/identities/table/<documentId>`
- Si `coll === "Agents"` : lien vers `/settings/agents/<documentId>`

