import { baseLayout } from "./baseLayout";

export function shopItemsView() {
  const leftContent = `
    <div class="shop-items-view">
      <div class="shop-items-header">
        TIENDA PERSONAJE
      </div>
      <div class="shop-items-scroll">
        <div class="shop-items-grid">
          ${Array.from({ length: 12 })
            .map(
              (_, i) => `
            <div class="shop-item-card">
              OBJETO ${i + 1}
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // derecha: seguimos usando el espacio de personaje por defecto
  return baseLayout({
    leftContent,
  });
}
