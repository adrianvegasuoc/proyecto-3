import { baseLayout } from "./baseLayout";

export function shopView() {
  const leftContent = `
    <div class="shop-section">
      <div class="shop-section-title">OBJETOS DISPONIBLES</div>
      <div class="shop-items">
        <div class="shop-item">
          <span>Sombrero básico</span>
          <button class="shop-buy-btn">Comprar</button>
        </div>
        <div class="shop-item">
          <span>Camisa azul</span>
          <button class="shop-buy-btn">Comprar</button>
        </div>
        <div class="shop-item">
          <span>Gafas cuadradas</span>
          <button class="shop-buy-btn">Comprar</button>
        </div>
      </div>
    </div>
  `;

  const rightContent = `
    <div class="inventory">
      <p>Aquí se mostrará el inventario del jugador: objetos comprados y equipados.</p>
    </div>
  `;

  return baseLayout({
    leftContent,
    rightContent,
  });
}
