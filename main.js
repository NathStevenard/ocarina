/* ============================================================
   OCARINA — main.js
   1) Grille d'ensemble (bande 2) : petites projections stylisées
      représentant les particules du filtre de Kalman/particulaire.
   2) Frise schématique 800 ka (section contexte).
   3) Barre de progression liée au scroll.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1. Grille d'ensemble (SVG "Terres" stylisées) ---------- */

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

  /* ---------- 2. Frise schématique 800 ka ---------- */

  function buildTimelineSvg() {
    const svg = document.getElementById("timelineSvg");
    if (!svg) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const W = 1000, H = 260, baseline = 190;

    // Points schématiques (X: temps, de 800 ka à aujourd'hui / gauche->droite ;
    // Y: proxy température, arbitraire — À REMPLACER par les données réelles)
    const points = [
      [0, 60], [60, 90], [120, 40], [180, 110], [240, 70],
      [300, 100], [360, 30], [420, 95], [480, 60],
      [540, 20], [600, 85], [660, 50], [720, 15],
      [780, 70], [840, 45], [900, 25], [950, 55], [1000, -70]
    ];

    const toY = (v) => baseline - v;
    let d = `M ${points[0][0]} ${toY(points[0][1])}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i][0]} ${toY(points[i][1])}`;
    }

    // Zones MIS 9 (340-315ka) et MIS 7 (250-230ka) approximées sur l'axe 0-800ka
    // (axe simplifié, non linéaire — à corriger avec la vraie échelle temporelle)
    const mis9 = { x: 555, w: 55 };
    const mis7 = { x: 715, w: 45 };

    function rect(x, w, fill) {
      const r = document.createElementNS(svgNS, "rect");
      r.setAttribute("x", x);
      r.setAttribute("y", "10");
      r.setAttribute("width", w);
      r.setAttribute("height", H - 60);
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

    // Ligne de base
    const baseLine = document.createElementNS(svgNS, "line");
    baseLine.setAttribute("x1", "0");
    baseLine.setAttribute("y1", baseline);
    baseLine.setAttribute("x2", W);
    baseLine.setAttribute("y2", baseline);
    baseLine.setAttribute("stroke", "#3a352f");
    baseLine.setAttribute("stroke-width", "1");
    svg.appendChild(baseLine);

    // Courbe principale
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#B8875A");
    path.setAttribute("stroke-width", "2.2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);

    // Repère "aujourd'hui" — seul usage du rouge d'alerte
    const todayX = points[points.length - 1][0];
    const todayY = toY(points[points.length - 1][1]);

    const todayLine = document.createElementNS(svgNS, "line");
    todayLine.setAttribute("x1", todayX);
    todayLine.setAttribute("y1", "10");
    todayLine.setAttribute("x2", todayX);
    todayLine.setAttribute("y2", baseline);
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
    todayLabel.setAttribute("x", todayX - 68);
    todayLabel.setAttribute("y", "26");
    todayLabel.setAttribute("fill", "#C73E1D");
    todayLabel.setAttribute("font-family", "IBM Plex Mono, monospace");
    todayLabel.setAttribute("font-size", "12");
    todayLabel.textContent = "Aujourd'hui";
    svg.appendChild(todayLabel);

    // Axe temporel (repères)
    ["800 ka", "600 ka", "400 ka", "200 ka", "0"].forEach((txt, i) => {
      const t = document.createElementNS(svgNS, "text");
      t.setAttribute("x", (i * 1000) / 4);
      t.setAttribute("y", H - 12);
      t.setAttribute("fill", "#8b8378");
      t.setAttribute("font-family", "IBM Plex Mono, monospace");
      t.setAttribute("font-size", "11");
      t.textContent = txt;
      svg.appendChild(t);
    });
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
    buildEnsembleGrid();
    buildTimelineSvg();
    bindScrollProgress();
  });
})();
