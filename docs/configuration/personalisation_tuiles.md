# Personalisation des tuiles de la page d'accueil
Des tuiles peuvent être ajoutées sur la page d'accueil et certaines modifiées.

## Fichier de configuration 
Le fichier de configuration est : ./configs/sesame-app-manager/config/menu.yml
```yaml
entries:
  - icon: mdi-account-off
    label: Etudiants
    path: "/identities?sort[metadata.lastUpdatedAt]=desc&skip=0&filters[^additionalFields.attributes.supannPerson.supannTypeEntiteAffectation]=/etd/i"
    color: primary
    part: Affectations
    badgeValue: ETD

  - icon: mdi-account-tie
    label: Administratifs
    path: "/identities?sort[metadata.lastUpdatedAt]=desc&skip=0&filters[^additionalFields.attributes.supannPerson.supannTypeEntiteAffectation]=/adm/i"
    color: primary
    part: Affectations
    badgeValue: ADM

  - icon: mdi-account-group
    label: Enseignants
    path: "/identities?sort[metadata.lastUpdatedAt]=desc&skip=0&filters[^additionalFields.attributes.supannPerson.supannTypeEntiteAffectation]=/esn/i"
    color: primary
    part: Affectations
    badgeValue: ESN

```
### Description d'une entrée
* **icon** : Choix de l'icone (choisir dans https://pictogrammers.com/library/mdi/) (faire précéder le nom par le prefix mdi-)
* **label** : Le texte affiché dans la tuile
* **name** : Identifiant technique optionnel. S'il est omis, il est auto-généré à partir de `label` (minuscules, espaces remplacés par `_`).
* **path** : chemin de l'url à appeler 
* **color** : Nom de la couleur dans la palette du framework Quasar (https://quasar.dev/style/color-palette)
* **part** : dans quelle section mettre la tuile (Données | Listes | Affectations | Etats | Affectations)
* **roles** : liste optionnelle de rôles ACL requis pour afficher l'entrée. Si vide/absent => visible pour tous (sous réserve des ACL).
* **acl** : liste optionnelle d'ACL nécessaires pour afficher l'entrée. Si vide/absent => visible (sous réserve des autres contraintes).
* **hideInMenuBar** : si `true`, masque l'entrée de la barre latérale (drawer).
* **hideInDashboard** : si `true`, masque l'entrée de la page d'accueil (dashboard/tuiles).

### Surcharge des sections (`parts`)
Les sections de la page d'accueil peuvent être surchargées via `parts`.

* **label** : nom affiché de la section
* **name** : identifiant technique optionnel. Sert à retrouver une section lors d'une surcharge. S'il est omis, il est auto-dérivé de `label` (minuscules, espaces remplacés par `_`).

Exemple :
```yaml
parts:
  - label: Cycle
    name: cycle
    position: 31
```

### Fichier auto-généré
À chaque démarrage (au chargement de la config UI), Sesame génère un fichier `default-menu-data.json` à partir des entrées/parts par défaut. Ce fichier est **auto-généré** et **ne doit pas être modifié**.

### Exemple 
Nous voulons une tuile qui affiche les identités désactivées dans la section Listes

La page à appeler est /identities. Les paramêtres et le fitre sont ont les mêmes syntaxes que l'api (voir le chapitre [Les filtres de recherches pour l'API](/sesame-doc/Api/filtres.html)
Dans le fichier menu.yml on ajoute une entrée:
```yaml
  - icon: mdi-account-cancel
    label: Identitées désactivées
    # name optionnel (sinon auto-déduit de `label`)
    # name: identitees_desactivees
    path: "/identities?sort[metadata.lastUpdatedAt]=desc&skip=0&filters[:dataStatus]=0"
    color: red-10
    # rôles ACL optionnels (si vide/absent => visible pour tous, sous réserve des ACL)
    # roles:
    #   - DSI
    # acl optionnel : si fourni, au moins une ACL doit être autorisée
    # acl:
    #   - /management/identities
    part: Listes
```
