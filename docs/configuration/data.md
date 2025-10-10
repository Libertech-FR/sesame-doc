---
lang: fr-FR
title: Principe 
description: Configuration des données
---
# Principe
Sesame possède un modele de données souple. Il est basé un peu comme le protocole LDAP Sur des schémas de données. 
e
Le schema obligatoire est InetOrgPerson

Les schemas sont definis dans le repertoire configs/sesame-orchestrator/validations. Il y a un fichier par schema. 

Chaque schema est dans un fichier yml

```
---
"$schema": http://json-schema.org/draft-07/schema#
type: object
properties:
  cn:
    type: string
    description: Common name of the inetOrgPerson.
  sn:
    type: string
    description: Surname of the inetOrgPerson.
  uid:
    type: string
    description: UID of the inetOrgPerson.
  displayName:
    type: string
    description: Display name of the inetOrgPerson.
  facsimileTelephoneNumber:
    type: string
    description: Facsimile telephone number of the inetOrgPerson.
  givenName:
    type: string
    description: Given name of the inetOrgPerson.
  labeledURI:
    type: string
    description: URI associated with the inetOrgPerson.
  mail:
    type: string
    format: email
    description: Email address of the inetOrgPerson.
  mobile:
    type: string
    description: Mobile number of the inetOrgPerson.
  postalAddress:
    type: string
    description: Postal address of the inetOrgPerson.
  preferredLanguage:
    type: string
    description: Preferred language of the inetOrgPerson.
  telephoneNumber:
    type: string
    description: Telephone number of the inetOrgPerson.
  title:
    type: string
    description: Title of the inetOrgPerson.
  userCertificate:
    type: string
    description: User certificate of the inetOrgPerson.
  userPassword:
    type: string
    description: User password of the inetOrgPerson.
required:
- cn
- sn
- uid
```
Le fichier yml porte le nom du schema et contient : 

* $shema et type : ces deux champs sont des constantes et sont en tete du fichier

```
---
"$schema": http://json-schema.org/draft-07/schema#
type: object
```

* properties : Ce paragraphe decrit chaque champ. Chaque champ contient un type et une description

```
properties : 
  title:
    type: string
    description: Title of the inetOrgPerson.
```
* required : Definit les champs obligatoire pour l'identité

```
required:
- cn
- sn
- uid

```

Pour savoir les types supportés se reférer à la documentation 

[Documentation pour la définition des données ](validation)
