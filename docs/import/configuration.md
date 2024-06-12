# Import des données

## Principe
L'import des données est réalisée par **sesame-crawler**. Il est installé automatiquement vec le script d'installation. 

Pour importer les données le *crawler** a besoin d'un fichier de configuration pour mapper les champs entre votre
fichier et sesame. 

une fois le fichier de configuration fait il suffit de génerer un fichier json avec les données dedans. 

## Arborescence 

Lors de l installation un répertoire **import** a été créé avec un repertoire cache, data et un fichier .env

```
import-├--cache
       ├--data
       ├config.yml
       ├.env
```

 * cache : les données à importer seront mise dans ce repertoire
 * data : *pour diagnostic* le fichier json represente les données envoyées à l API après avoir été traitées par le preprocesseur de l'import
 * .env : Fichier de paramètre
 * config.yml : Fichier de configuration

 
 # Configuration 
 
 ## Fichier .env
 Il contient l'authentification et l'adresse du serveur sesame 
 
 ```
SESAME_API_BASEURL=http://sesame-orchestrator:4000
SESAME_IMPORT_PARALLELS_FILES=1
SESAME_IMPORT_PARALLELS_ENTRIES=5
SESAME_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6eyJfaWQiOi
I2NjY4MDg1MzlkMGJhZTk2NDE2MTE4ZmYiLCJ1c2VybmFtZSI6ImltcG9ydCIsImRpc3BsYXlOYW1lIj
oiaW1wb3J0IiwidG9rZW4iOiI3ODcxMmIyYmY0ZGM5M2YwZjg1NzkzODNiY2EzYmViMWYzMjRkNmE4Yj
A5MWIwMGIyYzJhNjhjYmZkMzdhZjQ5YjkxMTUwYjcyOTFhMTY5MmJiNDNjZTI3ZGJjNTZhNDRiZTI3ZD
YxMDY5NjVmM2U4NTYzMzMzZDYxYzY4ZjNkZiJ9LCJzY29wZXMiOlsic2VzYW1lIiwiYXBpIl0sImlhdC
I6MTcxODA5MzkwNywiZXhwIjoyMDMzNjY5OTA3LCJzdWIiOiI2NjY4MDg1MzlkMGJhZTk2NDE2MTE4Zm
YiLCJqdGkiOiI2NjY4MDg1MzlkMGJhZTk2NDE2MTE4ZmZfNDNmYzAzZDAyMDdjYTk0YTU1MmU1NjQ4MD
RkZWE1ZjEifQ.iL3aA_mG11IZg5N8i72CCMnPwgI2YVSzNH4B8M3MpeY
```
* SESAME_API_BASEURL : Url du serveur (dans le cadre de docker sur le meme socle l adresse du container)
* SESAME_IMPORT_PARALLELS_FILES : Traitement en parallele des fichiers 
* SESAME_IMPORT_PARALLELS_ENTRIES : Traitement en parallèle des entrées
* SESAME_API_TOKEN : Jeton d'autehntification (obtenu avec la commande **make sesame-create-keyring**

