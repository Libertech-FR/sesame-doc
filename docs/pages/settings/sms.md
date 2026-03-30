---
lang: fr-FR
title: SMS
description: Documentation de la page /settings/sms dans Sesame-Orchestrator
---

# SMS

Cette page permet de configurer l’envoi de SMS via un serveur SMPP (route `/settings/sms`).

## Contenu de l’interface

- Champs : `host`, `systemId`, `password` (mot de passe affichable si autorisé), `sourceAddr`.
- Bouton : “Sauvegarder les paramètres”.
- Affichage des validations champ par champ.

## Permissions

- Les champs et la sauvegarde sont conditionnés à `update` sur `/settings/smsadm`.

## Données / API

- **Lecture** : `GET /settings/sms/get`
- **Sauvegarde** : `POST /settings/sms/set`

