import "./styles/style.css";
import { registerView, navigateTo } from "./router.js";

import { mainView } from "./views/mainView";
import { worldView } from "./views/worldView";
import { medalView } from "./views/medalView";
import { shopView } from "./views/shopView";
import { shopItemsView } from "./views/shopItemsView";
import { statsView } from "./views/statsView";
import { gameView } from "./views/gameView";
import { menuOverlayView } from "./views/menuOverlayView.js";
import { profileEditView } from "./views/profileEditView.js";
import * as digitalLevel1Game from "./games/digitalLevel1Game"; // importación del juego

import { uiState } from "./state/uiState";
import { loadGameState, saveGameState } from "./state/persistence";
import {
  addCoins,
  completeLevel,
  getState,
  resetState,
  setPlayerName,
} from "./state/state";

// Navegar a una vista específica y actualizar el estado UI
function goTo(viewName) {
  // Si salimos de la vista de juego, apagamos el minijuego
  if (uiState.currentView === "game" && viewName !== "game") {
    digitalLevel1Game.stopDigitalLevel1();
  }

  uiState.currentView = viewName;
  navigateTo(viewName);

  if (viewName === "game") {
    initCurrentGame();
  }
}

function setupNavigation() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    // Navegación general por vistas
    if (target.matches("[data-view]")) {
      const viewName = target.getAttribute("data-view");
      goTo(viewName);
      return;
    }

    // Selección de mundo
    if (target.matches("[data-world]")) {
      const worldKey = target.getAttribute("data-world");
      uiState.currentWorld = worldKey;
      uiState.currentLevel = null;
      goTo("worldDetail");
      return;
    }

    // Selección de nivel
    if (target.matches("[data-world-level]")) {
      const level = target.getAttribute("data-world-level");
      uiState.currentLevel = level;
      goTo("worldDetail");
      return;
    }

    // Tienda
    if (target.matches("[data-shop-section]")) {
      const section = target.getAttribute("data-shop-section");
      uiState.currentShopSection = section;
      goTo("shopItems");
      return;
    }

    // Menú superior
    if (target.matches('[data-action="open-menu"]')) {
      uiState.returnView = uiState.currentView;
      navigateTo("menuOverlay");
      return;
    }

    if (target.matches('[data-action="close-menu"]')) {
      const back = uiState.returnView || "main";
      goTo(back);
      return;
    }

    // Perfil
    if (target.matches('[data-action="open-profile-edit"]')) {
      uiState.returnView = uiState.currentView || "main";
      navigateTo("profileEdit");
      return;
    }

    if (target.matches('[data-action="save-profile"]')) {
      const input = document.getElementById("profile-name-input");
      if (input) {
        setPlayerName(input.value);
        saveGameState();
      }
      const back = uiState.returnView || "main";
      goTo(back);
      return;
    }

    if (target.matches('[data-action="cancel-profile"]')) {
      const back = uiState.returnView || "main";
      goTo(back);
      return;
    }

    // Simular victoria genérica (niveles futuros)
    if (target.matches('[data-action="win-level"]')) {
      const worldId = uiState.currentWorld;
      const level = uiState.currentLevel;
      if (!worldId || !level) return;

      addCoins(20);
      completeLevel(worldId, level);
      saveGameState();
      goTo("worldDetail");
      return;
    }

    // ---------- Minijuego Digital Nivel 1 ----------

    // FIABLE / DUDOSO
    const digitalChoiceNode = target.closest('[data-action="digital-choice"]');
    if (digitalChoiceNode) {
      const choice = digitalChoiceNode.getAttribute("data-choice"); // 'reliable' / 'doubtful'
      const root = document.getElementById("digital-game-panel");
      if (root) {
        digitalLevel1Game.handleDigitalChoice(choice, root);
      }
      return;
    }

    // REPETIR NIVEL
    const restartNode = target.closest('[data-action="digital-restart"]');
    if (restartNode) {
      const root = document.getElementById("digital-game-panel");
      if (root) {
        digitalLevel1Game.restartDigitalLevel1(root);
      }
      return;
    }

    // VOLVER AL MUNDO
    const exitNode = target.closest('[data-action="digital-exit"]');
    if (exitNode) {
      digitalLevel1Game.stopDigitalLevel1();
      goTo("worldDetail");
      return;
    }
  });
}

// Inicializar el juego actual según uiState
function initCurrentGame() {
  const worldId = uiState.currentWorld;
  const level = uiState.currentLevel;

  if (worldId === "digital" && String(level) === "1") {
    const root = document.getElementById("digital-game-panel");
    if (root) {
      digitalLevel1Game.startDigitalLevel1(root);
    }
  }
}

registerView("main", mainView);
registerView("worldDetail", worldView); // detalle de mundo
registerView("medals", medalView); // vista de medallas
registerView("shop", shopView); // vista de tienda
registerView("shopItems", shopItemsView); // vista de items de tienda
registerView("stats", statsView); // vista de estadísticas
registerView("game", gameView); // vista del juego
registerView("menuOverlay", menuOverlayView); // vista de menú
registerView("profileEdit", profileEditView); // vista de edición de perfil

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
