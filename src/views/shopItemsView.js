import { baseLayout } from "./baseLayout";
import { uiState } from "../state/uiState";
import { SHOP_ITEMS } from "../data/shopCatalog";
import { getState, canBuyItem } from "../state/state";

const sectionTitles = {
  exterior: "TIENDA EXTERIOR",
  personaje: "TIENDA PERSONAJE",
  mejoras: "TIENDA MEJORAS",
};

export function shopItemsView() {
  const BASE = import.meta.env.BASE_URL || "/";
  const state = getState();
  const coins = state?.player?.coins ?? state?.currency?.coins ?? 0;
  const section = uiState.currentShopSection;
  const title = sectionTitles[section] || "TIENDA";
  const cosmetics = {
    playerStyleLevel: state?.player?.cosmetics?.playerStyleLevel || 1,
    exteriorStyleLevel: state?.player?.cosmetics?.exteriorStyleLevel || 1,
  };

  const now = Date.now();
  let headerMessage = "";
  if (uiState.shopMessage && uiState.shopMessage.expiresAt > now) {
    headerMessage = `<div class="shop-message">${uiState.shopMessage.text}</div>`;
  } else if (uiState.shopMessage) {
    uiState.shopMessage = null;
  }

  const items = SHOP_ITEMS.filter((item) => item.category === section);
  const cards =
    items
      .map((item) => {
        const currentLevel = getCurrentLevelForItem(item, cosmetics);
        const isLockedStatus = item.status === "locked";
        const isProgressionCategory =
          item.category === "personaje" || item.category === "exterior";
        const tierLabel =
          typeof item.tier === "number"
            ? `<div class="shop-item-tier">Nivel ${item.tier}</div>`
            : "";

        let actionMarkup = "";
        if (!isProgressionCategory || isLockedStatus) {
          actionMarkup =
            '<div class="shop-item-status shop-item-locked">🔒 BLOQUEADO</div>';
        } else if (item.tier <= currentLevel) {
          actionMarkup =
            '<div class="shop-item-status shop-item-owned">COMPRADO ✅</div>';
        } else if (canBuyItem(item)) {
          actionMarkup = `<button class="shop-item-buy" data-action="buy-item" data-item-id="${item.id}">
            Comprar · ${item.price} monedas
          </button>`;
        } else {
          actionMarkup =
            '<div class="shop-item-status shop-item-locked">🔒 AÚN NO DISPONIBLE</div>';
        }

        const assetPath =
          typeof item.visualAsset === "string"
            ? item.visualAsset.replace(/^\/+/, "")
            : "";
        const visualStyle = assetPath
          ? ` style="background-image: url('${BASE}${assetPath}')"`
          : "";

        return `
          <div class="shop-item-card ${
            isLockedStatus ? "is-locked" : ""
          } category-${item.category}">
            <div class="shop-item-visual ${item.visualClass}"${visualStyle}></div>
            <div class="shop-item-name">${item.name}</div>
            ${tierLabel}
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
        <div>
          <div>${title}</div>
          ${headerMessage}
        </div>
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

function getCurrentLevelForItem(item, cosmetics) {
  if (item.category === "personaje") {
    return cosmetics.playerStyleLevel || 1;
  }
  if (item.category === "exterior") {
    return cosmetics.exteriorStyleLevel || 1;
  }
  return 0;
}
