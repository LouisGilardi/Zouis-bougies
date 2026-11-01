/* Génère index.html et une page par bougie dans /bougies à partir de assets/catalogue.js.
   Usage : node scripts/build.cjs            (site complet)
           node scripts/build.cjs --artifact (variante d'aperçu sans <html>/<head> pour l'index) */
const fs = require("fs");
const path = require("path");
const C = require("../assets/catalogue.js");
const ROOT = path.join(__dirname, "..");
const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0 }).replace(/ /g, " ");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const prixMin = C.formats["200"].prix;

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=IBM+Plex+Mono:wght@300&family=Jost:wght@300;400&display=swap">`;

const head = ({ title, desc, base }) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="claude:viewport-fit-sides" content="cover">
  <meta name="description" content="${esc(desc)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  ${FONTS}
  <link rel="stylesheet" href="${base}assets/style.css">
</head>
<body>`;

const header = (base) => `
  <p class="announce">Première série numérotée · 100 exemplaires par lieu · Livraison offerte dès ${euro(C.config.livraisonOfferteDes)}</p>
  <header class="site-header">
    <nav class="nav wrap" aria-label="Navigation principale">
      <div>
        <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
        <ul class="nav-links" id="menu">
          <li><a href="${base || ""}#collection">Collection</a></li>
          <li><a href="${base || ""}#coffret">Coffret</a></li>
          <li><a href="${base || ""}#maison">La maison</a></li>
        </ul>
      </div>
      <a href="${base || "./"}" class="brand">${C.marque.toUpperCase()}</a>
      <div class="nav-end">
        <button type="button" class="cart-btn" data-open-cart aria-controls="cart">
          <span class="cart-label">Panier</span><span class="cart-count" hidden>0</span>
          <span class="visually-hidden">Ouvrir le panier</span>
        </button>
      </div>
    </nav>
  </header>`;

const cartDrawer = (base) => `
  <div class="cart-overlay" id="cart-overlay"></div>
  <aside class="cart" id="cart" aria-hidden="true" aria-labelledby="cart-title" role="dialog" aria-modal="true">
    <div class="cart-head">
      <h2 id="cart-title">Votre panier</h2>
      <button type="button" class="cart-close">Fermer</button>
    </div>
    <p class="cart-added" id="cart-added" role="status" hidden></p>
    <div class="cart-empty" id="cart-empty">
      <p>Votre panier est vide. Choisissez un lieu.</p>
      <a href="${base || ""}#collection" class="link cart-close-link">Voir la collection</a>
    </div>
    <div class="ship"><p id="ship-text"></p><div class="ship-bar" id="ship-bar"></div></div>
    <div class="cart-body"><ul class="cart-items" id="cart-items"></ul></div>
    <div class="cart-foot" id="cart-foot" hidden>
      <div class="totals">
        <span>Sous-total</span><span id="cart-subtotal"></span>
        <span>Livraison</span><span id="cart-shipping"></span>
        <span class="total">Total</span><span class="total" id="cart-total"></span>
      </div>
      <button type="button" class="btn btn-block" id="checkout">Commander</button>
      <div class="precommande" id="precommande" hidden>
        <p>La boutique ouvre avec la première série. Laissez votre email : nous vous écrirons avant l’ouverture et votre panier vous sera réservé.</p>
        <form class="inline-form" data-form="precommande" data-success="C’est noté. Votre panier vous attend." novalidate>
          <label class="visually-hidden" for="pre-email">Email</label>
          <div class="row"><input id="pre-email" name="email" type="email" placeholder="Votre email" autocomplete="email"><button type="submit">Réserver</button></div>
          <p class="form-status" role="status"></p>
        </form>
      </div>
      <p class="cart-note">Paiement sécurisé · Expédition sous 48 h · Retours sous 14 jours</p>
    </div>
  </aside>`;

const footer = (base) => `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${base || "./"}" class="brand">${C.marque.toUpperCase()}</a>
          <p>Bougies parfumées conçues et coulées à la main en France. Cire végétale, parfums de Grasse.</p>
        </div>
        <div><h4>Collection</h4><ul>${C.lieux.map((l) => `<li><a href="${base}bougies/${l.id}.html">${l.titre}</a></li>`).join("")}<li><a href="${base || ""}#coffret">${C.coffret.nom}</a></li></ul></div>
        <div><h4>La maison</h4><ul><li><a href="${base || ""}#maison">Notre histoire</a></li><li><a href="${base || ""}#lettre">Première série</a></li><li><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></li></ul></div>
        <div><h4>Aide</h4><ul><li>Expédition sous 48 h</li><li>Livraison offerte dès ${euro(C.config.livraisonOfferteDes)}</li><li>Retours sous 14 jours</li><li>contact@latitude.fr</li></ul></div>
      </div>
      <div class="footer-legal"><span>© <span data-year>2026</span> ${C.marque}</span><span>Conçu et coulé en France</span></div>
    </div>
  </footer>`;

const scripts = (base) => `
  <script src="${base}assets/catalogue.js"></script>
  <script src="${base}assets/scenes.js"></script>
  <script src="${base}assets/app.js"></script>
</body>
</html>
`;

/* N'ajoute une photo que si le fichier existe, sinon l'illustration reste affichée. */
const photo = (base, id, name) =>
  fs.existsSync(path.join(ROOT, "images", id, `${name}.jpg`)) ? `data-photo="${base}images/${id}/${name}.jpg"` : "";

/* ================= ACCUEIL ================= */
function home() {
  const base = "";
  const slides = C.lieux.map((l, i) => `
          <div class="hero-slide${i === 0 ? " on" : ""}" data-name="${l.nom}" data-coords="${esc(l.coords)}" data-href="bougies/${l.id}.html">
            <div class="visual" data-scene="${l.id}" ${photo(base, l.id, "lieu")} data-alt="${esc(l.titre)}"></div>
          </div>`);
  // ordre du diaporama : Anafi d'abord
  const order = ["anafi", "sahara", "moux", "meribel", "fregeneuil", "paris"].map((id) => slides[C.lieux.findIndex((l) => l.id === id)]);

  const cards = C.lieux.map((l) => `
        <article class="card">
          <a class="card-media" href="bougies/${l.id}.html" aria-label="${esc(l.titre)}, voir la bougie">
            <span class="card-moment">${l.heure} · ${l.moment}</span>
            <div class="visual" data-scene="${l.id}" ${photo(base, l.id, "lieu")} data-alt="${esc(l.titre)}"></div>
            <div class="packshot" style="--c:${l.couleur}" data-jar="${l.id}" ${photo(base, l.id, "bougie")}></div>
          </a>
          <div class="card-info">
            <a href="bougies/${l.id}.html" class="card-name">${l.nom}</a>
            <span class="card-price">${euro(prixMin)}</span>
            <p class="card-sub">${esc(l.accroche)}</p>
          </div>
          <button type="button" class="card-add" data-add="${l.id}" data-format="200">Ajouter au panier</button>
        </article>`).join("");

  return `${head({ title: `${C.marque}, bougies de lieux`, desc: "Six bougies parfumées, six lieux. Conçues et coulées à la main en France. Allumez un lieu.", base })}
  ${header(base)}
  <main>
    <section class="hero-wrap">
      <div class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Bougies parfumées · Coulées à la main en France</p>
          <h1>Allumez<br>un <em>lieu</em>.</h1>
          <p class="lede">Une île des Cyclades, un village des Corbières, un dimanche d’hiver à Paris. Six bougies pour retourner là où l’on a été heureux.</p>
          <div class="hero-actions">
            <a href="#collection" class="btn">Découvrir la collection</a>
            <a href="#coffret" class="link">Le coffret</a>
          </div>
        </div>
        <div class="hero-media">${order.join("")}
          <p class="hero-cap" id="hero-cap"></p>
        </div>
      </div>
    </section>

    <div class="promise"><ul class="wrap">
      <li>Coulée à la main en France</li><li>Cire végétale</li><li>Parfums de Grasse</li><li>Pot réutilisable</li><li>Livraison offerte dès ${euro(C.config.livraisonOfferteDes)}</li>
    </ul></div>

    <section class="section wrap" id="collection">
      <div class="section-head">
        <div class="stack"><p class="eyebrow">La collection</p><h2>Six lieux, une journée.</h2></div>
        <p class="intro">Chaque bougie porte une heure du jour, de la brume du matin aux soirées d’hiver.</p>
      </div>
      <div class="grid">${cards}
      </div>
    </section>

    <section class="section wrap" style="padding-top:0">
      <div class="story">
        <div class="visual" data-scene="moux" ${photo(base, "moux", "histoire")}></div>
        <div class="stack" style="gap:1.4rem">
          <p class="eyebrow">Notre idée</p>
          <h2>On ne vend pas une odeur. On vend un endroit.</h2>
          <p class="story-quote">« La garrigue a gardé la chaleur. »</p>
          <p>Chaque lieu de la collection est un souvenir réel. Nous l’avons traduit en parfum avec un nez de Grasse, puis coulé à la main en petites séries numérotées. Dans chaque boîte, une carte postale raconte pourquoi celui-ci.</p>
          <a href="bougies/moux.html" class="link" style="align-self:flex-start">Lire l’histoire de Moux</a>
        </div>
      </div>
    </section>

    <section class="section" id="coffret" style="background:var(--paper-2)">
      <div class="wrap coffret">
        <div class="stack" style="gap:1.4rem">
          <p class="eyebrow">Coffret Atlas</p>
          <h2>La journée entière, en format voyage.</h2>
          <p>Les six lieux en bougies de 70 g, dans une boîte qui se déplie comme une carte. Pour trouver son lieu, ou pour l’offrir.</p>
          <p class="price-lg">${euro(C.coffret.prix)}</p>
          <div><button type="button" class="btn" data-add="${C.coffret.id}">Ajouter le coffret</button></div>
        </div>
        <div class="coffret-visual" style="background:var(--paper)">${C.lieux.map((l) => `<div data-jar="${l.id}" data-mini="1" data-flame="0"></div>`).join("")}</div>
      </div>
    </section>

    <section class="section wrap" id="maison">
      <div class="section-head"><div class="stack"><p class="eyebrow">La maison</p><h2>Deux personnes, six lieux, un atelier.</h2></div></div>
      <div class="maison">
        <div><h3>L’intime</h3><p>Chaque lieu est le nôtre. Nous racontons pourquoi sur la carte postale glissée dans chaque boîte.</p></div>
        <div><h3>Le voyage</h3><p>Le nom du lieu, ses coordonnées, un tampon. La collection grandit comme un carnet qu’on remplit.</p></div>
        <div><h3>L’artisanat</h3><p>Coulées à la main en séries de cent, numérotées. Cire végétale, mèche en coton, pot à garder.</p></div>
      </div>
    </section>

    <section class="section letter" id="lettre">
      <div class="wrap letter-inner">
        <div class="stack"><p class="eyebrow">Première série</p><h2>100 exemplaires par lieu.</h2><p>Inscrivez-vous pour être prévenu avant l’ouverture. Les numéros de lot partent dans l’ordre des inscriptions.</p></div>
        <form class="inline-form" data-form="lettre" data-success="Merci. Vous serez prévenu avant tout le monde." novalidate>
          <label class="visually-hidden" for="nl-email">Email</label>
          <div class="row"><input id="nl-email" name="email" type="email" placeholder="Votre email" autocomplete="email"><button type="submit">M’inscrire</button></div>
          <p class="form-status" role="status"></p>
        </form>
      </div>
    </section>
  </main>
  ${footer(base)}
  ${cartDrawer(base)}
  ${scripts(base)}`;
}

/* ================= PAGE BOUGIE ================= */
function product(l, i) {
  const base = "../";
  const next = C.lieux[(i + 1) % C.lieux.length];
  const others = C.lieux.filter((x) => x.id !== l.id && x.id !== next.id).slice(0, 3);
  const f200 = C.formats["200"], f70 = C.formats["70"];
  const nom = l.titre;

  return `${head({ title: `${nom}, bougie parfumée · ${C.marque}`, desc: `${l.accroche} Bougie 200 g coulée à la main en France.`, base })}
  ${header(base)}
  <main style="--c:${l.couleur}">
    <nav class="crumbs wrap" aria-label="Fil d’Ariane"><a href="${base || ""}#collection">Collection</a><span>/</span><span>${nom}</span></nav>

    <section class="product wrap">
      <div class="gallery">
        <div class="thumbs" role="group" aria-label="Choisir une image">
          <button type="button" class="thumb" data-slide="lieu" aria-pressed="true" aria-label="Le lieu"><div class="visual" data-scene="${l.id}" ${photo(base, l.id, "lieu")}></div></button>
          <button type="button" class="thumb" data-slide="bougie" aria-pressed="false" aria-label="La bougie"><div class="packshot" style="--c:${l.couleur}" data-jar="${l.id}" data-flame="0" ${photo(base, l.id, "bougie")}></div></button>
          <button type="button" class="thumb" data-slide="detail" aria-pressed="false" aria-label="La matière"><div class="visual" data-scene="${l.id}" data-variant="detail" ${photo(base, l.id, "detail")}></div></button>
        </div>
        <div class="gallery-main" id="gallery-main">
          <div class="gallery-slide on" data-slide="lieu"><div class="visual" data-scene="${l.id}" ${photo(base, l.id, "lieu")} data-alt="${esc(nom)}, le lieu"></div><span class="gallery-cap">${esc(l.region)}</span></div>
          <div class="gallery-slide" data-slide="bougie"><div class="packshot" style="--c:${l.couleur}" data-jar="${l.id}" ${photo(base, l.id, "bougie")} data-alt="Bougie ${esc(nom)}"></div><span class="gallery-cap">Bougie 200 g · Lot n° ${l.lot}</span></div>
          <div class="gallery-slide" data-slide="detail"><div class="visual" data-scene="${l.id}" data-variant="detail" ${photo(base, l.id, "detail")} data-alt="${esc(l.matiere)}"></div><span class="gallery-cap">${esc(l.matiere)}</span></div>
        </div>
      </div>

      <div class="buy" data-buy>
        <div class="stack" style="gap:.8rem">
          <p class="eyebrow">${l.heure} · ${l.moment}</p>
          <h1>${l.nom}</h1>
          <p class="coords">${esc(l.coords)}${l.note ? ` · ${esc(l.note)}` : ""}</p>
        </div>
        <p class="phrase">« ${esc(l.phrase)} »</p>
        <p class="accroche">${esc(l.accroche)}</p>
        <p class="price" id="price">${euro(f200.prix)}</p>

        <fieldset class="formats">
          <legend>Format</legend>
          <label class="format"><input type="radio" name="format" value="200" checked><span>${f200.label}<small>${f200.detail} · ${euro(f200.prix)}</small></span></label>
          <label class="format"><input type="radio" name="format" value="70"><span>${f70.label}<small>${f70.detail} · ${euro(f70.prix)}</small></span></label>
        </fieldset>

        <div class="buy-row">
          <div class="qty" aria-label="Quantité">
            <button type="button" data-step="-1" aria-label="Diminuer la quantité">−</button>
            <span data-qty-value aria-live="polite">1</span>
            <button type="button" data-step="1" aria-label="Augmenter la quantité">+</button>
          </div>
          <button type="button" class="btn btn-block" id="add-main" data-add="${l.id}">Ajouter au panier</button>
        </div>

        <ul class="reassure">
          <li>Coulée à la main, lot n° ${l.lot} numéroté</li>
          <li>Expédiée sous 48 h dans sa boîte, avec sa carte postale</li>
          <li>Livraison offerte dès ${euro(C.config.livraisonOfferteDes)}</li>
        </ul>

        <div class="details">
          <details open>
            <summary>Notes olfactives</summary>
            <div class="d-body"><dl class="notes"><dt>Tête</dt><dd>${esc(l.tete)}</dd><dt>Cœur</dt><dd>${esc(l.coeur)}</dd><dt>Fond</dt><dd>${esc(l.fond)}</dd></dl></div>
          </details>
          <details>
            <summary>Composition</summary>
            <div class="d-body"><p>Cire végétale. Mèche en coton. Parfum composé à Grasse, conforme aux normes IFRA. Verre épais teinté, couvercle en chêne.</p><p>200 g, environ 45 heures de combustion.</p></div>
          </details>
          <details>
            <summary>Le rituel</summary>
            <div class="d-body"><p>Laissez fondre toute la surface à la première combustion, deux à trois heures. Recoupez la mèche à 5 mm avant chaque allumage. Éteignez avec le couvercle, jamais en soufflant. Une fois finie, lavez le pot à l’eau chaude et gardez-le.</p></div>
          </details>
          <details>
            <summary>Livraison et retours</summary>
            <div class="d-body"><p>Expédition sous 48 h depuis notre atelier. Livraison offerte dès ${euro(C.config.livraisonOfferteDes)} en France métropolitaine, ${euro(C.config.fraisLivraison)} en dessous. Retours acceptés sous 14 jours pour une bougie non allumée.</p></div>
          </details>
        </div>
      </div>
    </section>

    <section aria-labelledby="histoire">
      <div class="visual tale-hero" data-scene="${l.id}" ${photo(base, l.id, "histoire")} data-alt="${esc(nom)}"></div>
      <div class="section wrap tale">
        <div class="tale-aside">
          <p class="eyebrow">L’histoire</p>
          <h2 id="histoire">Pourquoi ${nom}</h2>
          <p class="coords">${esc(l.region)}<br>${esc(l.coords)}</p>
        </div>
        <div class="tale-body">${l.histoire.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
      </div>
      <blockquote class="tale-quote wrap">« ${esc(l.phrase)} »</blockquote>
    </section>

    <section class="section wrap" style="padding-top:0" aria-labelledby="parfum">
      <div class="section-head"><div class="stack"><p class="eyebrow">Le parfum</p><h2 id="parfum">Trois temps, comme une promenade.</h2></div><p class="intro">Les notes de tête s’ouvrent à l’allumage. Le cœur s’installe après quelques minutes. Le fond reste dans la pièce une fois la bougie éteinte.</p></div>
      <div class="pyramid">
        <div class="tier"><div class="visual" data-scene="${l.id}" data-variant="detail" ${photo(base, l.id, "detail")}></div><h3>Tête</h3><p>${esc(l.tete)}</p><small>À l’allumage</small></div>
        <div class="tier"><div class="packshot" style="--c:${l.couleur};aspect-ratio:1"><div data-jar="${l.id}" data-flame="0" style="width:46%"></div></div><h3>Cœur</h3><p>${esc(l.coeur)}</p><small>Après quelques minutes</small></div>
        <div class="tier"><div class="visual" data-scene="${l.id}" ${photo(base, l.id, "lieu")}></div><h3>Fond</h3><p>${esc(l.fond)}</p><small>Ce qui reste</small></div>
      </div>
    </section>

    <a class="next" href="${next.id}.html" style="--c:${next.couleur}" aria-label="Lieu suivant : ${esc(next.titre)}">
      <div class="next-copy">
        <p class="eyebrow">Continuer la journée · ${next.heure}</p>
        <h2>${next.nom}</h2>
        <p>« ${esc(next.phrase)} »</p>
        <span class="link" style="align-self:flex-start">Découvrir</span>
      </div>
      <div class="visual" data-scene="${next.id}" ${photo(base, next.id, "lieu")}></div>
    </a>

    <section class="section wrap">
      <div class="section-head"><div class="stack"><p class="eyebrow">Les autres lieux</p><h2>Poursuivre le voyage.</h2></div><a class="link" href="${base || ""}#collection">Toute la collection</a></div>
      <div class="grid">${others.map((o) => `
        <article class="card">
          <a class="card-media" href="${o.id}.html" aria-label="${esc(o.titre)}">
            <span class="card-moment">${o.heure} · ${o.moment}</span>
            <div class="visual" data-scene="${o.id}" ${photo(base, o.id, "lieu")}></div>
            <div class="packshot" style="--c:${o.couleur}" data-jar="${o.id}" ${photo(base, o.id, "bougie")}></div>
          </a>
          <div class="card-info"><a href="${o.id}.html" class="card-name">${o.nom}</a><span class="card-price">${euro(prixMin)}</span><p class="card-sub">${esc(o.accroche)}</p></div>
          <button type="button" class="card-add" data-add="${o.id}" data-format="200">Ajouter au panier</button>
        </article>`).join("")}
      </div>
    </section>
  </main>

  <div class="sticky-buy" id="sticky-buy">
    <div><p class="s-name">${l.nom}</p><p class="coords" data-sticky-price>${euro(f200.prix)}</p></div>
    <button type="button" class="btn" data-add="${l.id}" data-format="200">Ajouter</button>
  </div>
  ${footer(base)}
  ${cartDrawer(base)}
  ${scripts(base)}`;
}

/* ================= ÉCRITURE ================= */
fs.writeFileSync(path.join(ROOT, "index.html"), home());
fs.mkdirSync(path.join(ROOT, "bougies"), { recursive: true });
C.lieux.forEach((l, i) => fs.writeFileSync(path.join(ROOT, "bougies", `${l.id}.html`), product(l, i)));

if (process.argv.includes("--artifact")) {
  const out = process.argv[process.argv.indexOf("--artifact") + 1];
  const strip = (h) => h.replace(/<!DOCTYPE html>\s*<html lang="fr">\s*<head>\s*<meta charset="UTF-8">\s*<meta name="viewport"[^>]*>/, "").replace("</head>\n<body>", "").replace(/<\/body>\s*<\/html>\s*$/, "");
  fs.writeFileSync(out, strip(home()));
}
console.log(`OK : index.html + ${C.lieux.length} pages bougies`);
