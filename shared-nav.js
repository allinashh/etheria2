const navHtml = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<div class="container d-flex align-items-center">
<div class="navbar-brand">Étheria</div>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="mainNav">
<ul class="navbar-nav ms-auto mb-2 mb-lg-0" id="site-nav">
<li class="nav-item"><a class="nav-link" href="index.html">Main page</a></li>
<li class="nav-item"><a class="nav-link" href="page1.html">FW 24/25</a></li>
<li class="nav-item"><a class="nav-link" href="page1.html#highlights">Highlights</a></li>
<li class="nav-item"><a class="nav-link" href="products.html">Our shop</a></li>
<li class="nav-item"><a class="nav-link" href="https://theblueprint.ru/culture/history/vogue-alphabet">The Blueprint</a></li>
<li class="nav-item">
  <a class="nav-link" href="https://www.thesymbol.ru" target="_blank">
  <img src="thesymbol-thumbnail copy.png" alt="The Symbol Fashion" class="nav-icon">
  </a>
</li>
</li>
</ul>
</div>
</div>
</nav>
`;


document.getElementById('site-header').innerHTML = navHtml;

(function setActiveNav() {
const links = document.querySelectorAll('#site-nav a');
const currentFile = location.pathname.split('/').pop() || 'index.html';
const currentHash = location.hash;

links.forEach(a => {
    const href = a.getAttribute('href');
    if (/^https?:\/\//.test(href)) return;
    const [file, hash] = href.split('#');
    if (!hash && file === currentFile) {
    a.classList.add('active');
    }
    if (hash && file === currentFile && currentHash === `#${hash}`) {
    a.classList.add('active');
    }
});
})();

(function observeSections(){
const anchorLinks = Array.from(document.querySelectorAll('#site-nav a'))
.filter(a => a.hash && a.pathname.split('/').pop() === location.pathname.split('/').pop());
if (!anchorLinks.length) return;
const sections = anchorLinks.map(a => document.getElementById(a.hash.replace('#',''))).filter(Boolean);
if (!sections.length) return;


const mapIdToLink = {};
anchorLinks.forEach(a => mapIdToLink[a.hash.replace('#','')] = a);


const io = new IntersectionObserver(entries => {
entries.forEach(e => {
const id = e.target.id;
if (e.isIntersecting) {
anchorLinks.forEach(l => l.classList.remove('active-section'));
const link = mapIdToLink[id];
if (link) link.classList.add('active-section');
}
});
}, { rootMargin: '-40% 0px -40% 0px' });


sections.forEach(s => io.observe(s));
})();

const cart = {}; 

document.addEventListener("click", (e) => {
  const card = e.target.closest("article");
  if (!card) return;

  if (e.target.classList.contains("plus")) {
    let c = card.querySelector(".count");
    c.textContent = Number(c.textContent) + 1;
  }
  if (e.target.classList.contains("minus")) {
    let c = card.querySelector(".count");
    if (Number(c.textContent) > 0) c.textContent = Number(c.textContent) - 1;
  }

  if (e.target.classList.contains("btn-buy")) {
    const code = card.dataset.code; 
    const qty = Number(card.querySelector(".count").textContent);
    if (!qty) return alert("Choose quantity first");
    cart[code] = (cart[code] || 0) + qty;
    alert("Added to cart");
  }
});

document.getElementById("cartButton").addEventListener("click", () => {
  const base = "https://www.bing.com/search?q=search";
  const params = [];
  for (const code in cart) {
    const amount = cart[code];
    if (amount > 0) {
      params.push(`vendor_code=${encodeURIComponent(code)}&amount=${amount}`);
    }
  }
  const finalUrl = base + (params.length ? "&" + params.join("&") : "");
  window.location.href = finalUrl;
});