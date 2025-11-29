import { baseLayout } from "./baseLayout";
import { uiState } from "../state/uiState";

const worldTitles = {
  digital: "MUNDO CULTURA DIGITAL",
  html: "MUNDO HTML",
  css: "MUNDO CSS",
  logica: "MUNDO LÓGICA",
};

export function worldView() {
  const title = worldTitles[uiState.currentWorld] || "MUNDO";

  const leftContent = `
    <div class="world-detail-list">
      <div class="world-detail-title">${title}</div>
      <button class="world-level-btn" data-world-level="1">Nivel 1</button>
      <button class="world-level-btn" data-world-level="2">Nivel 2</button>
      <button class="world-level-btn" data-world-level="3">Nivel 3</button>
      <button class="world-level-btn" data-world-level="4">Nivel 4</button>
    </div>
  `;

  // Construimos la configuración para baseLayout
  const config = { leftContent };

  // SOLO cuando hay nivel seleccionado cambiamos el contenido de la derecha
  if (uiState.currentLevel) {
    config.rightContent = `
      <div class="world-detail-right">
        <p><strong>${title}</strong></p>
        <p>NIVEL ${uiState.currentLevel}</p>
        <button class="world-play-btn" data-view="game">
          JUGAR
        </button>
      </div>
    `;
  }
  // Si no hay nivel, no ponemos rightContent → baseLayout usa "ESPACIO DE PERSONAJE"

  return baseLayout(config);
}
