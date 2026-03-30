---
lang: fr-FR
title: Connexion
description: Documentation de la page /login dans Sesame-Orchestrator
---

# Connexion

Cette page permet de s’authentifier à l’application (route `/login`).

## Contenu de l’interface

- **Formulaire** :
  - champ “Nom d’utilisateur” (`username`)
  - champ “Mot de passe” (`password`)
  - bouton **Se connecter** (avec état `loading` pendant la requête)
- **Visuel latéral** (sur écrans > xs) : image `/config/login-side.png` (fallback `/default.png`).

## Comportement / logique

- **Layout** : `simple-centered`
- **Accès** : réservé aux utilisateurs non authentifiés (`unauthenticatedOnly: true`)
- **Redirection** : une fois authentifié, redirection vers `/`.
- **Action** : `useAuth().loginWith('local', { body: formData })`
- **Erreurs** : notification Quasar “Erreur de connexion …” (timeout 10s).

