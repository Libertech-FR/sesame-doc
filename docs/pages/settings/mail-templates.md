---
lang: fr-FR
title: Envoi de mails (templates)
description: Modale d'envoi manuel de templates mail depuis les identités dans Sesame-Orchestrator
---

# Envoi de mails (templates)

Cette page décrit la **modale d’envoi manuel** accessible depuis la gestion des identités (pas un écran de paramètres dédié).

## Accès

- **Liste** `/identities/table` : sélectionner une ou plusieurs identités **synchronisées**, puis « Envoyer un mail (template) ».
- **Fiche** `/identities/table/:id` : bouton équivalent sur une identité synchronisée.

## Prérequis

1. **Serveur SMTP** configuré ([SMTP](smtp.html)).
2. Au moins un **chemin JSON** renseigné pour l’e-mail principal et/ou personnel (page SMTP).
3. Identités en état **synchronisé** ; sinon l’action est désactivée ou un avertissement s’affiche.

## Contenu de la modale

### Colonne formulaire

- **Template** : liste de tous les fichiers `.hbs` du serveur.
  - Templates `mail_*` : envoi autorisé.
  - Templates internes (`initaccount`, `resetaccount`, …) : **aperçu seul** (bandeau bleu, bouton « Aperçu seul — envoi non disponible »).
- **Sujet du mail** : obligatoire pour l’envoi (masqué en mode lecture seule).
- **Adresse(s) du destinataire** : sélection multiple (chips) — e-mail principal et/ou personnel selon la config SMTP.
- **Variables pré-construites** : issues de `configs/mail/mail_templates.yml`.
- **Variables additionnelles** : paires clé/valeur libres (écrasent une clé pré-construite si même nom).
- **Destinataires** : liste des identités concernées.
- **Envoyer à toutes les identités synchronisées** (option) : si la sélection filtrée est plus petite que le total synchronisé.

### Colonne aperçu

- Rendu HTML via `POST /management/mail/templates/preview`.
- Rafraîchissement automatique (debounce) à chaque changement de template, sujet ou variables.

## Envoi

- Bouton **Envoyer** : `POST /management/mail/sendmany`.
- Notification avec nombre de mails envoyés / ignorés (`sent` / `skipped`).

## Permissions

- Action visible selon les droits sur `/management/identities` (mise à jour).
- Envoi API : création sur `/management/mail`.

## Documentation technique

Voir [Templates de mails](../../configuration/mail-templates.html) pour les conventions de nommage, l’API complète et la création de nouveaux modèles.
