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
    // Navegación general
    if (event.target.matches("[data-view]")) {
      const viewName = event.target.getAttribute("data-view");
      navigateTo(viewName);
      return;
    }

    // Click en un mundo (1 MAIN -> Detalle mundo)
    if (event.target.matches("[data-world]")) {
      navigateTo("worldDetail");
      return;
    }

    // Click en una categoría de tienda (3 TIENDA -> 3 TIENDA OBJETOS)
    if (event.target.matches("[data-shop-section]")) {
      const section = event.target.getAttribute("data-shop-section");
      uiState.currentShopSection = section; // guardamos cuál es
      navigateTo("shopItems");
      return;
    }
  });
}

registerView("main", mainView);
registerView("worldDetail", worldView); // 👈 detalle de mundo
registerView("medals", medalView);
registerView("shop", shopView);
registerView("shopItems", shopItemsView); // 👈 nueva
registerView("stats", statsView);
registerView("game", gameView);

setupNavigation();
navigateTo("main");
