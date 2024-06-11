---
lang: en-US
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
│   └── ...
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
#Clé pour la génération du jeton JWWT
JWT_SECRET='w1CMHnr{n!4ccEkaS1%4a8,[y)rFO{z4'
# Url du serveur
HOST=http://10.22.32.67
# Type de connexion (true ou false)
TLS=false
```
### docker-compose.yml
 Fichier de configuration Docker Compose pour lancer les services.
 
### Makefile
Fichier de configuration Make pour lancer les commandes de gestion des services et l'import des identitées depuis taiga.

### configs
Dossier de configuration pour chaque service
####sesame-app-manager
`statics/` : Dossier contenant les fichiers statiques (images, etc.).

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
