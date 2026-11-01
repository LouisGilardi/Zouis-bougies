/* Latitude : panier, illustrations, galerie, formulaires. */
(() => {
  const C = CATALOGUE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: C.config.devise, minimumFractionDigits: n % 1 ? 2 : 0 });
  const lieu = (id) => C.lieux.find((l) => l.id === id);

  /* ---------- Bougie (illustration CSS) ---------- */
  const jarHTML = (l, opts = {}) => `
    <div class="jar${opts.mini ? " jar-mini" : ""}" style="--c:${l.couleur}">
      ${opts.flame === false ? "" : '<span class="jar-flame"></span>'}
      <span class="jar-wick"></span>
      <div class="jar-glass"></div>
      <div class="jar-label">
        <span class="jar-name">${l.nom}</span>
        <span class="jar-coords">${l.note && l.coords.startsWith("Coord") ? "— · —" : l.coords.replace(" · ", "  ")}</span>
        <span class="jar-rule"></span>
        <span class="jar-lot">${opts.mini ? "70 g" : "200 g"} · Lot n° ${l.lot}</span>
      </div>
    </div>`;

  /* ---------- Visuels : photo si présente, sinon illustration ---------- */
  function hydrateVisuals(root = document) {
    $$("[data-scene]", root).forEach((el) => {
      if (el.dataset.ready) return;
      el.dataset.ready = "1";
      el.insertAdjacentHTML("afterbegin", SCENES.svg(el.dataset.scene, el.dataset.variant || "lieu"));
      loadPhoto(el);
    });
    $$("[data-jar]", root).forEach((el) => {
      if (el.dataset.ready) return;
      el.dataset.ready = "1";
      const l = lieu(el.dataset.jar);
      if (!l) return;
      el.insertAdjacentHTML("afterbegin", jarHTML(l, { mini: el.dataset.mini === "1", flame: el.dataset.flame !== "0" }));
      loadPhoto(el);
    });
  }
  function loadPhoto(el) {
    const src = el.dataset.photo;
    if (!src) return;
    const img = new Image();
    img.alt = el.dataset.alt || "";
    img.decoding = "async";
    img.className = "photo";
    img.onload = () => { el.appendChild(img); el.classList.add("has-photo"); };
    img.src = src;
  }

  /* ---------- Panier ---------- */
  const KEY = "latitude-panier";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {} };

  const describe = (item) => {
    if (item.id === C.coffret.id) return { nom: C.coffret.nom, detail: C.coffret.detail, prix: C.coffret.prix, couleur: "#B08D57" };
    const l = lieu(item.id); const f = C.formats[item.format] || C.formats["200"];
    return { nom: l.titre, detail: f.label, prix: f.prix, couleur: l.couleur, lieu: l };
  };
  const subtotal = () => cart.reduce((s, i) => s + describe(i).prix * i.qty, 0);
  const count = () => cart.reduce((s, i) => s + i.qty, 0);

  function add(id, format = "200", qty = 1) {
    const key = `${id}:${format}`;
    const found = cart.find((i) => `${i.id}:${i.format}` === key);
    if (found) found.qty = Math.min(found.qty + qty, 12);
    else cart.push({ id, format, qty });
    save(); render(); openCart(describe({ id, format }).nom);
  }
  function setQty(key, qty) {
    cart = cart.map((i) => (`${i.id}:${i.format}` === key ? { ...i, qty } : i)).filter((i) => i.qty > 0);
    save(); render();
  }

  const drawer = $("#cart");
  const overlay = $("#cart-overlay");
  let lastFocus = null;

  function render() {
    $$(".cart-count").forEach((el) => { el.textContent = count(); el.hidden = count() === 0; });
    if (!drawer) return;
    const list = $("#cart-items");
    const empty = $("#cart-empty");
    const foot = $("#cart-foot");
    empty.hidden = cart.length > 0;
    foot.hidden = cart.length === 0;
    list.innerHTML = cart.map((i) => {
      const d = describe(i); const key = `${i.id}:${i.format}`;
      const thumb = d.lieu
        ? `<div class="ci-thumb" style="--c:${d.couleur}"><div data-jar="${i.id}" data-flame="0" ${i.format === "70" ? 'data-mini="1"' : ""}></div></div>`
        : `<div class="ci-thumb ci-coffret">${C.lieux.map((l) => `<span style="background:${l.couleur}"></span>`).join("")}</div>`;
      return `<li class="ci">
        ${thumb}
        <div class="ci-body">
          <p class="ci-name">${d.nom}</p>
          <p class="ci-detail">${d.detail}</p>
          <div class="qty" aria-label="Quantité">
            <button type="button" data-qty="${key}" data-delta="-1" aria-label="Retirer un">−</button>
            <span>${i.qty}</span>
            <button type="button" data-qty="${key}" data-delta="1" aria-label="Ajouter un">+</button>
          </div>
        </div>
        <div class="ci-end">
          <p class="ci-price">${euro(d.prix * i.qty)}</p>
          <button type="button" class="link-btn" data-remove="${key}">Retirer</button>
        </div>
      </li>`;
    }).join("");
    hydrateVisuals(list);

    const sub = subtotal();
    const seuil = C.config.livraisonOfferteDes;
    const reste = Math.max(0, seuil - sub);
    $("#ship-text").textContent = reste > 0 ? `Plus que ${euro(reste)} pour la livraison offerte.` : "La livraison vous est offerte.";
    $("#ship-bar").style.setProperty("--p", `${Math.min(100, (sub / seuil) * 100)}%`);
    $("#cart-subtotal").textContent = euro(sub);
    $("#cart-shipping").textContent = reste > 0 ? euro(C.config.fraisLivraison) : "Offerte";
    $("#cart-total").textContent = euro(sub + (reste > 0 ? C.config.fraisLivraison : 0));
  }

  function openCart(addedName) {
    if (!drawer) return;
    lastFocus = document.activeElement;
    $("#cart-added").textContent = addedName ? `${addedName} a été ajouté à votre panier.` : "";
    $("#cart-added").hidden = !addedName;
    drawer.classList.add("open"); overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $(".cart-close", drawer).focus();
  }
  function closeCart() {
    if (!drawer) return;
    drawer.classList.remove("open"); overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    $("#precommande").hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;
    if (t.matches("[data-open-cart]")) { e.preventDefault(); openCart(); }
    else if (t.matches(".cart-close")) closeCart();
    else if (t.dataset.qty) {
      const it = cart.find((i) => `${i.id}:${i.format}` === t.dataset.qty);
      if (it) setQty(t.dataset.qty, Math.min(12, it.qty + Number(t.dataset.delta)));
    } else if (t.dataset.remove) setQty(t.dataset.remove, 0);
    else if (t.matches("[data-add]")) {
      e.preventDefault();
      const scope = t.closest("[data-buy]");
      const format = scope ? ($("input[name=format]:checked", scope)?.value || "200") : (t.dataset.format || "200");
      const qty = scope ? Number($("[data-qty-value]", scope)?.textContent || 1) : 1;
      add(t.dataset.add, format, qty);
    } else if (t.matches("#checkout")) {
      if (C.config.checkoutUrl) location.href = C.config.checkoutUrl;
      else { $("#precommande").hidden = false; $("#pre-email").focus(); }
    }
  });
  overlay?.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer?.classList.contains("open")) closeCart();
    if (e.key === "Tab" && drawer?.classList.contains("open")) {
      const f = $$("button:not([hidden]), a, input", drawer).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- Menu mobile ---------- */
  const toggle = $(".nav-toggle");
  const menu = $("#menu");
  toggle?.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#menu a").forEach((a) => a.addEventListener("click", () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));

  /* ---------- Accueil : diaporama des lieux ---------- */
  const slides = $$(".hero-slide");
  if (slides.length) {
    let i = 0;
    const cap = $("#hero-cap");
    const show = (n) => {
      slides.forEach((s, j) => s.classList.toggle("on", j === n));
      const s = slides[n];
      cap.innerHTML = `<a href="${s.dataset.href}">${s.dataset.name}</a><span>${s.dataset.coords}</span>`;
    };
    show(0);
    if (!reduce) setInterval(() => { i = (i + 1) % slides.length; show(i); }, 5000);
  }

  /* ---------- Page produit : galerie, format, quantité, barre mobile ---------- */
  const buy = $("[data-buy]");
  if (buy) {
    const main = $("#gallery-main");
    $$(".thumb").forEach((th) => th.addEventListener("click", () => {
      $$(".thumb").forEach((x) => x.setAttribute("aria-pressed", String(x === th)));
      $$(".gallery-slide", main).forEach((s) => s.classList.toggle("on", s.dataset.slide === th.dataset.slide));
    }));

    const priceEl = $("#price");
    const updatePrice = () => {
      const f = $("input[name=format]:checked", buy).value;
      const p = C.formats[f].prix;
      priceEl.textContent = euro(p);
      $$("[data-sticky-price]").forEach((el) => (el.textContent = euro(p)));
    };
    $$("input[name=format]", buy).forEach((r) => r.addEventListener("change", updatePrice));
    updatePrice();

    const qv = $("[data-qty-value]", buy);
    $$("[data-step]", buy).forEach((b) => b.addEventListener("click", () => {
      qv.textContent = Math.max(1, Math.min(12, Number(qv.textContent) + Number(b.dataset.step)));
    }));

    const sticky = $("#sticky-buy");
    const mainBtn = $("#add-main");
    if (sticky && "IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => sticky.classList.toggle("show", !en.isIntersecting && en.boundingClientRect.top < 0))
        .observe(mainBtn);
    }
  }

  /* ---------- Formulaires (newsletter, précommande) ---------- */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  $$("form[data-form]").forEach((form) => {
    const status = $(".form-status", form);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("input[type=email]", form);
      if (!emailRe.test(email.value.trim())) {
        status.textContent = "Vérifiez votre adresse email, elle semble incomplète.";
        status.classList.add("is-error");
        email.focus();
        return;
      }
      status.classList.remove("is-error");
      const btn = $("button[type=submit]", form);
      btn.disabled = true;
      const data = new FormData(form);
      if (form.dataset.form === "precommande") data.append("panier", cart.map((i) => `${describe(i).nom} ${describe(i).detail} × ${i.qty}`).join(", "));
      try {
        if (C.config.formEndpoint) {
          const r = await fetch(C.config.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!r.ok) throw new Error();
        } else {
          await new Promise((r) => setTimeout(r, 600));
        }
        status.textContent = form.dataset.success;
        form.reset();
      } catch {
        status.textContent = "L’envoi n’a pas abouti. Réessayez dans un instant.";
        status.classList.add("is-error");
      } finally {
        btn.disabled = false;
      }
    });
  });

  /* ---------- Divers ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  hydrateVisuals();
  render();
})();
