const DEFAULT_STATE = {
  player: {
    name: "NUEVO JUGADOR",
    level: 1,
    experience: 0,
  },
  currency: {
    coins: 0,
  },
  worlds: [
    {
      id: "digital",
      name: "MUNDO CULTURA DIGITAL",
      levels: 4,
      completedLevels: [],
    },
    {
      id: "html",
      name: "MUNDO HTML",
      levels: 4,
      completedLevels: [],
    },
    {
      id: "css",
      name: "MUNDO CSS",
      levels: 4,
      completedLevels: [],
    },
    {
      id: "logica",
      name: "MUNDO LÓGICA",
      levels: 4,
      completedLevels: [],
    },
  ],
  achievements: [],
  shop: {
    ownedItems: [],
  },
  stats: {
    totalGames: 0,
    totalWins: 0,
    totalTimePlayed: 0,
  },
};

let state = cloneDefault();

function cloneDefault() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

export function getState() {
  return state;
}

export function replaceState(newState) {
  state = newState;
}

export function resetState() {
  state = cloneDefault();
}

// Helpers sencillos que usaremos luego
export function addCoins(amount) {
  state.currency.coins += amount;
  if (state.currency.coins < 0) state.currency.coins = 0;
}

// Marca un nivel como completado en un mundo
export function completeLevel(worldId, level) {
  const numericLevel = Number(level);
  const world = state.worlds.find((w) => w.id === worldId);
  if (!world) return;

  if (!world.completedLevels.includes(numericLevel)) {
    world.completedLevels.push(numericLevel);
  }

  state.stats.totalGames += 1;
  state.stats.totalWins += 1;
}

// Actualiza el nombre del jugador
export function setPlayerName(name) {
  state.player.name = name && name.trim() ? name.trim() : "NUEVO JUGADOR";
}

// Actualiza experiencia al jugador
export function addExperience(amount) {
  state.player.experience += amount;
  // Lógica para subir de nivel si se alcanza cierto umbral
}
