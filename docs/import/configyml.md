# Configuration de l'import

Le fichier config.yml sert à configurer l'import. Il decrit les champs qui seront presents dans le fichier de données json déposé dans cache. 

## Structure
Le fichier config.yml comporte un bloc par nom de fichier qui sera présent dans cache. 

Il est au format yml 

```
[NOM_DU_FICHIER]:
   primaryKey: //section non obligatoire
     - [key1]
     - [key2]
   mapping:
     [nom_champs_sesame]: "[nom_champs_json]"
     ...
   additionalFields:
     additionalFields.objectClasses: 
     - [SCHEMA_DE_VALIDATION_SESAME_SUPPLEMENTAIRE]
     - ...
     [nom_champs_sesame]: "CONSTANTE"
     ...
   transforms:
     [nom_champs_sesame]: 
      - "ACTION1"
      - ...
[AUTRE_FICHER]:
   mapping ...
   
```

Le fichier de data doit avoir cette structure : 
* Une clé data qui comportera un tableau des identités à dréer ou à modifier

```
{
  "data": [
  		{
  			...
  		}
  		...
  ]
}
```

Par defaut l'existence de l'identité est cherchée par le couple **"inetOrgPerson.employeeType"** et **"inetOrgPerson.employeeNumber"**

Ces deux clés doivent être présente dans le fichier de data si la clé de recherche n'a pas été changée

#### Exemple de fichier config.yml 
```
import.json: 
  mapping: 
    inetOrgPerson.employeeNumber: "employeeNumber"
    inetOrgPerson.title: "title"
  additionalFields:
    inetOrgPerson.employeeType: "TAIGA"
```

Fichier de données associée (dans cache/import.json

```
{
       "data": [
       {
       "employeeNumber":"183493",
       "employeeType":"TAIGA",
       "title":"ETUDIANT"
       }
    ]
}
```
### Section primaryKey
Par defaut les identités sont recherchées avec le couple "employeeNumber" et "employeeType"

Ce comportement peut être modifié en ajoutant la section **primaryKey** qui n'est pas obligatoire 

Exemple : on veut pouvoir rechercher les identités par le champ uid. Naturellement il faut que le champs soit present dans la section mapping

```
import.json:
  primaryKey:
    - inetOrgPerson.uid
  mapping:
    inetOrgPerson.uid: uid
    inetOrgPerson.title: title
```
### Section mapping 

Ce paragraphe, dans le fichier config.yml sert à definir qui va où.
Il associe les champs standards de sesame et les champs additionnels avec la valeur du fichier de data

#### champs standards
Les champs standards (voir documentation [/configuration/validation](/configuration/validation). Ces champs sont préfixés avec le inetOrgPerson ex :interOrgPerson.title. Sa valeur est le nom de la clé dans le fichier data

```
inetOrgPerson.title: "title"
```
Les champs peuvent être combinés ex: Imagnons que nous avons, dans notre fichier data un champ nom et un champ prenom : 

```
inetOrgPerson.title: 
  - "nom"
  - "prenom"

```
Ce champs pourra être transformé par la suite dans la section **transforms**

#### champs additionnels 

Si vous avez défini des schemas de validations supplémentaires vous pouvez dans cette section les mapper aussi 

La syntaxe est : 

* additionalFields.attributes.[SCHEMA].[ATTRIBUT] : [CLE]

Exemple : si vous avez un schema de validation sogxuser avec proxyaddress comme attribut :

```
additionalFields.attributes.sogxuser.proxyaddress: "proxyaddress"
```
#### Controle à l'insertion et de l'update
Si l'identité n est pas trouvée elle sera créée. 

Par defaut, lors de l update chaque champs present dans la source sera remplacé. Ce comportement peut être modifié et indiquer que le champs ne sera écrit que lors de l insertion et non durant l'update. Pour ce faire il suffit d'ajouter le mot clé **$setOnInsert**

Exemple : nous ne voulons pas que le champs uid soit ecrasé lors d'un update : 

```
$setOnInsert.inetOrgPerson.uid: 
    - "prenom"
    - "nom"
```

### Section additionalFields

Cette section premet de preciser  quels schemas de validation seront (autre que inetOrgPerson). 

Elle permet aussi de fixer des valeurs par champs

#### Declaration des schemas supplementaires 

Les schemas supplementaires se declarent dans la clé **additionalFields.objectClasses** en forme de liste

```
additionalFields.objectClasses:
  - sogxuser
```

### Section transforms

Cette section permet de faire une transformation sur un champ avant qu'il soit envoyé

Plusieurs actions sont disponibles



La syntaxe génerale est : 

```

[nom_champs_sesame] : 
   - "ACTION1"

```
Si plusieurs méthodes sont précisées, elles seront exécutées dans l'ordre, chacune travaillant sur le résultat de la méthode précedente.

nom_champs_sesame doit être décrit aussi dans la section mapping

Exemple : 

```
mapping: 
  inetOrgPerson.employeeNumber: employeeNumber
  $setOnInsert.inetOrgPerson.uid: 
    - "prenom"
    - "nom"
additionalFields:
   inetOrgPerson.employeeType: "TAIGA"
transforms: 
  $setOnInsert.inetOrgPerson.uid: 
    - "join(delimiter='.')"
    - "remove_accents"
    - "lower"
```

Si notre fichier de données et le suivant : 

```
{
    "data": [
       {
       "employeeNumber":"101661",
       "employeeType":"TAIGA",
       "nom":"ETUDIANTTEST1",
       "prenom": "éLoise",
       "nom" : "DUPONT"
       }
    ]
}
```
* la premiere action va joindre les deux champs. Le resultat sera "éloise.DUPONT"
* la deuxième action va oter les accents "eloise.DUPONT"
* et enfin la troisieme action va mettre le tout en minuscule "eloise.dupont"

#### Les différentes transformations disponibles 

| Nom de l'action| Description |
| --- | --- |
| `capitalize` | Convertit la première lettre en majuscule et le reste en minuscule |
| `lower` | Convertit tous les caractères en minuscule |
| `upper` | Convertit tous les caractères en majuscule |
| `title` | Convertit tous le premier caractère en Majuscule de chaque mot et le reste en minuscule |
| `remove_accents` | Enlève les accents de la chaine de caractères |
| `join(delimiter=' ')` | contactaine les élements avec le séparateur indiqué |
| `prefix(string='prefix-')` | Ajoute la chaine definie au debut de la chaine |
| `suffix(string='-suffix')` | Ajoute la chaine definie à la fin de la chaine |
| `split(delimiter=' ')` | Eclate la chaine de caractère en un tableau |
| `replace(old, new)` | Replace une valeur dans la chaine par une autre |
| `regex(pattern, replace)` | Applique une expression réguliere et remplace les élements trouvés |


Exemple de regex utile : 

On veut un uid de la forme premiere lettre du prenom et nom 
Eloise Dupont doit donner edupont 

```
$setOnInsert.inetOrgPerson.uid: 
  - "join(delimiter='.')"
  - "remove_accents"
  - "lower"
  - "regex(pattern='(?<=\\b\\w)([a-zA-Z0-9_\\-]+\\.)', replace='')"
```

Exemple :
On veut definir une adresse email qui soit prenom.nom@mondomaine.com. On veut aussi que les espace soitent remplacés par un "-"

```

mapping: 
  inetOrgPerson.employeeNumber: employeeNumber
  $setOnInsert.inetOrgPerson.uid: 
    - "prenom"
    - "nom"
  inetOrgPerson.mail: 
    - "prenom"
    - "nom"
additionalFields:
   inetOrgPerson.employeeType: "TAIGA"
transforms: 
  $setOnInsert.inetOrgPerson.uid: 
    - "join(delimiter='.')"
    - "remove_accents"
    - "lower"
  inetOrgPerson.mail:
    - "join(delimiter='.')"
    - "remove_accents"
    - "lower"
    - "replace(old=' ',new='-')"
    - "suffix(string='@mondomaine.com')"
    
```
