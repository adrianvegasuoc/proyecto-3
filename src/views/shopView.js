import { baseLayout } from "./baseLayout";

export function shopView() {
  const leftContent = `
    <div class="shop-main-list">
      <button class="shop-main-category" data-shop-section="exterior">
        EXTERIOR
      </button>
      <button class="shop-main-category" data-shop-section="personaje">
        PERSONAJE
      </button>
      <button class="shop-main-category" data-shop-section="mejoras">
        MEJORAS
      </button>
    </div>
  `;

  // derecha: espacio de personaje e info personal por defecto
  return baseLayout({
    leftContent,
  });
}
