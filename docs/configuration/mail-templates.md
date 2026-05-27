---
lang: fr-FR
title: Templates de mails
description: Configuration, conventions et utilisation des modèles Handlebars pour l'envoi de courriels dans Sesame-Orchestrator
---

# Templates de mails

Sesame-Orchestrator utilise des fichiers **Handlebars** (`.hbs`) pour le rendu HTML des courriels. Ils servent aux flux automatiques (invitation, reset, rappels d’expiration, alertes) et à l’**envoi manuel** depuis la table des identités.

## Emplacements des fichiers

| Élément | Chemin (dans le conteneur API) | Rôle |
| --- | --- | --- |
| Templates HTML | `templates/*.hbs` | Modèles Handlebars compilés à l’envoi |
| Variables UI | `configs/mail/mail_templates.yml` | Variables proposées dans la modale d’envoi manuel |
| Valeurs par défaut | `defaults/mail/mail_templates.yml` | Copié vers `configs/mail/` au premier démarrage si absent |

En déploiement Docker, monter le répertoire des templates sur `/data/templates` (voir aussi [Configuration gestion MDP](config-gestion-mdp.html#modele-des-mails)).

Exemple de volume :

```yaml
- ./configs/sesame-orchestrator/templates:/data/templates
```

Le fichier `configs/mail/mail_templates.yml` peut être monté ou versionné séparément selon votre installation.

## Types de templates

### Templates personnalisables (`mail_*`)

Les fichiers dont le nom commence par **`mail_`** sont listés en priorité et peuvent être **envoyés manuellement** depuis l’interface (identités synchronisées).

Exemples fournis :

| Fichier | Usage typique |
| --- | --- |
| `mail_welcome.hbs` | Message de bienvenue |
| `mail_custom_notification.hbs` | Notification générique (titre, message, CTA) |
| `mail_security_alert.hbs` | Alerte sécurité (ex. mot de passe compromis) |

### Templates internes Sesame (sans préfixe `mail_`)

Réservés aux **flux métier** de la plateforme. Ils apparaissent dans la liste de la modale d’envoi en **mode lecture seule** (aperçu uniquement) :

| Fichier | Déclenché par |
| --- | --- |
| `initaccount.hbs` | Invitation / initialisation de compte (`POST /management/passwd/init`, `initmany`) |
| `resetaccount.hbs` | Réinitialisation de mot de passe (`PasswdService`, code à 6 chiffres) |

L’API refuse l’envoi manuel de ces templates (`POST /management/mail/sendmany`).

## Moteur de rendu

- **Moteur** : [Handlebars](https://handlebarsjs.com/) (via `@nestjs-modules/mailer`).
- **Mode strict** : activé à l’**envoi réel** (variable absente = erreur).
- **Aperçu UI** : mode non strict + valeurs fictives pour les variables runtime non connues à l’avance (ex. `code` de reset).

Syntaxe courante : `{{ variable }}`, blocs `{{#if variable}}…{{/if}}`, accès imbriqué `{{ identity.inetOrgPerson.uid }}`.

### Variables courantes par flux

**Initialisation (`initaccount`)** — fournies par le backend :

| Variable | Description |
| --- | --- |
| `uid` | Identifiant du compte |
| `url` | Lien d’activation (token) |
| `displayName` | Nom affiché |
| `mail` | Adresse mail de l’identité |

**Reset (`resetaccount`)** :

| Variable | Description |
| --- | --- |
| `displayName` | Nom affiché |
| `uid` | Identifiant |
| `code` | Code numérique de réinitialisation (généré à l’envoi, non prédictible en aperçu) |

**Envoi manuel (`mail_*`)** — selon le template ; l’objet **`identity`** (document MongoDB) est injecté dans le contexte, ainsi que les variables de `mail_templates.yml` et les variables additionnelles saisies dans la modale.

Le **sujet SMTP** est un champ **obligatoire** saisi dans l’UI (ou fixé par le flux automatique), distinct des variables Handlebars du corps (sauf si le template réutilise `{{ subject }}` dans le HTML).

### Aperçu : valeurs par défaut

Lors d’un aperçu, des placeholders sont appliqués si la variable n’est pas fournie, par exemple :

- `code` → `123456`
- `url` → `https://example.invalid/preview`
- `displayName` → `Jean Dupont (aperçu)`
- `uid` → `preview.user`

Les variables additionnelles saisies dans la modale **remplacent** ces défauts.

## Configuration `mail_templates.yml`

Fichier : `configs/mail/mail_templates.yml`

```yaml
mailTemplates:
  variables:
    - key: appName
      label: Nom de l'application
      description: Nom affiché dans certains templates.
      example: "Sesame"
      defaultValue: "Sesame"
    - key: url
      label: URL principale
      ...
```

- Les entrées alimentent la section **« Variables pré-construites »** de la modale.
- Les `defaultValue` peuvent contenir des placeholders **Liquid** `{{ ... }}` résolus au chargement (`resolveConfigVariables`).
- Le **sujet** n’y figure plus : il est saisi dans un champ dédié de la modale.

Pour ajouter une variable disponible côté UI, ajoutez une entrée `key` / `label` / `defaultValue`, puis redémarrez ou rechargez la config selon votre déploiement.

## Chemins JSON des destinataires (SMTP)

Configurés dans **Paramètres → Serveur SMTP** (`/settings/smtp`) :

| Champ | Exemple |
| --- | --- |
| Chemin JSON — e-mail principal | `inetOrgPerson.mail` |
| Chemin JSON — e-mail personnel | `additionalFields.attributes.supannPerson.supannAutreMail` |

Ces chemins sont **validés à l’enregistrement** sur une identité synchronisée.

Lors de l’envoi manuel, l’utilisateur peut sélectionner **une ou plusieurs** adresses (principal et/ou personnel). Pour chaque identité, les adresses distinctes reçoivent **un même message** (champ `to` multiple). Les adresses vides sur un chemin sont ignorées ; si aucune adresse n’est trouvée, l’identité est comptée comme « ignorée » (`skipped`).

## API de gestion des templates

Préfixe : `/management/mail`

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/templates` | Liste tous les fichiers `.hbs` (tri : `mail_*` en premier) |
| `GET` | `/templates/config` | Contenu de `mail_templates.yml` (variables UI) |
| `POST` | `/templates/preview` | Rendu HTML d’aperçu (`template`, `variables` optionnelles) |
| `POST` | `/sendmany` | Envoi d’un template à plusieurs identités synchronisées |

### Corps de `POST /sendmany`

```json
{
  "ids": ["…"],
  "template": "mail_welcome",
  "subject": "Bienvenue sur Sesame",
  "variables": {
    "appName": "Sesame",
    "url": "https://…"
  },
  "recipientAddressSources": ["principal", "personnel"]
}
```

- `template` : nom sans extension `.hbs`, doit commencer par `mail_` pour l’envoi manuel.
- `subject` : obligatoire.
- `recipientAddressSources` : tableau non vide ; valeurs `principal` et/ou `personnel`. Si absent, repli sur l’attribut mail de la politique de mot de passe (`emailAttribute`).

Réponse : `{ "sent": n, "skipped": m }`.

## Interface : envoi depuis les identités

Disponible pour les identités **synchronisées** uniquement :

- **Liste** `/identities/table` : action de masse « Envoyer un mail (template) » (`mdi-email`).
- **Fiche** `/identities/table/:id` : même action sur une identité.

La modale permet de :

1. Choisir un template (aperçu à droite).
2. Saisir le **sujet** (obligatoire pour les templates `mail_*`).
3. Choisir une ou plusieurs **adresses destinataires** (si configurées dans SMTP).
4. Ajuster les variables pré-construites et des variables libres (clé/valeur).
5. Optionnellement envoyer à toute la sélection filtrée (case à cocher si plusieurs identités éligibles).

Templates internes : bandeau « mode lecture seule », pas d’envoi, champs sujet/destinataire masqués.

Permissions : envoi soumis aux droits sur `/management/identities` (mise à jour) et `/management/mail` (création).

## Créer un template `mail_*` personnalisé

1. Ajouter `templates/mail_mon_message.hbs` (préfixe `mail_` obligatoire pour l’envoi manuel).
2. Utiliser Handlebars ; tester avec l’aperçu dans la modale.
3. Optionnel : déclarer des variables dans `configs/mail/mail_templates.yml`.
4. Redémarrer l’API si les templates sont lus au démarrage selon votre configuration Mailer.

Conseil MJML : composer en [MJML](https://mjml.io/), exporter en HTML, enregistrer dans le fichier `.hbs` (voir [config gestion MDP](config-gestion-mdp.html#faire-son-modele-de-mail)).

## Rappels d’expiration et cron

Les jalons de rappel de mot de passe (politique MDP + cron `identities-password-expiration-reminder`) utilisent des templates `mail_*` configurés dans `passwordExpirationReminderSteps`. Voir [Politique mots de passe](../pages/settings/password-policy.html) et [Tâches planifiées](cron.html).

## Voir aussi

- [Serveur SMTP](../pages/settings/smtp.html) — paramètres SMTP et chemins JSON destinataires
- [Table des identités](../pages/identities/table.html) — actions de masse
- [Configuration gestion MDP](config-gestion-mdp.html) — montage Docker et création graphique (MJML)
