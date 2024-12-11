# Architecture de sécurité

L'orchestrator la base mongo, le daemon ne doivent pas être exposés directement sur internet 

## Architecture conseillée
![](.gestion-mdp_images/sesame-archi.drawio.png)

* Le flux de données entre le navigateur et la gestion des mots de passe est publique (port 80, 443). Le serveur doit être situé dans une zone DMZ
* Le flux de donnée entre la gestion des mot de passe et l'orchestrateur doit etre filtrée. Seul le port 443 est necesaire.
* Le flux entre l'administrateur et le frontal de gestion est qu'en interne 

# Sécurisation des flux
Pour sécuriser le flux internet il faut installer un reverse proxy sur le serveur 

## Serveur gestion-mdp
### Installation
Un script est disponible pour l installation du reverse sur la machine docker hébergant la gestion des mdp
* créez un répertoire ex: "/data/revproxy" et allez dans ce répertoire
* télécharger le script
```
 curl -L 'https://raw.githubusercontent.com/Libertech-FR/sesame-exemple/refs/heads/main/reverse_proxy/gestion-mdp/install.sh' --output install.sh
 
```
* Executez le 
```
#bash install.sh
```
Le script va créer un certificat auto-signé, créer les fichiers de configuration nginx et docker-compose.yml

Pour lancer le container : 
```
#docker compose up -d
```
### Changement des certificats
Vous pouvez mettre des certificats officiels 
* La clé privée : certs/key.pem
* le certificat : certs/cert.pem

## Serveur orchestrator
Un script est disponible pour l installation du reverse sur la machine docker hébergant l'orchestrator et le frontal de d'administration
* créez un répertoire ex: "/data/revproxy" et allez dans ce répertoire
* télécharger le script
```
curl -L 'https://raw.githubusercontent.com/Libertech-FR/sesame-exemple/refs/heads/main/reverse_proxy/server/install.sh' --output install.sh
```

* Executez le
```
#bash install.sh
```
Le script va créer un certificat auto-signé, créer les fichiers de configuration nginx et docker-compose.yml

Pour lancer le container :
```
#docker compose up -d
```
### Changement des certificats
Vous pouvez mettre des certificats officiels
* La clé privée : certs/key.pem
* le certificat : certs/cert.pem

