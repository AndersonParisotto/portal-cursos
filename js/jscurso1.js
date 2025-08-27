/* -------------------- Curso1 específico -------------------- */
function initCourse1() {
  const btnIniciar = document.getElementById("btn-iniciar");
  const retanguloIntro = document.getElementById("retangulo-intro");
  const slidesContainer = document.querySelector(".slides-container");
  const slides = slidesContainer.querySelectorAll(".curso-intro, .curso-slide");
  const playBtn = document.getElementById("play-passo");
  const pauseBtn = document.getElementById("pause-passo");
  const speedSlider = document.getElementById("speed-range");
  const speedValue = document.getElementById("speed-value");
  const fullscreenBtn = document.getElementById("fullscreen-passo");

  if (!btnIniciar || !retanguloIntro || !slidesContainer) return;

  let intervalId;
  let speed = Number(speedSlider.value);
  speedValue.textContent = (speed / 1000).toFixed(1) + "s";

  /* -------------------- Botão iniciar -------------------- */
  btnIniciar.addEventListener("click", () => {
    retanguloIntro.classList.add("active");
    setTimeout(() => {
      retanguloIntro.style.display = "none";
      slidesContainer.style.display = "block";
      startAuto();
    }, 1200);
  });

  /* -------------------- Auto-slide -------------------- */
  function startAuto() {
    clearInterval(intervalId);
    let current = 0;
    slides.forEach((s) => s.classList.remove("active"));
    slides[current].classList.add("active");

    intervalId = setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, speed);
  }

  function pauseAuto() {
    clearInterval(intervalId);
  }

  playBtn.addEventListener("click", startAuto);
  pauseBtn.addEventListener("click", pauseAuto);

  /* -------------------- Velocidade -------------------- */
  speedSlider.addEventListener("input", (e) => {
    speed = Number(e.target.value);
    speedValue.textContent = (speed / 1000).toFixed(1) + "s";
    if (intervalId) {
      pauseAuto();
      startAuto();
    }
  });

  /* -------------------- Fullscreen -------------------- */
  fullscreenBtn.addEventListener("click", () => {
    const elem = document.querySelector(".slide-area");
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();

    slidesContainer.style.height = window.innerHeight + "px";
  });

  window.addEventListener("resize", () => {
    if (document.fullscreenElement) {
      slidesContainer.style.height = window.innerHeight + "px";
    }
  });
}
