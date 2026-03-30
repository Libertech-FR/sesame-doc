---
lang: fr-FR
title: Table des identités
description: Documentation de la page /identities/table (et écrans de détail associés) dans Sesame-Orchestrator
---

# Table des identités

Cette page documente l’écran de liste des identités (route `/identities/table`) et regroupe aussi la documentation des écrans de détail.

## Liste des identités (`/identities/table`)

### Contenu de l’interface

- **Table + panneau** : composant `sesame-core-twopan` (titre “Gestion des identités”).
- **Filtres** : `sesame-core-pan-filters` (mode “complex”), placeholder “Rechercher par nom, prénom, email, …”.
- **Actions de masse** (sur sélection multiple) :
  - “Mettre à synchroniser” (`mdi-sync`)
  - “Envoyer le mail d'invitation” (`mdi-email-arrow-right`)
  - “Supprimer en masse” (`mdi-delete`)
  - “Nettoyer la sélection” (`mdi-cancel`)
- **Création** : bouton `+` vers `/identities/table/<NewTargetId>?schema=inetOrgPerson` (soumis à permission `create` sur `/management/identities`).
- **Actions ligne** :
  - “Voir” → `/identities/table/<id>`
  - menu (tabs) : Fiche identité, Historique des changements, Journaux des tâches, Historique des cycles de vie, Debug (si mode debug)

### Données / API

- **Liste** : `GET /management/identities` (pagination via `usePagination()`).
- **Changement d’état** : `PATCH /management/identities/state` (mise à jour par lot).
- **Initialisation mot de passe (invitation)** : `POST /management/passwd/initmany`.
- **Suppression (backend)** : `POST /core/backends/delete`.

## Détail d’une identité (`/identities/table/:_id`)

- **En-tête** : retour vers la liste + affichage de l’état + nom (`inetOrgPerson.cn`) + type (`inetOrgPerson.employeeType`).
- **Onglets** : l’écran de détail reprend les “tabs” (fiche/audits/jobs/lifecycle/debug) quand l’identité n’est pas “nouvelle” et selon permissions.
- **Chargement** : `GET /management/identities/<id>` (404 si inexistante).
- **Création** : si `:_id === NewTargetId`, l’écran initialise une identité vide (state `TO_CREATE`) et permet la saisie.


