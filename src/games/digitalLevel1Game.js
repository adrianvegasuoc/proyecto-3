// Juego: Mundo Cultura Digital - Nivel 1
// Detector de noticias falsas

import { addCoins, completeLevel } from "../state/state";
import { saveGameState } from "../state/persistence";
import { uiState } from "../state/uiState";

const HEADLINES = [
  {
    text: "Una app promete aprender a programar en 24 horas sin esfuerzo.",
    isReliable: false,
    explanation: "Promesas exageradas sin detalles fiables suelen ser dudosas.",
  },
  {
    text: "Un estudio universitario publica un informe sobre ciberseguridad en 2024.",
    isReliable: true,
    explanation:
      "Menciona una fuente concreta y razonable (estudio universitario).",
  },
  {
    text: "Descubren que apagar el móvil por la noche duplica la velocidad de Internet.",
    isReliable: false,
    explanation:
      "No tiene sentido técnico: apagar tu móvil no cambia la velocidad de tu conexión.",
  },
  {
    text: "Actualización de un navegador soluciona fallos de seguridad recientes.",
    isReliable: true,
    explanation:
      "Es habitual que las actualizaciones solucionen vulnerabilidades.",
  },
  {
    text: "Una red social regala 500€ a todos los usuarios que compartan una publicación.",
    isReliable: false,
    explanation: "Típico gancho para conseguir compartidos, suena a bulo.",
  },
  {
    text: "La policía avisa de un nuevo tipo de estafa por SMS con enlaces falsos.",
    isReliable: true,
    explanation: "Advertencias de estafa por SMS son comunes y verosímiles.",
  },
  {
    text: "Un influencer asegura que beber solo agua del grifo cura todas las enfermedades.",
    isReliable: false,
    explanation: "Afirma curarlo TODO sin base científica: muy dudoso.",
  },
  {
    text: "La agencia espacial publica imágenes de un nuevo planeta descubierto.",
    isReliable: true,
    explanation: "Noticia coherente con avances científicos habituales.",
  },
  {
    text: "Un videojuego nuevo ‘hackea’ tu cerebro para mejorar la inteligencia un 300%.",
    isReliable: false,
    explanation:
      "Promesas imposibles con porcentajes enormes suelen ser falsas.",
  },
  {
    text: "Un hospital anuncia un programa de citas online para resolver dudas médicas.",
    isReliable: true,
    explanation: "Servicio razonable y plausible en la era digital.",
  },
  {
    text: "Si cambias el color de fondo de tu móvil, duplicas la duración de la batería.",
    isReliable: false,
    explanation: "No hay relación tan directa: suena a mito.",
  },
  {
    text: "Una ONG recoge ordenadores viejos para donarlos a escuelas.",
    isReliable: true,
    explanation: "Acción social habitual y creíble.",
  },
];

const MAX_ATTEMPTS = 10;
const TARGET_SCORE = 50; // 5 aciertos x 10 puntos
const POINTS_PER_HIT = 10;
const TOTAL_TIME = 180; // segundos de partida

let gameState = null;

// -------- Helpers internos --------

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createInitialState() {
  return {
    headlines: shuffle(HEADLINES),
    currentIndex: 0,
    attempts: 0,
    score: 0,
    maxAttempts: MAX_ATTEMPTS,
    targetScore: TARGET_SCORE,
    timeLeft: TOTAL_TIME,
    timerId: null,
    finished: false,
    success: false,
    finishReason: null, // 'target', 'attempts', 'time'
    wrongAnswers: [], // { text, correctLabel, playerLabel, explanation }
  };
}

function clearTimer() {
  if (gameState && gameState.timerId !== null) {
    clearInterval(gameState.timerId);
    gameState.timerId = null;
  }
}

function endGame(reason) {
  if (!gameState || gameState.finished) return;
  gameState.finished = true;
  gameState.finishReason = reason;
  clearTimer();

  if (gameState.score >= gameState.targetScore) {
    gameState.success = true;

    // Recompensa: 50 monedas por superar el nivel
    addCoins(50);
    completeLevel("digital", 1);
    saveGameState();
  } else {
    gameState.success = false;
  }
}

export function startDigitalLevel1(rootElement) {
  // Siempre que entramos, empezamos partida nueva
  gameState = createInitialState();

  // Timer
  gameState.timerId = setInterval(() => {
    if (!gameState) return;
    gameState.timeLeft -= 1;
    if (gameState.timeLeft <= 0) {
      gameState.timeLeft = 0;
      endGame("time");
      renderDigitalLevel1(rootElement);
    } else {
      // refrescamos solo numeritos
      const timeNode = rootElement.querySelector("[data-role='digital-timer']");
      if (timeNode) {
        timeNode.textContent = `${gameState.timeLeft}s`;
      }
    }
  }, 1000);

  renderDigitalLevel1(rootElement);
}

export function stopDigitalLevel1() {
  clearTimer();
  gameState = null;
}

export function handleDigitalChoice(choice, rootElement) {
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

  // Condiciones de fin
  if (gameState.score >= gameState.targetScore) {
    endGame("target");
  } else if (gameState.attempts >= gameState.maxAttempts) {
    endGame("attempts");
  } else {
    // siguiente titular
    gameState.currentIndex =
      (gameState.currentIndex + 1) % gameState.headlines.length;
  }

  renderDigitalLevel1(rootElement);
}

export function restartDigitalLevel1(rootElement) {
  clearTimer();
  gameState = createInitialState();
  gameState.timerId = setInterval(() => {
    if (!gameState) return;
    gameState.timeLeft -= 1;
    if (gameState.timeLeft <= 0) {
      gameState.timeLeft = 0;
      endGame("time");
      renderDigitalLevel1(rootElement);
    } else {
      const timeNode = rootElement.querySelector("[data-role='digital-timer']");
      if (timeNode) {
        timeNode.textContent = `${gameState.timeLeft}s`;
      }
    }
  }, 1000);

  renderDigitalLevel1(rootElement);
}

// -------- Render --------

export function renderDigitalLevel1(rootElement) {
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

        <div class="digital-main-card">
          <p>${current.text}</p>
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
    // Vista final (como tu wireframe)
    let mainMessage = "";
    let subMessage = "";

    if (gameState.success) {
      mainMessage = "¡Nivel superado!";
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
