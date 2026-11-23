// Panier LGMDesign35 — prix en dollars canadiens, alignés sur la boutique
// Etsy : Etsy est la référence des prix (décision du 2026-11-18).
// Seuls les titres vendus sur Etsy sont vendables ici, au même prix.
// « écoute » a maintenant une fiche Etsy et est vendu.
// Seule « L’étoile de Noël » reste gratuite et non vendue.
var LGM_PRODUCTS = {
  aventures: { id: 'aventures', title: 'Les aventures d’Adam et ses amis', pages: 71, age: '4 à 6 ans', priceCAD: 3.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4601808390', img: 'images/couverture-aventures.jpg' },
  halloween: { id: 'halloween', title: 'Adam et ses amis : Halloween — 6 histoires', pages: 71, age: '4 à 6 ans', priceCAD: 3.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4603634496', img: 'images/couverture-halloween.jpg' },
  jardin: { id: 'jardin', title: 'Adam et ses amis : Le jardin de la coopération', pages: 13, age: '4 à 6 ans', priceCAD: 1.12, format: 'PDF', etsy: 'https://www.etsy.com/listing/4601160031', img: 'images/couverture-jardin.jpg' },
  bonnenuit: { id: 'bonnenuit', title: 'Bonne nuit, Adam !', pages: 24, age: '1 à 2 ans', priceCAD: 3.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4623667943', img: 'images/couverture-bonne-nuit.jpg' },
  lettres: { id: 'lettres', title: 'Adam et ses amis : Les lettres', pages: 33, age: '2 à 6 ans', priceCAD: 3.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4623669355', img: 'images/couverture-lettres.jpg' },
  histoires2: { id: 'histoires2', title: 'Adam et ses amis : 2 histoires', pages: 25, age: '3 à 6 ans', priceCAD: 3.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4623677646', img: 'images/couverture-2histoires.jpg' },
  ecoute: { id: 'ecoute', title: 'Adam apprend à écouter', pages: 30, age: '4 à 6 ans', priceCAD: 3.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4623670811', img: 'images/couverture-ecoute.jpg' },
};
var LGM_CART_KEY = 'lgm-panier-v1';

function lgmLoadCart() {
  try { return JSON.parse(localStorage.getItem(LGM_CART_KEY) || '{}') || {}; }
  catch (e) { return {}; }
}
function lgmSaveCart(cart) {
  try { localStorage.setItem(LGM_CART_KEY, JSON.stringify(cart)); } catch (e) {}
  lgmUpdateBadges();
}
function lgmCartCount(cart) {
  cart = cart || lgmLoadCart();
  var n = 0;
  Object.keys(cart).forEach(function (id) { n += cart[id] || 0; });
  return n;
}
function lgmCartTotal(cart) {
  cart = cart || lgmLoadCart();
  var t = 0;
  Object.keys(cart).forEach(function (id) {
    if (LGM_PRODUCTS[id]) t += LGM_PRODUCTS[id].priceCAD * cart[id];
  });
  return Math.round(t * 100) / 100;
}
function lgmUpdateBadges() {
  var n = lgmCartCount();
  document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = n; });
}
function addToCart(id) {
  if (!LGM_PRODUCTS[id]) return;
  var cart = lgmLoadCart();
  cart[id] = (cart[id] || 0) + 1;
  lgmSaveCart(cart);
  var btn = document.querySelector('[data-add="' + id + '"]');
  if (btn) {
    var old = btn.textContent;
    btn.textContent = '✓ Ajouté au panier !';
    setTimeout(function () { btn.textContent = old; }, 1600);
  }
  if (typeof renderCart === 'function') renderCart();
}
function lgmSetQty(id, qty) {
  var cart = lgmLoadCart();
  if (qty <= 0) delete cart[id]; else cart[id] = qty;
  lgmSaveCart(cart);
  if (typeof renderCart === 'function') renderCart();
}
function lgmRemove(id) { lgmSetQty(id, 0); }
function lgmClear() {
  lgmSaveCart({});
  if (typeof renderCart === 'function') renderCart();
}
document.addEventListener('DOMContentLoaded', lgmUpdateBadges);
