/* comstering mockup behaviors — theme, command palette, code copy, toc, progress,
   lightbox, filters. Vanilla JS, no dependencies. Mirrors F-GL-02, F-SR-01,
   F-PO-03/04/10/11, F-HM-04, F-PJ-02 from the PRD. */
(function () {
  "use strict";
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- theme (default dark, F-GL-02) ---------- */
  function syncThemeButton() {
    var dark = root.classList.contains("dark");
    $$("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-label", dark ? "라이트 테마로 전환" : "다크 테마로 전환");
      b.setAttribute("aria-pressed", String(!dark));
    });
  }
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var dark = root.classList.toggle("dark");
      store.set("theme", dark ? "dark" : "light");
      syncThemeButton();
      // real site: postMessage to giscus iframe here (F-PO-08)
    });
  });
  syncThemeButton();

  /* ---------- toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("is-on");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("is-on"); }, 1800);
  }

  /* ---------- code copy (F-PO-04) ---------- */
  $$(".code").forEach(function (block) {
    var btn = $(".code__copy", block); if (!btn) return;
    var label = $(".code__copy-label", btn);
    btn.addEventListener("click", function () {
      var text = $$(".ln", block).map(function (l) {
        var clone = l.cloneNode(true); $$(".p", clone).forEach(function (p) { p.remove(); }); return clone.textContent;
      }).join("\n");
      var done = function () {
        btn.dataset.copied = "true"; if (label) label.textContent = "copied";
        setTimeout(function () { btn.dataset.copied = "false"; if (label) label.textContent = "copy"; }, 2000);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
    });
  });

  /* ---------- toc active + reading progress (F-PO-03, F-PO-10) ---------- */
  var tocLinks = $$(".toc__list a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { var id = a.getAttribute("href").slice(1); (map[id] = map[id] || []).push(a); });
    var heads = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var setActive = function (id) {
      tocLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
      (map[id] || []).forEach(function (a) { a.setAttribute("aria-current", "true"); });
    };
    /* IntersectionObserver only (no scroll listener): a heading becomes current
       once it crosses the band just under the sticky header */
    var passed = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { passed[e.target.id] = e.boundingClientRect.top < 120; });
      var current = heads[0];
      heads.forEach(function (h) { if (passed[h.id]) current = h; });
      if (current) setActive(current.id);
    }, { rootMargin: "-88px 0px 0px 0px", threshold: [0, 1] });
    heads.forEach(function (h) { io.observe(h); });
    tocLinks.forEach(function (a) { a.addEventListener("click", function () { setActive(a.getAttribute("href").slice(1)); }); });
  }
  var bar = $(".progress__bar"), article = $("[data-article]");
  /* progress: CSS scroll-driven animation where supported (components.css);
     fallback = IntersectionObserver over evenly spaced sentinels, no scroll listener */
  if (bar && article && !(window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()"))) {
    var N = 40, marks = [];
    article.style.position = "relative";
    for (var i = 0; i <= N; i++) { var m = document.createElement("span"); m.setAttribute("aria-hidden", "true"); m.style.cssText = "position:absolute;left:0;width:1px;height:1px;pointer-events:none;top:" + (i / N * 100) + "%"; m.dataset.i = i; article.appendChild(m); marks.push(m); }
    var seen = {};
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.dataset.i] = e.boundingClientRect.top < window.innerHeight; });
      var max = 0; Object.keys(seen).forEach(function (k) { if (seen[k] && +k > max) max = +k; });
      bar.style.transform = "scaleX(" + (max / N).toFixed(3) + ")";
    }, { threshold: [0, 1] });
    marks.forEach(function (m) { pio.observe(m); });
  }

  /* ---------- lightbox (F-PO-11, PRD-003 PR-14) ----------
     native <dialog>: showModal() traps focus and Esc closes it for free.
     Backdrop click or the close button closes; focus goes back to the image. */
  var lb;
  $$(".prose figure img").forEach(function (img) {
    img.setAttribute("tabindex", "0"); img.setAttribute("role", "button");
    img.setAttribute("aria-label", (img.alt || "이미지") + " 확대");
    var open = function () {
      if (!lb) {
        lb = document.createElement("dialog"); lb.className = "lightbox"; lb.setAttribute("aria-label", "이미지 확대 보기");
        lb.innerHTML = "<button class='lightbox__close' type='button' aria-label='닫기'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' aria-hidden='true'><path d='M18 6 6 18M6 6l12 12'/></svg></button><figure class='lightbox__fig'><img alt=''><figcaption></figcaption></figure>";
        document.body.appendChild(lb);
        lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lightbox__close")) lb.close(); });
        lb.addEventListener("close", function () { if (lb._from) lb._from.focus(); });
      }
      var cap = img.closest("figure").querySelector("figcaption");
      $("img", lb).src = img.currentSrc || img.src; $("img", lb).alt = img.alt;
      var capText = "";
      if (cap) { var c = cap.cloneNode(true); $$(".sr-only", c).forEach(function (n) { n.remove(); }); capText = c.textContent.trim(); }
      $("figcaption", lb).textContent = capText;
      lb._from = img; lb.showModal();
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });

  /* ---------- list filters with URL state (F-HM-04, F-PJ-02) ---------- */
  $$("[data-filter-group]").forEach(function (group) {
    var key = group.getAttribute("data-filter-group");
    var targetSel = group.getAttribute("data-filter-target");
    var chips = $$(".chip", group);
    var apply = function (val, push) {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.value === val)); });
      var shown = 0;
      $$(targetSel).forEach(function (item) {
        var vals = (item.dataset[key] || "").split(" ");
        var ok = val === "all" || vals.indexOf(val) > -1;
        item.hidden = !ok; if (ok) shown++;
      });
      $$("[data-year-group]").forEach(function (g) { g.hidden = !$$(targetSel, g).some(function (i) { return !i.hidden; }); });
      var empty = $("[data-empty]"); if (empty) empty.hidden = shown > 0;
      var counter = $("[data-result-count]"); if (counter) counter.textContent = shown;
      if (push) {
        var u = new URL(location.href);
        if (val === "all") u.searchParams.delete(key); else u.searchParams.set(key, val);
        try { history.pushState({ v: val }, "", u); } catch (e) {}
      }
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { apply(c.dataset.value, true); }); });
    var init = function () { var v = new URLSearchParams(location.search).get(key) || "all"; if (!chips.some(function (c) { return c.dataset.value === v; })) v = "all"; apply(v, false); };
    window.addEventListener("popstate", init); init();
    $$("[data-filter-reset]").forEach(function (b) { b.addEventListener("click", function () { apply("all", true); }); });
  });

  /* ---------- command palette (F-SR-01) ---------- */
  var base = document.body.getAttribute("data-base") || "";
  var INDEX = [
    { g: "posts", t: "Custom network Karpenter ENI troubleshooting", m: "2025-07-10 · infra", h: "post.html", k: "karpenter eni custom networking eks 카펜터 트러블슈팅" },
    { g: "posts", t: "EKS에 Cilium CNI 설치하기 (with CNI Chaining)", m: "2025-09-01 · infra", h: "post.html", k: "cilium cni eks chaining 실리움" },
    { g: "posts", t: "Cilium CNI 설치 후 일부 Pod들이 정상동작하지 않는 문제 해결", m: "2025-09-02 · infra", h: "post.html", k: "cilium troubleshoot pod" },
    { g: "posts", t: "Karpenter로 유연한 Node Autoscaling 하기", m: "2025-07-06 · infra", h: "post.html", k: "karpenter autoscaling node 카펜터" },
    { g: "posts", t: "EKS Custom Networking", m: "2025-07-08 · infra", h: "post.html", k: "eks custom networking ip subnet" },
    { g: "posts", t: "Bitnami helm chart open source contribute", m: "2025-08-13 · oss", h: "post.html", k: "bitnami helm kafka schema registry 오픈소스" },
    { g: "posts", t: "Terraform Associate 004 자격증 취득 후기", m: "2026-04-28 · infra", h: "post.html", k: "terraform 자격증 certification" },
    { g: "projects", t: "Airflow MWAA → Argo Workflows 전환", m: "2025.12 – 2026.02", h: "project.html", k: "argo workflow mwaa airflow cicd" },
    { g: "projects", t: "EKS 네트워킹 아키텍처 고도화", m: "2025.06", h: "project.html", k: "eks cilium custom networking pod ip" },
    { g: "projects", t: "Okta SSO 통합 인증 · Keycloak IdP Broker", m: "2025.11 – 2026.01", h: "project.html", k: "okta keycloak sso 인증" },
    { g: "projects", t: "VPC Peering 전환으로 네트워크 비용 50% 절감", m: "2025.09 – 2025.10", h: "project.html", k: "vpc peering transit gateway terraform" },
    { g: "tags", t: "#kubernetes", m: "8 posts", h: "tags.html", k: "kubernetes k8s 쿠버네티스" },
    { g: "tags", t: "#karpenter", m: "4 posts", h: "tags.html", k: "karpenter 카펜터" },
    { g: "tags", t: "#cilium", m: "3 posts", h: "tags.html", k: "cilium" },
    { g: "tags", t: "#terraform", m: "3 posts", h: "tags.html", k: "terraform iac" },
    { g: "pages", t: "about", m: "경력 · 연락처 · resume.pdf", h: "about.html", k: "about 소개 이력서 resume 연락처" }
  ];
  var backdrop = $(".palette-backdrop"), palette = $(".palette");
  if (palette) {
    var input = $(".palette__input", palette), results = $(".palette__results", palette);
    var lastFocus = null, sel = 0, items = [];
    var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var hl = function (t, q) { if (!q) return esc(t); var i = t.toLowerCase().indexOf(q); return i < 0 ? esc(t) : esc(t.slice(0, i)) + "<mark>" + esc(t.slice(i, i + q.length)) + "</mark>" + esc(t.slice(i + q.length)); };
    var render = function () {
      var q = input.value.trim().toLowerCase();
      items = INDEX.filter(function (x) { return !q || (x.t + " " + x.k).toLowerCase().indexOf(q) > -1; });
      if (!q) items = items.filter(function (x, i) { return x.g !== "tags" || i < 13; }).slice(0, 9);
      sel = 0;
      if (!items.length) { results.innerHTML = "<div class='palette__empty'>‘" + esc(input.value) + "’에 대한 결과가 없습니다.<br><span class='mono' style='font-size:12px'>다른 키워드나 영문 표기로 검색해 보세요.</span></div>"; input.setAttribute("aria-activedescendant", ""); return; }
      var html = "", g = "";
      items.forEach(function (x, i) {
        if (x.g !== g) { g = x.g; html += "<div class='palette__group' role='presentation'>" + g + "</div>"; }
        html += "<a class='palette__item' role='option' id='pi-" + i + "' href='" + base + x.h + "' aria-selected='" + (i === 0) + "'><span class='palette__item-title'>" + hl(x.t, q) + "</span><span class='palette__item-meta'>" + esc(x.m) + "</span></a>";
      });
      results.innerHTML = html; input.setAttribute("aria-activedescendant", "pi-0");
    };
    var move = function (d) {
      if (!items.length) return;
      sel = (sel + d + items.length) % items.length;
      $$(".palette__item", results).forEach(function (el, i) { el.setAttribute("aria-selected", String(i === sel)); if (i === sel) el.scrollIntoView({ block: "nearest" }); });
      input.setAttribute("aria-activedescendant", "pi-" + sel);
    };
    var open = function () { lastFocus = document.activeElement; root.classList.add("palette-open"); palette.removeAttribute("inert"); input.value = ""; render(); setTimeout(function () { input.focus(); }, 10); };
    var close = function () { root.classList.remove("palette-open"); palette.setAttribute("inert", ""); if (lastFocus) lastFocus.focus(); };
    palette.setAttribute("inert", "");
    $$("[data-palette-open]").forEach(function (b) { b.addEventListener("click", open); });
    backdrop.addEventListener("click", close);
    input.addEventListener("input", render);
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); root.classList.contains("palette-open") ? close() : open(); return; }
      if (e.key === "/" && !root.classList.contains("palette-open") && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); return; }
      if (!root.classList.contains("palette-open")) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") { var a = $$(".palette__item", results)[sel]; if (a) { e.preventDefault(); location.href = a.href; } }
      else if (e.key === "Tab") { e.preventDefault(); input.focus(); } /* focus trap */
    });
    results.addEventListener("mousemove", function (e) { var a = e.target.closest(".palette__item"); if (!a) return; var i = $$(".palette__item", results).indexOf(a); if (i !== sel) { sel = i; move(0); } });
  }

  /* ---------- design-system page helpers ---------- */
  $$("[data-copy-token]").forEach(function (el) {
    el.addEventListener("click", function () { var v = el.getAttribute("data-copy-token"); if (navigator.clipboard) navigator.clipboard.writeText(v); toast("copied " + v); });
  });
  $$("[data-toast-demo]").forEach(function (el) { el.addEventListener("click", function () { toast(el.getAttribute("data-toast-demo")); }); });
})();

/* series box: collapsed to one line by default, expands on click (F-PO-07, review R6) */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll("[data-series]"), function (box) {
    var t = box.querySelector(".series__toggle"); if (!t) return;
    t.addEventListener("click", function () { var on = box.classList.toggle("is-expanded"); t.setAttribute("aria-expanded", String(on)); });
  });
})();
