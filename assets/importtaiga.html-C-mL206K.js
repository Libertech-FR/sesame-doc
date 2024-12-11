import{_ as e,c as s,o as a,a as i}from"./app-cyh8NsmD.js";const t={},n=i(`<h1 id="import-depuis-taiga" tabindex="-1"><a class="header-anchor" href="#import-depuis-taiga"><span>Import depuis taiga</span></a></h1><p>Les fichiers de configuration se trouve dans ./configs/sesame-taiga-crawler</p><p>Il est au format de config.yml (voir la documentation Import des données )</p><h2 id="option-de-filtre-pour-les-import" tabindex="-1"><a class="header-anchor" href="#option-de-filtre-pour-les-import"><span>Option de filtre pour les import</span></a></h2><p>Nous pouvons mettre une régle de filtrage pour ne pas importer certaines identites</p><p>Cette regle doit etre mise en sous clé des noms de fichier</p><ul><li>Nom de la clé : c&#39;est le champs sur lequel le test sera fait. Seulement les champs inetOrgPerson peuvent être utilisés</li><li>Valeur : expersion régulière (sans les //)</li></ul><p>Exemple :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">import_etd.json:</span>
<span class="line">exclude:</span>
<span class="line">  -sn : ^#</span>
<span class="line">  -givenName: ^#</span>
<span class="line">mapping:</span>
<span class="line">  ...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Dans cet exemple les noms commençant par # seront exclus de l import</p><h2 id="option-pour-l-import-des-photos" tabindex="-1"><a class="header-anchor" href="#option-pour-l-import-des-photos"><span>Option pour l&#39;import des photos</span></a></h2><p>Le champs contenant le nom du fichier jpeg doit être mappé : Dans la section mapping :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">customFields.photo: &quot;photo_nom&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="champs-de-type-obligatoire-version-orchestator-1-1-6" tabindex="-1"><a class="header-anchor" href="#champs-de-type-obligatoire-version-orchestator-1-1-6"><span>Champs de type obligatoire version orchestator &gt; 1.1.6</span></a></h2><ul><li>le champs employeeNumber doit etre un tableau et etre remplit que à l insertion</li><li>le champs departmentNumber doit etre un tableau et etre remplit que à l insertion</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">import_etd.json:</span>
<span class="line">mapping:</span>
<span class="line">   $setOnInsert.inetOrgPerson.employeeNumber:</span>
<span class="line">   - &quot;id_coord&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"> additionalFields:</span>
<span class="line">    $setOnInsert.inetOrgPerson.departmentNumber:</span>
<span class="line">    - &quot;adm&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lancement-de-l-import" tabindex="-1"><a class="header-anchor" href="#lancement-de-l-import"><span>Lancement de l&#39;import</span></a></h2><p>dans le repertoire d&#39;installation</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#make sesame-import-taiga</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Si vous voulez importer une année particuliere :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#make sesame-import-taiga an=ANNEE</span>
<span class="line">ex: </span>
<span class="line">#make sesame-import-taiga an=2020</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),l=[n];function r(o,p){return a(),s("div",null,l)}const c=e(t,[["render",r],["__file","importtaiga.html.vue"]]),m=JSON.parse(`{"path":"/import/importtaiga.html","title":"Import depuis taiga","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Option de filtre pour les import","slug":"option-de-filtre-pour-les-import","link":"#option-de-filtre-pour-les-import","children":[]},{"level":2,"title":"Option pour l'import des photos","slug":"option-pour-l-import-des-photos","link":"#option-pour-l-import-des-photos","children":[]},{"level":2,"title":"Champs de type obligatoire version orchestator > 1.1.6","slug":"champs-de-type-obligatoire-version-orchestator-1-1-6","link":"#champs-de-type-obligatoire-version-orchestator-1-1-6","children":[]},{"level":2,"title":"Lancement de l'import","slug":"lancement-de-l-import","link":"#lancement-de-l-import","children":[]}],"git":{"updatedTime":1729487576000,"contributors":[{"name":"Alain Abbas","email":"alain.abbas@libertech.fr","commits":4}]},"filePathRelative":"import/importtaiga.md"}`);export{c as comp,m as data};