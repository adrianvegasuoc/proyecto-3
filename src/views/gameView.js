import { baseLayout } from "./baseLayout";

export function gameView() {
  const leftContent = `
    <div class="game-info">
      <p>Aquí mostraremos información del minijuego:</p>
      <ul>
        <li>Nombre del reto</li>
        <li>Objetivo</li>
        <li>Recompensa</li>
      </ul>
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
