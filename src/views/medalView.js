import { baseLayout } from "./baseLayout";

export function medalView() {
  const leftContent = `
    <div class="medal-grid">
      ${Array.from({ length: 12 })
        .map(
          (_, i) => `
        <div class="medal-slot">
          MEDALLA ${i + 1}
        </div>
      `
        )
        .join("")}
    </div>
  `;

  const rightContent = `
    <div class="medal-detail">
      <p>Detalle de la medalla seleccionada.</p>
      <p>Más adelante aquí mostraremos:</p>
      <ul>
        <li>Nombre de la medalla</li>
        <li>Descripción</li>
        <li>Condición de desbloqueo</li>
      </ul>
    </div>
  `;

  return baseLayout({
    leftContent,
    rightContent,
  });
}
