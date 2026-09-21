# Pre Release 2.3.13
Ceci est une pre-release, vous pouvez la tester en changeant dans docker-compose.yml le tag **latest** par **main**
```
ghcr.io/libertech-fr/sesame-orchestrator:main
```

## Change logs
https://github.com/Libertech-FR/sesame-orchestrator/compare/2.3.12...2.3.13

https://github.com/Libertech-FR/sesame-orchestrator/compare/2.3.11...2.3.12

https://github.com/Libertech-FR/sesame-orchestrator/compare/2.3.10...2.3.11


## Liste des changements (importants)
### Ajout d'un mode automatique pour la synchronisation des identités
une variable d'environnement a été ajoutée pour passer du mode manuel (mode par defaut) au mode automatique. 
* Manuel : une action de synchronisation manuelle est obligatoire après une modification d'une identité
* Auto : Une modification d'une fiche entrainera une synchronistion immediate de la fiche

**A NOTER** : le mode automatique n'affecte pas les imports qui fonctionnent toujours en mode manuel

Parametrage dans .env:
```
SESAME_IDENTITY_SYNC_MODE=manual|auto
* manual = mode manuel (mode par defaut si la variable n'existe pas)
* auto = mode auto
```
### Pas de message explicite quand il y a une erreur dans l'identité ( à la modification ou creation) 
l'interface affichait 'erreur lors de la sauvegarde de l'identité' sans indiquer où est l'erreur. Maintenant l'erreur est explicitement indiquée

### identities-search-fields.yml non recopié dans config
Le fichier par defaut identities-search-fields.yml n'etait pas copié dans config
si il n'existait pas. 

Pour rappel ce fichier sert à indiquer d'autres champs de recherche pour la recherche textuelle 

Fichier identities-search-fields.yml par défaut : 
```yaml
# Champs de recherche textuelle supplémentaires (en plus des champs par défaut côté API).
# Ne pas dupliquer : inetOrgPerson.cn, givenName, sn, mail, employeeType, employeeNumber.
fields:
  - inetOrgPerson.uid
  - additionalFields.attributes.supannPerson.edupersonprincipalname

```
### correction de detection des doublons
Il etait impossible d'éditer une fiche fusionnée. Une erreur indiquait que luid ou le mail existait déjà

L'exclusion pour l'unicité du mail et de l'uid tiend compte maintenant de l'attribut **destFusionId**

### correction filtre dans la page de la corbeille
Le filtre dans la page de la corbeille ne fonctionnait pas 

### Rafraichissement de la liste dans le panneau gauche des pages
Le rafraichissement de la liste du panneau gauche ne se faisait pas de manière aléatoire. Le probleme est corrigé

### Refactoring des pages des invitations périmées et envoyées
Le pages d'affichage des pages des envois d'invitation sont maintenant fonctionnelles 

Un nouveau mécanisme a été écrit. Une tache cron déclenchée toutes les heures vérifie si les invitations envoyées sont arrivées à écheance et change le champ **initState** à -1

La tâche cron part defaut declenche cette tâche toute les heures

```yaml
tasks:
  - name: "identities-init-expire"
    description: "Expiration des invitations d'initialisation de compte"
    enabled: true
    schedule: "1 * * * *"  # Tous les jours à 08:00
    handler: "identities-init-expire"
    options:
```

### Edition d'une cron crash l'application
L'edition d'une cron lors de **enregistrer** crashait l'application.

Ce point est corrigé.
