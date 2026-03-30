---
lang: fr-FR
title: Accueil
description: Documentation de la page / dans Sesame-Orchestrator
---

# Accueil

Cette page correspond au **dashboard** de Sesame-Orchestrator (route `/`).

## Contenu de l’interface

- **Sections (parts)** : les tuiles sont regroupées par “parties” (titre affiché via une barre `q-bar`).
- **Tuiles de navigation** : chaque tuile est un `q-btn` qui navigue vers `item.path`.
- **Badge optionnel** : une tuile peut afficher un `q-badge` (valeur + couleurs).
- **Menu contextuel** (clic droit) :
  - “Ouvrir”
  - “Ouvrir dans un nouvel onglet”
  - “Debug” (uniquement si le mode debug est actif)

## Comportement / logique

- **Source des entrées** : les menus proviennent de `useMenu(...)` (via le store `useIdentityStateStore()`).
- **Masquage** : une tuile peut être masquée si `hideInDashboard === true`.

