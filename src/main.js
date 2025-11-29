import "./styles/style.css";
import { registerView, navigateTo } from "./router.js";

import { mainView } from "./views/mainView";
import { worldView } from "./views/worldView";
import { medalView } from "./views/medalView";
import { shopView } from "./views/shopView";
import { statsView } from "./views/statsView";
import { gameView } from "./views/gameView";
import { shopItemsView } from "./views/shopItemsView";

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
      // En el futuro podremos usar el atributo para saber qué categoría es
      // const section = event.target.getAttribute("data-shop-section");
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
