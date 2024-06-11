---
lang: en-US
title: Validation et description des données
description: Configuration des données
---

# Validation d'Identité

## Vue d'ensemble

Le système de validation d'identité utilise des fichiers de configuration YAML pour définir des règles de validation pour différents types d'objets d'identité. Chaque fichier YAML correspond à une `objectClass` spécifique et définit les attributs requis et leurs types pour cette classe.

## Validation des champs InetOrgPerson

Les champs de base de l'objet `inetOrgPerson` sont validés par défaut. 

### Champs obligatoires :
- `cn`  
- `sn`
- `uid`
- `employeeNumber`
- `employeeType`

### Champs facultatifs :
- `displayName`
- `facsimileTelephoneNumber`
- `givenName`
- `labeledURI`
- `mail`
- `mobile`
- `postalAddress`
- `preferredLanguage`
- `telephoneNumber`
- `title`
- `userCertificate`
- `userPassword`

## Validation des champs des schema additionnels

### Fichiers de Configuration

Le fichier de configuration YAML doit être nommé selon le nom de l'`objectClass` qu'il définit, par exemple `supann.yml` pour l'`objectClass` `supann`. Il doit être placé dans le dossier `TBD`.

Vous pouvez vous baser sur le template si dessous pour créer votre fichier YAML. Les champs $schema, type, properties et required sont obligatoires. Vpis ajouterez le champs désirés dans properties. Pour les champs requis, vous les listerez dans required.

#### Exemple Générique de Fichier YAML

```yaml
$schema: "http://json-schema.org/draft-07/schema#"
type: "object"
properties:
    [Nom de l'attribut 1] :
        description: "[Description de l'attribut]"
        type: [Type de l'attribut]
        [Autres options]
    # plus de détails d'attributs...
required:
    - [Nom de l'attribut 1]
    - [Nom de l'attribut 2]
    # plus d'attributs requis...

```


#### Exemple de Fichier YAML (`supann.yml`)

Ce fichier définit la structure et les attributs requis pour l'`objectClass` `supann`.

```yaml
$schema: "http://json-schema.org/draft-07/schema#"
type: "object"
properties:
  supannEmpId:
    type: "string"
    description: "Employee ID"
  supannCivilite:
    type: "string"
    description: "Title (Mr, Ms, etc.)"
  supannBirthName:
    type: "string"
    description: "Birth name"
  supannBirthDate:
    type: "string"
    format: "date"
    description: "Date of birth"
  # plus d'attributs...
required:
  - "supannEmpId"
  - "supannCivilite"
  - "supannBirthName"
```

### Options

Chaque attribut peut avoir des options supplémentaires pour définir des règles de validation spécifiques. Les options sont définies en tant que clés dans le fichier YAML.

#### Array (Tableau)
- **ensure**: Assure que la valeur est toujours un tableau.
  ```yaml
  type: array
  ensure: true
  ```
- **compact**: Supprime les valeurs vides du tableau.
  ```yaml
  type: array
  compact: true
  ```
- **items (of)** : Définit le type des éléments du tableau.

  ```yaml
  type: array
  items: 
    type: string
  ```
- **maxItems (max)** : Définit le nombre maximum d'éléments du tableau.
  ```yaml
  type: array
  maxItems: 5
  ```
- **minItems (min)** : Définit le nombre minimum d'éléments du tableau.
  ```yaml
  type: array
  minItems: 2
  ```

#### Boolean (Booléen) 
- *Pas de clés spécifiques*
  ```yaml
  type: boolean
  ```

#### Date
- **maxDate (max)**: Définit la date maximum.
  ```yaml
  type: date
  maxDate: '2024-01-01'
  ```
- **minDate (min)**: Définit la date minimum.
  ```yaml
  type: date
  minDate: '2020-01-01'
  ```

#### Number (Nombre)
- **integer**: Définit que la valeur doit être un entier.
  ```yaml
  type: number
  integer: true
  ```
- **moreThan (exclusiveMinimum)**: Définit la valeur minimum.
  ```yaml
  type: number
  moreThan: 10
  ```
- **lessThan (exclusiveMaximum)**: Définit la valeur maximum.
  ```yaml
  type: number
  lessThan: 20
  ```
- **positive**: Définit que la valeur doit être positive.
  ```yaml
  type: number
  positive: true
  ```
- **negative**: Définit que la valeur doit être négative.
  ```yaml
  type: number
  negative: true
  ```
- **min (minimum)**: Définit la valeur minimum.
  ```yaml
  type: number
  min: 5
  ```
- **max (maximum)**: Définit la valeur maximum.
  ```yaml
  type: number
  max: 100
  ```
- **truncate**: Tronque la valeur.
  ```yaml
  type: number
  truncate: true
  ```
- **round**: Arrondi la valeur.
  ```yaml
  type: number
  round: true
  ```

#### Object (Objet)
- **camelCase**: Convertit les clés de l'objet en camelCase.
  ```yaml
  type: object
  camelCase: true
  ```
- **constantCase**: Convertit les clés de l'objet en CONSTANT_CASE.
  ```yaml
  type: object
  constantCase: true
  ```
- **noUnknown (propertyNames)**: Définit que l'objet ne peut pas contenir de clés non définies.
  ```yaml
  type: object
  noUnknown: true
  ```

#### String (Chaîne de caractères)
- **minLength (min)**: Définit la longueur minimum de la chaîne de caractères.
  ```yaml
  type: string
  minLength: 5
  ```
- **maxLength (max)**: Définit la longueur maximum de la chaîne de caractères.
  ```yaml
  type: string
  maxLength: 20
  ```
- **pattern (matches or regex)**: Définit une expression régulière à respecter.
  ```yaml
  type: string
  pattern: '^[a-zA-Z]+$'
  ```
- **email (format: 'email')**: Définit que la chaîne de caractères doit être un email.
  ```yaml
  type: string
  format: 'email'
  ```
- **url (format: 'url')**: Définit que la chaîne de caractères doit être une URL.
  ```yaml
  type: string
  format: 'url'
  ```
- **lowercase**: Convertit la chaîne de caractères en minuscule.
  ```yaml
  type: string
  lowercase: true
  ```
- **uppercase**: Convertit la chaîne de caractères en majuscule.
  ```yaml
  type: string
  uppercase: true
  ```
- **trim**: Supprime les espaces en début et fin de chaîne de caractères.
  ```yaml
  type: string
  trim: true
  ```






