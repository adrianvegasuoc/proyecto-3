import { baseLayout } from "./baseLayout";

export function worldView() {
  const leftContent = `
    <div class="world-detail-list">
      <div class="world-detail-title">MUNDO CULTURA DIGITAL</div>
      <div class="world-level">Nivel 1</div>
      <div class="world-level">Nivel 2</div>
      <div class="world-level">Nivel 3</div>
      <div class="world-level">Nivel 4</div>
    </div>
  `;

  const rightContent = `
    <div class="world-detail-right">
      <p>Aquí mostraremos el detalle del mundo seleccionado.</p>
      <p>Por ejemplo, descripción general, progreso y botón de jugar:</p>
      <button class="world-play-btn" data-view="game">
        JUGAR MUNDO CULTURA DIGITAL · NIVEL 1
      </button>
    </div>
  `;

  return baseLayout({
    leftContent,
    rightContent,
  });
}
