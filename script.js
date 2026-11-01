/* Les six lieux, dans l'ordre de la journée. Modifiez ici textes, notes et coordonnées. */
const LIEUX = [
  {
    id: "fregeneuil", name: "FRÉGENEUIL", moment: "Matin", hour: "7 h", color: "#8FA89A", lot: "004",
    coords: "45°38′N · 0°10′E", lat: 45.63, lon: 0.17, note: "Coordonnées approximatives",
    phrase: "La brume sur la Charente, avant tout le monde.",
    desc: "Le parc et le logis au bord de la Charente, à Angoulême. L’herbe des berges, les saules, l’odeur des chais.",
    tete: "Herbe coupée, menthe", coeur: "Iris, saule", fond: "Chêne de fût, accord cognac",
    matter: "Posée sur bois flotté, au bord de l’eau",
  },
  {
    id: "anafi", name: "ANAFI", moment: "Midi", hour: "12 h", color: "#2F5D8A", lot: "001",
    coords: "36°21′N · 25°46′E", lat: 36.35, lon: 25.77,
    phrase: "Le blanc des murs, le bleu partout ailleurs.",
    desc: "Une île des Cyclades. Le sel sur la peau, un figuier contre un mur passé à la chaux, le thym sauvage qui chauffe au soleil.",
    tete: "Sel marin, bergamote", coeur: "Feuille de figuier, thym sauvage", fond: "Pierre chaude, musc blanc",
    matter: "Posée sur pierre blanche, lumière de midi",
  },
  {
    id: "moux", name: "MOUX", moment: "Fin d’après-midi", hour: "17 h", color: "#6B6B3A", lot: "003",
    coords: "43°10′53″N · 2°39′08″E", lat: 43.18, lon: 2.65,
    phrase: "La garrigue a gardé la chaleur.",
    desc: "Un village des Corbières, au pied de la montagne d’Alaric. Les vignes, les oliviers, les cyprès en bord de chemin.",
    tete: "Ciste, romarin", coeur: "Feuille de vigne, olivier", fond: "Cyprès, cèdre",
    matter: "Posée sur schiste et feuille de vigne",
  },
  {
    id: "saarah", name: "SAARAH", moment: "Crépuscule", hour: "20 h", color: "#C98B4E", lot: "002",
    coords: "Coordonnées à venir", lat: null, lon: null, note: "Lieu à préciser",
    phrase: "L’heure où la dune devient rose.",
    desc: "Une dune au moment où le soleil se couche. Le sable garde la chaleur, l’air sent l’épice et le bois.",
    tete: "Cardamome, datte", coeur: "Encens, rose sèche", fond: "Ambre, santal",
    matter: "Posée sur sable fin, lumière rasante",
  },
  {
    id: "paris", name: "PARIS", moment: "Soirée d’hiver", hour: "21 h", color: "#5E6166", lot: "005",
    coords: "48°51′N · 2°21′E", lat: 48.85, lon: 2.35,
    phrase: "Un dimanche de novembre, la lumière aux fenêtres.",
    desc: "Un appartement haussmannien, un dimanche d’hiver. Le thé qui infuse, le parquet ciré, un bouquet de roses sur la cheminée.",
    tete: "Thé noir, poivre rose", coeur: "Iris poudré, rose", fond: "Parquet ciré, tabac blond",
    matter: "Posée sur parquet en point de Hongrie",
  },
  {
    id: "costa-rica", name: "COSTA RICA", moment: "Après la pluie", hour: "Nuit", color: "#2E4A32", lot: "006",
    coords: "≈ 10°N · 84°W", lat: 10, lon: -84, note: "Position indicative",
    phrase: "La forêt respire enfin.",
    desc: "La forêt tropicale juste après l’averse. Les feuilles ruissellent, le cacao et le café montent de la terre chaude.",
    tete: "Fruit de la passion, feuilles mouillées", coeur: "Café, fleur de frangipanier", fond: "Cacao, vanille, vétiver",
    matter: "Posée sur feuilles tropicales mouillées",
  },
];

const $ = (s, el = document) => el.querySelector(s);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function jarHTML(l) {
  return `
    <div class="jar" style="--c:${l.color}">
      <span class="jar-flame"></span>
      <span class="jar-wick"></span>
      <div class="jar-glass"></div>
      <div class="jar-label">
        <span class="jar-label-name">${l.name}</span>
        <span class="jar-label-coords">${l.lat === null ? "— · —" : l.coords.replace(" · ", "  ")}</span>
        <span class="jar-label-rule"></span>
        <span class="jar-label-lot">200 g · Lot n° ${l.lot}</span>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  yearEl.textContent = new Date().getFullYear();
  const d = new Date();
  $("#stamp-date").textContent =
    `${String(d.getDate()).padStart(2, "0")}·${String(d.getMonth() + 1).padStart(2, "0")}·${String(d.getFullYear()).slice(2)}`;

  /* ---------- Menu mobile ---------- */
  const toggle = $(".nav-toggle");
  const menu = $("#menu");
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Hero : la collection en rotation ---------- */
  const heroJar = $("#hero-jar");
  const heroCaption = $("#hero-caption");
  const heroDots = $("#hero-dots");
  heroJar.innerHTML = jarHTML(LIEUX[1]);
  const heroJarEl = $(".jar", heroJar);
  let heroIndex = 1;
  let heroTimer = null;

  LIEUX.forEach((l, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.style.setProperty("--dot", l.color);
    b.setAttribute("aria-label", l.name);
    b.addEventListener("click", () => { showHero(i); restartHero(); });
    heroDots.appendChild(b);
  });

  function showHero(i) {
    heroIndex = i;
    const l = LIEUX[i];
    heroJarEl.style.setProperty("--c", l.color);
    $(".jar-label-name", heroJarEl).textContent = l.name;
    $(".jar-label-coords", heroJarEl).textContent = l.lat === null ? "— · —" : l.coords.replace(" · ", "  ");
    $(".jar-label-lot", heroJarEl).textContent = `200 g · Lot n° ${l.lot}`;
    heroCaption.textContent = `${l.name} · ${l.moment} · Lot n° ${l.lot}`;
    [...heroDots.children].forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
  }
  function restartHero() {
    clearInterval(heroTimer);
    if (!reduceMotion) heroTimer = setInterval(() => showHero((heroIndex + 1) % LIEUX.length), 4200);
  }
  showHero(1);
  restartHero();

  /* ---------- Ruban de la journée + fiche ---------- */
  const day = $("#day");
  LIEUX.forEach((l) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "day-stop";
    b.id = `tab-${l.id}`;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-controls", "fiche");
    b.style.setProperty("--dot", l.color);
    b.innerHTML = `<span class="day-swatch"></span><span class="mono">${l.hour} · ${l.moment}</span><span class="day-name">${l.name}</span>`;
    b.addEventListener("click", () => select(l.id, { updateHash: true }));
    day.appendChild(b);
  });

  day.addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const tabs = [...day.children];
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    next.click();
  });

  const fiche = $("#fiche");
  const ficheJar = $("#fiche-jar");
  ficheJar.innerHTML = jarHTML(LIEUX[1]);
  const ficheJarEl = $(".jar", ficheJar);

  function select(id, { updateHash = false, scroll = false } = {}) {
    const l = LIEUX.find((x) => x.id === id);
    if (!l) return;
    [...day.children].forEach((b) => {
      const on = b.id === `tab-${id}`;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    fiche.setAttribute("aria-labelledby", `tab-${id}`);
    fiche.style.setProperty("--c", l.color);
    ficheJarEl.style.setProperty("--c", l.color);
    $(".jar-label-name", ficheJarEl).textContent = l.name;
    $(".jar-label-coords", ficheJarEl).textContent = l.lat === null ? "— · —" : l.coords.replace(" · ", "  ");
    $(".jar-label-lot", ficheJarEl).textContent = `200 g · Lot n° ${l.lot}`;
    $("#fiche-matter").textContent = l.matter;
    $("#fiche-moment").textContent = `${l.hour} · ${l.moment}`;
    $("#fiche-name").textContent = l.name;
    $("#fiche-coords").textContent = l.note ? `${l.coords} · ${l.note}` : l.coords;
    $("#fiche-phrase").textContent = `« ${l.phrase} »`;
    $("#fiche-desc").textContent = l.desc;
    $("#fiche-tete").textContent = l.tete;
    $("#fiche-coeur").textContent = l.coeur;
    $("#fiche-fond").textContent = l.fond;
    $("#fiche-specs").textContent = `200 g · env. 45 h · Lot n° ${l.lot} · Cire végétale · Mèche coton`;
    const cta = $("#fiche-cta");
    cta.textContent = `Réserver ${l.name.charAt(0) + l.name.slice(1).toLowerCase()}`;
    cta.dataset.place = l.id;
    document.querySelectorAll(".pin").forEach((p) => p.setAttribute("aria-pressed", String(p.dataset.id === id)));
    if (updateHash) history.replaceState(null, "", `#${id}`);
    if (scroll) $("#collection").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  $("#fiche-cta").addEventListener("click", (e) => {
    const sel = $("#s-place");
    if (sel && e.currentTarget.dataset.place) sel.value = e.currentTarget.dataset.place;
  });

  /* ---------- Atlas ---------- */
  // Cadre Europe : longitude -5 → 30, latitude 52 → 33 (viewBox 700 × 380, 20 unités par degré)
  const W = 700, H = 380, LON0 = -5, LON1 = 30, LAT0 = 52, LAT1 = 33;
  const x = (lon) => ((lon - LON0) / (LON1 - LON0)) * 100;
  const y = (lat) => ((LAT0 - lat) / (LAT0 - LAT1)) * 100;

  const svg = $("#graticule");
  let g = "";
  for (let lon = 0; lon <= 25; lon += 5) {
    const px = (x(lon) / 100) * W;
    g += `<line x1="${px}" y1="0" x2="${px}" y2="${H}"/><text x="${px + 4}" y="14">${lon === 0 ? "0°" : lon + "°E"}</text>`;
  }
  for (let lat = 35; lat <= 50; lat += 5) {
    const py = (y(lat) / 100) * H;
    g += `<line x1="0" y1="${py}" x2="${W}" y2="${py}"/><text x="${W - 34}" y="${py - 4}">${lat}°N</text>`;
  }
  svg.innerHTML = g;

  const map = $("#map");
  const inset = $("#inset");
  const sideLeft = { fregeneuil: true };

  function makePin(l, left, top, parent) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pin" + (sideLeft[l.id] ? " left" : "");
    b.dataset.id = l.id;
    b.style.left = `${left}%`;
    b.style.top = `${top}%`;
    b.style.setProperty("--dot", l.color);
    b.setAttribute("aria-label", `${l.name}, ${l.coords}`);
    b.innerHTML = `<span class="pin-dot"></span><span class="pin-label">${l.name}</span>`;
    b.addEventListener("click", () => select(l.id, { updateHash: true, scroll: true }));
    parent.appendChild(b);
  }

  LIEUX.forEach((l) => {
    if (l.lat === null) return;
    if (l.lon < LON0) {
      // Costa Rica dans l'encart : longitude -90 → -78, latitude 15 → 5
      makePin(l, ((l.lon + 90) / 12) * 100 - 18, ((15 - l.lat) / 10) * 100 + 8, inset);
    } else {
      makePin(l, x(l.lon), y(l.lat), map);
    }
  });

  const logbook = $("#logbook");
  LIEUX.forEach((l) => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" style="--dot:${l.color}">
        <span class="lb-dot"></span>
        <span><span class="lb-name">${l.name}</span>${l.note ? `<span class="lb-note">${l.note}</span>` : ""}</span>
        <span class="mono lb-coords">${l.coords}</span>
      </button>`;
    $("button", li).addEventListener("click", () => select(l.id, { updateHash: true, scroll: true }));
    logbook.appendChild(li);
  });

  /* ---------- Coffret ---------- */
  $("#coffret-row").innerHTML = LIEUX.map((l) =>
    `<div class="mini">${jarHTML(l)}<span class="mini-name">${l.name}</span></div>`).join("");

  /* ---------- Sélection initiale (lien direct #anafi, #moux…) ---------- */
  const fromHash = () => {
    const id = location.hash.slice(1);
    if (LIEUX.some((l) => l.id === id)) { select(id, { scroll: true }); return true; }
    return false;
  };
  if (!fromHash()) select("anafi");
  window.addEventListener("hashchange", fromHash);

  /* ---------- Formulaires ---------- */
  const placeSel = $("#s-place");
  placeSel.innerHTML = `<option value="">Choisissez un lieu</option>` +
    LIEUX.map((l) => `<option value="${l.id}">${l.name} · ${l.moment}</option>`).join("") +
    `<option value="coffret">Coffret Atlas · les six lieux</option>`;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rules = {
    "s-name": (v) => (v.trim().length >= 2 ? "" : "Indiquez votre prénom."),
    "s-email": (v) => (emailRe.test(v.trim()) ? "" : "Cette adresse email ne semble pas valide."),
    "s-place": (v) => (v ? "" : "Choisissez le lieu à réserver."),
    "l-place": (v) => (v.trim().length >= 2 ? "" : "Nommez le lieu."),
    "l-why": (v) => (v.trim().length >= 20 ? "" : "Quelques lignes suffisent, 20 caractères au moins."),
    "l-email": (v) => (emailRe.test(v.trim()) ? "" : "Cette adresse email ne semble pas valide."),
  };

  function check(input) {
    const msg = rules[input.id] ? rules[input.id](input.value) : "";
    const field = input.closest(".field");
    field.classList.toggle("invalid", !!msg);
    $(".error", field).textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  function wire(form, successText) {
    const status = $(".form-status", form);
    const inputs = [...form.querySelectorAll("input, textarea, select")];
    inputs.forEach((i) => {
      i.addEventListener("blur", () => check(i));
      i.addEventListener("input", () => { if (i.closest(".field").classList.contains("invalid")) check(i); });
      i.addEventListener("change", () => { if (i.closest(".field").classList.contains("invalid")) check(i); });
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      const ok = inputs.map(check).every(Boolean);
      if (!ok) { inputs.find((i) => i.getAttribute("aria-invalid") === "true")?.focus(); return; }
      const btn = $("button[type=submit]", form);
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Envoi…";
      // À brancher sur un vrai service (Formspree, Brevo, Mailchimp…) :
      // await fetch("https://formspree.io/f/VOTRE_ID", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      await new Promise((r) => setTimeout(r, 700));
      status.textContent = successText(form);
      form.reset();
      btn.disabled = false;
      btn.textContent = label;
    });
  }

  wire($("#form-serie"), (f) => {
    const opt = $("#s-place").selectedOptions[0];
    const name = opt ? opt.textContent.split(" · ")[0] : "";
    return `C’est noté. Vous serez prévenu avant l’ouverture de ${name}.`;
  });
  wire($("#form-lieu"), () => "Merci. Nous lisons chaque proposition.");
});
