# Import depuis taiga

Les fichiers de configuration se trouve dans ./configs/sesame-taiga-crawler

Il est  au format de config.yml (voir la documentation Import des données )

## Option de filtre pour les import
Nous pouvons mettre une régle de filtrage pour ne pas importer certaines identites 

Cette regle doit etre mise en sous clé des noms de fichier
* Nom de la clé : c'est le champs sur lequel le test sera fait. Seulement les champs inetOrgPerson peuvent être utilisés
* Valeur : expersion régulière (sans les //)

Exemple : 

```
import_etd.json:
exclude:
  -sn : ^#
  -givenName: ^#
mapping:
  ...
```
Dans cet exemple les noms commençant par # seront exclus de l import
## Option pour l'import des photos 
Le champs contenant le nom du fichier jpeg doit être mappé :
Dans la section mapping :
```
customFields.photo: "photo_nom"
```
## Champs de type obligatoire version orchestator > 1.1.6

* le champs employeeNumber doit etre un tableau et etre remplit que à l insertion 
* le champs departmentNumber doit etre un tableau et etre remplit que à l insertion
```
import_etd.json:
mapping:
   $setOnInsert.inetOrgPerson.departmentEmployee:
   - "id_coord"
```

```
 additionalFields:
    $setOnInsert.inetOrgPerson.departmentNumber:
    - "adm"
```


## Lancement de l'import 

dans le repertoire d'installation 
```
#make sesame-import-taiga
```
Si vous voulez importer une année particuliere :
```
#make sesame-import-taiga an=ANNEE
ex: 
#make sesame-import-taiga an=2020
```


