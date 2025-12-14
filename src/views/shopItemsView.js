import { baseLayout } from "./baseLayout";
import { uiState } from "../state/uiState";
import { SHOP_ITEMS } from "../data/shopCatalog";
import { getState } from "../state/state";

const sectionTitles = {
  exterior: "TIENDA EXTERIOR",
  personaje: "TIENDA PERSONAJE",
  mejoras: "TIENDA MEJORAS",
};

export function shopItemsView() {
  const state = getState();
  const coins = state?.player?.coins ?? state?.currency?.coins ?? 0;
  const ownedItems = new Set(state?.player?.inventory || []);
  const section = uiState.currentShopSection;
  const title = sectionTitles[section] || "TIENDA";

  const items = SHOP_ITEMS.filter((item) => item.category === section);
  const cards =
    items
      .map((item) => {
        const locked = item.status === "locked";
        const owned = ownedItems.has(item.id);
        const slotInfo =
          item.category === "personaje" && item.slot
            ? `<div class="shop-item-slot">Slot: ${item.slot}</div>`
            : "";

        let actionMarkup = "";
        if (locked) {
          actionMarkup =
            '<div class="shop-item-status shop-item-locked">🔒 BLOQUEADO</div>';
        } else if (owned) {
          actionMarkup =
            '<div class="shop-item-status shop-item-owned">COMPRADO</div>';
        } else {
          actionMarkup = `<button class="shop-item-buy" data-action="buy-item" data-item-id="${item.id}">
            Comprar · ${item.price} monedas
          </button>`;
        }

        return `
          <div class="shop-item-card ${locked ? "is-locked" : ""}">
            <div class="shop-item-visual ${item.visualClass}"></div>
            <div class="shop-item-name">${item.name}</div>
            ${slotInfo}
            <div class="shop-item-price">${item.price} monedas</div>
            ${actionMarkup}
          </div>
        `;
      })
      .join("") ||
    `<div class="shop-empty">No hay objetos disponibles en esta sección.</div>`;

  const leftContent = `
    <div class="shop-items-view">
      <div class="shop-items-header">
        <div>${title}</div>
        <div class="shop-items-balance">MONEDAS: ${coins}</div>
      </div>
      <div class="shop-items-scroll">
        <div class="shop-items-grid">
          ${cards}
        </div>
      </div>
    </div>
  `;

  return baseLayout({
    leftContent,
  });
}
