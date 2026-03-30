---
lang: fr-FR
title: Identités
description: Documentation de la page /identities dans Sesame-Orchestrator
---

# Identités

Cette page est une **page de transition** (route `/identities`) qui indique que la section a été déplacée et redirige vers `/identities/table`.

## Contenu de l’interface

- Message : “Page d'identité déplacée”
- Indication : “Ajoutez `/table` dans l'URL…”
- Lien vers le nouveau chemin
- Compte à rebours avant redirection automatique

## Comportement

- **Nouveau chemin** : construit en remplaçant `'/identities'` par `'/identities/table'` sur l’URL courante.
- **Redirection** : automatique après 10 secondes (`router.replace(newPath)`).

