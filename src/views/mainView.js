import { baseLayout } from "./baseLayout";

export function mainView() {
  const leftContent = `
    <div class="worlds-list">
      <div class="world-item">MUNDO CULTURA DIGITAL</div>
      <div class="world-item">MUNDO HTML</div>
      <div class="world-item">MUNDO CSS</div>
      <div class="world-item">MUNDO LÓGICA</div>
    </div>
  `;

  return baseLayout({
    leftContent,
  });
}
