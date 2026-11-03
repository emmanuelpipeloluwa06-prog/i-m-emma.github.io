(function () {
  var languages = [
    ["af", "Afrikaans"], ["sq", "Albanian"], ["am", "Amharic"], ["ar", "Arabic"], ["hy", "Armenian"], ["az", "Azerbaijani"], ["eu", "Basque"], ["be", "Belarusian"], ["bn", "Bengali"], ["bs", "Bosnian"], ["bg", "Bulgarian"], ["ca", "Catalan"], ["ceb", "Cebuano"], ["zh-CN", "Chinese (Simplified)"], ["zh-TW", "Chinese (Traditional)"], ["co", "Corsican"], ["hr", "Croatian"], ["cs", "Czech"], ["da", "Danish"], ["nl", "Dutch"], ["en", "English"], ["eo", "Esperanto"], ["et", "Estonian"], ["fi", "Finnish"], ["fr", "French"], ["fy", "Frisian"], ["gl", "Galician"], ["ka", "Georgian"], ["de", "German"], ["el", "Greek"], ["gu", "Gujarati"], ["ht", "Haitian Creole"], ["ha", "Hausa"], ["haw", "Hawaiian"], ["he", "Hebrew"], ["hi", "Hindi"], ["hmn", "Hmong"], ["hu", "Hungarian"], ["is", "Icelandic"], ["ig", "Igbo"], ["id", "Indonesian"], ["ga", "Irish"], ["it", "Italian"], ["ja", "Japanese"], ["jv", "Javanese"], ["kn", "Kannada"], ["kk", "Kazakh"], ["km", "Khmer"], ["rw", "Kinyarwanda"], ["ko", "Korean"], ["ku", "Kurdish"], ["ky", "Kyrgyz"], ["lo", "Lao"], ["la", "Latin"], ["lv", "Latvian"], ["lt", "Lithuanian"], ["lb", "Luxembourgish"], ["mk", "Macedonian"], ["mg", "Malagasy"], ["ms", "Malay"], ["ml", "Malayalam"], ["mt", "Maltese"], ["mi", "Maori"], ["mr", "Marathi"], ["mn", "Mongolian"], ["my", "Myanmar (Burmese)"], ["ne", "Nepali"], ["no", "Norwegian"], ["ny", "Nyanja"], ["or", "Odia"], ["ps", "Pashto"], ["fa", "Persian"], ["pl", "Polish"], ["pt", "Portuguese"], ["pa", "Punjabi"], ["ro", "Romanian"], ["ru", "Russian"], ["sm", "Samoan"], ["gd", "Scots Gaelic"], ["sr", "Serbian"], ["st", "Sesotho"], ["sn", "Shona"], ["sd", "Sindhi"], ["si", "Sinhala"], ["sk", "Slovak"], ["sl", "Slovenian"], ["so", "Somali"], ["es", "Spanish"], ["su", "Sundanese"], ["sw", "Swahili"], ["sv", "Swedish"], ["tl", "Tagalog"], ["tg", "Tajik"], ["ta", "Tamil"], ["tt", "Tatar"], ["te", "Telugu"], ["th", "Thai"], ["tr", "Turkish"], ["tk", "Turkmen"], ["uk", "Ukrainian"], ["ur", "Urdu"], ["ug", "Uyghur"], ["uz", "Uzbek"], ["vi", "Vietnamese"], ["cy", "Welsh"], ["xh", "Xhosa"], ["yi", "Yiddish"], ["yo", "Yoruba"], ["zu", "Zulu"]
  ];

  var bar = document.createElement("div");
  bar.className = "language-bar";
  bar.innerHTML = '<button class="language-button" type="button" aria-expanded="false" aria-controls="language-panel"><span aria-hidden="true">&#127760;</span> Languages</button><div id="language-panel" class="language-panel" hidden><label for="language-search">Search for your language</label><input id="language-search" type="search" placeholder="Search for your language" autocomplete="off"><div id="language-list" class="language-list" role="listbox" aria-label="Languages"></div></div><span id="google_translate_element" class="google-translate" aria-hidden="true"></span>';
  document.body.prepend(bar);

  var button = bar.querySelector(".language-button");
  var panel = bar.querySelector(".language-panel");
  var search = bar.querySelector("#language-search");
  var list = bar.querySelector("#language-list");
  var selectedLanguage = document.documentElement.lang === "en" ? "en" : "fr";
  var translations = {
    en: {
      "Languages": "Languages",
      "Langues": "Languages",
      "Search for your language": "Search for your language",
      "Rechercher une langue": "Search for your language",
      "No languages found": "No languages found",
      "Aucune langue trouvee": "No languages found",
      "Pourquoi nous choisir ?": "Why choose us?",
      "*Produits de qualité et nutritifs": "*Quality and nutritious products",
      "*Prix abordables": "*Affordable prices",
      "*Service client exceptionnel": "*Exceptional customer service",
      "*Produits bien protégés": "*Well-protected products",
      "Bienvenue sur le site de Triple E, une entreprise spécialisée dans la fourniture de solutions énergétiques durables et innovantes. Nous nous engageons à offrir des produits et services de haute qualité pour répondre aux besoins énergétiques de nos clients tout en respectant l'environnement.": "Welcome to the Triple E website, a company specializing in sustainable and innovative energy solutions. We are committed to offering high-quality products and services to meet our customers' energy needs while respecting the environment."
    },
    fr: {
      "Languages": "Langues",
      "Langues": "Langues",
      "Search for your language": "Rechercher une langue",
      "No languages found": "Aucune langue trouvee",
      "Why choose us?": "Pourquoi nous choisir ?",
      "*Quality and nutritious products": "*Produits de qualité et nutritifs",
      "*Affordable prices": "*Prix abordables",
      "*Exceptional customer service": "*Service client exceptionnel",
      "*Well-protected products": "*Produits bien protégés",
      "Welcome to the Triple E website, a company specializing in sustainable and innovative energy solutions. We are committed to offering high-quality products and services to meet our customers' energy needs while respecting the environment.": "Bienvenue sur le site de Triple E, une entreprise spécialisée dans la fourniture de solutions énergétiques durables et innovantes. Nous nous engageons à offrir des produits et services de haute qualité pour répondre aux besoins énergétiques de nos clients tout en respectant l'environnement."
    }
  };
  var localLanguages = ["fr", "en"];

  function translatePage(language) {
    selectedLanguage = language;
    document.documentElement.lang = language;
    var dictionary = translations[language];
    document.querySelectorAll("body *:not(script):not(style)").forEach(function (element) {
      if (element.children.length) return;
      var originalText = element.textContent.trim();
      if (dictionary[originalText]) element.textContent = dictionary[originalText];
    });
    search.placeholder = dictionary["Search for your language"] || search.placeholder;
  }

  function renderLanguages(query) {
    var matches = languages.filter(function (language) {
      if (localLanguages.indexOf(language[0]) === -1) return false;
      return language[1].toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    list.innerHTML = matches.length ? matches.map(function (language) {
      return '<button type="button" class="language-option" data-language="' + language[0] + '">' + language[1] + '</button>';
    }).join("") : '<p class="no-language">No languages found</p>';
  }

  renderLanguages("");
  button.addEventListener("click", function () {
    var isOpen = !panel.hidden;
    panel.hidden = isOpen;
    button.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) search.focus();
  });
  search.addEventListener("input", function () { renderLanguages(search.value); });
  list.addEventListener("click", function (event) {
    if (!event.target.matches(".language-option")) return;
    translatePage(event.target.dataset.language);
    button.innerHTML = '<span aria-hidden="true">&#127760;</span> ' + event.target.textContent;
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
  });

  var style = document.createElement("style");
  style.textContent = ".language-bar{position:fixed;z-index:1000;top:0;left:0;right:0;display:flex;justify-content:center;padding:10px 16px;background:#17211b;box-shadow:0 3px 14px rgba(0,0,0,.18);font:600 14px/1.2 Arial,sans-serif}.language-button{padding:8px 14px;border:1px solid rgba(255,255,255,.45);border-radius:4px;color:#17211b;background:#fff;font:inherit;cursor:pointer}.language-button span{margin-right:6px}.language-panel{position:absolute;top:calc(100% + 8px);width:min(360px,calc(100vw - 32px));padding:14px;background:#fff;color:#17211b;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.22)}.language-panel label{display:block;margin-bottom:6px;font-size:13px}.language-panel input{box-sizing:border-box;width:100%;padding:9px 10px;border:1px solid #aab4ae;border-radius:4px;font:inherit}.language-list{display:grid;grid-template-columns:1fr 1fr;gap:4px;max-height:280px;margin-top:10px;overflow:auto}.language-option{padding:8px;border:0;border-radius:3px;background:#eef2ef;text-align:left;cursor:pointer}.language-option:hover{background:#cbd9d0}.no-language{grid-column:1/-1;margin:10px 0;color:#59655d}.google-translate{display:none}body{padding-top:55px!important}body>.skiptranslate{display:none!important}.goog-te-banner-frame.skiptranslate{display:none!important}@media(max-width:520px){.language-bar{justify-content:flex-start}.language-list{grid-template-columns:1fr}}";
  document.head.appendChild(style);

  translatePage(selectedLanguage);
}());