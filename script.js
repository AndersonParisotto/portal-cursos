const app = document.getElementById("app");

// Lista de páginas válidas
const pages = ["home", "cursos", "contato", "curso1", "curso2", "curso3"];

async function loadPage(page) {
  // Mostra loader enquanto carrega
  app.innerHTML = `
    <div class="loader">
      <div class="spinner"></div>
      Carregando...
    </div>
  `;

  try {
    const resp = await fetch(`pages/${page}.html`);
    if (!resp.ok) throw new Error("Página não encontrada");
    const html = await resp.text();

    // Substitui loader pelo conteúdo real
    app.innerHTML = html;

    // Inicializa scripts específicos de cada página, se necessário
    if (page === "cursos") initTutorialSlider();
    if (page === "home") initHomeSlider();

  } catch {
    app.innerHTML = "<h1>Página não encontrada</h1>";
  }
}

function router() {
  const hash = window.location.hash.substring(1) || "home";

  // Só carrega se a página existir
  if (pages.includes(hash)) {
    loadPage(hash);
  } else {
    app.innerHTML = "<h1>Página não encontrada</h1>";
  }
}

// Chama a função no load e em hashchange
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

// Exemplos de funções que você pode definir para cada página
function initTutorialSlider() {
  console.log("Inicializando slider da página Tutorial...");
}

function initHomeSlider() {
  console.log("Inicializando slider da página Home...");
}

// Controle de slides para múltiplos cursos
let slideIndexes = {};

function startSlides(cursoID) {
  document.querySelector(`#${cursoID} .curso-intro`).style.display = 'none';
  document.querySelector(`#${cursoID} .slides-container`).style.display = 'flex';
  slideIndexes[cursoID] = 0;
  showSlide(cursoID, 0);
}

function backToIntro(cursoID) {
  document.querySelector(`#${cursoID} .slides-container`).style.display = 'none';
  document.querySelector(`#${cursoID} .curso-intro`).style.display = 'block';
}

function showSlide(cursoID, index) {
  const slides = document.querySelectorAll(`#${cursoID} .slide`);
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  slideIndexes[cursoID] = index;
}

function nextSlide(cursoID) {
  const slides = document.querySelectorAll(`#${cursoID} .slide`);
  let idx = slideIndexes[cursoID];
  idx = (idx + 1) % slides.length;
  showSlide(cursoID, idx);
}

function prevSlide(cursoID) {
  const slides = document.querySelectorAll(`#${cursoID} .slide`);
  let idx = slideIndexes[cursoID];
  idx = (idx - 1 + slides.length) % slides.length;
  showSlide(cursoID, idx);
}

function goToSlide(cursoID, index) {
  showSlide(cursoID, index);
}

async function loadPage(page) {
  app.innerHTML = `
    <div class="loader">
      <div class="spinner"></div>
      Carregando...
    </div>
  `;

  try {
    const resp = await fetch(`pages/${page}.html`);
    if (!resp.ok) throw new Error("Página não encontrada");
    const html = await resp.text();

    app.innerHTML = html;

    if (page === "cursos") initTutorialSlider();
    if (page === "home") initHomeSlider();

    // Cursos individuais
    if (page.startsWith("curso")) initCourseSlides(page);

  } catch {
    app.innerHTML = "<h1>Página não encontrada</h1>";
  }
}

function initCourseSlides(cursoID) {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((s,i) => s.classList.toggle('active', i===index));
    slideIndex = index;
  }

  window.nextSlide = function() {
    showSlide((slideIndex+1) % slides.length);
  }

  window.prevSlide = function() {
    showSlide((slideIndex-1+slides.length) % slides.length);
  }

  showSlide(0);
}
function backToHome() {
  const cursoIntro = document.querySelector(".curso-intro");
  if (cursoIntro) cursoIntro.style.display = "none";
  
  const app = document.getElementById("app");
  // Exibe a tela de cursos novamente
  loadPage("cursos");
}
