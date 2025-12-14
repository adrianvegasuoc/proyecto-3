import { getState } from "../state/state";

export function menuOverlayView() {
  const state = getState();
  const coins = state?.player?.coins ?? state?.currency?.coins ?? 0;

  return `
    <div class="screen">
      <div class="screen-frame menu-overlay-frame">
        <div class="top-row">
          <div class="top-box top-box-left">
            MONEDAS: ${coins}
          </div>
          <div class="top-box top-box-right">
            MENÚ
          </div>
        </div>

        <div class="menu-overlay-content">
          <button class="menu-option-btn">OPCIÓN 1</button>
          <button class="menu-option-btn">OPCIÓN 2</button>
          <button class="menu-option-btn" data-action="close-menu">
            VOLVER
          </button>
        </div>
      </div>
    </div>
  `;
}
