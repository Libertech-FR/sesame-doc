---
lang: fr-FR
title: Politique mots de passe
description: Documentation de la page /settings/password-policy dans Sesame-Orchestrator
---

# Politique mots de passe

Cette page permet de configurer la **politique de mot de passe** (route `/settings/password-policy`).

## Contenu de l’interface

- **Paramètres numériques** : longueur minimale, entropie minimale, complexité souhaitée, TTL code reset, TTL token init.
- **Toggles** : majuscule/minuscule/chiffre/spéciaux, vérification pwned, reset par SMS.
- **Attributs identité** : attribut mail alternatif, attribut mobile, URL de redirection.
- **Sauvegarde** : bouton “Sauvegarder les paramètres”.

## Permissions

- Tous les champs et la sauvegarde sont conditionnés à `update` sur `/settings/passwdadm`.

## Données / API

- **Lecture** : `GET /settings/passwdadm/getpolicies`
- **Sauvegarde** : `POST /settings/passwdadm/setpolicies` (avec gestion des validations)

