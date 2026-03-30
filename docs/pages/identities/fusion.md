---
lang: fr-FR
title: Fusion
description: Documentation de la page /identities/fusion dans Sesame-Orchestrator
---

# Fusion

Cette page aide à **détecter et fusionner des identités en double** (route `/identities/fusion`).

## Contenu de l’interface

- **Table** “Détection des identités en double” listant des paires d’identités.
- **Filtre** “Filtrer les fusions ignorées” (`includeIgnored`).
- **Actions sur une paire** :
  - éditer identité 1 / identité 2 (ouvre un formulaire)
  - fusionner (dans un sens ou dans l’autre)
  - supprimer une identité
  - ignorer / réactiver l’alerte de fusion (toggle)

## Edition

L’édition se fait dans un **dialog plein écran** avec :

- un rendu `sesame-core-jsonforms-renderer` (schema `inetOrgPerson` + onglets `additionalFields.attributes[...]`)
- un bouton **Enregistrer**.

## Données / API

- **Liste des doublons** : `GET /management/identities/duplicates` (query = `route.query`).
- **Ignorer** : `POST /management/identities/ignore-fusion` (body `{ ids }`).
- **Réactiver** : `POST /management/identities/unignore-fusion` (body `{ ids }`).
- **Fusion** : `POST /management/identities/fusion` (body `{ id1, id2 }`), puis ouverture de l’identité résultante.
- **Chargement identité** (édition) : `GET /management/identities/<id>`.
- **Sauvegarde identité** (édition) : `PATCH /management/identities/<id>`.
- **Suppression** : `POST /core/backends/delete` (payload `[id]`).

