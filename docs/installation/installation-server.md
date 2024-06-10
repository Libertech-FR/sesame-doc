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
### Installation de make et curl
```
apt-get update 
apt-get install make
apt-get install curl
```

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
Url du serveur (http(s)://(nom|ip):http://192.168.0.1
```
* Repertoire : Repertoire de l installation (par defaut où vous avez lancé le script)
* Url du serveur : L'url à appeler (adresse de la machine ou nom avec le protocole
* Nom de domaine des emails : le nom de domaine pour la generation des emails dans l'import Taiga
* Numero d'etablissement : cette valeur sera mise dans l'attribut  **supannEtablissement**

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
Vous pouvez vous connecter à l interface via http://10.22.32.66:3000
Pour lancer l'importation taiga dans le repertoire /data/sesame lancez la commande make sesame-import-taiga
```

*Sesame est installé*
```

L'etape suivante est l'installation des imports specifiques
