/* ============================================================
   CHRISTMAS — Neige + guirlande de Noël (saisonnier, RÉVERSIBLE)
   Pour revenir au thème normal : supprimer le <script> qui
   charge ce fichier, puis supprimer ce fichier.
   Ne touche à rien d'autre : pas de variables globales, pas
   d'écouteurs sur les formulaires, pas de modification du panier.
   ============================================================ */
(function () {
  'use strict';
  if (document.getElementById('xmas-snow')) return; /* déjà chargé */
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function makeGarland() {
    var g = document.createElement('div');
    g.className = 'xmas-garland';
    g.setAttribute('aria-hidden', 'true');
    g.textContent = '🎄 ⭐ 🎁 🔔 ❄️ 🎅 ✨ 🎄 ⭐ 🎁 🔔 ❄️ 🎅 ✨ 🎄 ⭐ 🎁 🔔 ❄️ 🎅 ✨';
    document.body.insertBefore(g, document.body.firstChild);
  }

  function makeSnow() {
    var box = document.createElement('div');
    box.id = 'xmas-snow';
    box.setAttribute('aria-hidden', 'true');
    var flakes = ['❄', '❅', '❆'];
    var n = window.innerWidth < 640 ? 18 : 32;
    for (var i = 0; i < n; i++) {
      var f = document.createElement('span');
      f.className = 'xmas-flake';
      f.textContent = flakes[i % flakes.length];
      var size = 10 + Math.random() * 16;
      f.style.left = (Math.random() * 100).toFixed(2) + '%';
      f.style.fontSize = size.toFixed(0) + 'px';
      f.style.animationDuration = (7 + Math.random() * 8).toFixed(1) + 's';
      f.style.animationDelay = (-Math.random() * 14).toFixed(1) + 's';
      f.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
      box.appendChild(f);
    }
    document.body.appendChild(box);
  }

  function init() { makeGarland(); makeSnow(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
