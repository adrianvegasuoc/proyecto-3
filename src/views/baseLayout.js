export function baseLayout({ leftContent, rightContent = "" }) {
  return `
    <div class="screen">
      <div class="screen-frame">

        <div class="top-row">
          <div class="top-box top-box-left">
            INFORMACIÓN GENERAL
          </div>
          <div class="top-box top-box-right">
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
            <div class="character-area">
              ${rightContent || "<p>ESPACIO DE PERSONAJE</p>"}
            </div>
            <div class="player-info">
              INFORMACIÓN PERSONAL (NOMBRE, NIVEL)
            </div>
          </section>

        </div>

      </div>
    </div>
  `;
}
