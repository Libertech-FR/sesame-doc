import{_ as n,c as s,o as e,a}from"./app-CXV-ti92.js";const i={},l=a(`<h1 id="architecture" tabindex="-1"><a class="header-anchor" href="#architecture"><span>Architecture</span></a></h1><p>Si vous avez installé Sesame avec le script d&#39;installation, vous avez cette structure dans le répertoire d&#39;installation</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">.env</span>
<span class="line">docker-compose.yml</span>
<span class="line">Makefile</span>
<span class="line">configs/</span>
<span class="line">├── sesame-app-manager/</span>
<span class="line">│   ├── statics/</span>
<span class="line">│   │   ├── logo.png</span>
<span class="line">│   └── config/</span>
<span class="line">│       ├── identities.columns.yml</span>
<span class="line">│       ├── menus.yml</span>
<span class="line">├── sesame-orchestrator/</span>
<span class="line">│   ├── jsonforms/</span>
<span class="line">│   │   ├── nom_object_class.ui.yml</span>
<span class="line">│   │   └── ...</span>
<span class="line">│   └── validations/</span>
<span class="line">│       ├── nom_object_class.yml</span>
<span class="line">│       └── ...</span>
<span class="line">├── sesame-taiga-crawler/</span>
<span class="line">│   ├── .env</span>
<span class="line">│   └── mappings.json</span>
<span class="line">import</span>
<span class="line">    ├── .env</span>
<span class="line">    ├── cache</span>
<span class="line">    └── data</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="env" tabindex="-1"><a class="header-anchor" href="#env"><span>.env</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#Clé pour la génération du jeton JWT</span>
<span class="line">JWT_SECRET=&#39;w1CMHnr{n!4ccEkaS1%4a8,[y)rFO{z4&#39;</span>
<span class="line"># Url du serveur</span>
<span class="line">HOST=http://192.168.1.1</span>
<span class="line"># Type de connexion (true ou false)</span>
<span class="line">TLS=false</span>
<span class="line">SESAME_FRONT_MDP=&quot;https://monfrontal-de-mot-de-passe.fr&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml"><span>docker-compose.yml</span></a></h3><p>Fichier de configuration Docker Compose pour lancer les services.</p><h3 id="makefile" tabindex="-1"><a class="header-anchor" href="#makefile"><span>Makefile</span></a></h3><p>Fichier de configuration Make pour lancer les commandes de gestion des services et l&#39;import des identitées depuis taiga.</p><h3 id="configs" tabindex="-1"><a class="header-anchor" href="#configs"><span>configs</span></a></h3><p>Dossier de configuration pour chaque service ####sesame-app-manager</p><ul><li><code>statics/</code> : Dossier contenant les fichiers statiques (images, etc.).</li><li><code>config/identities.columns.yml</code> : Fichier de configguration des colonnes dans le panneau identités</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">entries:</span>
<span class="line">  - name: inetOrgPerson.uid</span>
<span class="line">    label: ID</span>
<span class="line">    field:</span>
<span class="line">      type: function</span>
<span class="line">      value: row?.inetOrgPerson?.uid</span>
<span class="line">    align: left</span>
<span class="line">    sortable: true</span>
<span class="line"></span>
<span class="line">  - name: inetOrgPerson.employeeNumber</span>
<span class="line">    label: EmployeeNumber</span>
<span class="line">    field:</span>
<span class="line">      type: function</span>
<span class="line">      value: row?.inetOrgPerson?.employeeNumber</span>
<span class="line">    align: left</span>
<span class="line">    sortable: true</span>
<span class="line"></span>
<span class="line">  - name: additionalFields.attributes.supannPerson.supannTypeEntiteAffectation</span>
<span class="line">    label: Affectation</span>
<span class="line">    field:</span>
<span class="line">      type: function</span>
<span class="line">      value: row.additionalFields?.attributes?.supannPerson?.supannTypeEntiteAffectation</span>
<span class="line">    format:</span>
<span class="line">      type: function</span>
<span class="line">      value: &quot;Array.isArray(value) ? value?.join(&#39;, &#39;) : value&quot;</span>
<span class="line">    align: left</span>
<span class="line">    sortable: true</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">  - name: inetOrgPerson.sn</span>
<span class="line">    label: Nom</span>
<span class="line">    field:</span>
<span class="line">      type: function</span>
<span class="line">      value: row?.inetOrgPerson?.sn</span>
<span class="line">    align: left</span>
<span class="line">    sortable: true</span>
<span class="line"></span>
<span class="line">  - name: inetOrgPerson.givenName</span>
<span class="line">    label: Prénom</span>
<span class="line">    field:</span>
<span class="line">      type: function</span>
<span class="line">      value: row?.inetOrgPerson?.givenName</span>
<span class="line">    align: left</span>
<span class="line">    sortable: false</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>config/menus.yml</code> : permet d&#39;ajouter des briques dans la page d&#39;accueil (beta)</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"></span>
<span class="line"></span>
<span class="line">### sesame-orchestrator </span>
<span class="line">Configuration des données (API).</span>
<span class="line"> </span>
<span class="line">- \`jsonforms/\` : Dossier contenant les formulaires de l&#39;interface d&#39;administration.</span>
<span class="line">- \`validations/\` : Dossier contenant les fichiers de validation des objets.</span>
<span class="line">    </span>
<span class="line">### sesame-taiga-crawler</span>
<span class="line">Configuration de l&#39;import Taiga.</span>
<span class="line"></span>
<span class="line">- \`.env\` : Fichier de configuration des variables d&#39;environnement.</span>
<span class="line">- config.yml\` : Fichier de configuration des mappings des objets pour l&#39;import de Taiga vers Sesame.</span>
<span class="line">## import</span>
<span class="line">Répertoire pour l&#39;import de données vers Sesame</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),c=[l];function d(r,t){return e(),s("div",null,c)}const v=n(i,[["render",d],["__file","architecture.html.vue"]]),u=JSON.parse(`{"path":"/configuration/architecture.html","title":"Architecture","lang":"fr-FR","frontmatter":{"lang":"fr-FR","title":"Architecture","description":"Architecture de l'installation"},"headers":[{"level":3,"title":".env","slug":"env","link":"#env","children":[]},{"level":3,"title":"docker-compose.yml","slug":"docker-compose-yml","link":"#docker-compose-yml","children":[]},{"level":3,"title":"Makefile","slug":"makefile","link":"#makefile","children":[]},{"level":3,"title":"configs","slug":"configs","link":"#configs","children":[]}],"git":{"updatedTime":1760081473000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":3},{"name":"Tacx","email":"12997062+tacxou@users.noreply.github.com","commits":1}]},"filePathRelative":"configuration/architecture.md"}`);export{v as comp,u as data};
