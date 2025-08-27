const app = document.getElementById("app");
let swiperInstances = {}; // Guarda Swipers dos cursos

/* -------------------- Função principal para carregar páginas -------------------- */
async function loadPage(page) {
  // Mostra loader
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

    // Inicializa scripts específicos
    if (page === "home") initHomeSlider();
    else if (page === "cursos") initTutorialSlider();
    else if (page.startsWith("curso")) {
      initCourseSlides(page); // Swiper + sumário

      // CSS e JS específicos do curso
      if (page === "curso1") {
        // CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "css/csscurso1.css";
        document.head.appendChild(link);

        // JS
        const script = document.createElement("script");
        script.src = "js/jscurso1.js";
        script.onload = () => {
          if (typeof initCourse1 === "function") initCourse1();
        };
        document.body.appendChild(script);
      }
    }
  } catch (err) {
    console.error(err);
    app.innerHTML = "<h1>Página não encontrada</h1>";
  }
}

/* -------------------- Router -------------------- */
function router() {
  let hash = window.location.hash.substring(1);
  if (!hash) hash = "home";
  loadPage(hash);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

/* -------------------- Funções específicas -------------------- */
function initHomeSlider() { console.log("Página Home carregada"); }
function initTutorialSlider() { console.log("Página Cursos carregada"); }

/* -------------------- Função de slides + sumário genérica -------------------- */
function initCourseSlides(cursoID) {
  const container = document.querySelector(`#${cursoID} .slides-container`);
  if (!container) return;

  const swiperEl = container.querySelector(".course-swiper");
  if (!swiperEl) return;

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    navigation: {
      nextEl: container.querySelector(".swiper-button-next"),
      prevEl: container.querySelector(".swiper-button-prev"),
    },
    pagination: {
      el: container.querySelector(".swiper-pagination"),
      clickable: true,
    },
    keyboard: { enabled: true },
    autoHeight: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 500,
  });

  // Sumário clicável
  container.querySelectorAll(".curso-sumario li").forEach((li) => {
    li.addEventListener("click", () => {
      const index = Number(li.dataset.slide);
      swiper.slideTo(index);
    });
  });

  swiperInstances[cursoID] = swiper;
}
