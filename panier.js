// Panier LGMDesign35 — prototype local, NON branché à un paiement réel.
// Les prix sont ceux des fiches Etsy (USD). Le paiement n'est PAS encore
// connecté : le checkout l'explique et renvoie vers Etsy.
// Mode choisi par Mina (2026-11-15) : PayPal (2,90 % + 0,30 $ CA par
// transaction) — à brancher avec son compte PayPal plus tard. Stripe reste
// une option secondaire, aussi à brancher.
// PROPOSÉ — EN ATTENTE DU MOT DE MINA : les prix de « lettres »,
// « 2 histoires » et « écoute » (PDF, 5,00 $ US chacun) sont des
// propositions, pas encore sur Etsy. Ne pas présenter comme définitifs.
var LGM_PRODUCTS = {
  aventures: { id: 'aventures', title: 'Les aventures d\u2019Adam et ses amis', pages: 71, age: '4 \u00e0 6 ans', priceUSD: 5.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4601808390', img: 'images/couverture-aventures.jpg' },
  halloween: { id: 'halloween', title: 'Adam et ses amis : Halloween \u2014 6 histoires', pages: 71, age: '4 \u00e0 6 ans', priceUSD: 10.00, format: 'PDF', etsy: 'https://www.etsy.com/listing/4603634496', img: 'images/couverture-halloween.jpg' },
  jardin: { id: 'jardin', title: 'Adam et ses amis : Le jardin de la coop\u00e9ration', pages: 13, age: '4 \u00e0 6 ans', priceUSD: 1.50, format: 'PDF', etsy: 'https://www.etsy.com/listing/4601160031', img: 'images/couverture-jardin.jpg' },
  lettres: { id: 'lettres', title: 'Adam et l\u2019aventure des lettres', pages: 34, age: '4 \u00e0 6 ans', priceUSD: 5.00, format: 'PDF', etsy: null, img: 'images/couverture-lettres.jpg' },
  deuxhistoires: { id: 'deuxhistoires', title: 'Adam et ses amis : 2 histoires', pages: 26, age: '4 \u00e0 6 ans', priceUSD: 5.00, format: 'PDF', etsy: null, img: 'images/couverture-2histoires.jpg' },
  ecoute: { id: 'ecoute', title: 'Adam apprend \u00e0 \u00e9couter', pages: 30, age: '4 \u00e0 6 ans', priceUSD: 5.00, format: 'PDF', etsy: null, img: 'images/couverture-ecoute.jpg' },
  noel: { id: 'noel', title: 'Adam et ses amis : L\u2019\u00e9toile de No\u00ebl', pages: 30, age: '4 \u00e0 6 ans', priceUSD: 5.00, format: 'PDF', etsy: null, img: 'images/couverture-noel.jpg' },
  bonnenuit: { id: 'bonnenuit', title: 'Bonne nuit, Adam !', pages: 24, age: '1 \u00e0 2 ans', priceUSD: 5.00, format: 'PDF', etsy: null, img: 'images/couverture-bonne-nuit.jpg' }
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
    if (LGM_PRODUCTS[id]) t += LGM_PRODUCTS[id].priceUSD * cart[id];
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
    btn.textContent = '\u2713 Ajout\u00e9 au panier !';
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
