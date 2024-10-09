import{_ as e,c as n,o as a,a as s}from"./app-DkRf1K3P.js";const i={},t=s(`<h1 id="librairie-d-aide-python" tabindex="-1"><a class="header-anchor" href="#librairie-d-aide-python"><span>Librairie d&#39;aide Python</span></a></h1><p>Une librarie de méthode pour le backend vous aidera à developper facilement un backend</p><p>Cette librairie backends-utils (</p><h3 id="read-config-file" tabindex="-1"><a class="header-anchor" href="#read-config-file"><span>read_config(file)</span></a></h3><p>Permet de charger le fichier de config</p><h3 id="config-key-default" tabindex="-1"><a class="header-anchor" href="#config-key-default"><span>config(key,default=&#39;&#39;)</span></a></h3><p>Permet de lire une clé du fichier de configuration qui aura été au préalable chargé par <strong>read_config()</strong></p><p>retour : la valeur de la clé</p><p>Exemple :</p><div class="language-python3 line-numbers-mode" data-highlighter="prismjs" data-ext="python3" data-title="python3"><pre class="language-python3"><code><span class="line">import sys</span>
<span class="line">sys.path.append(&#39;../lib&#39;)</span>
<span class="line">import backend_utils as u</span>
<span class="line"></span>
<span class="line">u.readConfig(&#39;../etc/config.conf&#39;)</span>
<span class="line">host=u.config(&#39;host&#39;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="readjsoninput" tabindex="-1"><a class="header-anchor" href="#readjsoninput"><span>readjsoninput()</span></a></h3><p>Permet de lire la chaine json sur l&#39;entrée standard est en faire un dictionnaire</p><p>retour : Dict</p><h3 id="returncode-code-message" tabindex="-1"><a class="header-anchor" href="#returncode-code-message"><span>returncode(code,message)</span></a></h3><p>Permet de générer la chaine json de retour pour le daemon</p><p>retour : String au format json</p><p>Exemple</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">import sys</span>
<span class="line">sys.path.append(&#39;../lib&#39;)</span>
<span class="line">import backend_utils as u</span>
<span class="line">json_message=u.returncode(0,&quot;Tout est ok&quot;)</span>
<span class="line">print(json_message)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>la sortie donnera {&quot;status&quot;:0,&quot;message&quot;: &quot;Tout est ok&quot;}</p><h3 id="is-backend-concerned-entity" tabindex="-1"><a class="header-anchor" href="#is-backend-concerned-entity"><span>is_backend_concerned(entity)</span></a></h3><p>entity etant le tableau dict fourni par readjsoninput()</p><p>retour boolean true ou false</p><p>ex:</p><div class="language-python3 line-numbers-mode" data-highlighter="prismjs" data-ext="python3" data-title="python3"><pre class="language-python3"><code><span class="line">import sys</span>
<span class="line">sys.path.append(&#39;../lib&#39;)</span>
<span class="line">import backend_utils as u</span>
<span class="line">u.read_config(&#39;../etc/config.conf&#39;)</span>
<span class="line">entity=u.readjsoninput()</span>
<span class="line">if is_backend_concerned(entity):</span>
<span class="line">   print(u.returncode(0,&#39;Mon backend est concerné&#39;)</span>
<span class="line">else:</span>
<span class="line">   print(u.returncode(0,&#39;Mon backend est concerné&#39;)</span>
<span class="line">   </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="find-key-element-key" tabindex="-1"><a class="header-anchor" href="#find-key-element-key"><span>find_key(element, key)</span></a></h3><p>Permet de chercher une clé dans l&#39;arborescence d&#39;un dictionnaire</p><p>retour : la valeur de la clé</p><h3 id="make-entry-array-entity" tabindex="-1"><a class="header-anchor" href="#make-entry-array-entity"><span>make_entry_array(entity)</span></a></h3><p>Permet de construire un tableau clé =&gt;valeur à un niveau à partir d&#39;un dictionnaire en arbre</p><p>ex:</p><p>entree de depart :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">{</span>
<span class="line">  &quot;concernedTo&quot;: &quot;66c22991bdc3c9a7563a9d4f&quot;,</span>
<span class="line">  &quot;payload&quot;: {</span>
<span class="line">    &quot;identity&quot;: {</span>
<span class="line">      &quot;action&quot;: &quot;IDENTITY_UPDATE&quot;,</span>
<span class="line">      &quot;identity&quot;: {</span>
<span class="line">        &quot;_id&quot;: &quot;66c22991bdc3c9a7563a9d4f&quot;,</span>
<span class="line">        &quot;metadata&quot;: {</span>
<span class="line">          &quot;createdBy&quot;: &quot;admin&quot;,</span>
<span class="line">          &quot;createdAt&quot;: &quot;2024-08-18T17:04:17.757Z&quot;,</span>
<span class="line">          &quot;lastUpdatedBy&quot;: &quot;admin&quot;,</span>
<span class="line">          &quot;lastUpdatedAt&quot;: &quot;2024-08-20T09:45:57.596Z&quot;</span>
<span class="line">        },</span>
<span class="line">        &quot;state&quot;: 2,</span>
<span class="line">        &quot;lifecycle&quot;: -1,</span>
<span class="line">        &quot;inetOrgPerson&quot;: {</span>
<span class="line">          &quot;cn&quot;: &quot;AVANIS Alain&quot;,</span>
<span class="line">          &quot;displayName&quot;: &quot;Alain Avanis&quot;,</span>
<span class="line">          &quot;facsimileTelephoneNumber&quot;: &quot;&quot;,</span>
<span class="line">          &quot;givenName&quot;: &quot;Alain&quot;,</span>
<span class="line">          &quot;labeledURI&quot;: &quot;&quot;,</span>
<span class="line">          &quot;mail&quot;: &quot;aa@mondomaine.fr&quot;,</span>
<span class="line">          &quot;mobile&quot;: &quot;06 00 00 00 00&quot;,</span>
<span class="line">          &quot;postalAddress&quot;: &quot;&quot;,</span>
<span class="line">          &quot;preferredLanguage&quot;: &quot;&quot;,</span>
<span class="line">          &quot;sn&quot;: &quot;AVANIS&quot;,</span>
<span class="line">          &quot;telephoneNumber&quot;: &quot;&quot;,</span>
<span class="line">          &quot;title&quot;: &quot;&quot;,</span>
<span class="line">          &quot;uid&quot;: &quot;aavanis&quot;,</span>
<span class="line">          &quot;employeeNumber&quot;: &quot;111111&quot;,</span>
<span class="line">          &quot;employeeType&quot;: &quot;TAIGA&quot;,</span>
<span class="line">          &quot;departmentNumber&quot;: &quot;&quot;,</span>
<span class="line">          &quot;jpegPhoto&quot;: &quot;&quot;,</span>
<span class="line">          &quot;userCertificate&quot;: &quot;&quot;,</span>
<span class="line">          &quot;userPassword&quot;: &quot;&quot;</span>
<span class="line">        } ,</span>
<span class="line">        &quot;initState&quot;: 0,</span>
<span class="line">        &quot;fingerprint&quot;: &quot;b65c62b466b0c401398c9da3ca489a880befc38f049e6dfacb48eded011eff11&quot;</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>donnera :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">  {</span>
<span class="line">  &quot;concernedTo&quot;: &quot;66c22991bdc3c9a7563a9d4f&quot;,</span>
<span class="line">  &quot;createdBy&quot;: &quot;admin&quot;,</span>
<span class="line">  &quot;createdAt&quot;: &quot;2024-08-18T17:04:17.757Z&quot;,</span>
<span class="line">  &quot;lastUpdatedBy&quot;: &quot;admin&quot;,</span>
<span class="line">  &quot;lastUpdatedAt&quot;: &quot;2024-08-20T09:45:57.596Z&quot;</span>
<span class="line">  &quot;state&quot;: 2,</span>
<span class="line">  &quot;lifecycle&quot;: -1,</span>
<span class="line">  &quot;cn&quot;: &quot;AVANIS Alain&quot;,</span>
<span class="line">  &quot;displayName&quot;: &quot;Alain Avanis&quot;,</span>
<span class="line">  &quot;facsimileTelephoneNumber&quot;: &quot;&quot;,</span>
<span class="line">  &quot;givenName&quot;: &quot;Alain&quot;,</span>
<span class="line">  &quot;labeledURI&quot;: &quot;&quot;,</span>
<span class="line">  &quot;mail&quot;: &quot;aa@mondomain.fr&quot;,</span>
<span class="line">  &quot;mobile&quot;: &quot;06 00 00 00 00&quot;,</span>
<span class="line">  &quot;postalAddress&quot;: &quot;&quot;,</span>
<span class="line">  &quot;preferredLanguage&quot;: &quot;&quot;,</span>
<span class="line">  &quot;sn&quot;: &quot;AVANIS&quot;,</span>
<span class="line">  ...</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="make-entry-array-without-empty-entity" tabindex="-1"><a class="header-anchor" href="#make-entry-array-without-empty-entity"><span>make_entry_array_without_empty(entity)</span></a></h3><p>idem que make_entry_array() mais ne met pas dans le resultat les clés qui ont des valeurs vides</p><h3 id="make-objectclass-entity" tabindex="-1"><a class="header-anchor" href="#make-objectclass-entity"><span>make_objectclass(entity)</span></a></h3><p>renvoie untableau contenant les objectsclasses LDAP</p>`,38),l=[t];function d(u,r){return a(),n("div",null,l)}const c=e(i,[["render",d],["__file","librairie_python.html.vue"]]),p=JSON.parse(`{"path":"/backends/librairie_python.html","title":"Librairie d'aide Python","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"read_config(file)","slug":"read-config-file","link":"#read-config-file","children":[]},{"level":3,"title":"config(key,default='')","slug":"config-key-default","link":"#config-key-default","children":[]},{"level":3,"title":"readjsoninput()","slug":"readjsoninput","link":"#readjsoninput","children":[]},{"level":3,"title":"returncode(code,message)","slug":"returncode-code-message","link":"#returncode-code-message","children":[]},{"level":3,"title":"is_backend_concerned(entity)","slug":"is-backend-concerned-entity","link":"#is-backend-concerned-entity","children":[]},{"level":3,"title":"find_key(element, key)","slug":"find-key-element-key","link":"#find-key-element-key","children":[]},{"level":3,"title":"make_entry_array(entity)","slug":"make-entry-array-entity","link":"#make-entry-array-entity","children":[]},{"level":3,"title":"make_entry_array_without_empty(entity)","slug":"make-entry-array-without-empty-entity","link":"#make-entry-array-without-empty-entity","children":[]},{"level":3,"title":"make_objectclass(entity)","slug":"make-objectclass-entity","link":"#make-objectclass-entity","children":[]}],"git":{"updatedTime":1724862483000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":1}]},"filePathRelative":"backends/librairie_python.md"}`);export{c as comp,p as data};
