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
import * as digitalLevel1Game from "./games/digitalLevel1Game"; // importación del juego Digital Nivel 1
import * as digitalLevel2Game from "./games/digitalLevel2Game"; // importación del juego Digital Nivel 2
import * as digitalLevel3Game from "./games/digitalLevel3Game"; // importación del juego Digital Nivel 3

import { uiState } from "./state/uiState";
import { loadGameState, saveGameState } from "./state/persistence";
import {
  addCoins,
  buyShopItem,
  completeLevel,
  getState,
  resetState,
  setPlayerName,
} from "./state/state";

// Navegar a una vista específica y actualizar el estado UI
function goTo(viewName) {
  // Si salimos de la vista de juego, apagamos minijuegos
  if (uiState.currentView === "game" && viewName !== "game") {
    digitalLevel1Game.stopDigitalLevel1();
    digitalLevel2Game.stopDigitalLevel2();
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

    const buyButton = target.closest('[data-action="buy-item"]');
    if (buyButton) {
      const itemId = buyButton.getAttribute("data-item-id");
      if (!itemId) return;

      const result = buyShopItem(itemId);
      if (result?.success) {
        goTo(uiState.currentView || "shopItems");
      } else {
        if (result?.reason === "NO_COINS") {
          window.alert("No tienes suficientes monedas.");
        }
        console.warn("Compra no disponible:", result?.reason || "unknown");
      }
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

    // ---------- Minijuegos Mundo Digital ----------
    // Elección en juego digital
    const digitalChoiceNode = target.closest('[data-action="digital-choice"]');
    if (digitalChoiceNode) {
      const choice = digitalChoiceNode.getAttribute("data-choice");
      const root = document.getElementById("digital-game-panel");
      if (!root) return;

      const level = String(uiState.currentLevel || "");
      if (level === "1") {
        digitalLevel1Game.handleDigitalChoice(choice, root);
      } else if (level === "2") {
        digitalLevel2Game.handleDigitalLevel2Choice(choice, root);
      } else if (level === "3") {
        digitalLevel3Game.handleDigitalLevel3Choice(choice, root);
      }
      return;
    }

    // Reiniciar el juego digital
    const restartNode = target.closest('[data-action="digital-restart"]');
    if (restartNode) {
      const root = document.getElementById("digital-game-panel");
      if (!root) return;

      const level = String(uiState.currentLevel || "");
      if (level === "1") {
        digitalLevel1Game.restartDigitalLevel1(root);
      } else if (level === "2") {
        digitalLevel2Game.restartDigitalLevel2(root);
      } else if (level === "3") {
        digitalLevel3Game.restartDigitalLevel3(root);
      }
      return;
    }

    // Salir del juego digital
    const exitNode = target.closest('[data-action="digital-exit"]');
    if (exitNode) {
      digitalLevel1Game.stopDigitalLevel1();
      digitalLevel2Game.stopDigitalLevel2();
      digitalLevel3Game.stopDigitalLevel3();
      goTo("worldDetail");
      return;
    }
  });
}

// Inicializar el juego actual según uiState
function initCurrentGame() {
  const worldId = uiState.currentWorld;
  const level = String(uiState.currentLevel || "");

  if (worldId !== "digital") return;

  const root = document.getElementById("digital-game-panel");
  if (!root) return;

  // Apagamos cualquier otro nivel por seguridad
  digitalLevel1Game.stopDigitalLevel1();
  digitalLevel2Game.stopDigitalLevel2();
  digitalLevel3Game.stopDigitalLevel3();

  if (level === "1") {
    digitalLevel1Game.startDigitalLevel1(root);
  } else if (level === "2") {
    digitalLevel2Game.startDigitalLevel2(root);
  } else if (level === "3") {
    digitalLevel3Game.startDigitalLevel3(root);
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
