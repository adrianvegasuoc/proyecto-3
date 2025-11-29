import "./styles/style.css";
import { registerView, navigateTo } from "./router.js";

import { mainView } from "./views/mainView";
import { worldView } from "./views/worldView";
import { medalView } from "./views/medalView";
import { shopView } from "./views/shopView";
import { statsView } from "./views/statsView";
import { gameView } from "./views/gameView";
// Registrar todas las vistas disponibles en la aplicación.
registerView("worlds", worldView);
registerView("medals", medalView);
registerView("shop", shopView);
registerView("stats", statsView);
registerView("game", gameView);

function setupNavigation() {
  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-view]")) {
      const viewName = event.target.getAttribute("data-view");
      navigateTo(viewName);
    }
  });
}

// Registrar vistas
registerView("main", mainView);

// Iniciar
setupNavigation();
navigateTo("main");
