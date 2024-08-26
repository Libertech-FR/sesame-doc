# Backend AD 
Ce backup sert à synchroniser les identitées avec Active Directory sur windows server >= 2019

## Installation 

Pour l'instant juste le paquet debian est disponible


téléchargez le packet debian à l'adresse : [https://github.com/Libertech-FR/sesame-backend-ad/releases/](https://github.com/Libertech-FR/sesame-backend-ad/releases/)

```
dpkg -i sesame-backend-ad_x.x.x_amd64.deb
```
Les erreurs sont normales car il y a des dependences supplémentaires à installer : 

```
apt-get install -f
```

## Activation et paramètrage

allez dans le répertoire /var/lib/backend-modules/ad

et lancez le script d'activation (install.sh

```
cd  /var/lib/backend-modules/ad
./install.sh
```
Le script va vous demander un certains nombre de renseignement pour pouvoir configurer le backend

* **Numero de demarrage du module (2 positions) :** Position d'execution du Backend dans le repertoire /var/lib/sesame-backend/backends. Mettre un chiffre sur 2 positions.
* **Adresse du serveur AD primaire :** Entrez le FDQN ou l'adresse IP du serveur de domaine (assurez vous avant que le serveur où est installé le daemon peut accéder au poer 22 (ssh)
* **Utilisateur (doit avoir les droits d'administration) :** Utilateur ayant les droits d'administration du serveur
* **Mot de passe :** Mot de passe de cet utilisateur (le mot de passe ne sera pas enregistré sur le serveur mais est utilisé pour copier la clé publique qui sera générée par le script
* **Base ldap AD :** Base LDAP de votre domaine (vous pouvez l'avoir en vous connectant sur le serveur windows (Utilisateurs et ordinateurs Active Directory -> bouton droit sur le domaine et editeur d'attributs, cherchez "DistinguishedName")
* **Domaine pour UserPrincipalName :** Le nom de domaine sou la forme DOMAIN.XX (vous pouvez le voir dans l'onglet compte d'un utilisateur.

Une fois les renseignements donnés le script va générer une paire de clés ed25519 et va recopier la clé publique sur le serveur AD 


## Architecture du Backend après l'installation 
Le script d'installation aura mis dans dans **/var/lib/sesame-daemon/XXad** les repertoires, fichiers necessaires

```
XXad - etc - config.conf
     - bin - changepwd.py
           - ping.py
           - resetpwd.py
           - upsertidentity.py
     - lib - ad_utils.py
           - backends_utils.py
     - ps1_templates - changepassword.template
     					 - ping.template
     					 - resetpassword.template
     					 - upsertidentity.template
     config.yml
```
### Fichier de configuration (etc/config.conf)

```
# Paramètres générés par  install.sh
host=ad.mydomain.com
user=administrator
base=dc=mydomain,dc=com
domain=libertest.fr
# Paramètres que vous devez renseigner manuellement
branchForEtd=ou=Etudiants
branchForAdm=ou=Administratifs
branchForEsn=ou=Enseignants
branchAttr=supannTypeEntiteAffectation
backendFor=adm,etd,esn
```
#### Paramètres renseignés par install.sh
* **host** = adresse du serveur AD primaire 
* **user** = Utilisateur ayant les droits d'administration
* **base** = Base LDAP du domaine (DistinguishedName)
* **domain** = domaine sous la forme doamin.xx

#### Paramètres facultatifs 
* **branchForEtd** = branche relative pour la population etd 
* **branchForAdm** = branche relative pour la population adm
* **branchForEsn** = branche relative pour la population esn
* **branchAttr** = Attribut qui sert à determiner le type de population
* **backendFor** = Le backend fera l'action pour les populations listées

### Les templates powershell 

Le principe de fonctionnenemt est le suivant : 

* Le script python genére un script powershell par rapport au modèle (templates).
* Le script copie via ssh le script généré sur le serveur windows.
* Le script powershell est exécuté.

Les templates sont généré avec la librairie **jinja2**

Vous trouverez la documentation Jinja à [https://jinja.palletsprojects.com/en/3.1.x/](https://jinja.palletsprojects.com/en/3.1.x/)

Les variables disponibles pour le template sont : 

* **e** L'identité sous forme e.attribut exemple : e.cn, e.supannTypeEntiteAffectation
* **domain** la variable domain du fichier de configuration
* **base** Base LDAP du domaine present dans le fichier de configuration
* **dn** Le DN calculé de l'identité
* **path** le DN superieur de l'identité


Exemple de template (upsertidentity.template)

```powershell
try{
    $tab=Get-ADUser -Filter 'employeeNumber -eq "{{ e.employeeNumber }}" -and employeeType -eq "{{ e.employeeType }}"' -Properties "DistinguishedName"
	if ($tab["DistinguishedName"] -ne "{{ dn }}"){
	    try{
	        $dn=$tab["DistinguishedName"]
            move-adObject "$dn" -targetpath "{{ path }}"
	    }catch{
	        Write-Host $_
            exit 1
	    }
	}
	$UserExists = $true
}
catch{
    $UserExists = $false
} 
if ($UserExists -eq $false){
    $np = @{
       Path="{{ path }}"
       EmployeeNumber="{{ e.employeeNumber }}"
       Name="{{ e.cn }}"
       DisplayName="{{ e.displayName }}"
       GivenName="{{ e.givenName }}"
       Surname="{{ e.sn }}"
       SamAccountName="{{ e.uid }}"
       EmailAddress="{{ e.mail }}"
       UserPrincipalName = "{{ e.uid }}" + '@' + "{{ domain }}"
       Enabled=$false
       CannotChangePassword=$true
       ChangePasswordAtLogon = $false
    }
    try{
        new-adUser @np -OtherAttributes @{ 'EmployeeType' = '{{ e.employeeType }}' }
        Write-Host "Identity created"
    }catch{
        Write-Host $_
        exit 1
    }
}else{
    try{
        $dn=$tab["DistinguishedName"]
        $UserPrincipalName = "{{ e.uid }}" + '@' + "{{ domain }}"
        set-adUser -Identity "$dn" -SamAccountName "{{ e.uid }}" -DisplayName "{{e.displayName}}" -GivenName "{{ e.givenName }}" -EmailAddress "{{ e.mail }}" -UserPrincipalName "$UserPrincipalName"
        Write-Host "Identity modified"
    }catch{
        Write-Host $_
        exit 1
    }
}
exit 0

``` 

Le powershell doit donner un code de retour (exit) 
* 0 tout est ok 
* 1 Erreur 

L'erreur  ou le message doit être écrite sur la sortie standard (Write-Host)