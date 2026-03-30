---
lang: fr-FR
title: Paramètres
description: Documentation de la page /settings dans Sesame-Orchestrator
---

# Paramètres

Cette page sert de conteneur aux écrans de configuration (route `/settings`) et affiche une navigation par onglets.

## Contenu de l’interface

- **En-tête** :
  - titre “Paramètres”
  - boutons d’aide (composant `sesame-core-help-buttons`)
  - bouton de fermeture vers `/`
- **Navigation latérale** :
  - liste d’onglets construite depuis `navItems`
  - un onglet “Santé applicative” (`/settings/health`) est affiché selon le contexte écran + permissions
- **Zone de contenu** :
  - `nuxt-page` pour afficher la sous-page sélectionnée (agents, rôles, smtp, …)

## Permissions (ACL)

Chaque entrée peut être désactivée si l’utilisateur n’a pas les droits requis. Les ACL vérifiées incluent notamment :

- `/core/agents` (Utilisateurs)
- `/core/roles` (Rôles)
- `/settings/passwdadm` (Politique de mot de passe)
- `/settings/mailadm` (Serveur SMTP)
- `/settings/smsadm` (Serveur SMS)
- `/core/cron` (Tâches planifiées)
- `/core/keyrings` (Trousseau de clés API)
- `/core/health` (Santé applicative)

