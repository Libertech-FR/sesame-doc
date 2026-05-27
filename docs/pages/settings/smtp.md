---
lang: fr-FR
title: SMTP
description: Documentation de la page /settings/smtp dans Sesame-Orchestrator
---

# SMTP

Cette page permet de configurer l’envoi d’emails via un serveur SMTP (route `/settings/smtp`).

## Contenu de l’interface

- Champs : `host`, `emetteur`, `username`, `password` (mot de passe affichable via icône “œil”).
- **Chemins JSON destinataires** (envoi manuel de templates depuis les identités) :
  - **E-mail personnel** : chemin en notation pointée vers un champ additionnel (ex. `additionalFields.attributes.…`).
  - **E-mail principal** : ex. `inetOrgPerson.mail`.
  - Validés à l’enregistrement sur une identité synchronisée.
- Bouton : “Sauvegarder les paramètres”.
- Affichage des validations champ par champ (messages d’erreur).

Sans au moins un de ces chemins, la modale « Envoyer un mail (template) » affiche un bandeau d’avertissement et bloque l’envoi.

## Permissions

- Les champs et la sauvegarde sont conditionnés à `update` sur `/settings/mailadm`.

## Données / API

- **Lecture** : `GET /settings/mail/get`
- **Sauvegarde** : `POST /settings/mail/set`

## Voir aussi

- [Templates de mails](../../configuration/mail-templates.html) — modèles Handlebars, conventions `mail_*`, API
- [Envoi de mails (templates)](mail-templates.html) — modale depuis les identités

