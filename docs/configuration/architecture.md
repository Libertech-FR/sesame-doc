---
lang: fr-FR
title: Architecture
description: Architecture de l'installation
---

# Architecture  

Si vous avez installé Sesame avec le script d'installation, vous avez cette structure dans le répertoire d'installation

```
.env
docker-compose.yml
Makefile
configs/
├── sesame-app-manager/
│   ├── statics/
│   │   ├── logo.png
│   └── config/
│       ├── identities.columns.yml
│       ├── menus.yml
├── sesame-orchestrator/
│   ├── jsonforms/
│   │   ├── nom_object_class.ui.yml
│   │   └── ...
│   └── validations/
│       ├── nom_object_class.yml
│       └── ...
├── sesame-taiga-crawler/
│   ├── .env
│   └── mappings.json
import
    ├── .env
    ├── cache
    └── data
```
### .env

```
#Clé pour la génération du jeton JWT
JWT_SECRET='w1CMHnr{n!4ccEkaS1%4a8,[y)rFO{z4'
# Url du serveur
HOST=http://192.168.1.1
# Type de connexion (true ou false)
TLS=false
SESAME_FRONT_MDP="https://monfrontal-de-mot-de-passe.fr"
```
### docker-compose.yml
 Fichier de configuration Docker Compose pour lancer les services.
 
### Makefile
Fichier de configuration Make pour lancer les commandes de gestion des services et l'import des identitées depuis taiga.

### configs
Dossier de configuration pour chaque service
####sesame-app-manager
- `statics/` : Dossier contenant les fichiers statiques (images, etc.).
- `config/identities.columns.yml` : Fichier de configguration des colonnes dans le panneau identités

```
entries:
  - name: inetOrgPerson.uid
    label: ID
    field:
      type: function
      value: row?.inetOrgPerson?.uid
    align: left
    sortable: true

  - name: inetOrgPerson.employeeNumber
    label: EmployeeNumber
    field:
      type: function
      value: row?.inetOrgPerson?.employeeNumber
    align: left
    sortable: true

  - name: additionalFields.attributes.supannPerson.supannTypeEntiteAffectation
    label: Affectation
    field:
      type: function
      value: row.additionalFields?.attributes?.supannPerson?.supannTypeEntiteAffectation
    format:
      type: function
      value: "Array.isArray(value) ? value?.join(', ') : value"
    align: left
    sortable: true


  - name: inetOrgPerson.sn
    label: Nom
    field:
      type: function
      value: row?.inetOrgPerson?.sn
    align: left
    sortable: true

  - name: inetOrgPerson.givenName
    label: Prénom
    field:
      type: function
      value: row?.inetOrgPerson?.givenName
    align: left
    sortable: false

```

- `config/menus.yml` : permet d'ajouter des briques dans la page d'accueil (beta)

```


### sesame-orchestrator 
Configuration des données (API).
 
- `jsonforms/` : Dossier contenant les formulaires de l'interface d'administration.
- `validations/` : Dossier contenant les fichiers de validation des objets.
    
### sesame-taiga-crawler
Configuration de l'import Taiga.

- `.env` : Fichier de configuration des variables d'environnement.
- config.yml` : Fichier de configuration des mappings des objets pour l'import de Taiga vers Sesame.
## import
Répertoire pour l'import de données vers Sesame
