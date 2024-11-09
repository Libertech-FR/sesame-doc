
# Introduction 


Les backends seront exécutés par **sesame-daemon** sur requete de sesame orchestrateur

### Workflow 

* Une identité est passée au statut A SYNCHRONISER 
* Une action sur le bouton de lancement de la synchronisation va effectuer un déclenchement des backends
* les Backends vont être executés dans l'ordre où il ont été mis dans le repertoire backends (*var/lib/sesame-daemon/backend*)
* Le daemon enverra le resultat de l'execution à l'orchestrator 

```
UI ---> API <--> Daemon <---> Backends 
```


# Fonctionnement d'un backend

Un backend peut être écrit dans n'importe quel language, du moment que celui-ci sait gérer les entrées et sorties standard. 

## Comunication avec le daemon 

Le daemon enverra sur l'entrée standard du backend au format JSON l'identité concernée : 

Exemple : 

```
{
  "concernedTo": "66c22991bdc3c9a7563a9d4f",
  "payload": {
    "identity": {
      "action": "IDENTITY_UPDATE",
      "identity": {
        "_id": "66c22991bdc3c9a7563a9d4f",
        "metadata": {
          "createdBy": "admin",
          "createdAt": "2024-08-18T17:04:17.757Z",
          "lastUpdatedBy": "admin",
          "lastUpdatedAt": "2024-08-20T09:45:57.596Z"
        },
        "state": 2,
        "lifecycle": -1,
        "inetOrgPerson": {
          "cn": "DUPONT Alain",
          "displayName": "Alain Dupont",
          "facsimileTelephoneNumber": "",
          "givenName": "Alain",
          "labeledURI": "",
          "mail": "ad@lmondomaine.com",
          "mobile": "06 07 08 09 10",
          "postalAddress": "",
          "preferredLanguage": "",
          "sn": "DUPONT",
          "telephoneNumber": "",
          "title": "",
          "uid": "aabbas",
          "employeeNumber": "111111",
          "employeeType": "TAIGA",
          "departmentNumber": "",
          "jpegPhoto": "",
          "userCertificate": "",
          "userPassword": ""
        },
        "additionalFields": {
          "objectClasses": [
            "supannPerson"
          ],
          "attributes": {
            "supannPerson": {
              "supanncivilite": "M.",
              "supannOIDCGenre": "M.",
              "supannPrenomsEtatCivil": "Alain",
              "supannAutreMail": "ad@monmailpriver.com",
              "supannNomdeNaissance": "",
              "supannOIDCDatedeNaissance": "",
              "supannCodeINSEEPaysDeNaissance": "",
              "supannCodeINSEEVilleDeNaissance": "",
              "supannListeRouge": "",
              "mailForwardingAddress": "",
              "supannMailPerso": "",
              "supannRoleGenerique": "",
              "supannEmpId": 0,
              "supannParrainDN": "",
              "supannTypeEntiteAffectation": "",
              "supannActivite": "",
              "supannEmpDateFin": "",
              "supannEtablissement": ""
            }
          }
        },
        "initState": 0,
        "fingerprint": "b65c62b466b0c401398c9da3ca489a880befc38f049e6dfacb48eded011eff11"
      }
    }
  }
}

```
Le backend traitera la demande et renverra sur sa sortie standard le resultat au format JSON avec 2 clés : 

* status : 0 OK autre que 0 probleme
* message : le message pour le journal de sesame

Exemple : 
```
{"status": 0, "message": "server alive"}
```

## Structure d'un backend

chaque backend a un espace dans **/var/lib/sesame-daemon/backend**

```
XXmonbackend 
	config.yml
	bin
	   script1
	   script2
	   ...
	
```
Ceci est la structure minimum. Le daemon excutera le script concerné en se deplaçant dans **bin**

Vous pouvez ajouter dans cette arborescense ce que vous avez besoin (etc, lib ...)

### Fichier config.yml
Ce fichier renseigne le daemon du script à executer selon l'action demandée. Le script doit avoir le droit d'execution.

Ce fichier se compose d'une entete et des actions :

```
_version: 1

name: 'dummy'
description: 'Dummy backend for tests'
active: true
actions:
  IDENTITY_PASSWORD_CHANGE:
    script: "dummy.sh"
    onError: 'stop'
  IDENTITY_PASSWORD_RESET:
    script: "dummy.sh"
    onError: 'stop'
  IDENTITY_CREATE:
    script: 'dummy.sh'
    onError: 'stop'
  IDENTITY_UPDATE:
    script: 'dummy.sh'
    onError: 'stop'
  IDENTITY_DELETE:
    script: 'dummy.sh'
    onError: 'stop'
  PING_TARGET:
    script: 'dummy.sh'
    onError: 'continue'
```

### Les actions : 
* **IDENTITY_PASSWORD_CHANGE** : est appellé lors du changement du mot de passe. 
* **IDENTITY_PASSWORD_RESET** : est appellé pour un RESET du mot de passe.
* **IDENTITY_CREATE** : Non utilisé pour l instant 
* **IDENTITY_UPDATE** : Appelé lors de la creation ou modification d'une identité
* **IDENTITY_DELETE** : Appelé lors de la suppression d'une identité
* **IDENTITY_ENABLE** : Appelé lors de l'activation d'une identité
* **IDENTITY_DISABLE** : Appelé lors de desactivation d'une identité
* **PING_TARGET** : appellé pour la verification du backend 

Paramètres :

* **script** : Nom du script (dans bin) qui doit être appellé sur l'action concernée
* **onError** : continue | stop Permet d'indiquer en cas d'erreur si le daemon doit continuer ou abandonner


## Exemple de script bash : 
Cet exemple écrit juste le contenu du json reçu sur l'entrée standard dans un fichier :

```
#!/bin/sh
JSON=`cat -`
sleep 1
echo $JSON >/tmp/dummy.json
echo "{\"status\": 0, \"message\": \"dummy upsertbackend backend\"}"
exit 0
```

## Exemple de backend 00dummy

```
00dummy
.
./bin
./bin/dummy.sh
./config.yml
```

# Debuggage d'un backend 
 Il est conseillé de mettre me un backend dummy (voir l exemple) pour avoir l'entrée json. Dans l exemple il creera un fichier /tmp/dummy.json pour l'insertion et la modification
 
 ```
 cd /var/lib/sesame-daemon/backends/01xx/bin
 cat /tmp/dummy.json|./upsertidentity.py
 ```
 