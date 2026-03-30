---
lang: fr-FR
title: SMTP
description: Documentation de la page /settings/smtp dans Sesame-Orchestrator
---

# SMTP

Cette page permet de configurer l’envoi d’emails via un serveur SMTP (route `/settings/smtp`).

## Contenu de l’interface

- Champs : `host`, `emetteur`, `username`, `password` (mot de passe affichable via icône “œil”).
- Bouton : “Sauvegarder les paramètres”.
- Affichage des validations champ par champ (messages d’erreur).

## Permissions

- Les champs et la sauvegarde sont conditionnés à `update` sur `/settings/mailadm`.

## Données / API

- **Lecture** : `GET /settings/mail/get`
- **Sauvegarde** : `POST /settings/mail/set`

