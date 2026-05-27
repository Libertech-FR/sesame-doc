---
lang: fr-FR
title: Cron
description: Configuration des tâches cron et variables dynamiques
---

# Configuration cron

Sésame supporte des tâches planifiées via des fichiers YAML dans `configs/cron`.
Chaque tâche définit une planification, un handler console et des options.

## Emplacement

- Côté conteneur : `/data/configs/cron/*.yml`

Au démarrage, si des fichiers par défaut existent dans `defaults/cron`, ils sont copiés dans `configs/cron` lorsqu’ils sont absents.

## Structure d’un fichier cron

Exemple :

```yml
tasks:
  - name: lifecycle-execute
    description: Exécute les règles lifecycle avec trigger.
    enabled: true
    schedule: "*/5 * * * *"
    handler: lifecycle-execute
    options:
      retentionPeriodDays: 30
      executedAt: "{{ date.now }}"
      executedAtIso: "{{ date.isoNow }}"
      monthlyKey: "job-{{ date.nowDate | dateFormat: 'YYYY-MM' }}"
```

### Champs disponibles

- `name` : identifiant unique de la tâche (obligatoire)
- `description` : description de la tâche (obligatoire)
- `enabled` : active/désactive la tâche (obligatoire)
- `schedule` : expression cron (obligatoire)
- `handler` : commande console à exécuter (obligatoire)
- `options` : options transmises au handler (optionnel)
  - objet clé/valeur recommandé
  - peut aussi être un tableau de chaînes selon les handlers

## Exécution du handler

La tâche exécute une commande de type :

```bash
yarn run console <handler> --key='value'
```

Les options booléennes `true` sont passées comme flags (`--flag`), les objets sont sérialisés en JSON.

Exemple :

- `handler: identities-password-expiration-reminder-send`
- commande exécutée : `yarn run console identities password expiration reminder send`

## Tâche par défaut : rappel d’expiration de mot de passe

Un fichier par défaut est fourni pour piloter les rappels d’expiration via cron :

- `defaults/cron/identities-password-expiration-reminder.yml`

Configuration livrée :

```yml
tasks:
  - name: "identities-password-expiration-reminder"
    description: "Send password expiration reminders based on configured day offsets"
    enabled: false
    schedule: "0 8 * * *"
    handler: "identities-password-expiration-reminder-send"
    options:
```

### Activation

1. Copier/ouvrir le fichier dans `configs/cron/identities-password-expiration-reminder.yml`
2. Passer `enabled` à `true`
3. Ajuster `schedule` selon le besoin

Le contenu des emails (jalons, templates, sujets) est défini dans `settings.passwordpolicies` :

- `passwordExpirationReminderSteps` (recommandé)
  - exemple : `{ daysBefore: 30, template: 'password_reminder_30d', subject: 'Votre mot de passe expirera dans 30 jours' }`
  - valeur par défaut : `[]` (aucun jalon actif)
- `passwordExpirationReminderSubject` (sujet par défaut)
- template par défaut backend (si non fourni sur le jalon) : `password_reminder`

## Tâche par défaut : re-check HIBP (Pwned Passwords)

Fichier fourni : `defaults/cron/identities-pwned-recheck.yml`

Configuration livrée :

```yml
tasks:
  - name: "identities-pwned-recheck"
    description: "Re-check HIBP (pwned passwords) for stored password history fingerprints"
    enabled: false
    schedule: "0 3 * * *"
    handler: "identities-pwned-recheck"
    options:
      limit: 500
```

### Prérequis

- Policy : `pwnedRecheckEnabled=true` et historique des mots de passe actif.
- Variable `SESAME_PASSWORD_HISTORY_HIBP_KEY` configurée sur l'orchestrateur.
- Entrées d'historique avec `hibpSha1Enc` renseigné (créées après activation du stockage d'empreintes).

### Activation

1. Ouvrir ou copier le fichier dans `configs/cron/identities-pwned-recheck.yml`.
2. Passer `enabled` à `true`.
3. Ajuster `schedule` si besoin (défaut : tous les jours à 03:00).
4. Optionnel : modifier `options.limit` (nombre max d'entrées traitées par exécution, défaut 500).

Vous pouvez aussi activer la tâche depuis l'interface **Paramètres → Cron** (`/settings/cron`).

### Comportement

- **Handler** : `identities-pwned-recheck` → commande `yarn run console identities pwned recheck`.
- Sélectionne les entrées d'historique ayant une empreinte (`hibpSha1Enc`) dont `hibpLastCheckAt` est absent ou plus ancien que `pwnedRecheckMaxAgeSeconds` (policy).
- Déchiffre l'empreinte, appelle `https://api.pwnedpasswords.com/range/<prefix>` (k-anonymity), met à jour `hibpLastCheckAt` et `hibpPwnCount`.
- Si `hibpPwnCount > 0`, applique `pwnedRecheckAction` : `none` (log uniquement), `notify` (email), `expire` (forcer changement de mot de passe).

### Test manuel

```bash
yarn run console identities pwned recheck --limit=10
```

## Variables dynamiques dans `options`

Les `options` supportent des variables dynamiques évaluées au runtime (à chaque exécution de la tâche).
Les variables doivent être écrites en template Liquid (`{{ ... }}`).

### Variables disponibles

- `date.now` : timestamp courant en millisecondes (number)
- `date.isoNow` : date courante au format ISO (string)
- `date.nowDate` : date courante (Date)
- `date.unix` : timestamp courant en millisecondes (number)
- `date.unixSeconds` : timestamp courant en secondes (number)
- `date.today` : date du jour (`YYYY-MM-DD`)
- `date.yesterday` : date de la veille (`YYYY-MM-DD`)
- `date.tomorrow` : date du lendemain (`YYYY-MM-DD`)

### Syntaxes supportées

- Template simple : `executedAtIso: "{{ date.isoNow }}"`
- Interpolation : `batchId: "cron-{{ date.now }}"`
- Filtre : `day: "{{ date.nowDate | dateFormat: 'YYYY-MM-DD' }}"`

### Filtres Liquid disponibles

- `dateFormat` : format Dayjs
  - `{{ date.nowDate | dateFormat: 'YYYY-MM-DD HH:mm:ss' }}`
- `unixMs` : conversion en timestamp millisecondes
  - `{{ date.nowDate | unixMs }}`
- `unixSeconds` : conversion en timestamp secondes
  - `{{ date.nowDate | unixSeconds }}`

### Moteur de templates

Le rendu des templates est assuré par [LiquidJS](https://liquidjs.com/).
