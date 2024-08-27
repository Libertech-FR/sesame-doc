import{_ as e,c as n,o as s,a}from"./app-DsJIEaEY.js";const i={},d=a(`<h1 id="installation-de-sesame-daemon" tabindex="-1"><a class="header-anchor" href="#installation-de-sesame-daemon"><span>Installation de sesame-daemon</span></a></h1><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2><p><strong>Sesame-Daemon</strong> fait la communication entre sesame-Orchestrateur et les differents catalogues et bases de données d&#39;authentification.</p><p><strong>Sesame-Daemon</strong> executera chaque <strong>backend</strong> quand il recevera un ordre de sesame-Orchestrateur</p><h2 id="prerequis" tabindex="-1"><a class="header-anchor" href="#prerequis"><span>Prérequis</span></a></h2><ul><li>Debian 12</li></ul><p>Malgrés que le daemon peut être sur une autre machine que l&#39;orchestrator nous vous conseillons, pour des raisons de sécurité et facilité de l&#39;installer sur le meme host</p><h2 id="installation-du-demon" tabindex="-1"><a class="header-anchor" href="#installation-du-demon"><span>Installation du démon</span></a></h2><p>Pour l&#39;instant l&#39;installation n&#39;est disponible que pour <strong>Debian</strong></p><p>Télécharger le package debian :</p><p><a href="https://github.com/Libertech-FR/sesame-daemon/releases/" target="_blank" rel="noopener noreferrer">Lien de téléchargement du paquet (https://github.com/Libertech-FR/sesame-daemon/releases)</a></p><p>Assurez vous avant de lancer l&#39;installation que sesame est bien démarré</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#apt-get update </span>
<span class="line">#dpkg -i sesame-daemon_0.2.13_amd64.deb </span>
<span class="line">Sélection du paquet sesame-daemon précédemment désélectionné.</span>
<span class="line">(Lecture de la base de données... 37026 fichiers et répertoires déjà installés.)</span>
<span class="line">Préparation du dépaquetage de sesame-daemon_0.2.13_amd64.deb ...</span>
<span class="line">Dépaquetage de sesame-daemon (0.2.13) ...</span>
<span class="line">Paramétrage de sesame-daemon (0.2.13) ...</span>
<span class="line">Created symlink /etc/systemd/system/multi-user.target.wants/sesame-daemon.service → /lib/systemd/system/sesame-daemon.service.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Vérifier que le daemon est bien démarré</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#journalctl -u sesame-daemon</span>
<span class="line">juin 04 18:11:29 docker2 systemd[1]: Stopping sesame-daemon.service - sesame-daemon...</span>
<span class="line">juin 04 18:11:29 docker2 systemd[1]: sesame-daemon.service: Deactivated successfully.</span>
<span class="line">juin 04 18:11:29 docker2 systemd[1]: Stopped sesame-daemon.service - sesame-daemon.</span>
<span class="line">juin 04 18:11:29 docker2 systemd[1]: sesame-daemon.service: Consumed 1.413s CPU time.</span>
<span class="line">juin 04 18:11:29 docker2 systemd[1]: Started sesame-daemon.service - sesame-daemon.</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [NestFactory] Starting Nest application...</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] RedisModule dependencies initiali&gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] AppModule dependencies initialize&gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] ConfigHostModule dependencies ini&gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] ConfigModule dependencies initial&gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] ConfigModule dependencies initial&gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] RedisCoreModule dependencies init&gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [InstanceLoader] BackendRunnerModule dependencies &gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendRunnerService] OnModuleInit initialized 🔴</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendConfigService] Load backends config...</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendConfigService] /var/lib/sesame-daemon/back&gt;</span>
<span class="line">juin 04 18:11:30 docker2 sesame-daemon[975938]: [Nest] 975938  - 2024-06-04 18:11:30     LOG [BackendRunnerService] OnApplicationBootstrap init&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="fichier-de-parametrage-du-sesame-daemon" tabindex="-1"><a class="header-anchor" href="#fichier-de-parametrage-du-sesame-daemon"><span>Fichier de paramétrage du sesame-daemon</span></a></h1><p>Un fichier de paramètre est present <strong>/etc/default/default</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">SESAME_LOG_LEVEL=INFO</span>
<span class="line">SESAME_REDIS_URI=redis://localhost:6379/0</span>
<span class="line">SESAME_BACKENDS_PATH=/var/lib/sesame-daemon/backends</span>
<span class="line">SESAME_NAME_QUEUE=backend</span>
<span class="line">SESAME_REDIS_USER=monUser</span>
<span class="line">SESAME_REDIS_PASSWORD=xx</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="installation-des-backends" tabindex="-1"><a class="header-anchor" href="#installation-des-backends"><span>Installation des backends</span></a></h1><p>voir la section Backends</p>`,20),l=[d];function t(r,c){return s(),n("div",null,l)}const m=e(i,[["render",t],["__file","installation-daemon.html.vue"]]),p=JSON.parse('{"path":"/installation/installation-daemon.html","title":"Installation sesame-daemon","lang":"en-US","frontmatter":{"lang":"en-US","title":"Installation sesame-daemon","description":"Installation de sesame-daemon"},"headers":[{"level":2,"title":"Introduction","slug":"introduction","link":"#introduction","children":[]},{"level":2,"title":"Prérequis","slug":"prerequis","link":"#prerequis","children":[]},{"level":2,"title":"Installation du démon","slug":"installation-du-demon","link":"#installation-du-demon","children":[]}],"git":{"updatedTime":1724704511000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":5}]},"filePathRelative":"installation/installation-daemon.md"}');export{m as comp,p as data};
