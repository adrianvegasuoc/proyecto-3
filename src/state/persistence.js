import { getState, replaceState, resetState } from "./state";

const STORAGE_KEY = "proyecto3-game-state";

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      resetState();
      return;
    }
    const parsed = JSON.parse(raw);
    replaceState(parsed);
  } catch (e) {
    console.error("Error cargando estado, reseteando...", e);
    resetState();
  }
}

export function saveGameState() {
  try {
    const state = getState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Error guardando estado", e);
  }
}
