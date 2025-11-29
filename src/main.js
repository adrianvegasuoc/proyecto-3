import "./styles/style.css";
import { registerView, navigateTo } from "./router.js";

import { mainView } from "./views/mainView"; // vista principal
import { worldView } from "./views/worldView"; // vista de detalle de mundo
import { medalView } from "./views/medalView"; // vista de medallas
import { shopView } from "./views/shopView"; // vista de tienda
import { statsView } from "./views/statsView"; // vista de estadísticas
import { gameView } from "./views/gameView"; // vista del juego
import { shopItemsView } from "./views/shopItemsView"; // importamos la nueva vista
import { uiState } from "./state/uiState"; // importamos el estado UI

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

setupNavigation();
navigateTo("main");
