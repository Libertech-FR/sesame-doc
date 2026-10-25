# Release 2.4.0
Ceci est une release

**sesame-gestion-mdp** doit être mis à jour en dernière version 0.2.2 pour la vulnérabilité [CVE-2026-111497](https://www.tenable.com/cve/CVE-2026-111497)

Mettre à jour le Makefile aussi par la commande :

```
make sesame-self-update
```
## Change logs


## Liste des changements (importants)

### Mise à jour de sécurité
Mise à jour de nodejs pour la vulnérabilité [CVE-2026-111497](https://www.tenable.com/cve/CVE-2026-111497). La version de node est maintenant v24.22.1

### Gestion des groupes
La gestion de groupe est fonctionnelle. Les backends doivent être mis à jour. Ils sont en cours de modification.

3 types de groupes ont été conçus :
* groupes statiques : la liste est faite manuellement
* groupes dynamiques : la liste est créé à l'aide d'un filtre 
* supergroupes : il génére lui meme des groupes statiques en se basant sur un attribut de l'identité

Deux taches planifiées ont été ajoutées et doivent etre activées si vous utiliser la gestion des groupes
* supergroups-refresh
* groups-dynamic-refresh

### Dans les parmetres les temps sont maintenant saisi plus convivialement 
Un selecteur permet de saisir les temps soit en minutes, heures, jours, mois

### Rappel d'expiration du mot de passe
Un selecteur permet de désactiver ou activer cette fonctionnalité

### Modeles de mail 
* un bouton de test permet d'envoyer le mail sur une adresse de test
* Un bouton permet de vérifier la validité du modele
* En cas d'erreur d'envoi le message d'erreur est maintenant explicite
* Le modele peut maintenant etre directement au format [mjml](https://mjml.io/)
* La modification des modeles sont maintenant pris en compte sans redemarrage de l'application

### Historique des mots de passe
* il est possible maintenant dans paramètres de régler l'historique des mots de passe







