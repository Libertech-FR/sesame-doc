---
lang: en-US
title: Exemple
description: Exemple d'ajout de champs 
---
# Exemple 

Nous voulons ajouter à nos identités un schema (qui suis un schema LDAP (sogxuser). Ces champs sont pour la messagerie. 

Nous allons ajouter 3 champs : 

* sogxquota : pour gérer les quotas dans le système de messagerie
* sogxdisableflag : pour désactiver le compte sur le système de messagerie 

dans **configs/sesame-orchestrator/validation nous creons un fichier sogxuser.yml

```
$schema: "http://json-schema.org/draft-07/schema#"
type: "object"
properties:
   sogxquota:
      type: "number"
      description: "Quota messagerie"
   sogxdisableflag:
      type: "number"
      integer: true
      min: 0
      max: 1
      description: "Disable/enable"

```

Voila les champs sogxuser.sogxquota et sogxuser.sogxdisableflag seront disponible dans l'identité
