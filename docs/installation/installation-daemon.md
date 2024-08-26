---
lang: en-US
title: Installation sesame-daemon
description: Installation de sesame-daemon
---
# Installation de sesame-daemon

## Introduction

**Sesame-Daemon** fait la communication entre sesame-Orchestrateur et les differents catalogues et bases de données d'authentification.

**Sesame-Daemon** executera chaque **backend** quand il recevera un ordre de sesame-Orchestrateur

## Prérequis
* Debian 12

Malgrés que le daemon peut être sur une autre machine que l'orchestrator nous vous conseillons, pour des raisons de sécurité et facilité de l'installer sur le meme host

## Installation du démon

Pour l'instant l'installation n'est disponible que pour **Debian**

Télécharger le package debian :

[Lien de téléchargement du paquet (https://github.com/Libertech-FR/sesame-daemon/releases)](https://github.com/Libertech-FR/sesame-daemon/releases/)

Assurez vous avant de lancer l'installation que sesame est bien démarré

```
#apt-get update 
#dpkg -i sesame-daemon_0.2.13_amd64.deb 
Sélection du paquet sesame-daemon précédemment désélectionné.
(Lecture de la base de données... 37026 fichiers et répertoires déjà installés.)
Préparation du dépaquetage de sesame-daemon_0.2.13_amd64.deb ...
Dépaquetage de sesame-daemon (0.2.13) ...
Paramétrage de sesame-daemon (0.2.13) ...
Created symlink /etc/systemd/system/multi-user.target.wants/sesame-daemon.service → /lib/systemd/system/sesame-daemon.service.
```

Vérifier que le daemon est bien démarré

```
#journalctl -u sesame-daemon
juin 04 18:11:29 docker2 systemd[1]: Stopping sesame-daemon.service - sesame-daemon...
juin 04 18:11:29 docker2 systemd[1]: sesame-daemon.service: Deactivated successfully.
juin 04 18:11:29 docker2 systemd[1]: Stopped sesame-daemon.service - sesame-daemon.
juin 04 18:11:29 docker2 systemd[1]: sesame-daemon.service: Consumed 1.413s CPU time.
juin 04 18:11:29 docker2 systemd[1]: Started sesame-daemon.service - sesame-daemon.
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [NestFactory] Starting Nest application...
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] RedisModule dependencies initiali>
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] AppModule dependencies initialize>
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] ConfigHostModule dependencies ini>
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] ConfigModule dependencies initial>
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] ConfigModule dependencies initial>
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] RedisCoreModule dependencies init>
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] BackendRunnerModule dependencies >
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendRunnerService] OnModuleInit initialized 🔴
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendConfigService] Load backends config...
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendConfigService] /var/lib/sesame-daemon/back>
juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendRunnerService] OnApplicationBootstrap init>
```
# Fichier de paramétrage du sesame-daemon

Un fichier de paramètre est present  **/etc/default/default**

```
SESAME_LOG_LEVEL=INFO
SESAME_REDIS_URI=redis://localhost:6379/0
SESAME_BACKENDS_PATH=/var/lib/sesame-daemon/backends
SESAME_NAME_QUEUE=backend
SESAME_REDIS_USER=monUser
SESAME_REDIS_PASSWORD=xx

```

# Installation du backend LDAP

télechargez le paquet debian (.deb) avec ce lien

[https://github.com/Libertech-FR/sesame-backend-ldap/releases](https://github.com/Libertech-FR/sesame-backend-ldap/releases/)

```
# dpkg -i sesame-backend-openldap_0.0.3_amd64.deb 
Sélection du paquet sesame-backend-openldap précédemment désélectionné.
(Lecture de la base de données... 37052 fichiers et répertoires déjà installés.)
Préparation du dépaquetage de sesame-backend-openldap_0.0.3_amd64.deb ...
Dépaquetage de sesame-backend-openldap (0.0.3) ...
dpkg: des problèmes de dépendances empêchent la configuration de sesame-backend-openldap :
 sesame-backend-openldap dépend de libnet-ldap-perl; cependant :
  Le paquet libnet-ldap-perl n'est pas installé.
 sesame-backend-openldap dépend de libjson-perl; cependant :
  Le paquet libjson-perl n'est pas installé.

dpkg: erreur de traitement du paquet sesame-backend-openldap (--install) :
 problèmes de dépendances - laissé non configuré
Des erreurs ont été rencontrées pendant l'exécution :
 sesame-backend-openldap
```
Ces erreurs sont normales car dpkg n'installe pas les dépendance tout seul.

Installez les dépendances :

```
#apt-get -f install
```

## Configuration du backend LDAP
Une fois l'installation du paquets vous devez activer le backend. 

Vous pouvez activer plusieurs fois le backendn si par exemple vous avez 2 serveurs Ldap differents pour les populations.

Allez dans /var/lib/sesame-daemon/backends-modules/openldap

Lancer ./install.sh 

```
Deploiment du module LDAP
La position determinera l'ordre d'execution des backends (comme dans init.d)
Numero de demarrage du module (2 positions):02
installation dans backends/02openldap
Copie des fichiers dans ../../backends/02openldap
Le backend a été installé dans ../../backends/02openldap
Configuration
Url du serveur ldap (ldap[s]://FDQN:PORT : ldaps://myldap.mydomain.com
Dn d'authentification (doit avoir les droits d'ecriture) : cn=manager,cn=internal,dc=mydomain,dc=com
Mot de passe : MonPassword!
Base ldap : dc=mydomain,dc=com
Branche pour les utilisateurs ex: ou=peoples : ou=peoples
Attribut pour le Rdn : uid
Génération du fichier de configuration
Vous pouvez completer le fichier de configuration avec les parametres optionnels (voir README.md)
Merci 
```
Le script va génerer l'architecture dans backends et creer le fichier de configuration 

### config.conf :

```
host=myldap.mydomain.com
dn=cn=manager,cn=internal,dc=mydomain,dc=com
password=MyPassword
base=dc=mydomain,dc=com
userbase=ou=peoples,dc=mydomain,dc=com
rdnattribute=uid
### Parametres facultatifs 
branchForEtd=ou=Etudiants
branchForAdm=ou=Administratifs
branchForEsn=ou=Enseignants
branchAttr=supannTypeEntiteAffectation
backendFor=adm,etd,esn
```

* host : addresse de votre serveur ldap sous la forme simple ou en URL (ldap://monserveur:389 ou ldaps://monserveur:636)
* dn : le dn de connexion (il doit avoir les droits d'écriture sur les branches )
* password : mot de passe du DN ci dessus
* base : votre base LDAP
* userbase : la branche dans laquelle seront créés les comptes
* rdnattribute : l'attribut qui servira à la composition du DN
* branchForEtd : la sous branche (dans userbase) pour les étudiants. Si ce paramètre est vide les identitées seront créées directememt dans **userbase**
* branchForAdm : idem pour les administratifs
* branchForEsn : idem pour les enseignants
* branchAttr : l'attribut qui sert à determiner dans quelle branche l'identité est crée.
* backendFor : liste des types d'identités gérée par le backend ex : adm,esn,etd

### config.yml (à la racine du backend )

```
_version: 1

name: 'openldap'
description: 'Backend for openldap'
active: false
actions:
  IDENTITY_PASSWORD_CHANGE:
    script: "changepwd.py"
    onError: 'stop'
  IDENTITY_PASSWORD_RESET:
    script: "resetpwd.py"
    onError: 'stop'
  IDENTITY_CREATE:
    script: 'upsertidentity.py'
    onError: 'stop'
  IDENTITY_UPDATE:
    script: 'upsertidentity.py'
    onError: 'stop'
  IDENTITY_DELETE:
    script: 'delentity.py'
    onError: 'stop'
  PING_TARGET:
    script: 'ping.py'
    onError: 'stop'
```
Ce fichier decrit, selon les actions, les scripts qui seront lancés

Le seul paramètre que vous pouvez regler est :
* action : (false|true) Rend actif le backend 



