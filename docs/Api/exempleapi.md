# Exemples d'utilisation de l'API Sesame
## Utilisation en python de l'api
### recherche d'identités

Deux variables d'environnement servent à passer l'URL et le TOKEN

* API_BASEURL Url de l api de l'orchestrator
* API_TOKEN JEton d'authentification (créé sur l'orchestrator par la commande **make sesame-create-keyring**)
```
API_BASEURL=http://192.168.0.1:4000
API_TOKEN=eyJhbGciOiJIUzI....

```

Cet exemple prend en argument l'uid et le recherche 
```bash
python get_identity.py --uid ddupont
```

**Script python get_identity.py**

```python
import requests
import os
import argparse

def get_identity(uid):
    api_baseurl = os.getenv('API_BASEURL')
    api_token = os.getenv('API_TOKEN')
    headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json; charset=utf-8",
        }
    params = {
        "filters[:inetOrgPerson.uid]": uid
    }
    response=requests.get(api_baseurl +"/management/identities",headers=headers,params=params)
    data.json()
    return data

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--uid', help='uid', default='')
    args = parser.parse_args()
    data=get_identity(args.uid)
    print("Status request: " + str(data['statusCode']) +"\n")
    

```

Les filtres sont passés dans le tableau params (voir la documentation au sujet des fitres)

Pour faire une recherche multiple exemple uid = dupont et identité synchronisée :

```python
params = {
        "filters[:inetOrgPerson.uid]": "ddupont"
        "filters[:state]": 99
    }
```

Pour rechercher tous les identités dont le nom commence par b ou B. Pour ce cas nous utilisons une expression régulière sur le champ sn

```python
params = {
        "filters[^inetOrgPerson.sn]": "/¨b/i"
    }
```

Pour rechercher toutes les identités à completer ou en erreur

```python
params = {
        "filters[@state][0]": -2,
        "filters[@state][1]": -3,
    }
```

## Modification d'une identité

la modification de l identité se fait par la methode PATCH sur l'url /managment/identities 

Vous devez lire l entrée modifier le tableau et enlever la clé metadata et appeler la méthode path 

Exemple modification de l'état de l identité
```bash
python set_identity.py --uid ddupont --status disable
```
Script python **set_identity.py**
```python 
import requests
import os
import argparse

def get_identity(uid):
    api_baseurl = os.getenv('API_BASEURL')
    api_token = os.getenv('API_TOKEN')
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json; charset=utf-8",
    }
    params = {
        "filters[inetOrgPerson.uid]": uid
    }
    response = requests.get(api_baseurl + "/management/identities", headers=headers, params=params)
    data = response.json()
    return data

def set_identity(uid,status):
    api_baseurl = os.getenv('API_BASEURL')
    api_token = os.getenv('API_TOKEN')
    headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json; charset=utf-8",
        }
    resp=get_identity(uid)
    data_json = resp['data'][0]
    data_json['dataStatus']=status
    del data_json['metadata']
    id=resp['data'][0]['_id']
    response=requests.patch(api_baseurl +"/management/identities/" + id , headers=headers,json=data_json)
    return response

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--uid', help='uid', default='')
    parser.add_argument( '--status',help="disable | enable")
    args = parser.parse_args()
    status=-3
    if args.status == "enable":
        status=1

    data=set_identity(args.uid,status)
    rep=data.json()
    print("Status request: " + str(rep['statusCode']) +"\n")

```

