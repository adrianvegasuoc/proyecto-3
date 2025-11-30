import { baseLayout } from "./baseLayout";
import { uiState } from "../state/uiState";

const worldTitles = {
  digital: "MUNDO CULTURA DIGITAL",
  html: "MUNDO HTML",
  css: "MUNDO CSS",
  logica: "MUNDO LÓGICA",
};

export function gameView() {
  const worldId = uiState.currentWorld;
  const level = uiState.currentLevel;

  const worldTitle = worldTitles[worldId] || "MUNDO";
  const levelText = level ? `NIVEL ${level}` : "SIN NIVEL SELECCIONADO";

  const leftContent = `
    <div class="game-info">
      <p><strong>${worldTitle}</strong></p>
      <p>${levelText}</p>

      <hr />

      <p>Aquí irá el minijuego correspondiente a este nivel.</p>
      <p>De momento, usamos un botón para simular una victoria:</p>

      ${
        level
          ? `<button class="test-coins-btn" data-action="win-level">
               Simular victoria (ganar 20 monedas)
             </button>`
          : `<p style="font-size:10px;">Vuelve y selecciona un nivel.</p>`
      }
    </div>
  `;

  const rightContent = `
    <div class="game-canvas-placeholder">
      <p>AQUÍ IRÁ EL MINIJUEGO (CANVAS)</p>
    </div>
  `;

  return baseLayout({
    leftContent,
    rightContent,
  });
}
