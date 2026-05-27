---
lang: fr-FR
title: Politique mots de passe
description: Documentation de la page /settings/password-policy dans Sesame-Orchestrator
---

# Politique mots de passe

Cette page permet de configurer la **politique de mot de passe** (route `/settings/password-policy`).

## Contenu de l’interface

- **Paramètres numériques** : longueur minimale, entropie minimale, complexité souhaitée, TTL code reset, TTL token init.
- **Toggles** : majuscule/minuscule/chiffre/spéciaux, vérification HIBP (pwned), stockage des empreintes HIBP, reset par SMS.
- **Re-check HIBP** : âge max avant re-check (`pwnedRecheckMaxAgeSeconds`, affiché en durée lisible).
- **Attributs identité** : attribut mail alternatif, attribut mobile, URL de redirection.
- **Rappels d’expiration** :
  - `passwordExpirationReminderSteps` : liste des jalons (par défaut vide)
  - `passwordExpirationReminderSubject` : sujet **par défaut** (fallback si un jalon n’a pas de sujet)
  - template de jalon optionnel (si vide, fallback `password_reminder`)
  - template par défaut implicite côté backend : `password_reminder`
- **Sauvegarde** : bouton “Sauvegarder les paramètres”.

## Notes d’implémentation

- Le déclenchement des rappels d’expiration n’est **pas** piloté par un booléen dans la policy.
- L’activation/désactivation se fait via la tâche cron `identities-password-expiration-reminder` (voir page `/settings/cron`).
- Le champ `passwordExpirationReminderDaysBefore` est conservé en mode legacy (fallback).
- Les anciens champs `passwordExpirationReminderDaysBeforeList`, `passwordExpirationReminderTemplatesByDays` et `passwordExpirationReminderSubjectsByDays` restent compatibles mais la configuration recommandée est `passwordExpirationReminderSteps`.

## Permissions

- Tous les champs et la sauvegarde sont conditionnés à `update` sur `/settings/passwdadm`.

## Données / API

- **Lecture** : `GET /settings/passwdadm/getpolicies`
- **Sauvegarde** : `POST /settings/passwdadm/setpolicies` (avec gestion des validations)
- **Statut clé HIBP** : `GET /settings/passwdadm/hibp-keystatus` (valide la présence/format de `SESAME_PASSWORD_HISTORY_HIBP_KEY`)

## Vérification HIBP à la saisie (`checkPwned`)

Le toggle **« Vérifier les mots de passe compromis »** active le contrôle en temps réel via l’API [Have I Been Pwned – Pwned Passwords](https://haveibeenpwned.com/Passwords) (k-anonymity : seuls les 5 premiers caractères du hash SHA-1 sont envoyés).

- Si le mot de passe apparaît dans une fuite connue, il est **refusé** à la création/changement.
- Ce contrôle ne nécessite **pas** de clé `SESAME_PASSWORD_HISTORY_HIBP_KEY`.

## Stockage des empreintes HIBP (`pwnedRecheckEnabled`)

Le toggle **« Stockage des empreintes HIBP (Pwned Passwords) »** permet de conserver, dans l’**historique des mots de passe**, une empreinte chiffrée utilisable pour un **re-check planifié** (sans renvoyer le mot de passe en clair à chaque exécution du cron).

### Prérequis

1. **Historique des mots de passe activé** (`passwordHistoryEnabled=true`, défaut côté API). Sans historique, aucune entrée n’est enregistrée et aucune empreinte n’est stockée.
2. **Vérification HIBP activée** (`checkPwned=true`) : le toggle empreintes est désactivé sinon.
3. **Clé de chiffrement serveur** `SESAME_PASSWORD_HISTORY_HIBP_KEY` définie et valide (32 octets, en hex 64 caractères ou en base64). L’interface interroge `GET /settings/passwdadm/hibp-keystatus` et grise le toggle si la clé est absente ou invalide.
4. **Tâche cron** `identities-pwned-recheck` activée pour exécuter le re-check (voir [Configuration cron](../../configuration/cron.html#tache-par-defaut-re-check-hibp-pwned-passwords)).

### Comment activer (résumé)

1. Générer une clé (ex. depuis le dépôt orchestrator) :
   ```bash
   make hibp-key-hex
   # ou
   make hibp-key-b64
   ```
2. Ajouter la variable dans l’environnement de **sesame-orchestrator** (fichier `.env` ou secrets) :
   ```env
   SESAME_PASSWORD_HISTORY_HIBP_KEY=<valeur_generee>
   ```
3. Redémarrer l’orchestrateur.
4. Dans **Paramètres → Politique de mot de passe** :
   - activer **« Vérifier les mots de passe compromis »** ;
   - activer **« Stockage des empreintes HIBP »** ;
   - ajuster **« Âge max avant re-check HIBP »** si besoin (défaut : 7 jours) ;
   - sauvegarder.
5. Dans **Paramètres → Cron**, activer la tâche `identities-pwned-recheck` (ou éditer `configs/cron/identities-pwned-recheck.yml`).

### Paramètres associés (policy)

| Champ | Rôle |
| --- | --- |
| `pwnedRecheckEnabled` | Active le stockage de `hibpSha1Enc` à chaque enregistrement d’historique |
| `pwnedRecheckMaxAgeSeconds` | Délai minimum entre deux re-checks HIBP pour une même entrée (défaut : 604800 = 7 jours) |
| `pwnedRecheckAction` | Action si compromis détecté au cron : `none`, `notify`, `expire` (l’UI force `none` à la sauvegarde actuelle) |

### Ce qui est stocké (sans exposer le mot de passe)

Pour chaque changement enregistré dans l’historique :

1. Hash du mot de passe (Argon2) pour l’anti-réutilisation — **jamais exposé dans l’UI**.
2. Si `pwnedRecheckEnabled` : `SHA-1(mot de passe)` puis chiffrement **AES-256-GCM** → champ Mongo `hibpSha1Enc` (format `iv.tag.cipher` en base64).

L’API liste d’historique (`GET /management/password-history/:identityId`) ne renvoie **pas** `hibpSha1Enc` : seulement `hasHibpFingerprint`, `hibpLastCheckAt`, `hibpPwnCount`.

### Consultation côté identité

Dans la fiche identité, onglet **Historique des mots de passe** : colonne **HIBP** avec les états possibles :

- **Empreinte non stockée** : entrée créée avant activation ou échec de chiffrement ;
- **Non vérifié** : empreinte présente, en attente du cron ;
- **OK** / **Pwned (N)** : résultat du dernier re-check (`hibpPwnCount` = occurrences dans la base HIBP).

Voir aussi la configuration détaillée : [Configuration de la politique de mot de passe](../../configuration/config-gestion-mdp.html#verification-hibp-et-empreintes-planifiees).

