import { baseLayout } from "./baseLayout";

export function statsView() {
  const leftContent = `
    <div class="stats-progress">
      <div class="stats-progress-header">PROGRESO</div>
      <div class="stats-worlds-list">
        <div class="stats-world-item">MUNDO CULTURA DIGITAL NIVEL 1</div>
        <div class="stats-world-item">MUNDO CULTURA DIGITAL NIVEL 2</div>
        <div class="stats-world-item">MUNDO CULTURA DIGITAL NIVEL 3</div>
        <div class="stats-world-item">MUNDO CULTURA DIGITAL NIVEL 4</div>
      </div>
    </div>
  `;

  return baseLayout({
    title: "4 ESTADÍSTICAS",
    leftContent,
  });
}
