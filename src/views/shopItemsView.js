import { baseLayout } from "./baseLayout";
import { uiState } from "../state/uiState";

const sectionTitles = {
  exterior: "TIENDA EXTERIOR",
  personaje: "TIENDA PERSONAJE",
  mejoras: "TIENDA MEJORAS",
};

export function shopItemsView() {
  const title = sectionTitles[uiState.currentShopSection] || "TIENDA";

  const leftContent = `
    <div class="shop-items-view">
      <div class="shop-items-header">
        ${title}
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

  return baseLayout({
    leftContent,
  });
}
