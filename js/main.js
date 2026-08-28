/* ============================================================
   OCARINA — main.js
   1) Grille d'ensemble (bande 2) : petites projections stylisées
      représentant les particules du filtre de Kalman/particulaire.
   2) Frise schématique 800 ka (section contexte).
   3) Barre de progression liée au scroll.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 0. Internationalisation (i18n) ----------
     Mécanique de bascule FR/EN : content.js (chargé avant ce script)
     expose un objet global `content` avec une clé par langue. Aucune
     vraie traduction anglaise pour l'instant (voir content.js) — cette
     étape ne construit que le mécanisme.
     - currentLang est lu par buildTimelineSvg() et
       bindAssimilationCrossfade() pour choisir le bon texte au moment
       de leur (re)construction.
     - setLanguage() est l'unique point d'entrée pour changer de langue :
       elle mémorise le choix, retraduit tout [data-i18n]/[data-i18n-alt]/
       [data-i18n-title]/[data-i18n-aria], et notifie les deux fonctions
       ci-dessus pour qu'elles mettent à jour leur texte déjà affiché sans
       tout reconstruire. */

  const LANG_STORAGE_KEY = "ocarina_lang";
  let currentLang = "fr";

  function applyI18nText(root) {
    const scope = root || document;
    const dict = (typeof content !== "undefined" && content[currentLang]) || {};

    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key in dict) el.innerHTML = dict[key];
    });
    scope.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (key in dict) el.setAttribute("alt", dict[key]);
    });
    scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key in dict) el.setAttribute("title", dict[key]);
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key in dict) el.setAttribute("aria-label", dict[key]);
    });
  }

  function updateLangToggleUI(lang) {
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      // Les deux boutons deviennent cliquables dès qu'une langue a été
      // choisie une première fois : "Bientôt disponible" ne s'applique
      // qu'à l'état initial avant tout branchement du mécanisme.
      btn.removeAttribute("disabled");
      btn.removeAttribute("title");
    });
  }

  function getSavedLang() {
    let saved = null;
    try {
      saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    } catch (err) {
      // localStorage indisponible (navigation privée stricte, quota...) :
      // on retombe simplement sur le défaut, ce n'est pas bloquant.
      saved = null;
    }
    return (typeof content !== "undefined" && content[saved]) ? saved : "fr";
  }

  function saveLang(lang) {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (err) {
      // Pas grave si la sauvegarde échoue : la langue reste active pour
      // la session en cours, elle ne sera simplement pas mémorisée.
    }
  }

  function setLanguage(lang) {
    if (typeof content === "undefined" || !content[lang]) return;

    currentLang = lang;
    document.documentElement.lang = lang;

    applyI18nText();
    updateLangToggleUI(lang);
    saveLang(lang);

    // Texte déjà affiché par des fonctions qui gèrent elles-mêmes leur
    // rendu (pas de simple [data-i18n]) : on les notifie sans tout
    // reconstruire (voir leurs définitions plus bas).
    updateAssimilationCrossfadeLabel();
    updateTimelineTexts();
  }

  function bindLangToggle() {
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
  }

  /* ---------- 1. Grille d'ensemble (SVG "Terres" stylisées) ----------
     Remplacée par la vidéo de fond assets/video/model-currents.webm/.mp4
     (voir #ensembleGrid / #modelsVideo dans index.html). Fonction
     conservée en repli, au cas où les fichiers vidéo viendraient à
     manquer — pour la réactiver, décommenter le bloc ci-dessous ET son
     appel dans DOMContentLoaded plus bas (et retirer/masquer la vidéo).

  function buildEnsembleGrid() {
    const grid = document.getElementById("ensembleGrid");
    if (!grid) return;

    const CELLS = 18;
    const svgNS = "http://www.w3.org/2000/svg";

    for (let i = 0; i < CELLS; i++) {
      const cell = document.createElement("div");
      cell.className = "ensemble-cell";

      // Variation légère par particule : rotation, phase des méridiens,
      // et opacité, pour suggérer un ENSEMBLE de simulations plutôt
      // qu'une carte unique répétée.
      const rotation = (i * 37) % 360;
      const phase = (i % 5) * 14;
      const dim = 0.55 + ((i % 4) * 0.12);

      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 60 60");
      svg.style.opacity = dim.toFixed(2);
      svg.style.transform = `rotate(${rotation * 0.06}deg)`;

      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", "30");
      circle.setAttribute("cy", "30");
      circle.setAttribute("r", "26");
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "#F2EFE7");
      circle.setAttribute("stroke-width", "1");
      svg.appendChild(circle);

      // Méridiens (ellipses) suggérant une projection orthographique
      [0, 1, 2].forEach((m) => {
        const ellipse = document.createElementNS(svgNS, "ellipse");
        ellipse.setAttribute("cx", "30");
        ellipse.setAttribute("cy", "30");
        ellipse.setAttribute("rx", String(26 - m * 9));
        ellipse.setAttribute("ry", "26");
        ellipse.setAttribute("fill", "none");
        ellipse.setAttribute("stroke", "#F2EFE7");
        ellipse.setAttribute("stroke-width", "0.6");
        ellipse.setAttribute("transform", `rotate(${phase} 30 30)`);
        svg.appendChild(ellipse);
      });

      // Parallèle central
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", "4");
      line.setAttribute("y1", "30");
      line.setAttribute("x2", "56");
      line.setAttribute("y2", "30");
      line.setAttribute("stroke", "#F2EFE7");
      line.setAttribute("stroke-width", "0.6");
      svg.appendChild(line);

      cell.appendChild(svg);
      grid.appendChild(cell);
    }
  }
  */

  /* ---------- 2. Frise CO2 réelle (800 ka) ---------- */

  async function buildTimelineSvg() {
    const svg = document.getElementById("timelineSvg");
    if (!svg) return;

    const container = svg.closest(".timeline-chart");

    // Affiche un message visible à la place du SVG (au lieu d'un encart
    // muet) en cas d'échec de chargement/parsing des données CO2. Cause la
    // plus fréquente : le site est ouvert en double-clic (file://) au lieu
    // d'être servi via `python3 -m http.server` — fetch() échoue alors
    // silencieusement à cause des restrictions CORS sur file://.
    function showError(reason) {
      console.error("Frise CO2 — échec du chargement des données :", reason);
      svg.style.display = "none";
      if (container && !container.querySelector(".timeline-chart__error")) {
        const msg = document.createElement("p");
        msg.className = "timeline-chart__error";
        msg.textContent = content[currentLang].timeline_error;
        container.insertBefore(msg, svg.nextSibling);
      }
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const W = 1000, H = 260;
    const plotTop = 20, plotBottom = 190; // zone de tracé de la courbe
    const bandTop = 10, bandBottom = H - 60; // zone des rectangles MIS 9 / MIS 7

    let data;
    try {
      const res = await fetch("assets/data/co2.json");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText} sur assets/data/co2.json`);
      }
      data = await res.json();
    } catch (err) {
      showError(err);
      return;
    }
    if (!Array.isArray(data) || data.length === 0) {
      showError(new Error("assets/data/co2.json est vide ou n'est pas un tableau JSON valide"));
      return;
    }

    // data est trié par age_ka décroissant (le plus ancien en premier)
    const ages = data.map((d) => d.age_ka);
    const co2s = data.map((d) => d.co2_ppm);
    const ageMax = Math.max(...ages); // bord gauche (passé le plus lointain)
    const ageMin = Math.min(...ages); // bord droit (point le plus récent disponible)
    const co2Min = Math.min(...co2s);
    const co2Max = Math.max(...co2s);
    const co2Margin = (co2Max - co2Min) * 0.1;

    const xScale = (age) => ((ageMax - age) / (ageMax - ageMin)) * W;
    const yScale = (ppm) =>
      plotBottom -
      ((ppm - (co2Min - co2Margin)) / (co2Max + co2Margin - (co2Min - co2Margin))) *
        (plotBottom - plotTop);

    let d = `M ${xScale(data[0].age_ka)} ${yScale(data[0].co2_ppm)}`;
    for (let i = 1; i < data.length; i++) {
      d += ` L ${xScale(data[i].age_ka)} ${yScale(data[i].co2_ppm)}`;
    }

    // Zones MIS 9 (340-315 ka) et MIS 7 (250-230 ka), positionnées sur la vraie échelle X
    const mis9 = { x: xScale(340), w: xScale(315) - xScale(340) };
    const mis7 = { x: xScale(250), w: xScale(230) - xScale(250) };

    function rect(x, w, fill) {
      const r = document.createElementNS(svgNS, "rect");
      r.setAttribute("x", x);
      r.setAttribute("y", bandTop);
      r.setAttribute("width", w);
      r.setAttribute("height", bandBottom - bandTop);
      r.setAttribute("fill", fill);
      r.setAttribute("opacity", "0.14");
      return r;
    }

    function label(x, text) {
      const t = document.createElementNS(svgNS, "text");
      t.setAttribute("x", x);
      t.setAttribute("y", H - 34);
      t.setAttribute("fill", "#CFC9BD");
      t.setAttribute("font-family", "IBM Plex Mono, monospace");
      t.setAttribute("font-size", "12");
      t.textContent = text;
      return t;
    }

    svg.appendChild(rect(mis9.x, mis9.w, "#7C93A3"));
    svg.appendChild(rect(mis7.x, mis7.w, "#7C93A3"));
    svg.appendChild(label(mis9.x - 4, "MIS 9"));
    svg.appendChild(label(mis7.x - 2, "MIS 7"));

    // Ligne de base (axe visuel, pas un zéro de la grandeur tracée)
    const baseLine = document.createElementNS(svgNS, "line");
    baseLine.setAttribute("x1", "0");
    baseLine.setAttribute("y1", plotBottom);
    baseLine.setAttribute("x2", W);
    baseLine.setAttribute("y2", plotBottom);
    baseLine.setAttribute("stroke", "#3a352f");
    baseLine.setAttribute("stroke-width", "1");
    svg.appendChild(baseLine);

    // Courbe principale (CO2 réel, tous les points du JSON)
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#B8875A");
    path.setAttribute("stroke-width", "2.2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);

    // Repère "aujourd'hui" — seul usage du rouge d'alerte. Le jeu de
    // données Bereiter et al. (2015, AICC2012) est un composite qui
    // rejoint le relevé instrumental (Mauna Loa) : son point le plus
    // récent (age_ka légèrement négatif, donc postérieur à 1950) est une
    // vraie mesure de CO2 proche du présent, pas une valeur inventée. Le
    // marqueur ne s'affiche que si un point réellement proche de l'âge 0
    // existe dans les données (seuil : 0.1 ka) — garde-fou conservé au
    // cas où la source de données changerait à nouveau.
    const TODAY_THRESHOLD_KA = 0.1;
    if (ageMin <= TODAY_THRESHOLD_KA) {
      const todayPoint = data[data.length - 1];
      const todayX = xScale(todayPoint.age_ka);
      const todayY = yScale(todayPoint.co2_ppm);

      const todayLine = document.createElementNS(svgNS, "line");
      todayLine.setAttribute("x1", todayX);
      todayLine.setAttribute("y1", "10");
      todayLine.setAttribute("x2", todayX);
      todayLine.setAttribute("y2", plotBottom);
      todayLine.setAttribute("stroke", "#C73E1D");
      todayLine.setAttribute("stroke-width", "1");
      todayLine.setAttribute("stroke-dasharray", "3 4");
      svg.appendChild(todayLine);

      const todayDot = document.createElementNS(svgNS, "circle");
      todayDot.setAttribute("cx", todayX);
      todayDot.setAttribute("cy", todayY);
      todayDot.setAttribute("r", "5");
      todayDot.setAttribute("fill", "#C73E1D");
      svg.appendChild(todayDot);

      const todayLabel = document.createElementNS(svgNS, "text");
      todayLabel.setAttribute("id", "timelineTodayLabel");
      todayLabel.setAttribute("x", todayX - 68);
      todayLabel.setAttribute("y", "26");
      todayLabel.setAttribute("fill", "#C73E1D");
      todayLabel.setAttribute("font-family", "IBM Plex Mono, monospace");
      todayLabel.setAttribute("font-size", "12");
      todayLabel.textContent = content[currentLang].timeline_today;
      svg.appendChild(todayLabel);
    }

    // Axe temporel (repères) : valeurs rondes fixes plutôt que calées sur
    // les bornes réelles des données, pour rester lisibles/comparables
    // quelle que soit la source (celle-ci va légèrement au-delà de 800 ka).
    const AXIS_TICKS_KA = [800, 600, 400, 200, 0];
    AXIS_TICKS_KA.filter((age) => age >= ageMin && age <= ageMax).forEach((age) => {
      const t = document.createElementNS(svgNS, "text");
      t.setAttribute("x", xScale(age));
      t.setAttribute("y", H - 12);
      t.setAttribute("fill", "#8b8378");
      t.setAttribute("font-family", "IBM Plex Mono, monospace");
      t.setAttribute("font-size", "11");
      t.textContent = `${age} ka`;
      svg.appendChild(t);
    });
  }

  // Appelée par setLanguage() : met à jour en place le message d'erreur
  // et/ou le repère "Aujourd'hui" de la frise CO2 s'ils sont déjà dans le
  // DOM, sans reconstruire tout le SVG. Ne fait rien si buildTimelineSvg()
  // n'a pas encore tourné (pas d'erreur, silencieux par design).
  function updateTimelineTexts() {
    const errorEl = document.querySelector(".timeline-chart__error");
    if (errorEl) errorEl.textContent = content[currentLang].timeline_error;

    const todayLabel = document.getElementById("timelineTodayLabel");
    if (todayLabel) todayLabel.textContent = content[currentLang].timeline_today;
  }

  /* ---------- 2bis. Respect de prefers-reduced-motion pour la vidéo ---------- */

  function respectReducedMotionForVideo() {
    const video = document.getElementById("modelsVideo");
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Empêche toute lecture (auto ou déclenchée plus tard) : l'élément
      // affichera son image poster, identique à la première frame de la
      // vidéo, donc aucune différence visuelle hormis l'absence de mouvement.
      video.removeAttribute("autoplay");
      video.pause();
      video.currentTime = 0;
    }
  }

  /* ---------- 2ter. Apparition au scroll des blocs "objectifs" ---------- */

  function bindScrollReveal() {
    const blocks = document.querySelectorAll("[data-reveal]");
    if (!blocks.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      // Pas d'animation : rendu direct, visible immédiatement (le CSS
      // sous prefers-reduced-motion couvre déjà ce cas, ceci est surtout
      // un repli pour les navigateurs sans IntersectionObserver).
      blocks.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // une seule apparition, pas de retour en arrière
          }
        });
      },
      { threshold: 0.2 }
    );

    blocks.forEach((el) => observer.observe(el));
  }

  /* ---------- 2quater. Fondu enchaîné obs / ensemble / ensemble pondéré ---------- */

  function bindAssimilationCrossfade() {
    const container = document.getElementById("assimCrossfade");
    if (!container) return;

    const images = Array.from(container.querySelectorAll(".assim-crossfade__img"));
    const labelEl = document.getElementById("assimCrossfadeLabel");
    if (!images.length || !labelEl) return;

    const HOLD_MS = 3500; // durée d'affichage de chaque image avant transition
    const LABEL_FADE_MS = 400; // durée du fondu du label (aller simple)

    function setActive(index) {
      images.forEach((img, i) => img.classList.toggle("is-active", i === index));
    }

    // data-label (FR) / data-label-en (EN) — repli sur data-label si la
    // variante anglaise venait à manquer sur une image.
    function labelFor(img) {
      if (currentLang === "en") return img.dataset.labelEn || img.dataset.label;
      return img.dataset.label;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // État final uniquement ("après assimilation"), fixe, sans boucle.
      const lastIndex = images.length - 1;
      setActive(lastIndex);
      labelEl.textContent = labelFor(images[lastIndex]);
      return;
    }

    let index = 0;
    let advanceTimer = null;
    let labelTimer = null;
    let running = false;

    setActive(0);
    labelEl.textContent = labelFor(images[0]);

    function showLabel(text) {
      labelEl.style.opacity = "0";
      labelTimer = window.setTimeout(() => {
        labelEl.textContent = text;
        labelEl.style.opacity = "1";
      }, LABEL_FADE_MS);
    }

    function advance() {
      index = (index + 1) % images.length;
      setActive(index);
      showLabel(labelFor(images[index]));
      advanceTimer = window.setTimeout(advance, HOLD_MS);
    }

    function start() {
      if (running) return;
      running = true;
      advanceTimer = window.setTimeout(advance, HOLD_MS);
    }

    function stop() {
      running = false;
      if (advanceTimer) { window.clearTimeout(advanceTimer); advanceTimer = null; }
      if (labelTimer) { window.clearTimeout(labelTimer); labelTimer = null; }
    }

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }

    // Démarre seulement quand le bloc est visible, se met en pause sinon
    // (économie de ressources) — contrairement à bindScrollReveal(), on ne
    // déconnecte jamais l'observer : l'animation doit pouvoir reprendre.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
  }

  // Appelée par setLanguage() : met à jour IMMÉDIATEMENT le libellé
  // actuellement affiché (pas seulement au prochain changement d'image
  // automatique), en relisant data-label/data-label-en de l'image
  // actuellement active. Ne fait rien si le fondu n'a pas encore été
  // initialisé (silencieux par design).
  function updateAssimilationCrossfadeLabel() {
    const container = document.getElementById("assimCrossfade");
    if (!container) return;

    const activeImg = container.querySelector(".assim-crossfade__img.is-active");
    const labelEl = document.getElementById("assimCrossfadeLabel");
    if (!activeImg || !labelEl) return;

    labelEl.textContent = currentLang === "en"
      ? (activeImg.dataset.labelEn || activeImg.dataset.label)
      : activeImg.dataset.label;
  }

  /* ---------- 3. Barre de progression au scroll ---------- */

  function bindScrollProgress() {
    const fill = document.getElementById("progressFill");
    if (!fill) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      fill.style.width = pct + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    // setLanguage() en premier : les fonctions ci-dessous (buildTimelineSvg,
    // bindAssimilationCrossfade) lisent currentLang dès leur construction.
    // Ses appels à updateAssimilationCrossfadeLabel()/updateTimelineTexts()
    // sont silencieux tant que ces éléments n'existent pas encore — sans
    // effet indésirable ici, juste redondants avec l'init qui suit.
    bindLangToggle();
    setLanguage(getSavedLang());

    // buildEnsembleGrid(); // repli JS — voir la fonction commentée ci-dessus
    respectReducedMotionForVideo();
    buildTimelineSvg();
    bindScrollReveal();
    bindAssimilationCrossfade();
    bindScrollProgress();
  });
})();
