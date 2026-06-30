/* ============================================================
   PRIME ESTATE PROPERTIES — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Render Lucide icons ---- */
  if (window.lucide) window.lucide.createIcons();

  const header   = document.getElementById("header");
  const nav       = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navClose  = document.getElementById("navClose");
  const backTop   = document.getElementById("backTop");

  /* ---- Sticky header shadow + back-to-top visibility ---- */
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 10);
    backTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav drawer ---- */
  function openNav()  { nav.classList.add("open"); }
  function closeNav() { nav.classList.remove("open"); }
  navToggle.addEventListener("click", openNav);
  navClose.addEventListener("click", closeNav);
  nav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---- Back to top ---- */
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---- Active nav link on scroll (scroll spy) ---- */
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        const id = e.target.getAttribute("id");
        navLinks.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { spy.observe(s); });

  /* ---- Scroll reveal + counters + progress bars ---- */
  const reveals = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      // animate any counters inside
      e.target.querySelectorAll(".counter").forEach(animateCounter);
      // animate any progress bars inside
      e.target.querySelectorAll(".progress-bar").forEach(function (b) { b.classList.add("animate"); });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  reveals.forEach(function (r) { revealObs.observe(r); });

  function animateCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target   = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1500;
    const start    = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = target * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = decimals ? target.toFixed(decimals) : Math.floor(target).toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact form (demo: client-side only) ----
     To make it actually send, point the form at a service like
     Formspree (https://formspree.io) — set the form's action to your
     endpoint and method="POST", then remove the e.preventDefault() below. */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  function showNote(msg, ok) {
    note.hidden = false;
    note.textContent = msg;
    note.className = "form-note " + (ok ? "ok" : "err");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fields = form.querySelectorAll("input[required], textarea[required]");
      let valid = true;
      fields.forEach(function (f) {
        const bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.classList.toggle("invalid", bad);
        if (bad) valid = false;
      });
      if (!valid) {
        showNote("Please fill in all fields with a valid email.", false);
        return;
      }
      // Demo success — no backend wired up
      showNote("Thanks! Your enquiry has been received. We'll get back to you within one business day.", true);
      form.reset();
    });

    // clear invalid state as the user types
    form.querySelectorAll("input, textarea").forEach(function (f) {
      f.addEventListener("input", function () { f.classList.remove("invalid"); });
    });
  }
})();
