import "./styles/style.css";
import { registerView, navigateTo } from "./router.js";

import { mainView } from "./views/mainView";
import { worldView } from "./views/worldView";
import { medalView } from "./views/medalView";
import { shopView } from "./views/shopView";
import { shopItemsView } from "./views/shopItemsView";
import { statsView } from "./views/statsView";
import { gameView } from "./views/gameView";
import { menuOverlayView } from "./views/menuOverlayView";

import { uiState } from "./state/uiState";
import { loadGameState, saveGameState } from "./state/persistence";
import { addCoins, completeLevel, getState } from "./state/state";

// Navegar a una vista específica y actualizar el estado UI
function goTo(viewName) {
  uiState.currentView = viewName;
  navigateTo(viewName);
}

function setupNavigation() {
  document.addEventListener("click", (event) => {
    // Navegación general (círculos, botones con data-view)
    if (event.target.matches("[data-view]")) {
      const viewName = event.target.getAttribute("data-view");
      navigateTo(viewName);
      return;
    }

    // Click en un mundo (1 MAIN -> 1 DETALLE MUNDO)
    if (event.target.matches("[data-world]")) {
      const worldKey = event.target.getAttribute("data-world");
      uiState.currentWorld = worldKey; // guardamos mundo
      uiState.currentLevel = null; // aún no hay nivel
      goTo("worldDetail"); // vista de niveles
      return;
    }

    // Click en un nivel dentro de un mundo
    if (event.target.matches("[data-world-level]")) {
      const level = event.target.getAttribute("data-world-level");
      uiState.currentLevel = level; // guardamos nivel
      goTo("worldDetail"); // re-render con derecha actualizada
      return;
    }

    // Click en una categoría de tienda
    if (event.target.matches("[data-shop-section]")) {
      const section = event.target.getAttribute("data-shop-section");
      uiState.currentShopSection = section;
      goTo("shopItems");
      return;
    }

    // Botón de prueba: sumar 10 monedas
    if (event.target.matches('[data-action="add-test-coins"]')) {
      addCoins(10); // sumamos 10 monedas al estado
      saveGameState(); // guardamos en LocalStorage
      goTo("game"); // recargamos la vista de juego para refrescar el layout
      return;
    }

    // Simular victoria en un nivel (vista Juego)
    if (event.target.matches('[data-action="win-level"]')) {
      const worldId = uiState.currentWorld;
      const level = uiState.currentLevel;

      if (!worldId || !level) {
        // Por seguridad: si faltan datos, no hacemos nada
        return;
      }

      // Recompensa fija de ejemplo: 20 monedas
      addCoins(20);
      completeLevel(worldId, level);
      saveGameState();

      // Volvemos al detalle del mundo para seguir jugando otros niveles
      goTo("worldDetail");
      return;
    }

    // Abrir MENÚ
    if (event.target.matches('[data-action="open-menu"]')) {
      uiState.returnView = uiState.currentView; // guardar de dónde venimos
      navigateTo("menuOverlay"); // 👈 NO usamos goTo
      return;
    }

    // Cerrar MENÚ (volver a donde estábamos)
    if (event.target.matches('[data-action="close-menu"]')) {
      const targetView = uiState.returnView || "main";
      goTo(targetView);
      return;
    }
  });
}

registerView("main", mainView);
registerView("worldDetail", worldView); // detalle de mundo
registerView("medals", medalView); // vista de medallas
registerView("shop", shopView); // vista de tienda
registerView("shopItems", shopItemsView); // vista de items de tienda
registerView("stats", statsView); // vista de estadísticas
registerView("game", gameView); // vista del juego
registerView("menuOverlay", menuOverlayView); // vista de menú

// Cargar estado desde localStorage
loadGameState();

// registrar vistas...
registerView("main", mainView);
registerView("worldDetail", worldView);
registerView("medals", medalView);
registerView("shop", shopView);
registerView("shopItems", shopItemsView);
registerView("stats", statsView);
registerView("game", gameView);

setupNavigation();
goTo("main");

// Guardar automáticamente al cerrar / recargar
window.addEventListener("beforeunload", () => {
  saveGameState();
});

setupNavigation();
navigateTo("main");
