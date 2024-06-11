# Formulaire

Il est possible, une fois que le fichier de validation est fait de generer le fichier de configuration pour l'interface de validation 

## Principe

Les fichiers de configurations pour l'interface d'administration sont dans configs/sesame-orchestrator/jsonforms. 

LE nommage de ses fichiers est le suivant [schema].ui.yml. La presence du fichier ajoutera un onglet dans l'identité. 

## Format

Le format du fichier de formulaire respecte la norme [JSONFORMS](https://jsonforms.io/docs/uischema/)

Le fichier peut être ecrit dans un format YML ou JSON.

Après l installation deux fichiers sont présents inetorgperson.ui.yml et supannPerson.ui.yml

Fichier inetorgperson.ui.yml

```
type: Group
label: Identité
elements:
- type: HorizontalLayout
  elements:
  - type: Control
    label: UID
    scope: "#/properties/uid"
    options:
      required: true
  - type: Control
    label: CN
    scope: "#/properties/cn"
    options:
      required: true
      readOnly: true
  - type: Control
    label: Nom
    scope: "#/properties/sn"
    options:
      readOnly: true
      required: true
- type: HorizontalLayout
  elements:
  - type: Control
    label: Nom d'affichage
    scope: "#/properties/displayName"
    options:
      readOnly: true
  - type: Control
    label: Prénom
    scope: "#/properties/givenName"
    options:
      readOnly: true
- type: HorizontalLayout
  elements:
  - type: Control
    label: Email
    scope: "#/properties/mail"
    options:
      format: email
  - type: Control
    label: Mobile
    scope: "#/properties/mobile"
    options:
      readOnly: true
  - type: Control
    label: Adresse postale
    scope: "#/properties/postalAddress"
    options:
      readOnly: true
- type: HorizontalLayout
  elements:
  - type: Control
    label: language préféré
    scope: "#/properties/preferredLanguage"
    options:
      required: false
      suggestion:
        - FR
        - EN
        - DE
        - IT
  - type: Control
    label: Téléphone
    scope: "#/properties/telephoneNumber"
    options:
      readOnly: true
  - type: Control
    label: Titre
    scope: "#/properties/title"
```

Un élement est composé de : 

* type : Control
* label : Label affiché au dessus du champ
* scope : La référence vers le champs de l'identité sous la forme '#/properties/[Champ]
* options : les options de l'élement. Les options dependent du type de champ


## Exemple 

Pour afficher les champs que nous avons défini dans l'exemple de la configuration des champs et validation, nou créons un fichier configs/sesame-orchestrator/jsonforms/sogxuser.ui.yml

```
type: Group
label: Messagerie
elements:
  - type: HorizontalLayout
    elements:
      - type: Control
        label: Actif(1)/Inactif(0)
        scope: "#/properties/sogxdisableflag"
        options:
          required: true
          suggestion:
            - "0"
            - "1"
      - type: Control
        label: Quota
        scope: "#/properties/sogxquota"
        options:
          showUnfocusedDescription: false
         
```
Nous retrouvons nos deux champs sogxdisableflag et sogxquota dans ce fichier