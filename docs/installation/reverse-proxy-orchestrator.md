# Reverse-proxy — frontal d'administration (orchestrator)

Ce guide s'adresse aux **administrateurs de site** qui exposent l'interface d'administration Sesame (Nuxt + API) derrière **Nginx** ou **Apache**.

## Principe

Depuis la version monolithique (`sesame-orchestrator`), le frontal web et l'API tournent dans **un seul conteneur** :

| Port interne | Service |
| --- | --- |
| `3000` | Frontal Nuxt (interface d'administration) |
| `4000` | API NestJS (usage interne au conteneur) |

Le navigateur ne doit parler **qu'au port Nuxt** (`3000`). Nuxt proxifie ensuite les appels `/api/**` vers l'API interne (`SESAME_APP_API_URL`, par défaut `http://127.0.0.1:4000`).

| Chemin navigateur | Traitement |
| --- | --- |
| `/`, assets SPA | Nuxt |
| `/api/**` (REST, authentification, etc.) | Nuxt → proxy interne → API |
| `/api/socket.io` | Idem (long-polling HTTP **et** upgrade WebSocket) |

::: warning Ne pas exposer l'API directement
Ne routez **pas** `/api` ou `/api/socket.io` vers le port `4000` depuis le reverse-proxy externe. Socket.IO et l'authentification par IP reposent sur le passage par Nuxt.
:::

### Script d'installation automatique

Un script Nginx + Docker Compose est disponible pour une installation rapide (voir aussi [Architecture de sécurité](./architecture-de-securite.md#serveur-orchestrator-methode-par-reverse-proxy)) :

```bash
mkdir -p /data/revproxy && cd /data/revproxy
curl -L 'https://raw.githubusercontent.com/Libertech-FR/sesame-exemple/refs/heads/main/reverse_proxy/server/install.sh' --output install.sh
bash install.sh
docker compose up -d
```

La section ci-dessous détaille la configuration manuelle, notamment pour **WebSocket** (Socket.IO temps réel : jobs, backends, cron).

---

## Variables d'environnement

| Variable | Fichier | Rôle |
| --- | --- | --- |
| `SESAME_APP_API_URL=http://127.0.0.1:4000` | `apps/web/.env` | Cible du proxy interne Nuxt → API |
| `SESAME_TRUST_PROXY=1` | `apps/api/.env` | L'API lit `X-Forwarded-For` / `X-Real-IP` (allowlist IP à la connexion) |
| `NUXT_PUBLIC_SOCKET_IO_POLLING_ONLY=false` | conteneur prod | Active WebSocket + repli polling (défaut en production) |

En production, **ne pas** définir `NUXT_PUBLIC_SOCKET_IO_POLLING_ONLY=true` : cela force le polling seul (mode développement).

---

## Nginx

### Configuration recommandée

Utiliser une `map` pour gérer correctement l'en-tête `Connection` lors des upgrades WebSocket :

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 443 ssl http2;
    server_name sesame.example.com;

    # ssl_certificate ...
    # ssl_certificate_key ...

    location / {
        proxy_pass http://sesame-orchestrator:3000;
        proxy_http_version 1.1;

        # WebSocket (Socket.IO sur /api/socket.io)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # IP client (allowlist API)
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}
```

Sur l'hôte (sans réseau Docker `reverse`), remplacer l'upstream par `http://127.0.0.1:3000` ou le port publié (ex. `3002`).

### Variante minimale

Équivalent des trois directives WebSocket courantes :

```nginx
location / {
    proxy_pass http://sesame-orchestrator:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

| Directive Nginx | Rôle |
| --- | --- |
| `proxy_http_version 1.1` | Requis pour l'upgrade WebSocket |
| `proxy_set_header Upgrade $http_upgrade` | Transmet la demande d'upgrade du navigateur |
| `proxy_set_header Connection "upgrade"` | Maintient le tunnel WebSocket vers Nuxt |

---

## Apache (2.4+)

### Modules requis

```apache
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so
```

### VirtualHost avec upgrade WebSocket

```apache
<VirtualHost *:443>
    ServerName sesame.example.com

    SSLEngine on
    # SSLCertificateFile ...
    # SSLCertificateKeyFile ...

    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-For %{REMOTE_ADDR}s

    # HTTP + WebSocket vers Nuxt (Socket.IO inclus dans /api/socket.io)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} =websocket [NC]
    RewriteRule /(.*) ws://sesame-orchestrator:3000/$1 [P,L]
    RewriteCond %{HTTP:Upgrade} !=websocket [NC]
    RewriteRule /(.*) http://sesame-orchestrator:3000/$1 [P,L]

    ProxyPassReverse / http://sesame-orchestrator:3000/
</VirtualHost>
```

Équivalent conceptuel des directives Nginx :

| Nginx | Apache |
| --- | --- |
| `proxy_http_version 1.1` | Règles `RewriteRule` vers `ws://` (WS) et `http://` (HTTP) |
| `Upgrade` / `Connection` | Détection `%{HTTP:Upgrade} =websocket` |

Sur l'hôte sans réseau Docker, remplacer `sesame-orchestrator:3000` par `127.0.0.1:3000`.

---

## Docker Compose et réseau `reverse`

Avec le `docker-compose.prod.yml` officiel, le conteneur `sesame-orchestrator` expose le port `3000` sur le réseau Docker `reverse` (sans publication directe sur l'hôte).

Le reverse-proxy (Nginx ou Apache, souvent dans un conteneur dédié) doit :

1. Rejoindre le réseau externe `reverse` (`docker network create reverse`).
2. Router **tout** le trafic HTTP et WebSocket vers `sesame-orchestrator:3000`.

---

## Vérification

Après mise en place :

1. **Socket.IO** : dans le panneau de debug de l'interface, le transport doit afficher `websocket` (ou `polling` en cas de repli).
2. **IP client** : `GET /api/core/auth/client-ip` doit renvoyer l'adresse IP réelle du navigateur, et non `127.0.0.1`.
3. **Connexion** : l'authentification par allowlist IP doit fonctionner derrière le proxy.

---

## Dépannage

| Symptôme | Cause probable | Action |
| --- | --- | --- |
| `Invalid frame header` (console navigateur) | Upgrade WebSocket non proxifié | Vérifier les directives WS ci-dessus |
| Socket.IO reste en `polling` uniquement | Reverse-proxy sans support WS, ou `NUXT_PUBLIC_SOCKET_IO_POLLING_ONLY=true` | Corriger la config proxy / variables d'env |
| Auth « IP non autorisée » avec `127.0.0.1` | `SESAME_TRUST_PROXY=0` ou en-têtes `X-Forwarded-For` absents | Activer `SESAME_TRUST_PROXY=1` et transmettre les en-têtes IP |
| Fonctionne en local, échoue derrière le proxy | Config WebSocket manquante sur Nginx/Apache | Appliquer ce guide |
