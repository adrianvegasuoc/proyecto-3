import "./styles/style.css";
import { registerView, navigateTo } from "./router";
import { mainView } from "./views/mainView";

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
