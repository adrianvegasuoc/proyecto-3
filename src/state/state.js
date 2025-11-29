const DEFAULT_STATE = {
  player: {
    name: "Jugador",
    level: 1,
    experience: 0,
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
