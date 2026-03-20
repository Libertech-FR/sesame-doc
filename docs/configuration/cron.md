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
