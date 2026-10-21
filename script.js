/* ========================================================
   1. CANVAS DE PARTÍCULAS LUMINOSAS Y LUCIÉRNAGAS
   ======================================================== */
const canvas = document.getElementById('canvasFondo');
const ctx = canvas.getContext('2d');
let particulas = [];

function redimensionarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', redimensionarCanvas);
redimensionarCanvas();

class ParticulaLuz {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.2 + 0.8;
    this.baseAlpha = Math.random() * 0.5 + 0.2;
    this.alpha = this.baseAlpha;
    this.speedX = (Math.random() - 0.5) * 0.45;
    this.speedY = -Math.random() * 0.6 - 0.15;
    this.oscillation = Math.random() * Math.PI * 2;
    this.color = Math.random() > 0.4 ? '255, 217, 143' : '243, 168, 191';
  }
  update() {
    this.y += this.speedY;
    this.oscillation += 0.02;
    this.x += Math.sin(this.oscillation) * 0.35 + this.speedX;
    this.alpha = this.baseAlpha + Math.sin(this.oscillation * 2) * 0.2;

    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
      this.reset();
      this.y = canvas.height + 10;
    }
  }
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.alpha)})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = `rgba(${this.color}, 0.8)`;
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 50; i++) {
  particulas.push(new ParticulaLuz());
}

function bucleFondo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(bucleFondo);
}
bucleFondo();

/* ========================================================
   2. REPRODUCTOR DE VINILO Y AUDIO ROMÁNTICO
   ======================================================== */
const reproductorVinilo = document.getElementById('reproductorVinilo');
const discoVinilo = document.getElementById('discoVinilo');
const estadoCancion = document.getElementById('estadoCancion');
const iframeMusica = document.getElementById('iframeMusica');

let audioIniciado = false;
let audioActivo = false;
let audioContext = null;

const ytId = "4yplFPHnX48";
const ytUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&loop=1&playlist=${ytId}&enablejsapi=1`;

function tocarCampanaRomantica() {
  try {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume();

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.3); // E5

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 1.2);
  } catch (e) {
    // Silencioso si no es soportado
  }
}

function toggleMusica(forzarInicio = false) {
  if (forzarInicio && audioActivo) return;

  if (!audioActivo || forzarInicio) {
    if (!audioIniciado) {
      iframeMusica.src = ytUrl;
      audioIniciado = true;
    }
    discoVinilo.classList.add('disco-girando');
    estadoCancion.innerHTML = 'Sonando para ti <span class="onda-sonido"><span class="onda-barra"></span><span class="onda-barra"></span><span class="onda-barra"></span></span>';
    audioActivo = true;
  } else {
    iframeMusica.src = "";
    discoVinilo.classList.remove('disco-girando');
    estadoCancion.innerHTML = 'Pausada · Tocar para oír';
    audioActivo = false;
    audioIniciado = false;
  }
}

reproductorVinilo.addEventListener('click', () => toggleMusica());

/* ========================================================
   3. NAVEGACIÓN Y ESCENAS
   ======================================================== */
const escenaSobre = document.getElementById('escenaSobre');
const escenaGaleria = document.getElementById('escenaGaleria');
const escenaCarta = document.getElementById('escenaCarta');
const escenaPregunta = document.getElementById('escenaPregunta');

function cambiarEscena(actual, siguiente) {
  actual.classList.remove('activa');
  setTimeout(() => {
    siguiente.classList.add('activa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 350);
}

/* ========================================================
   4. ESCENA 1: SOBRE 3D INTERACTIVO
   ======================================================== */
const sobreInteractivo = document.getElementById('sobreInteractivo');
let sobreAbierto = false;

sobreInteractivo.addEventListener('click', () => {
  if (sobreAbierto) return;
  sobreAbierto = true;
  tocarCampanaRomantica();
  toggleMusica(true);

  sobreInteractivo.classList.add('abierto');
  lanzarPetalos(16);

  setTimeout(() => {
    cambiarEscena(escenaSobre, escenaGaleria);
  }, 1300);
});

/* ========================================================
   5. ESCENA 2: POLAROIDS INTERACTIVAS
   ======================================================== */
const stackPolaroid = document.getElementById('stackPolaroid');
const polaroidCards = Array.from(stackPolaroid.querySelectorAll('.polaroid-card'));
const contadorPolaroid = document.getElementById('contadorPolaroid');
const btnPolaroidNext = document.getElementById('btnPolaroidNext');
const btnPolaroidPrev = document.getElementById('btnPolaroidPrev');
const btnIrACarta = document.getElementById('btnIrACarta');

let polaroidIndex = 0;
const totalPolaroids = polaroidCards.length;

function actualizarPolaroids() {
  polaroidCards.forEach((card, i) => {
    const offset = i - polaroidIndex;
    if (offset < 0) {
      card.style.transform = `translateX(-130%) rotate(-18deg)`;
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
    } else {
      const rotacion = (i % 2 === 0 ? -2 : 3) * (offset + 1);
      const translateY = offset * 8;
      const escala = Math.max(0, 1 - offset * 0.05);
      
      card.style.transform = `translateY(${translateY}px) scale(${escala}) rotate(${rotacion}deg)`;
      card.style.opacity = '1';
      card.style.zIndex = totalPolaroids - offset;
      card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
    }
  });
  contadorPolaroid.textContent = `${polaroidIndex + 1} de ${totalPolaroids} motivos`;
}
actualizarPolaroids();

btnPolaroidNext.addEventListener('click', () => {
  if (polaroidIndex < totalPolaroids - 1) {
    polaroidIndex++;
    tocarCampanaRomantica();
    actualizarPolaroids();
  } else {
    polaroidIndex = 0;
    actualizarPolaroids();
  }
});

btnPolaroidPrev.addEventListener('click', () => {
  if (polaroidIndex > 0) {
    polaroidIndex--;
    tocarCampanaRomantica();
    actualizarPolaroids();
  }
});

// Soporte táctil / Swipe
let touchStartX = 0;
let touchEndX = 0;

stackPolaroid.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

stackPolaroid.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 45) {
    btnPolaroidNext.click();
  } else if (touchEndX - touchStartX > 45) {
    btnPolaroidPrev.click();
  }
}, { passive: true });

btnIrACarta.addEventListener('click', () => {
  tocarCampanaRomantica();
  cambiarEscena(escenaGaleria, escenaCarta);
  iniciarMecanografiado();
});

/* ========================================================
   6. ESCENA 3: CARTA PERGAMINO CON MÁQUINA DE ESCRIBIR
   ======================================================== */
const textoMecanografiado = document.getElementById('textoMecanografiado');
const cursorTyping = document.getElementById('cursorTyping');
const btnIrAPregunta = document.getElementById('btnIrAPregunta');

const textoCompletoCarta =
`No sé en qué segundo exacto sucedió, pero poco a poco te convertiste en la persona en la que pienso cuando escucho una canción bonita o cuando algo bueno me pasa en el día.

Me encanta la forma tan genuina en que sonríes, cómo miras el mundo y la calidez que transmites sin siquiera esforzarte. A tu lado aprendí que los momentos más simples —una charla tranquila, una risa compartida o un silencio cómodo— se transforman en recuerdos inolvidables.

No vengo a prometerte un cuento de hadas sin tropiezos, pero sí vengo a ofrecerte un corazón sincero, un hombro en el que siempre puedas apoyarte, lealtad absoluta y todas las ganas de construir algo hermoso, respetuoso y lleno de cariño.

Por todo eso y por lo que me haces sentir cada día...`;

let mecanografiaIniciada = false;

function iniciarMecanografiado() {
  if (mecanografiaIniciada) return;
  mecanografiaIniciada = true;
  let indice = 0;
  textoMecanografiado.textContent = "";

  const intervalo = setInterval(() => {
    textoMecanografiado.textContent += textoCompletoCarta.charAt(indice);
    indice++;
    if (indice >= textoCompletoCarta.length) {
      clearInterval(intervalo);
      cursorTyping.style.display = 'none';
    }
  }, 26);
}

btnIrAPregunta.addEventListener('click', () => {
  tocarCampanaRomantica();
  cambiarEscena(escenaCarta, escenaPregunta);
  lanzarPetalos(20);
});

/* ========================================================
   7. ESCENA 4: BOTÓN ESQUIVO Y CELEBRACIÓN FINAL
   ======================================================== */
const btnPensar = document.getElementById('btnPensar');
const btnSi = document.getElementById('btnSi');
const cajaCelebracion = document.getElementById('cajaCelebracion');
const arenaBotones = document.getElementById('arenaBotones');

let esquivos = 0;
const frasesPensar = [
  "¿Segura, Juliana? 👀",
  "Piénsalo otra vez... 🥺",
  "¡El botón de al lado es más bonito! 💖",
  "¡Te prometo hacerte muy feliz! ✨",
  "No hay escapatoria al destino 🥰"
];

function esquivarBoton() {
  esquivos++;
  const arenaRect = arenaBotones.getBoundingClientRect();
  const maxX = (arenaRect.width / 2) - 60;
  const maxY = 45;

  const randomX = (Math.random() - 0.5) * maxX * 1.5;
  const randomY = (Math.random() - 0.5) * maxY * 1.8;

  btnPensar.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.92)`;
  btnPensar.textContent = frasesPensar[esquivos % frasesPensar.length];

  const escalaSi = Math.min(1.45, 1 + esquivos * 0.08);
  btnSi.style.transform = `scale(${escalaSi})`;
}

btnPensar.addEventListener('mouseenter', esquivarBoton);
btnPensar.addEventListener('touchstart', (e) => {
  e.preventDefault();
  esquivarBoton();
}, { passive: false });

btnSi.addEventListener('click', () => {
  tocarCampanaRomantica();
  arenaBotones.style.display = 'none';
  cajaCelebracion.style.display = 'block';

  lanzarExplosionConfeti();
  lanzarPetalos(40);
});

function lanzarExplosionConfeti() {
  if (typeof confetti === 'function') {
    const duracion = 4.5 * 1000;
    const final = Date.now() + duracion;
    const colores = ['#f3a8bf', '#ffd98f', '#a32e56', '#ffffff', '#e26d8c'];

    (function marco() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.75 },
        colors: colores
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.75 },
        colors: colores
      });

      if (Date.now() < final) {
        requestAnimationFrame(marco);
      }
    })();
  }
}

function lanzarPetalos(cantidad = 25) {
  const simbolos = ['🌹', '🌸', '✨', '💖', ' petal '];
  for (let i = 0; i < cantidad; i++) {
    const petalo = document.createElement('div');
    petalo.className = 'petalo-caida';
    petalo.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    petalo.style.left = Math.random() * 95 + 'vw';
    petalo.style.fontSize = Math.random() * 16 + 14 + 'px';
    petalo.style.animationDuration = Math.random() * 3.5 + 4 + 's';
    petalo.style.animationDelay = Math.random() * 1.5 + 's';
    document.body.appendChild(petalo);

    setTimeout(() => petalo.remove(), 8000);
  }
}