import{_ as e,c as s,o as n,a}from"./app-BVZwSifu.js";const i={},t=a(`<h1 id="configuration-de-l-import" tabindex="-1"><a class="header-anchor" href="#configuration-de-l-import"><span>Configuration de l&#39;import</span></a></h1><p>Le fichier config.yml sert à configurer l&#39;import. Il decrit les champs qui seront presents dans le fichier de données json déposé dans cache.</p><h2 id="structure" tabindex="-1"><a class="header-anchor" href="#structure"><span>Structure</span></a></h2><p>Le fichier config.yml comporte un bloc par nom de fichier qui sera présent dans cache.</p><p>Il est au format yml</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">[NOM_DU_FICHIER]:</span>
<span class="line">   primaryKey: //section non obligatoire</span>
<span class="line">     - [key1]</span>
<span class="line">     - [key2]</span>
<span class="line">   mapping:</span>
<span class="line">     [nom_champs_sesame]: &quot;[nom_champs_json]&quot;</span>
<span class="line">     ...</span>
<span class="line">   additionalFields:</span>
<span class="line">     additionalFields.objectClasses: </span>
<span class="line">     - [SCHEMA_DE_VALIDATION_SESAME_SUPPLEMENTAIRE]</span>
<span class="line">     - ...</span>
<span class="line">     [nom_champs_sesame]: &quot;CONSTANTE&quot;</span>
<span class="line">     ...</span>
<span class="line">   transforms:</span>
<span class="line">     [nom_champs_sesame]: </span>
<span class="line">      - &quot;ACTION1&quot;</span>
<span class="line">      - ...</span>
<span class="line">[AUTRE_FICHER]:</span>
<span class="line">   mapping ...</span>
<span class="line">   </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Le fichier de data doit avoir cette structure :</p><ul><li>Une clé data qui comportera un tableau des identités à dréer ou à modifier</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">{</span>
<span class="line">  &quot;data&quot;: [</span>
<span class="line">  		{</span>
<span class="line">  			...</span>
<span class="line">  		}</span>
<span class="line">  		...</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Par defaut l&#39;existence de l&#39;identité est cherchée par le couple <strong>&quot;inetOrgPerson.employeeType&quot;</strong> et <strong>&quot;inetOrgPerson.employeeNumber&quot;</strong></p><p>Ces deux clés doivent être présente dans le fichier de data si la clé de recherche n&#39;a pas été changée</p><h4 id="exemple-de-fichier-config-yml" tabindex="-1"><a class="header-anchor" href="#exemple-de-fichier-config-yml"><span>Exemple de fichier config.yml</span></a></h4><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">import.json: </span>
<span class="line">  mapping: </span>
<span class="line">    inetOrgPerson.employeeNumber: &quot;employeeNumber&quot;</span>
<span class="line">    inetOrgPerson.title: &quot;title&quot;</span>
<span class="line">  additionalFields:</span>
<span class="line">    inetOrgPerson.employeeType: &quot;TAIGA&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Fichier de données associée (dans cache/import.json</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">{</span>
<span class="line">       &quot;data&quot;: [</span>
<span class="line">       {</span>
<span class="line">       &quot;employeeNumber&quot;:&quot;183493&quot;,</span>
<span class="line">       &quot;employeeType&quot;:&quot;TAIGA&quot;,</span>
<span class="line">       &quot;title&quot;:&quot;ETUDIANT&quot;</span>
<span class="line">       }</span>
<span class="line">    ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="section-primarykey" tabindex="-1"><a class="header-anchor" href="#section-primarykey"><span>Section primaryKey</span></a></h3><p>Par defaut les identités sont recherchées avec le couple &quot;employeeNumber&quot; et &quot;employeeType&quot;</p><p>Ce comportement peut être modifié en ajoutant la section <strong>primaryKey</strong> qui n&#39;est pas obligatoire</p><p>Exemple : on veut pouvoir rechercher les identités par le champ uid. Naturellement il faut que le champs soit present dans la section mapping</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">import.json:</span>
<span class="line">  primaryKey:</span>
<span class="line">    - inetOrgPerson.uid</span>
<span class="line">  mapping:</span>
<span class="line">    inetOrgPerson.uid: uid</span>
<span class="line">    inetOrgPerson.title: title</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="section-mapping" tabindex="-1"><a class="header-anchor" href="#section-mapping"><span>Section mapping</span></a></h3><p>Ce paragraphe, dans le fichier config.yml sert à definir qui va où. Il associe les champs standards de sesame et les champs additionnels avec la valeur du fichier de data</p><h4 id="champs-standards" tabindex="-1"><a class="header-anchor" href="#champs-standards"><span>champs standards</span></a></h4><p>Les champs standards (voir documentation <a href="/configuration/validation" target="_blank" rel="noopener noreferrer">/sesame-doc/configuration/validation.html</a>. Ces champs sont préfixés avec le inetOrgPerson ex :interOrgPerson.title. Sa valeur est le nom de la clé dans le fichier data</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">inetOrgPerson.title: &quot;title&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Les champs peuvent être combinés ex: Imagnons que nous avons, dans notre fichier data un champ nom et un champ prenom :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">inetOrgPerson.title: </span>
<span class="line">  - &quot;nom&quot;</span>
<span class="line">  - &quot;prenom&quot;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ce champs pourra être transformé par la suite dans la section <strong>transforms</strong></p><h4 id="champs-additionnels" tabindex="-1"><a class="header-anchor" href="#champs-additionnels"><span>champs additionnels</span></a></h4><p>Si vous avez défini des schemas de validations supplémentaires vous pouvez dans cette section les mapper aussi</p><p>La syntaxe est :</p><ul><li>additionalFields.attributes.[SCHEMA].[ATTRIBUT] : [CLE]</li></ul><p>Exemple : si vous avez un schema de validation sogxuser avec proxyaddress comme attribut :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">additionalFields.attributes.sogxuser.proxyaddress: &quot;proxyaddress&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="controle-a-l-insertion-et-de-l-update" tabindex="-1"><a class="header-anchor" href="#controle-a-l-insertion-et-de-l-update"><span>Controle à l&#39;insertion et de l&#39;update</span></a></h4><p>Si l&#39;identité n est pas trouvée elle sera créée.</p><p>Par defaut, lors de l update chaque champs present dans la source sera remplacé. Ce comportement peut être modifié et indiquer que le champs ne sera écrit que lors de l insertion et non durant l&#39;update. Pour ce faire il suffit d&#39;ajouter le mot clé <strong>$setOnInsert</strong></p><p>Exemple : nous ne voulons pas que le champs uid soit ecrasé lors d&#39;un update :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">$setOnInsert.inetOrgPerson.uid: </span>
<span class="line">    - &quot;prenom&quot;</span>
<span class="line">    - &quot;nom&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="section-additionalfields" tabindex="-1"><a class="header-anchor" href="#section-additionalfields"><span>Section additionalFields</span></a></h3><p>Cette section premet de preciser quels schemas de validation seront (autre que inetOrgPerson).</p><p>Elle permet aussi de fixer des valeurs par champs</p><h4 id="declaration-des-schemas-supplementaires" tabindex="-1"><a class="header-anchor" href="#declaration-des-schemas-supplementaires"><span>Declaration des schemas supplementaires</span></a></h4><p>Les schemas supplementaires se declarent dans la clé <strong>additionalFields.objectClasses</strong> en forme de liste</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">additionalFields.objectClasses:</span>
<span class="line">  - sogxuser</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="section-transforms" tabindex="-1"><a class="header-anchor" href="#section-transforms"><span>Section transforms</span></a></h3><p>Cette section permet de faire une transformation sur un champ avant qu&#39;il soit envoyé</p><p>Plusieurs actions sont disponibles</p><p>La syntaxe génerale est :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"></span>
<span class="line">[nom_champs_sesame] : </span>
<span class="line">   - &quot;ACTION1&quot;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Si plusieurs méthodes sont précisées, elles seront exécutées dans l&#39;ordre, chacune travaillant sur le résultat de la méthode précedente.</p><p>nom_champs_sesame doit être décrit aussi dans la section mapping</p><p>Exemple :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">mapping: </span>
<span class="line">  inetOrgPerson.employeeNumber: employeeNumber</span>
<span class="line">  $setOnInsert.inetOrgPerson.uid: </span>
<span class="line">    - &quot;prenom&quot;</span>
<span class="line">    - &quot;nom&quot;</span>
<span class="line">additionalFields:</span>
<span class="line">   inetOrgPerson.employeeType: &quot;TAIGA&quot;</span>
<span class="line">transforms: </span>
<span class="line">  $setOnInsert.inetOrgPerson.uid: </span>
<span class="line">    - &quot;join(delimiter=&#39;.&#39;)&quot;</span>
<span class="line">    - &quot;remove_accents&quot;</span>
<span class="line">    - &quot;lower&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Si notre fichier de données et le suivant :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">{</span>
<span class="line">    &quot;data&quot;: [</span>
<span class="line">       {</span>
<span class="line">       &quot;employeeNumber&quot;:&quot;101661&quot;,</span>
<span class="line">       &quot;employeeType&quot;:&quot;TAIGA&quot;,</span>
<span class="line">       &quot;nom&quot;:&quot;ETUDIANTTEST1&quot;,</span>
<span class="line">       &quot;prenom&quot;: &quot;éLoise&quot;,</span>
<span class="line">       &quot;nom&quot; : &quot;DUPONT&quot;</span>
<span class="line">       }</span>
<span class="line">    ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>la premiere action va joindre les deux champs. Le resultat sera &quot;éloise.DUPONT&quot;</li><li>la deuxième action va oter les accents &quot;eloise.DUPONT&quot;</li><li>et enfin la troisieme action va mettre le tout en minuscule &quot;eloise.dupont&quot;</li></ul><h4 id="les-differentes-transformations-disponibles" tabindex="-1"><a class="header-anchor" href="#les-differentes-transformations-disponibles"><span>Les différentes transformations disponibles</span></a></h4><table><thead><tr><th>Nom de l&#39;action</th><th>Description</th></tr></thead><tbody><tr><td><code>capitalize</code></td><td>Convertit la première lettre en majuscule et le reste en minuscule</td></tr><tr><td><code>lower</code></td><td>Convertit tous les caractères en minuscule</td></tr><tr><td><code>upper</code></td><td>Convertit tous les caractères en majuscule</td></tr><tr><td><code>title</code></td><td>Convertit tous le premier caractère en Majuscule de chaque mot et le reste en minuscule</td></tr><tr><td><code>remove_accents</code></td><td>Enlève les accents de la chaine de caractères</td></tr><tr><td><code>join(delimiter=&#39; &#39;)</code></td><td>contactaine les élements avec le séparateur indiqué</td></tr><tr><td><code>prefix(string=&#39;prefix-&#39;)</code></td><td>Ajoute la chaine definie au debut de la chaine</td></tr><tr><td><code>suffix(string=&#39;-suffix&#39;)</code></td><td>Ajoute la chaine definie à la fin de la chaine</td></tr><tr><td><code>split(delimiter=&#39; &#39;)</code></td><td>Eclate la chaine de caractère en un tableau</td></tr><tr><td><code>replace(old, new)</code></td><td>Replace une valeur dans la chaine par une autre</td></tr><tr><td><code>regex(pattern, replace)</code></td><td>Applique une expression réguliere et remplace les élements trouvés</td></tr><tr><td><code>substr(start=0 ,end=-1)</code></td><td>prend la sous-chaine commençant à start et finissant à end (start ou end peuvent être omis ex: - substr(end=10) prendra du caractere 0 à 10. <strong>ATTENTION</strong> : si vous mettez les deux parametres un espace entre le chiffre et la virgule est necessaire</td></tr></tbody></table><p>Exemple de regex utile :</p><p>On veut un uid de la forme premiere lettre du prenom et nom Eloise Dupont doit donner edupont</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">$setOnInsert.inetOrgPerson.uid: </span>
<span class="line">  - &quot;join(delimiter=&#39;.&#39;)&quot;</span>
<span class="line">  - &quot;remove_accents&quot;</span>
<span class="line">  - &quot;lower&quot;</span>
<span class="line">  - &quot;regex(pattern=&#39;(?&lt;=\\\\b\\\\w)([a-zA-Z0-9_\\\\-]+\\\\.)&#39;, replace=&#39;&#39;)&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Exemple : On veut definir une adresse email qui soit prenom.nom@mondomaine.com. On veut aussi que les espace soitent remplacés par un &quot;-&quot;</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"></span>
<span class="line">mapping: </span>
<span class="line">  inetOrgPerson.employeeNumber: employeeNumber</span>
<span class="line">  $setOnInsert.inetOrgPerson.uid: </span>
<span class="line">    - &quot;prenom&quot;</span>
<span class="line">    - &quot;nom&quot;</span>
<span class="line">  inetOrgPerson.mail: </span>
<span class="line">    - &quot;prenom&quot;</span>
<span class="line">    - &quot;nom&quot;</span>
<span class="line">additionalFields:</span>
<span class="line">   inetOrgPerson.employeeType: &quot;TAIGA&quot;</span>
<span class="line">transforms: </span>
<span class="line">  $setOnInsert.inetOrgPerson.uid: </span>
<span class="line">    - &quot;join(delimiter=&#39;.&#39;)&quot;</span>
<span class="line">    - &quot;remove_accents&quot;</span>
<span class="line">    - &quot;lower&quot;</span>
<span class="line">  inetOrgPerson.mail:</span>
<span class="line">    - &quot;join(delimiter=&#39;.&#39;)&quot;</span>
<span class="line">    - &quot;remove_accents&quot;</span>
<span class="line">    - &quot;lower&quot;</span>
<span class="line">    - &quot;replace(old=&#39; &#39;,new=&#39;-&#39;)&quot;</span>
<span class="line">    - &quot;suffix(string=&#39;@mondomaine.com&#39;)&quot;</span>
<span class="line">    </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,64),l=[t];function r(d,c){return n(),s("div",null,l)}const o=e(i,[["render",r],["__file","configyml.html.vue"]]),u=JSON.parse(`{"path":"/import/configyml.html","title":"Configuration de l'import","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Structure","slug":"structure","link":"#structure","children":[{"level":3,"title":"Section primaryKey","slug":"section-primarykey","link":"#section-primarykey","children":[]},{"level":3,"title":"Section mapping","slug":"section-mapping","link":"#section-mapping","children":[]},{"level":3,"title":"Section additionalFields","slug":"section-additionalfields","link":"#section-additionalfields","children":[]},{"level":3,"title":"Section transforms","slug":"section-transforms","link":"#section-transforms","children":[]}]}],"git":{"updatedTime":1728919615000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":5}]},"filePathRelative":"import/configyml.md"}`);export{o as comp,u as data};
