# Librairie d'aide Python 
Une librarie de méthode pour le backend vous aidera à developper facilement un backend 

Cette librairie backends-utils (

### read_config(file)
Permet de charger le fichier de config 

### config(key,default='')

Permet de lire une clé du fichier de configuration qui aura été au préalable chargé par **read_config()**

retour : la valeur de la clé

Exemple : 

```python3
import sys
sys.path.append('../lib')
import backend_utils as u

u.readConfig('../etc/config.conf')
host=u.config('host')
```

### readjsoninput()
Permet de lire la chaine json sur l'entrée standard est en faire un dictionnaire 

retour : Dict

### returncode(code,message)
Permet de générer la chaine json de retour pour le daemon 

retour : String au format json

Exemple 

```
import sys
sys.path.append('../lib')
import backend_utils as u
json_message=u.returncode(0,"Tout est ok")
print(json_message)
```

la sortie donnera {"status":0,"message": "Tout est ok"}

### is_backend_concerned(entity)

entity etant le tableau dict fourni par readjsoninput()

retour boolean true ou false

ex: 

```python3
import sys
sys.path.append('../lib')
import backend_utils as u
u.read_config('../etc/config.conf')
entity=u.readjsoninput()
if is_backend_concerned(entity):
   print(u.returncode(0,'Mon backend est concerné')
else:
   print(u.returncode(0,'Mon backend est concerné')
   
```

### find_key(element, key)

Permet de chercher une clé dans l'arborescence d'un dictionnaire 

retour : la valeur de la clé

### make_entry_array(entity)

Permet de construire un tableau clé =>valeur  à un niveau à partir d'un dictionnaire en arbre 

ex:

entree de depart :

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
          "cn": "AVANIS Alain",
          "displayName": "Alain Avanis",
          "facsimileTelephoneNumber": "",
          "givenName": "Alain",
          "labeledURI": "",
          "mail": "aa@mondomaine.fr",
          "mobile": "06 00 00 00 00",
          "postalAddress": "",
          "preferredLanguage": "",
          "sn": "AVANIS",
          "telephoneNumber": "",
          "title": "",
          "uid": "aavanis",
          "employeeNumber": "111111",
          "employeeType": "TAIGA",
          "departmentNumber": "",
          "jpegPhoto": "",
          "userCertificate": "",
          "userPassword": ""
        } ,
        "initState": 0,
        "fingerprint": "b65c62b466b0c401398c9da3ca489a880befc38f049e6dfacb48eded011eff11"
      }
    }
  }
```
  
  
  donnera : 
  
```
  {
  "concernedTo": "66c22991bdc3c9a7563a9d4f",
  "createdBy": "admin",
  "createdAt": "2024-08-18T17:04:17.757Z",
  "lastUpdatedBy": "admin",
  "lastUpdatedAt": "2024-08-20T09:45:57.596Z"
  "state": 2,
  "lifecycle": -1,
  "cn": "AVANIS Alain",
  "displayName": "Alain Avanis",
  "facsimileTelephoneNumber": "",
  "givenName": "Alain",
  "labeledURI": "",
  "mail": "aa@mondomain.fr",
  "mobile": "06 00 00 00 00",
  "postalAddress": "",
  "preferredLanguage": "",
  "sn": "AVANIS",
  ...
  }
```

### make_entry_array_without_empty(entity) 

idem que make_entry_array() mais ne met pas dans le resultat les clés qui ont des valeurs vides

### make_objectclass(entity)

renvoie untableau contenant les objectsclasses LDAP 


 