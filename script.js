document.addEventListener("DOMContentLoaded", () => {
  // ----- Année du footer -----
  document.getElementById("year").textContent = new Date().getFullYear();

  // ----- Header au scroll -----
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- Menu mobile -----
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  // ----- Lien actif selon la section visible -----
  const links = [...menu.querySelectorAll("a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && navObserver.observe(s));

  // ----- Filtres projets -----
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project-card");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((f) => f.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      cards.forEach((card) => card.classList.toggle("hidden", cat !== "all" && card.dataset.category !== cat));
    });
  });

  // ----- Apparition au scroll -----
  const revealEls = document.querySelectorAll(".section-title, .project-card, .contact-intro, .contact-form");
  revealEls.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => revealObserver.observe(el));

  // ----- Formulaire de contact -----
  const form = document.getElementById("contact-form");
  const status = form.querySelector(".form-status");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validators = {
    name: (v) => (v.trim().length >= 2 ? "" : "Merci d’indiquer votre nom."),
    email: (v) => (emailRe.test(v.trim()) ? "" : "Adresse email invalide."),
    message: (v) => (v.trim().length >= 10 ? "" : "Votre message doit faire au moins 10 caractères."),
  };

  const validateField = (input) => {
    const msg = validators[input.name](input.value);
    const field = input.closest(".field");
    field.classList.toggle("invalid", !!msg);
    field.querySelector(".error").textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  };

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const inputs = [...form.querySelectorAll("input, textarea")];
    const valid = inputs.map(validateField).every(Boolean);
    if (!valid) {
      inputs.find((i) => i.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Envoi…";

    try {
      // Remplacez cette simulation par un vrai envoi, par ex. Formspree :
      // await fetch("https://formspree.io/f/VOTRE_ID", {
      //   method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
      // }).then((r) => { if (!r.ok) throw new Error(); });
      await new Promise((r) => setTimeout(r, 800));

      status.textContent = "Merci ! Votre message a bien été envoyé.";
      status.classList.add("success");
      form.reset();
    } catch {
      status.textContent = "Oups, l’envoi a échoué. Réessayez ou écrivez-moi par email.";
      status.classList.add("fail");
    } finally {
      btn.disabled = false;
      btn.textContent = "Envoyer";
    }
  });
});
