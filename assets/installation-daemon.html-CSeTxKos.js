import{_ as e,c as n,o as s,a}from"./app-liOpGe6l.js";const i={},l=a(`<h1 id="installation-de-sesame-daemon" tabindex="-1"><a class="header-anchor" href="#installation-de-sesame-daemon"><span>Installation de sesame-daemon</span></a></h1><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2><p><strong>Sesame-Daemon</strong> fait la communication entre sesame-Orchestrateur et les differents catalogues et bases de données d&#39;authentification.</p><p><strong>Sesame-Daemon</strong> executera chaque <strong>backend</strong> quand il recevera un ordre de sesame-Orchestrateur</p><h2 id="prerequis" tabindex="-1"><a class="header-anchor" href="#prerequis"><span>Prérequis</span></a></h2><ul><li>Debian 12</li></ul><p>Malgrés que le daemon peut être sur une autre machine que l&#39;orchestrator nous vous conseillons, pour des raisons de sécurité et facilité de l&#39;installer sur le meme host</p><h2 id="installation-du-demon" tabindex="-1"><a class="header-anchor" href="#installation-du-demon"><span>Installation du démon</span></a></h2><p>Pour l&#39;instant l&#39;installation n&#39;est disponible que pour <strong>Debian</strong></p><p>Télécharger le package debian :</p><p><a href="https://github.com/Libertech-FR/sesame-daemon/releases/" target="_blank" rel="noopener noreferrer">Lien de téléchargement du paquet (https://github.com/Libertech-FR/sesame-daemon/releases)</a></p><p>Assurez vous avant de lancer l&#39;installation que sesame est bien démarré</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#apt-get update </span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="installation-du-backend-ldap" tabindex="-1"><a class="header-anchor" href="#installation-du-backend-ldap"><span>Installation du backend LDAP</span></a></h2><p>télechargez le paquet debian (.deb) avec ce lien</p><p><a href="https://github.com/Libertech-FR/sesame-backend-ldap/releases/" target="_blank" rel="noopener noreferrer">https://github.com/Libertech-FR/sesame-backend-ldap/releases</a></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"># dpkg -i sesame-backend-openldap_0.0.3_amd64.deb </span>
<span class="line">Sélection du paquet sesame-backend-openldap précédemment désélectionné.</span>
<span class="line">(Lecture de la base de données... 37052 fichiers et répertoires déjà installés.)</span>
<span class="line">Préparation du dépaquetage de sesame-backend-openldap_0.0.3_amd64.deb ...</span>
<span class="line">Dépaquetage de sesame-backend-openldap (0.0.3) ...</span>
<span class="line">dpkg: des problèmes de dépendances empêchent la configuration de sesame-backend-openldap :</span>
<span class="line"> sesame-backend-openldap dépend de libnet-ldap-perl; cependant :</span>
<span class="line">  Le paquet libnet-ldap-perl n&#39;est pas installé.</span>
<span class="line"> sesame-backend-openldap dépend de libjson-perl; cependant :</span>
<span class="line">  Le paquet libjson-perl n&#39;est pas installé.</span>
<span class="line"></span>
<span class="line">dpkg: erreur de traitement du paquet sesame-backend-openldap (--install) :</span>
<span class="line"> problèmes de dépendances - laissé non configuré</span>
<span class="line">Des erreurs ont été rencontrées pendant l&#39;exécution :</span>
<span class="line"> sesame-backend-openldap</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ces erreurs sont normales car dpkg n&#39;installe pas les dépendance tout seul.</p><p>Installez les dépendances :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#apt-get -f install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="configuration-du-backend-ldap" tabindex="-1"><a class="header-anchor" href="#configuration-du-backend-ldap"><span>Configuration du backend LDAP</span></a></h2><p>Copiez le fichier exemple sur config.conf</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">cd /var/lib/sesame-daemon/backends/01openldap/etc</span>
<span class="line">cp config.conf.exemple config.conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="config-conf" tabindex="-1"><a class="header-anchor" href="#config-conf"><span>config.conf :</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">host=myldap.mydomain.com</span>
<span class="line">dn=cn=manager,cn=internal,dc=mydomain,dc=com</span>
<span class="line">password=MyPassword</span>
<span class="line">base=dc=mydomain,dc=com</span>
<span class="line">userbase=ou=peoples,dc=mydomain,dc=com</span>
<span class="line">rdnattribute=uid</span>
<span class="line">branchForEtd=ou=Etudiants</span>
<span class="line">branchForAdm=ou=Administratifs</span>
<span class="line">branchForEsn=ou=Enseignants</span>
<span class="line">branchAttr=supannTypeEntiteAffectation</span>
<span class="line">backendFor=adm,etd,esn</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>host : addresse de votre serveur ldap sous la forme simple ou en URL (ldap://monserveur:389 ou ldaps://monserveur:636)</li><li>dn : le dn de connexion (il doit avoir les droits d&#39;écriture sur les branches )</li><li>password : mot de passe du DN ci dessus</li><li>base : votre base LDAP</li><li>userbase : la branche dans laquelle seront créés les comptes</li><li>rdnattribute : l&#39;attribut qui servira à la composition du DN</li><li>branchForEtd : la sous branche (dans userbase) pour les étudiants. Si ce paramètre est vide les identitées seront créées directememt dans <strong>userbase</strong></li><li>branchForAdm : idem pour les administratifs</li><li>branchForEsn : idem pour les enseignants</li><li>branchAttr : l&#39;attribut qui sert à determiner dans quelle branche l&#39;identité est crée.</li><li>backendFor : liste des types d&#39;identités gérée par le backend ex : adm,esn,etd</li></ul><h3 id="config-yml-a-la-racine-du-backend" tabindex="-1"><a class="header-anchor" href="#config-yml-a-la-racine-du-backend"><span>config.yml (à la racine du backend )</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">_version: 1</span>
<span class="line"></span>
<span class="line">name: &#39;openldap&#39;</span>
<span class="line">description: &#39;Backend for openldap&#39;</span>
<span class="line">active: false</span>
<span class="line">actions:</span>
<span class="line">  IDENTITY_PASSWORD_CHANGE:</span>
<span class="line">    script: &quot;changepasswd&quot;</span>
<span class="line">    onError: &#39;stop&#39;</span>
<span class="line">  IDENTITY_PASSWORD_RESET:</span>
<span class="line">    script: &quot;resetpasswd&quot;</span>
<span class="line">    onError: &#39;stop&#39;</span>
<span class="line">  IDENTITY_CREATE:</span>
<span class="line">    script: &#39;upsertidentity&#39;</span>
<span class="line">    onError: &#39;stop&#39;</span>
<span class="line">  IDENTITY_UPDATE:</span>
<span class="line">    script: &#39;upsertidentity&#39;</span>
<span class="line">    onError: &#39;stop&#39;</span>
<span class="line">  IDENTITY_DELETE:</span>
<span class="line">    script: &#39;dummy.sh&#39;</span>
<span class="line">    onError: &#39;stop&#39;</span>
<span class="line">  PING_TARGET:</span>
<span class="line">    script: &#39;dummy.sh&#39;</span>
<span class="line">    onError: &#39;continue&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ce fichier decrit, selon les actions, les scripts qui seront lancés</p><p>Le seul paramètre que vous pouvez regler est :</p><ul><li>action : (false|true) Rend actif le backend</li></ul><h1 id="fichier-de-parametrage-du-sesame-daemon" tabindex="-1"><a class="header-anchor" href="#fichier-de-parametrage-du-sesame-daemon"><span>Fichier de paramétrage du sesame-daemon</span></a></h1><p>Un fichier de paramètre est present <strong>/etc/default/default</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">SESAME_LOG_LEVEL=INFO</span>
<span class="line">SESAME_REDIS_URI=redis://localhost:6379/0</span>
<span class="line">SESAME_BACKENDS_PATH=/var/lib/sesame-daemon/backends</span>
<span class="line">SESAME_NAME_QUEUE=backend</span>
<span class="line">SESAME_REDIS_USER=monUser</span>
<span class="line">SESAME_REDIS_PASSWORD=xx</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),d=[l];function t(r,c){return s(),n("div",null,d)}const o=e(i,[["render",t],["__file","installation-daemon.html.vue"]]),u=JSON.parse('{"path":"/installation/installation-daemon.html","title":"Installation sesame-daemon","lang":"en-US","frontmatter":{"lang":"en-US","title":"Installation sesame-daemon","description":"Installation de sesame-daemon"},"headers":[{"level":2,"title":"Introduction","slug":"introduction","link":"#introduction","children":[]},{"level":2,"title":"Prérequis","slug":"prerequis","link":"#prerequis","children":[]},{"level":2,"title":"Installation du démon","slug":"installation-du-demon","link":"#installation-du-demon","children":[]},{"level":2,"title":"Installation du backend LDAP","slug":"installation-du-backend-ldap","link":"#installation-du-backend-ldap","children":[]},{"level":2,"title":"Configuration du backend LDAP","slug":"configuration-du-backend-ldap","link":"#configuration-du-backend-ldap","children":[{"level":3,"title":"config.conf :","slug":"config-conf","link":"#config-conf","children":[]},{"level":3,"title":"config.yml (à la racine du backend )","slug":"config-yml-a-la-racine-du-backend","link":"#config-yml-a-la-racine-du-backend","children":[]}]}],"git":{"updatedTime":1718092142000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":3}]},"filePathRelative":"installation/installation-daemon.md"}');export{o as comp,u as data};
