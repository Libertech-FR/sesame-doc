---
lang: fr-FR
title: Identités obsolètes
description: Documentation de la page /identities/outdated dans Sesame-Orchestrator
---

# Identités obsolètes

Cette page liste les identités dont **l’invitation n’est plus valide** (route `/identities/outdated`) et permet de **réenvoyer** l’invitation.

## Contenu de l’interface

- **Table** `q-table` (sélection multiple).
- **Action** “Réenvoyer le mail d'invitation” activée uniquement si au moins une ligne est sélectionnée.

## Données / API

- **Liste** : `GET /management/passwd/ioutdated`
- **Ré-envoi invitation** (sélection ou tout) : `POST /management/passwd/initmany` (body `{ ids }`)
- **Colonnes** : construites au `mounted()` via `GET /management/identities/validation` (construction dynamique à partir des schémas).

