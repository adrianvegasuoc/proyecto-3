import { getState } from "../state/state";

const MAX_EXTERIOR_TIER = 14;
const MAX_PLAYER_TIER_VISUAL = 4;

export function baseLayout({ leftContent, rightContent = "" }) {
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
  const exteriorTierClass = `bg-tier-${Math.min(
    exteriorStyle,
    MAX_EXTERIOR_TIER
  )}`;
  const defaultRightContent = `
    <div class="character-visual">
      <div class="character-background ${exteriorTierClass}"></div>
      <div class="character-overlay">
        <span>EXTERIOR NIVEL ${exteriorStyle}</span>
      </div>
      <div class="character-avatar ${playerTierClass}">
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
                  src="/assets/menu/menu_game.png"
                  alt="Jugar"
                />
                <span class="action-btn__label">JUGAR</span>
              </button>
              <button class="action-btn" data-view="medals" title="Medallero">
                <img
                  class="action-btn__icon"
                  src="/assets/menu/menu_star.png"
                  alt="Medallero"
                />
                <span class="action-btn__label">MEDALLERO</span>
              </button>
              <button class="action-btn" data-view="shop" title="Tienda">
                <img
                  class="action-btn__icon"
                  src="/assets/menu/menu_coin.png"
                  alt="Tienda"
                />
                <span class="action-btn__label">TIENDA</span>
              </button>
              <button class="action-btn" data-view="stats" title="Estadísticas">
                <img
                  class="action-btn__icon"
                  src="/assets/menu/menu_stats.png"
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
