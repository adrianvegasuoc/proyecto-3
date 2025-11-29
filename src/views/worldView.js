import { baseLayout } from "./baseLayout";

export function worldView() {
  const leftContent = `
    <div class="worlds-list">
      <div class="world-item">MUNDO CULTURA DIGITAL · NIVEL 1</div>
      <div class="world-item">MUNDO CULTURA DIGITAL · NIVEL 2</div>
      <div class="world-item">MUNDO CULTURA DIGITAL · NIVEL 3</div>
      <div class="world-item">MUNDO CULTURA DIGITAL · NIVEL 4</div>
    </div>
  `;

  const rightContent = `
    <div class="world-detail">
      <p>Aquí mostraremos el detalle del mundo seleccionado:</p>
      <ul>
        <li>Descripción del mundo</li>
        <li>Retos disponibles</li>
        <li>Progreso en este mundo</li>
      </ul>
    </div>
  `;

  return baseLayout({
    leftContent,
    rightContent,
  });
}
