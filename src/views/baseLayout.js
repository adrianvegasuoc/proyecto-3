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
  const panelContent = hasCustomRightContent ? rightContent : defaultRightContent;
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
              <!-- 1) Mundos -->
              <button class="circle-btn" data-view="main" title="Mundos"></button>
              <!-- 2) Medallero -->
              <button class="circle-btn" data-view="medals" title="Medallero"></button>
              <!-- 3) Tienda -->
              <button class="circle-btn" data-view="shop" title="Tienda"></button>
              <!-- 4) Estadísticas -->
              <button class="circle-btn" data-view="stats" title="Estadísticas"></button>
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
                <button class="player-edit-btn" data-action="open-profile-edit">Editar</button>
            </div>
          </section>

        </div>

      </div>
    </div>
  `;
}
