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
- **Rappels d’expiration** :
  - `passwordExpirationReminderDaysBeforeList` : jalons en jours avant expiration (ex: `[30, 7, 1, 0]` ; `0` = jour d’expiration)
  - `passwordExpirationReminderTemplatesByDays` : template mail par jalon (clé = jour)
  - `passwordExpirationReminderTemplate` : template fallback
  - `passwordExpirationReminderSubjectsByDays` : sujet par jalon (clé = jour)
  - `passwordExpirationReminderSubject` : sujet fallback
- **Sauvegarde** : bouton “Sauvegarder les paramètres”.

## Notes d’implémentation

- Le déclenchement des rappels d’expiration n’est **pas** piloté par un booléen dans la policy.
- L’activation/désactivation se fait via la tâche cron `identities-password-expiration-reminder` (voir page `/settings/cron`).
- Le champ `passwordExpirationReminderDaysBefore` est conservé en mode legacy (fallback), mais la configuration recommandée est `passwordExpirationReminderDaysBeforeList`.

## Permissions

- Tous les champs et la sauvegarde sont conditionnés à `update` sur `/settings/passwdadm`.

## Données / API

- **Lecture** : `GET /settings/passwdadm/getpolicies`
- **Sauvegarde** : `POST /settings/passwdadm/setpolicies` (avec gestion des validations)

