# Release 2.3.15
Ceci est une release

**sesame-gestion-mdp** doit être mis à jour en dernière version 0.2.0

Mettre à jour le Makefile aussi par la commande : 

```
make sesame-self-update
```
## Change logs
https://github.com/Libertech-FR/sesame-orchestrator/compare/2.3.13...2.3.14
https://github.com/Libertech-FR/sesame-orchestrator/compare/2.3.14...2.3.15


## Liste des changements (importants)

voir la liste de la prérelease https://libertech-fr.github.io/sesame-doc/release_notes/release-2-3-13.html

### bug sous firefox
Le menu de l'utilisateur en haut à droite ne s'affichait plus dû à la mise à jour firefox

### changement API
* Un nouvel endpoint pour la vérification de l'historique des mots de passe pour **sesame-gestion-mdp**
* Correction swagger endpoint get /management/identities

### Gestion de l'historique des mots de passe
Les parametres pour l'activation de l'historique des mots de passe etait manquants dans
la page politique des mots de passe

### problème bouton supprimer en masse 
le bouton supprimer en masse ne supprime que la premiere identité et non toutes les identités selectionnées


