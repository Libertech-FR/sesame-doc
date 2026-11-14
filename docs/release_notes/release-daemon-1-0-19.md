# Sesame-Daemon Release 1.0.19
Ceci est une release de correction de bug

## Mise à jour
Pour rappel la mise à jour se fait :
* soit
```shell
#wget https://github.com/Libertech-FR/sesame-daemon/releases/download/1.0.19/sesame-daemon_1.0.19_amd64.deb
#dpkg -i sesame-daemon_1.0.19_amd64.deb
```
## Liste des changements
Le daemon n'acceptait pas un status >0 dans la clé status du json renvoyé par un backend
