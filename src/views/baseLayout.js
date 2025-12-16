import { getState } from "../state/state";

const MAX_EXTERIOR_TIER = 14;
const MAX_PLAYER_TIER_VISUAL = 4;
const EXTERIOR_BACKGROUNDS = [
  "assets/games/background/world_digital/background_1.jpg",
  "assets/games/background/world_digital/background_2.jpg",
  "assets/games/background/world_digital/background_3.jpg",
  "assets/games/background/world_html/background_1.jpg",
  "assets/games/background/world_html/background_2.jpg",
  "assets/games/background/world_html/background_3.jpg",
  "assets/games/background/world_css/background_1.jpg",
  "assets/games/background/world_css/background_2.jpg",
  "assets/games/background/world_css/background_3.jpg",
  "assets/games/background/world_css/background_4.jpg",
  "assets/games/background/world_logica/background_1.jpg",
  "assets/games/background/world_logica/background_2.jpg",
  "assets/games/background/world_logica/background_3.jpg",
  "assets/games/background/world_logica/background_4.jpg",
];
const PLAYER_IMAGES = [
  "assets/shop/player/player_1.png",
  "assets/shop/player/player_2.png",
  "assets/shop/player/player_3.png",
  "assets/shop/player/player_4.png",
];

export function baseLayout({ leftContent, rightContent = "" }) {
  const BASE = import.meta.env.BASE_URL || "/";
  const state = getState();
  const coins = state?.player?.coins ?? state?.currency?.coins ?? 0;
  const playerName = state?.player?.name || "NUEVO JUGADOR";
  const cosmetics = state?.player?.cosmetics || {};
  const playerStyle = Math.max(1, cosmetics.playerStyleLevel || 1);
  const exteriorStyle = Math.max(1, cosmetics.exteriorStyleLevel || 1);
  const playerTierClass = `player-tier-${Math.min(
    playerStyle,
    MAX_PLAYER_TIER_VISUAL
  )}`;
  const exteriorBackground =
    EXTERIOR_BACKGROUNDS[
      Math.min(exteriorStyle, EXTERIOR_BACKGROUNDS.length) - 1
    ] || EXTERIOR_BACKGROUNDS[EXTERIOR_BACKGROUNDS.length - 1];
  const playerImage =
    PLAYER_IMAGES[Math.min(playerStyle, PLAYER_IMAGES.length) - 1] ||
    PLAYER_IMAGES[PLAYER_IMAGES.length - 1];
  const defaultRightContent = `
    <div class="character-visual">
      <div class="character-background" style="background-image: url('${BASE}${exteriorBackground}')"></div>
      <div class="character-overlay">
        <span>EXTERIOR NIVEL ${exteriorStyle}</span>
      </div>
      <div class="character-avatar ${playerTierClass}" style="background-image: url('${BASE}${playerImage}')">
        <span>PERSONAJE NIVEL ${playerStyle}</span>
      </div>
    </div>
  `;
  const hasCustomRightContent = Boolean(rightContent);
  const panelContent = hasCustomRightContent
    ? rightContent
    : defaultRightContent;
  const rightPanelClass = hasCustomRightContent ? "is-custom" : "is-default";

  return `
    <div class="screen">
      <div class="screen-frame">

        <div class="top-row">
            <div class="top-box top-box-left">
                MONEDAS: ${coins}
            </div>
            <div class="top-box top-box-right" data-action="open-menu">
                MENÚ
            </div>
        </div>
        
        <div class="main-row">
          <aside class="left-panel">
            <div class="nav-circles">
              <button class="action-btn" data-view="main" title="Jugar">
                <img
                  class="action-btn__icon"
                  src="${BASE}assets/menu/menu_game.png"
                  alt="Jugar"
                />
                <span class="action-btn__label">JUGAR</span>
              </button>
              <button class="action-btn" data-view="medals" title="Medallero">
                <img
                  class="action-btn__icon"
                  src="${BASE}assets/menu/menu_star.png"
                  alt="Medallero"
                />
                <span class="action-btn__label">MEDALLERO</span>
              </button>
              <button class="action-btn" data-view="shop" title="Tienda">
                <img
                  class="action-btn__icon"
                  src="${BASE}assets/menu/menu_coin.png"
                  alt="Tienda"
                />
                <span class="action-btn__label">TIENDA</span>
              </button>
              <button class="action-btn" data-view="stats" title="Estadísticas">
                <img
                  class="action-btn__icon"
                  src="${BASE}assets/menu/menu_stats.png"
                  alt="Estadísticas"
                />
                <span class="action-btn__label">ESTADÍSTICAS</span>
              </button>
            </div>

            <div class="left-content">
              ${leftContent}
            </div>
          </aside>

          <section class="right-panel">
            <div class="character-area ${rightPanelClass}">
              ${panelContent}
            </div>
            <div class="player-info">
                <span class="player-name">${playerName}</span>
            </div>
          </section>

        </div>

      </div>
    </div>
  `;
}
