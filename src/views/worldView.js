import { baseLayout } from "./baseLayout";
import { uiState } from "../state/uiState";
import { getState } from "../state/state";

const worldTitles = {
  digital: "MUNDO CULTURA DIGITAL",
  html: "MUNDO HTML",
  css: "MUNDO CSS",
  logica: "MUNDO LÓGICA",
};

export function worldView() {
  const state = getState();

  const worldId = uiState.currentWorld;
  const currentLevel = uiState.currentLevel;

  const world = state.worlds.find((w) => w.id === worldId);

  // ➜ Comprobamos que existe el mundo
  if (!world) {
    return baseLayout({
      leftContent: `<p>Error: mundo no encontrado (${worldId})</p>`,
    });
  }

  const title = worldTitles[worldId] || "MUNDO";

  // Niveles completados
  const completed = world.completedLevels || [];

  // Generador de botones de nivel
  function levelButton(levelNumber) {
    const isCompleted = completed.includes(levelNumber);
    const isCurrent = String(levelNumber) === String(currentLevel);

    const classes = [
      "world-level-btn",
      isCompleted ? "is-completed" : "",
      isCurrent ? "is-current" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const label = `Nivel ${levelNumber}${isCompleted ? " ✓" : ""}`;

    return `
      <button class="${classes}" data-world-level="${levelNumber}">
        ${label}
      </button>
    `;
  }

  const leftContent = `
    <div class="world-detail-list">
      <div class="world-detail-title">${title}</div>
      ${levelButton(1)}
      ${levelButton(2)}
      ${levelButton(3)}
      ${levelButton(4)}
    </div>
  `;

  // Si NO hay nivel seleccionado → no modificamos rightContent (mostrará ESPACIO PERSONAJE)
  const config = { leftContent };

  // Si HAY nivel seleccionado → mostramos panel de nivel
  if (currentLevel) {
    config.rightContent = `
      <div class="world-detail-right">
        <p><strong>${title}</strong></p>
        <p>NIVEL ${currentLevel}</p>
        <button class="world-play-btn" data-view="game">
          JUGAR
        </button>
      </div>
    `;
  }

  return baseLayout(config);
}
