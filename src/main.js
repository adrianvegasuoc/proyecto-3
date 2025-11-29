import "./styles/style.css";
import { registerView, navigateTo } from "./router.js";

import { mainView } from "./views/mainView";
import { worldView } from "./views/worldView";
import { medalView } from "./views/medalView";
import { shopView } from "./views/shopView";
import { shopItemsView } from "./views/shopItemsView";
import { statsView } from "./views/statsView";
import { gameView } from "./views/gameView";

import { uiState } from "./state/uiState";
import { loadGameState, saveGameState } from "./state/persistence";

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
      navigateTo("worldDetail"); // vista de niveles
      return;
    }

    // Click en un nivel dentro de un mundo
    if (event.target.matches("[data-world-level]")) {
      const level = event.target.getAttribute("data-world-level");
      uiState.currentLevel = level; // guardamos nivel
      navigateTo("worldDetail"); // re-render con derecha actualizada
      return;
    }

    // Click en una categoría de tienda
    if (event.target.matches("[data-shop-section]")) {
      const section = event.target.getAttribute("data-shop-section");
      uiState.currentShopSection = section;
      navigateTo("shopItems");
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
navigateTo("main");

// Guardar automáticamente al cerrar / recargar
window.addEventListener("beforeunload", () => {
  saveGameState();
});

setupNavigation();
navigateTo("main");
