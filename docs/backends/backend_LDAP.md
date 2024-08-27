# Backend LDAP

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
#paramètres positionnés par l'installation
host=myldap.mydomain.com
dn=cn=manager,cn=internal,dc=mydomain,dc=com
password=MyPassword
base=dc=mydomain,dc=com
userbase=ou=peoples,dc=mydomain,dc=com
rdnattribute=uid
# Parametres facultatifs 
excludedObjectclasses=objeclass1,objectclass2
branchForEtd=ou=Etudiants
branchForAdm=ou=Administratifs
branchForEsn=ou=Enseignants
branchAttr=supannTypeEntiteAffectation
backendFor=adm,etd,esn
```
### Les paramètres positionnés par le script install.sh
* host : addresse de votre serveur ldap sous la forme simple ou en URL (ldap://monserveur:389 ou ldaps://monserveur:636)
* dn : le dn de connexion (il doit avoir les droits d'écriture sur les branches )
* password : mot de passe du DN ci dessus
* base : votre base LDAP
* userbase : la branche dans laquelle seront créés les comptes

### Les parammètres supplémentaires
* rdnattribute : l'attribut qui servira à la composition du DN
* branchForEtd : la sous branche (dans userbase) pour les étudiants. Si ce paramètre est vide les identitées seront créées directememt dans **userbase**
* branchForAdm : idem pour les administratifs
* branchForEsn : idem pour les enseignants
* branchAttr : l'attribut qui sert à determiner dans quelle branche l'identité est crée.
* backendFor : liste des types d'identités gérée par le backend ex : adm,esn,etd
* excludedObjectclasses : listes de objectclasses qui ne seront pas écrits dans le serveur LDAP




