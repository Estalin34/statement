
const boton = document.getElementById("boton");
const botonPregunta = document.getElementById("botonPregunta");
const botonSi = document.getElementById("si");
const botonPensarlo = document.getElementById("pensarlo");

const inicio = document.getElementById("inicio");
const carta = document.getElementById("carta");
const pregunta = document.getElementById("pregunta");

const textoCarta = document.getElementById("textoCarta");
const respuesta = document.getElementById("respuesta");

const musica = document.getElementById("musica");
let musicaIniciada = false;

let temporizadorTexto = null;
let yaRespondio = false;

// Carta romántica dedicada a Juliana.
const mensajeAmor = `Juliana, ❤️

No sé si existen las palabras perfectas para expresar lo que siento por ti, pero quería encontrar una manera especial de abrirte mi corazón y decirte lo importante que te estás volviendo para mí.

Me gusta hablar contigo, saber cómo estuvo tu día, compartir sonrisas y descubrir poco a poco cada detalle de esa personita tan bonita que eres. No sé en qué momento empezaste a despertar tantas emociones bonitas en mí, pero sí sé que me hace mucha ilusión seguir conociéndote y descubrir todo lo lindo que podríamos llegar a vivir juntos.

No quiero prometerte una historia perfecta, porque creo que las cosas más bonitas se construyen con sinceridad, respeto, confianza y pequeños detalles. Quiero tener la oportunidad de demostrarte con hechos lo que siento por ti, acompañarte en tus días buenos y también cuando las cosas no salgan como esperabas, escucharte, hacerte reír y recordarte lo especial que eres para mí.

Preparé esta pequeña sorpresa porque quería hacer algo diferente, algo que llevara un pedacito de mi corazón y que pudiera sacarte una sonrisa. Quizás no sea la forma más perfecta de decirte todo esto, pero cada palabra nace de un sentimiento sincero.

Juliana, hay algo que me hace mucha ilusión preguntarte: ¿me darías la oportunidad de escribir una historia bonita contigo, de conocernos cada día un poquito más y de demostrarte cuánto cariño puedo darte?

¿Quieres darme la oportunidad de ser tu novio? ❤️🌻`;

// Mensaje si Juliana acepta.
const mensajeSi = `Juliana, me acabas de sacar la sonrisa más bonita y hacerme muy feliz. 🥹❤️ Gracias por darme la oportunidad de construir algo bonito contigo.

Quiero conocerte cada día un poquito más, compartir momentos inolvidables, hacerte reír, apoyarte cuando lo necesites y demostrarte con pequeños detalles lo mucho que significas para mí.

No te prometo una historia perfecta, pero sí quiero poner de mi parte para que lo nuestro crezca con sinceridad, respeto, confianza y cariño. Quiero que disfrutemos cada etapa, que podamos hablar de todo con tranquilidad y que construyamos recuerdos que algún día nos hagan sonreír al recordarlos.

Gracias por darme esta oportunidad, mi Juliana. ❤️🌻 Me hace muchísima ilusión comenzar esta nueva etapa contigo. Quiero que sea el comienzo de muchos momentos bonitos a tu lado. 💗`;

// Mensaje si Juliana necesita pensarlo.
const mensajePensarlo = `Está bien, Juliana. ❤️💛 Tómate todo el tiempo que necesites para pensarlo. No quiero que te sientas presionada ni que tomes una decisión por compromiso.

Para mí es importante que te sientas tranquila y que, si decides darme esta oportunidad, sea porque también te nace del corazón. Me gusta lo que estamos compartiendo y quería ser sincero contigo sobre mis sentimientos.

Gracias por tomarte un ratito para leer esta carta y por permitirme expresarte lo que siento de una manera especial. No tienes que responderme ahora; quiero que tengas la libertad de pensar en lo que realmente deseas. 🌻💗`;

// Abrir la sorpresa y mostrar la carta.
boton.addEventListener("click", () => {
  inicio.classList.add("oculto");
  carta.classList.remove("oculto");

  escribirTexto(mensajeAmor, textoCarta);

  crearParticulas(18);
  crearCorazones(8);

  carta.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Mostrar la pregunta después de leer la carta.
botonPregunta.addEventListener("click", () => {
  clearInterval(temporizadorTexto);

  // Garantiza que la carta esté completa antes de continuar.
  textoCarta.textContent = mensajeAmor;

  carta.classList.add("oculto");
  pregunta.classList.remove("oculto");

  crearParticulas(24);
  crearCorazones(12);

  pregunta.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Bloquea ambas opciones después de una respuesta.
function bloquearRespuestas() {
  yaRespondio = true;

  botonSi.disabled = true;
  botonPensarlo.disabled = true;

  botonSi.setAttribute("aria-disabled", "true");
  botonPensarlo.setAttribute("aria-disabled", "true");

  botonSi.classList.add("respuesta-elegida");
  botonPensarlo.classList.add("respuesta-elegida");
}

// Respuesta afirmativa.
botonSi.addEventListener("click", () => {
  
  // Iniciar la música cuando se abre la sorpresa.
  if (!musicaIniciada) {
    musica.src =
      "https://www.youtube.com/embed/4yplFPHnX48?autoplay=1&loop=1&playlist=4yplFPHnX48";

    musicaIniciada = true;
  }

  if (yaRespondio) return;

  bloquearRespuestas();

  respuesta.textContent = mensajeSi;
  respuesta.className = "respuesta-si";

  lanzarCelebracion();

  respuesta.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Respuesta: necesita tiempo para pensarlo.
botonPensarlo.addEventListener("click", () => {
  if (yaRespondio) return;

  bloquearRespuestas();

  respuesta.textContent = mensajePensarlo;
  respuesta.className = "respuesta-pensar";

  crearCorazones(6);

  respuesta.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Efecto de escritura progresiva.
function escribirTexto(texto, elemento) {
  clearInterval(temporizadorTexto);

  elemento.textContent = "";
  let indice = 0;

  temporizadorTexto = setInterval(() => {
    elemento.textContent += texto.charAt(indice);
    indice++;

    if (indice >= texto.length) {
      clearInterval(temporizadorTexto);
      temporizadorTexto = null;
    }
  }, 22);
}

// Partículas decorativas.
function crearParticulas(cantidad = 20) {
  const simbolos = ["✦", "✧", "🌹", "✨"];

  for (let i = 0; i < cantidad; i++) {
    const particula = document.createElement("span");

    particula.className = "particula";
    particula.textContent =
      simbolos[Math.floor(Math.random() * simbolos.length)];

    particula.style.left = Math.random() * 100 + "vw";
    particula.style.fontSize = 12 + Math.random() * 17 + "px";
    particula.style.animationDuration = 5 + Math.random() * 4 + "s";
    particula.style.animationDelay = Math.random() * 1.2 + "s";

    document.body.appendChild(particula);

    setTimeout(() => particula.remove(), 10000);
  }
}

// Corazones que suben por la pantalla.
function crearCorazones(cantidad = 10) {
  const simbolos = ["❤️", "💗", "💕", "♡"];

  for (let i = 0; i < cantidad; i++) {
    const corazon = document.createElement("span");

    corazon.className = "corazon-flotante";
    corazon.textContent =
      simbolos[Math.floor(Math.random() * simbolos.length)];

    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = 15 + Math.random() * 14 + "px";
    corazon.style.animationDuration = 4 + Math.random() * 3 + "s";
    corazon.style.animationDelay = Math.random() * 1.2 + "s";

    document.body.appendChild(corazon);

    setTimeout(() => corazon.remove(), 8500);
  }
}

// Celebración cuando acepta.
function lanzarCelebracion() {
  crearParticulas(40);
  crearCorazones(28);

  const simbolos = ["💗", "❤️", "🌹", "✨", "💕", "✦"];

  for (let i = 0; i < 35; i++) {
    const pieza = document.createElement("span");

    pieza.className = "confeti";
    pieza.textContent =
      simbolos[Math.floor(Math.random() * simbolos.length)];

    pieza.style.left = Math.random() * 100 + "vw";
    pieza.style.fontSize = 16 + Math.random() * 15 + "px";
    pieza.style.animationDelay = Math.random() * 1.3 + "s";
    pieza.style.animationDuration = 3.5 + Math.random() * 3 + "s";

    document.body.appendChild(pieza);

    setTimeout(() => pieza.remove(), 8000);
  }
}