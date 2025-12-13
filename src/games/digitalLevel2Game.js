// Juego: Mundo Cultura Digital - Nivel 2
// Detector de noticias falsas - Nivel avanzado

import { addCoins, completeLevel } from "../state/state";
import { saveGameState } from "../state/persistence";
import { uiState } from "../state/uiState";

const HEADLINES_L2 = [
  {
    text: "Un estudio afirma que beber dos litros de agua al día aumenta la productividad un 50%.",
    isReliable: false,
    explanation:
      "Titular sensacionalista basado en correlaciones débiles; ningún estudio serio afirma ese porcentaje.",
  },
  {
    text: "Una app promete ayudarte a memorizar cualquier cosa en 10 minutos usando inteligencia artificial.",
    isReliable: false,
    explanation:
      "Promesa exagerada típica de publicidad engañosa: ninguna app puede garantizar ese resultado.",
  },
  {
    text: "Expertos recomiendan apagar el WiFi por la noche para mejorar el sueño.",
    isReliable: false,
    explanation:
      "No hay evidencia científica sólida que relacione directamente el WiFi con problemas de sueño.",
  },
  {
    text: "Una universidad europea publica un informe sobre cómo los videojuegos pueden mejorar la toma de decisiones.",
    isReliable: true,
    explanation:
      "Varios estudios de psicología y neurociencia relacionan ciertos videojuegos con mejoras en la toma de decisiones.",
  },
  {
    text: "Una nueva vacuna contra el cáncer empieza ensayos en humanos.",
    isReliable: true,
    explanation:
      "Diversos centros de investigación trabajan en vacunas experimentales contra distintos tipos de cáncer.",
  },
  {
    text: "Un móvil plegable promete durar 20 años sin perder calidad.",
    isReliable: false,
    explanation:
      "Ningún fabricante puede garantizar 20 años de uso; es un ejemplo de titular de marketing exagerado.",
  },
  {
    text: "Un robot de limpieza es capaz de mapear tu casa y vender esos datos a terceros.",
    isReliable: false,
    explanation:
      "Aunque algunos modelos almacenan mapas de la casa, no hay pruebas de que se vendan a terceros como dice el titular.",
  },
  {
    text: "Las abejas pueden reconocer rostros humanos según estudios de comportamiento animal.",
    isReliable: true,
    explanation:
      "Hay estudios que demuestran que las abejas pueden distinguir patrones faciales concretos.",
  },
  {
    text: "Ciudades europeas prueban semáforos inteligentes que cambian según el tráfico real.",
    isReliable: true,
    explanation:
      "Varios proyectos piloto usan sensores y algoritmos para ajustar los semáforos al tráfico en tiempo real.",
  },
  {
    text: "La Unión Europea prohibirá los cargadores USB en 2025.",
    isReliable: false,
    explanation:
      "La UE busca estandarizar cargadores para reducir residuos, no prohibir los USB.",
  },
  {
    text: "Un influencer asegura que dormir con plantas en la habitación provoca falta de oxígeno.",
    isReliable: false,
    explanation:
      "Las plantas consumen muy poco oxígeno por la noche; es un mito sin base científica.",
  },
  {
    text: "Investigadores logran que una inteligencia artificial detecte noticias falsas con alta precisión.",
    isReliable: true,
    explanation:
      "Existen proyectos reales que entrenan modelos de IA para detectar patrones de desinformación.",
  },
];

const MAX_ATTEMPTS = 10;
const TARGET_SCORE = 50; // 5 aciertos x 10 puntos
const POINTS_PER_HIT = 10;
const TOTAL_TIME = 180; // 3 minutos

let gameState = null;
let timerId = null;

// -------- Helpers internos --------

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createInitialState() {
  return {
    headlines: shuffle(HEADLINES_L2),
    currentIndex: 0,
    attempts: 0,
    score: 0,
    maxAttempts: MAX_ATTEMPTS,
    targetScore: TARGET_SCORE,
    timeLeft: TOTAL_TIME,
    finished: false,
    success: false,
    finishReason: null, // 'target', 'attempts', 'time'
    wrongAnswers: [], // { text, correctLabel, playerLabel, explanation }
  };
}

function startTimer(rootElement) {
  // por si acaso hubiera uno antiguo
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  timerId = setInterval(() => {
    if (!gameState || gameState.finished) return;

    gameState.timeLeft -= 1;
    if (gameState.timeLeft <= 0) {
      gameState.timeLeft = 0;
      endGame("time");
      renderDigitalLevel2(rootElement);
    } else {
      const timeNode = rootElement.querySelector("[data-role='digital-timer']");
      if (timeNode) {
        timeNode.textContent = `${gameState.timeLeft}s`;
      }
    }
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function endGame(reason) {
  if (!gameState || gameState.finished) return;
  gameState.finished = true;
  gameState.finishReason = reason;
  stopTimer();

  if (gameState.score >= gameState.targetScore) {
    gameState.success = true;

    // Recompensa: 60 monedas por superar el nivel 2
    addCoins(60);
    completeLevel("digital", 2);
    saveGameState();
  } else {
    gameState.success = false;
  }
}

// -------- API pública del minijuego --------

export function startDigitalLevel2(rootElement) {
  gameState = createInitialState();
  startTimer(rootElement);
  renderDigitalLevel2(rootElement);
}

export function stopDigitalLevel2() {
  stopTimer();
  gameState = null;
}

export function restartDigitalLevel2(rootElement) {
  gameState = createInitialState();
  startTimer(rootElement);
  renderDigitalLevel2(rootElement);
}

export function handleDigitalLevel2Choice(choice, rootElement) {
  if (!gameState || gameState.finished) return;

  const current = gameState.headlines[gameState.currentIndex];
  const playerSaysReliable = choice === "reliable";
  const isCorrect = current.isReliable === playerSaysReliable;

  gameState.attempts += 1;

  if (isCorrect) {
    gameState.score += POINTS_PER_HIT;
  } else {
    const correctLabel = current.isReliable ? "Fiable" : "Dudoso";
    const playerLabel = playerSaysReliable ? "Fiable" : "Dudoso";
    gameState.wrongAnswers.push({
      text: current.text,
      correctLabel,
      playerLabel,
      explanation: current.explanation,
    });
  }

  if (gameState.score >= gameState.targetScore) {
    endGame("target");
  } else if (gameState.attempts >= gameState.maxAttempts) {
    endGame("attempts");
  } else {
    gameState.currentIndex =
      (gameState.currentIndex + 1) % gameState.headlines.length;
  }

  renderDigitalLevel2(rootElement);
}

// -------- Render --------

export function renderDigitalLevel2(rootElement) {
  if (!rootElement || !gameState) return;

  if (!gameState.finished) {
    const current = gameState.headlines[gameState.currentIndex];

    rootElement.innerHTML = `
    <div class="digital-game">
      <div class="digital-header-row">
        <span>PUNTOS: ${gameState.score} / ${gameState.targetScore}</span>
        <span>INTENTOS: ${gameState.attempts} / ${gameState.maxAttempts}</span>
        <span>TIEMPO: <span data-role="digital-timer">${gameState.timeLeft}s</span></span>
      </div>

      <div class="digital-main-row">
        <div class="digital-main-card">
          <p>${current.text}</p>
        </div>
      </div>

      <div class="digital-bottom-bar">
        <button
          type="button"
          class="digital-bottom-btn"
          data-action="digital-choice"
          data-choice="reliable"
        >
          FIABLE
        </button>
        <button
          type="button"
          class="digital-bottom-btn"
          data-action="digital-choice"
          data-choice="doubtful"
        >
          DUDOSO
        </button>
      </div>
    </div>
  `;
  } else {
    let mainMessage = "";
    let subMessage = "";

    if (gameState.success) {
      mainMessage = "¡Nivel 2 superado!";
      subMessage = `Has conseguido ${gameState.score} puntos en ${gameState.attempts} intentos. Recompensa: 50 monedas.`;
    } else {
      if (gameState.finishReason === "time") {
        mainMessage = "Tiempo agotado";
        subMessage =
          "El reloj ha llegado a cero antes de alcanzar los puntos necesarios.";
      } else if (gameState.finishReason === "attempts") {
        mainMessage = "Nivel no superado";
        subMessage =
          "Has agotado todos los intentos sin conseguir los puntos necesarios.";
      } else {
        mainMessage = "Nivel no superado";
        subMessage =
          "No has alcanzado el objetivo de puntos. ¡Inténtalo de nuevo!";
      }
    }

    const correctionsHtml =
      gameState.wrongAnswers.length === 0
        ? `<p>No has cometido errores. ¡Buen ojo crítico!</p>`
        : gameState.wrongAnswers
            .map(
              (w) => `
        <p class="digital-correction">
          ✖ <strong>${w.text}</strong><br/>
          Tu respuesta: ${w.playerLabel} · Respuesta correcta: ${w.correctLabel}<br/>
          <span class="digital-correction-expl">${w.explanation}</span>
        </p>
      `
            )
            .join("");

    rootElement.innerHTML = `
  <div class="digital-end-screen">
    <div class="digital-end-card">
      <h3>${mainMessage}</h3>
      <p>${subMessage}</p>
      <div class="digital-corrections">
        ${correctionsHtml}
      </div>
    </div>

    <div class="digital-end-actions">
      <button data-action="digital-restart" class="digital-end-btn">
        REPETIR NIVEL
      </button>
      <button data-action="digital-exit" class="digital-end-btn">
        VOLVER AL MUNDO
      </button>
    </div>
  </div>
`;
  }
}
