# Backend Samba AD

télechargez le paquet debian (.deb) avec ce lien

https://github.com/Libertech-FR/sesame-backend-sambaad/releases/download/v0.0.5/sesame-backend-sambaad_0.0.5_amd64.deb

```
# dpkg -i sesame-backend-sambaad_0.0.X_amd64.deb 
Sélection du paquet sesame-backend-openldap précédemment désélectionné.
(Lecture de la base de données... 37052 fichiers et répertoires déjà installés.)
Préparation du dépaquetage de sesame-backend-openldap_0.0.3_amd64.deb ...
Dépaquetage de sesame-backend-sambaad (0.0.3) ...

dpkg: erreur de traitement du paquet sesame-backend-sambaad (--install) :
 problèmes de dépendances - laissé non configuré
Des erreurs ont été rencontrées pendant l'exécution :
 sesame-backend-sambaad
```
Ces erreurs sont normales car dpkg n'installe pas les dépendance tout seul.

Installez les dépendances :

```
#apt-get -f install
```


```
#apt-get -f install
```

## Configuration du backend LDAP
Une fois l'installation du paquets vous devez activer le backend.

Vous pouvez activer plusieurs fois le backendn si par exemple vous avez 2 serveurs Ldap differents pour les populations.

Allez dans /var/lib/sesame-daemon/backends-modules/sambaad

Lancer ./install.sh 

```
Deploiment du module sambaAD
La position determinera l'ordre d'execution des backends (comme dans init.d)
Numero de demarrage du module (2 positions):01
installation dans backends/01sambaad
Copie des fichiers dans ../../backends/01sambaad
Le backend a été installé dans ../../backends/01sambaad
Configuration
Url du serveur samba-ad (ldap[s]://FDQN:PORT : ldap://srvads.mydomain.lan
Utilisateur (doit avoir les droits administrateur) : administrator
Mot de passe : 
Base ldap : dc=mydomain,dc=lan
Génération du fichier de configuration
Vous pouvez completer le fichier de configuration avec les parametres optionnels (voir README.md)
Merci 

```
l'url du serveur est de la forme : **ldap[s]://FDQN:PORT**

Le script va génerer l'architecture dans backends et cree le fichier de configuration 

### config.conf :

```
#paramètres positionnés par l'installation
host=myldap.mydomain.com
user=administrator
password=MyPassword
base=dc=mydomain,dc=lan
backendFor=adm,etd,esn
```

### Les paramètres positionnés par le script install.sh
* host : addresse de votre serveur ldap sous la forme simple ou en URL (ldap://monserveur:389 ou ldaps://monserveur:636)
* user : Utilisateur administrateur
* password : mot de passe de l'utilisateur si dessus
* base : votre base LDAP
* backendFor : liste des types d'identités gérée par le backend ex : adm,esn,etd