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
  const BASE = import.meta.env.BASE_URL || "/";

  const worldTitle = worldTitles[worldId] || "MUNDO";
  const levelText = level ? `NIVEL ${level}` : "SIN NIVEL SELECCIONADO";

  const isDigitalPlayable =
    worldId === "digital" &&
    (String(level) === "1" || String(level) === "2" || String(level) === "3");

  if (isDigitalPlayable) {
    const levelNumber = String(level);

    const leftContent = `
    <div class="world-level-info">
      <div class="world-level-title">${worldTitle}</div>
      <div class="world-level-subtitle">NIVEL ${levelNumber}</div>
      <div class="world-level-separator">— —</div>
          <div class="world-level-description">
      ${
        levelNumber === "1"
          ? `Detecta noticias dudosas: lee el titular y decide si es <strong>Fiable</strong> o <strong>Dudoso</strong>.<br />
             Cada acierto vale 10 puntos.<br />
             Consigue 50 puntos en 10 intentos antes de que se agote el tiempo.`
          : levelNumber === "2"
          ? `Nivel intermedio: aparecen titulares ambiguos y clickbait.<br />
             Analiza bien la información antes de decidir si es <strong>Fiable</strong> o <strong>Dudoso</strong>.<br />
             Consigue 50 puntos en 10 intentos.`
          : `Nivel avanzado: el tiempo es limitado y los errores penalizan.<br />
             Cada fallo resta puntos.<br />
             Mantén la concentración y decide si la noticia es <strong>Fiable</strong> o <strong>Dudoso</strong>.`
      }
      </div>
    </div>
  `;

    const digitalBackground = `${BASE}assets/games/background/world_digital/background_1.jpg`;

    const rightContent = `
    <div class="digital-game-root" style="background-image: url('${digitalBackground}')">
      <div id="digital-game-panel"></div>
    </div>
  `;

    return baseLayout({ leftContent, rightContent });
  }

  // Resto de niveles -> Próximamente + Simular victoria
  const leftContent = `
    <div class="world-level-info">
      <div class="world-level-title">${worldTitle}</div>
      <div class="world-level-subtitle">${levelText}</div>
      <div class="world-level-separator">— —</div>
      <div class="world-level-description">
        Este nivel todavía está en desarrollo.<br />
        Por ahora puedes simular la victoria para probar el flujo del juego.
      </div>
      <button class="test-coins-btn" data-action="win-level">
        Simular victoria (prototipo)
      </button>
    </div>
  `;

  const rightContent = `
    <div class="game-coming-soon">
      <p>PRÓXIMAMENTE</p>
    </div>
  `;

  return baseLayout({ leftContent, rightContent });
}
