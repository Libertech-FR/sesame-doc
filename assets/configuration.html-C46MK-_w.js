import{_ as e,c as i,o as n,a as s}from"./app-CTwHhukq.js";const a={},l=s(`<h1 id="import-des-donnees" tabindex="-1"><a class="header-anchor" href="#import-des-donnees"><span>Import des données</span></a></h1><h2 id="principe" tabindex="-1"><a class="header-anchor" href="#principe"><span>Principe</span></a></h2><p>L&#39;import des données est réalisée par <strong>sesame-crawler</strong>. Il est installé automatiquement vec le script d&#39;installation.</p><p>Pour importer les données le <em>crawler</em>* a besoin d&#39;un fichier de configuration pour mapper les champs entre votre fichier et sesame.</p><p>une fois le fichier de configuration fait il suffit de génerer un fichier json avec les données dedans.</p><h2 id="arborescence" tabindex="-1"><a class="header-anchor" href="#arborescence"><span>Arborescence</span></a></h2><p>Lors de l installation un répertoire <strong>import</strong> a été créé avec un repertoire cache, data et un fichier .env</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">import-├--cache</span>
<span class="line">       ├--data</span>
<span class="line">       ├config.yml</span>
<span class="line">       ├.env</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>cache : les données à importer seront mise dans ce repertoire</li><li>data : <em>pour diagnostic</em> le fichier json represente les données envoyées à l API après avoir été traitées par le preprocesseur de l&#39;import</li><li>.env : Fichier de paramètre</li><li>config.yml : Fichier de configuration</li></ul><h1 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h1><h2 id="fichier-env" tabindex="-1"><a class="header-anchor" href="#fichier-env"><span>Fichier .env</span></a></h2><p>Il contient l&#39;authentification et l&#39;adresse du serveur sesame</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">SESAME_API_BASEURL=http://sesame-orchestrator:4000</span>
<span class="line">SESAME_IMPORT_PARALLELS_FILES=1</span>
<span class="line">SESAME_IMPORT_PARALLELS_ENTRIES=5</span>
<span class="line">SESAME_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6eyJfaWQiOi</span>
<span class="line">I2NjY4MDg1MzlkMGJhZTk2NDE2MTE4ZmYiLCJ1c2VybmFtZSI6ImltcG9ydCIsImRpc3BsYXlOYW1lIj</span>
<span class="line">oiaW1wb3J0IiwidG9rZW4iOiI3ODcxMmIyYmY0ZGM5M2YwZjg1NzkzODNiY2EzYmViMWYzMjRkNmE4Yj</span>
<span class="line">A5MWIwMGIyYzJhNjhjYmZkMzdhZjQ5YjkxMTUwYjcyOTFhMTY5MmJiNDNjZTI3ZGJjNTZhNDRiZTI3ZD</span>
<span class="line">YxMDY5NjVmM2U4NTYzMzMzZDYxYzY4ZjNkZiJ9LCJzY29wZXMiOlsic2VzYW1lIiwiYXBpIl0sImlhdC</span>
<span class="line">I6MTcxODA5MzkwNywiZXhwIjoyMDMzNjY5OTA3LCJzdWIiOiI2NjY4MDg1MzlkMGJhZTk2NDE2MTE4Zm</span>
<span class="line">YiLCJqdGkiOiI2NjY4MDg1MzlkMGJhZTk2NDE2MTE4ZmZfNDNmYzAzZDAyMDdjYTk0YTU1MmU1NjQ4MD</span>
<span class="line">RkZWE1ZjEifQ.iL3aA_mG11IZg5N8i72CCMnPwgI2YVSzNH4B8M3MpeY</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>SESAME_API_BASEURL : Url du serveur (dans le cadre de docker sur le meme socle l adresse du container)</li><li>SESAME_IMPORT_PARALLELS_FILES : Traitement en parallele des fichiers</li><li>SESAME_IMPORT_PARALLELS_ENTRIES : Traitement en parallèle des entrées</li><li>SESAME_API_TOKEN : Jeton d&#39;autehntification (obtenu avec la commande <strong>make sesame-create-keyring</strong></li></ul>`,14),r=[l];function t(c,d){return n(),i("div",null,r)}const p=e(a,[["render",t],["__file","configuration.html.vue"]]),m=JSON.parse('{"path":"/import/configuration.html","title":"Import des données","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Principe","slug":"principe","link":"#principe","children":[]},{"level":2,"title":"Arborescence","slug":"arborescence","link":"#arborescence","children":[]},{"level":2,"title":"Fichier .env","slug":"fichier-env","link":"#fichier-env","children":[]}],"git":{"updatedTime":1718198196000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":1}]},"filePathRelative":"import/configuration.md"}');export{p as comp,m as data};