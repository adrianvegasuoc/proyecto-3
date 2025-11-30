import { baseLayout } from "./baseLayout";

export function mainView() {
  const leftContent = `
    <div class="worlds-list">
      <button class="world-item" data-world="digital">
        MUNDO CULTURA DIGITAL
      </button>
      <button class="world-item" data-world="html">
        MUNDO HTML
      </button>
      <button class="world-item" data-world="css">
        MUNDO CSS
      </button>
      <button class="world-item" data-world="logica">
        MUNDO LÓGICA
      </button>
    </div>
  `;

  return baseLayout({
    leftContent,
  });
}
