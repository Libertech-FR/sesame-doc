# Introduction


## A quoi ça sert
Sesame est un gestionnaire d'identité. Il permet de créer les identités sur les differents serveurs et environnements de votre SI

## Ses composantes

* **Sesame-Orchestrateur** : veritablement le coeur de sesame. Il gère les differentes identités, les stocke et gère leur cycle de vie. Il transmettra les ordres aux sesame-daemon qui se chargera d'executer les bonnes commandes sur les differents serveurs

* **Sesame-app-manager** : c'est l inteface d'administration pour Sesame.

* **Sesame-daemon** : Il transmet les differents ordres de l'orchestrateur aux differents backends

* **Sesame-Backends** : Snippets qui peuvent être écrits dans differents language et qui executent une tâche précise
* **Sesame-crawler** : Importateur de données vers Sesame

## Un exemple

Vous êtes dans un monde multi OS multi service. Quand un utilisateur arrive vous devez créer son compte dans différents systemes. Creez le dans Sesame et il se chargera du reste
