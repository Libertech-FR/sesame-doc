# Migration Sesame : Alpha → v2

Ce guide décrit la procédure complète pour mettre à niveau une instance Sesame Alpha vers la version 2 à l’aide des deux scripts fournis dans le gist suivant : <https://gist.github.com/tacxou/6631662c8fbe6aa8357f08a61cb55004>.

## Pré-requis
- Sauvegarde récente et vérifiée (base de données, fichiers `configs/`, `certificates/`, volumes applicatifs).
- Python 3.9+ et `pip` disponibles sur la machine d’administration.
- Librairie Python `requests` installée (`pip install requests`).
- Accès réseau et droits suffisants pour arrêter/démarrer les conteneurs Sesame ainsi que pour appeler l’API Sesame (token d’administration nécessaire pour le script de nettoyage des cycles de vie).

> 💡 Positionnez-vous dans le répertoire racine du projet Sesame (`/data/sesame`) pour l’ensemble des commandes.

## 1. Arrêter les conteneurs Sesame
```bash
cd /data/sesame
docker compose down
```

Vérifiez qu’aucun conteneur applicatif `sesame-*` ne reste actif (à l’exception éventuelle des services de base de données).

## 2. Lancer le script d’upgrade
1. Téléchargez les scripts depuis le gist (à exécuter une seule fois ou lors de chaque mise à jour si vous souhaitez les renouveler) :
	```bash
	mkdir -p scripts
	curl -fsSL "https://gist.githubusercontent.com/tacxou/6631662c8fbe6aa8357f08a61cb55004/raw/sesame-upgrade-to-v2.py" -o scripts/sesame-upgrade-to-v2.py
	curl -fsSL "https://gist.githubusercontent.com/tacxou/6631662c8fbe6aa8357f08a61cb55004/raw/sesame-cleanup-lifecycle.py" -o scripts/sesame-cleanup-lifecycle.py
	chmod +x scripts/sesame-upgrade-to-v2.py scripts/sesame-cleanup-lifecycle.py
	```
2. Exécutez le script d’upgrade (il demandera des confirmations si nécessaire) :
	```bash
	python3 scripts/sesame-upgrade-to-v2.py
	```

Le script demande l'arrêt les services restants avant de démarrer, puis sauvegarde le `docker-compose.yml` d’origine (`docker-compose.yml.v1.backup`) et met à jour la configuration pour Sesame v2.

## 3. Redémarrer les conteneurs
```bash
docker compose up -d
docker compose ps
```

Attendez que les services critiques (API, orchestrator, web) soient en bonne santé avant de poursuivre.

## 4. Nettoyer les cycles de vie
Le script de nettoyage requiert un token d’API Sesame avec les droits d’administration. Vous pouvez soit :
- fournir le token via la variable d’environnement `SESAME_API_TOKEN`,
- ou stocker le token dans un fichier `.env` compatible (clé `SESAME_API_TOKEN=`).

Exemple d’exécution en utilisant un fichier `.env` existant :
```bash
python3 scripts/sesame-cleanup-lifecycle.py --env-file configs/sesame-taiga-crawler/.env
```

Par défaut, le script cible l’API sur `http://127.0.0.1:3333/api`. Adaptez l’URL si nécessaire (`--base-url https://votre-hote/api`). Pour effectuer un test à blanc, ajoutez `--dry-run`.

## 5. Vérifications post-migration
- Contrôlez les logs : `docker compose logs -f sesame-orchestrator`.
- Validez l’accès à l’interface Sesame et le fonctionnement des workflows.
- Confirmez que les cycles de vie des identités sont à l’état attendu (`O`).
- Conservez la sauvegarde `docker-compose.yml.v1.backup` tant que la migration n’est pas définitivement validée.

## 6. Nettoyage optionnel
- Supprimez les scripts dans `scripts/` afin de ne pas les relancer si la migration à bien été faites.

La migration Alpha → v2 est terminée lorsque les services sont stables et que toutes les vérifications métiers sont validées.
