---
lang: en-US
title: Cycle de vie
description: Gestion du cycle de vie des identités
---

# Gestion du cycle de vie

Sesame comprend une fonctionnalité de gestion du cycle de vie des identités. Elle permet de gérer les transitions de statut automatiquement selon des règles établies.

## Activation 
Par défaut le cycle de vie n'est pas actif. Pour l'activer il suffit d'ajouter un point de montage pour le conteneur sesame-orchestrator
* Dans docker-compose section **sesame-orchestrator** -> **volumes** ajouter 
```
- ./configs/sesame-orchestrator/lifecycle:/data/configs/lifecycle
```
* redémarrer votre container 
```
docker compose up -d
```

## Configuration 
La configuration se fait à l'aide de fichiers yml situé dans le volume (./configs/sesame-orchestrator/lifecycle)

### Noms des fichiers 
Les noms de fichiers dans le répertoire **./configs/sesame-orchestrator/lifecycle**. Les fichiers seront traités par ordre alphabétique.


### Structure d'un fichier cycle de vie

#### **Forme 1** : sélection des identités par une régle 
```yml
identities:
  - sources: ['I', 'W']
    rules: {
     'inetOrgPerson.employeeType': 'TAIGA',
    }
    target: D
```
* **identities** : le fichier doit avoir toujour cette clé en point d'entrée
* **sources** : tableau de declenchement selon le statut sous la forme [ status1, status2, ... ]. Dans l'exemple ci dessus ce lifecyle sera déclencher sur le status I (Inactive) ou W(En Attente)

Rappel des statuts :

| Lettre | statut      |
|--------|-------------|
| O      | Officiel    |
| I      | Inactive    |
| M      | Manuel      |

* **rules** : Requète mongo de selection des identités concernées (voir la documentation Mongo. Vous pouvez tester directement la règle avec un editeur Mongo)

Dans cet exemple seul les identités venant de Taiga seront concernées 

* **target** : statut resultant 
Dans cet exemple toutes les identités qui auront le statut Inactive ou En attente seront passé en statut Supprimé


#### **Forme 2** : séléction par trigger

```yml
identities:
  - sources: ['I']
    rules: {
      'inetOrgPerson.departmentNumber': 'etd',
    }
    trigger: 36d
    target: D

```
La balise **rules** est remplacée par la balise **trigger** . Elle permet de definir un delai entre 2 statuts

* trigger : nombre negatif representant une periode (jour) d'attente entre les deux statuts 
Dans l'exemple ci dessus les identitées etant inactive seront supprimées apres un delai de 36 jours de leur passage en inactive

#### **Avec une mutation** de l'enregistrement
```yml
identities:
  - sources: ['I', 'W']
    rules: {
     'inetOrgPerson.employeeType': 'TAIGA',
    }
    mutation: {
      'inetOrgPerson.cn': 'mutated',
    }
    target: D
```
Il est possible d'ajouter une mutation de l'enregistrement avant le passage au statut cible
Dans l'exemple ci dessus le champ inetOrgPerson.cn sera modifié avant le passage au statut D
