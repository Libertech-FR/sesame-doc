---
lang: en-US
title: Installation rapide
description: Installation de sesame
---
## Prérequis
* Linux Debian 12
* Docker >= version 26
* Une machine ou VM avec l option CPU AVX ( Si vous êtes sur VMWARE consultez VMWARE-AVX.md)
* make installé
* curl installé

## Installation des prérequis

### Installation de docker

Installez les paquets necessaires :

```
apt-get install apt-transport-https ca-certificates gnupg lsb-release 
```
Ajoutez la clé du depot

```
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

Ajoutez le depot dans les sources apt

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

```
Mettez à jour les depots

```
apt-get update
```

Installez Docker

```
apt install docker-ce docker-ce-cli containerd.io
```

Verifiez que docker est bien installé et démarré

```
docker ps 
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```


## Installation de sesame

Installation de make et curl et jq
```
apt-get update 
apt-get install make curl jq
```

creer un repertoire pour accueillir l'installation ( dans notre guide /data/sesame)

```
mkdir /data/sesame
cd /data/sesame
```
Excecutez le shell d installation en copiant cette ligne ci-dessous
```
curl -s https://raw.githubusercontent.com/Libertech-FR/sesame-exemple/main/install/install.sh>./install.sh;bash ./install.sh
```
Repondez aux questions

```
Commande docker OK
command make OK
command curl OK
Répertoire d'installation (/data/sesame) :
"Url du portail de gestion de mot de passe (http(s)://(nom|ip):
```
* Repertoire : Repertoire de l installation (par defaut où vous avez lancé le script)
* Url du portail de gestion de mot de passe : L'url du portail pour le changement de mot de passe

Après avoir télechargé les images le script vous demande :

```
[Nest] 63  - 30/05/2024 13:45:39     LOG [InstanceLoader] IdentitiesModule dependencies initialized
[Nest] 63  - 30/05/2024 13:45:39     LOG [InstanceLoader] CliModule dependencies initialized
[Nest] 63  - 30/05/2024 13:45:39     LOG [InstanceLoader] BackendsModule dependencies initialized
[Nest] 63  - 30/05/2024 13:45:39     LOG [InstanceLoader] AuthModule dependencies initialized
? Username ? admin
? Email ? monemail@domaine.fr
? Password ? [input is hidden] 

```
le couple username et password seront le login de l'administrateur sur l'interface


```
------------------------------
L'installation est terminée
Vous pouvez vous connecter à l interface via http://votreserveur:3000

```

*Sesame est installé*
```

L'etape suivante est l'installation des imports specifiques
