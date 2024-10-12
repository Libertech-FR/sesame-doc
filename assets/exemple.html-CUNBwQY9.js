import{_ as e,c as s,o as a,a as n}from"./app-CTwHhukq.js";const i={},l=n(`<h1 id="exemple" tabindex="-1"><a class="header-anchor" href="#exemple"><span>Exemple</span></a></h1><p>Nous voulons ajouter à nos identités un schema (qui suis un schema LDAP (sogxuser). Ces champs sont pour la messagerie.</p><p>Nous allons ajouter 3 champs :</p><ul><li>sogxquota : pour gérer les quotas dans le système de messagerie</li><li>sogxdisableflag : pour désactiver le compte sur le système de messagerie</li></ul><p>dans **configs/sesame-orchestrator/validation nous creons un fichier sogxuser.yml</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">$schema: &quot;http://json-schema.org/draft-07/schema#&quot;</span>
<span class="line">type: &quot;object&quot;</span>
<span class="line">properties:</span>
<span class="line">   sogxquota:</span>
<span class="line">      type: &quot;number&quot;</span>
<span class="line">      description: &quot;Quota messagerie&quot;</span>
<span class="line">   sogxdisableflag:</span>
<span class="line">      type: &quot;number&quot;</span>
<span class="line">      integer: true</span>
<span class="line">      min: 0</span>
<span class="line">      max: 1</span>
<span class="line">      description: &quot;Disable/enable&quot;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Voila les champs sogxuser.sogxquota et sogxuser.sogxdisableflag seront disponible dans l&#39;identité</p>`,7),t=[l];function o(r,c){return a(),s("div",null,t)}const d=e(i,[["render",o],["__file","exemple.html.vue"]]),u=JSON.parse(`{"path":"/configuration/exemple.html","title":"Exemple","lang":"en-US","frontmatter":{"lang":"en-US","title":"Exemple","description":"Exemple d'ajout de champs"},"headers":[],"git":{"updatedTime":1718088493000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":1}]},"filePathRelative":"configuration/exemple.md"}`);export{d as comp,u as data};
