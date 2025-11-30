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
  achievements: [], // ids desbloqueados
  shop: {
    ownedItems: [],
  },
  stats: {
    totalGames: 0,
    totalWins: 0,
    totalTimePlayed: 0,
  },
};

const ACHIEVEMENTS_CATALOG = [
  // --- NIVELES POR MUNDO (1–4) ---

  // Mundo Cultura Digital
  {
    id: "digital_lvl1",
    type: "level",
    worldId: "digital",
    level: 1,
    name: "Mundo Cultura Digital - Nivel 1",
    short: "Digital N1",
    description: "Completa el Nivel 1 de Mundo Cultura Digital.",
  },
  {
    id: "digital_lvl2",
    type: "level",
    worldId: "digital",
    level: 2,
    name: "Mundo Cultura Digital - Nivel 2",
    short: "Digital N2",
    description: "Completa el Nivel 2 de Mundo Cultura Digital.",
  },
  {
    id: "digital_lvl3",
    type: "level",
    worldId: "digital",
    level: 3,
    name: "Mundo Cultura Digital - Nivel 3",
    short: "Digital N3",
    description: "Completa el Nivel 3 de Mundo Cultura Digital.",
  },
  {
    id: "digital_lvl4",
    type: "level",
    worldId: "digital",
    level: 4,
    name: "Mundo Cultura Digital - Nivel 4",
    short: "Digital N4",
    description: "Completa el Nivel 4 de Mundo Cultura Digital.",
  },

  // Mundo HTML
  {
    id: "html_lvl1",
    type: "level",
    worldId: "html",
    level: 1,
    name: "Mundo HTML - Nivel 1",
    short: "HTML N1",
    description: "Completa el Nivel 1 de Mundo HTML.",
  },
  {
    id: "html_lvl2",
    type: "level",
    worldId: "html",
    level: 2,
    name: "Mundo HTML - Nivel 2",
    short: "HTML N2",
    description: "Completa el Nivel 2 de Mundo HTML.",
  },
  {
    id: "html_lvl3",
    type: "level",
    worldId: "html",
    level: 3,
    name: "Mundo HTML - Nivel 3",
    short: "HTML N3",
    description: "Completa el Nivel 3 de Mundo HTML.",
  },
  {
    id: "html_lvl4",
    type: "level",
    worldId: "html",
    level: 4,
    name: "Mundo HTML - Nivel 4",
    short: "HTML N4",
    description: "Completa el Nivel 4 de Mundo HTML.",
  },

  // Mundo CSS
  {
    id: "css_lvl1",
    type: "level",
    worldId: "css",
    level: 1,
    name: "Mundo CSS - Nivel 1",
    short: "CSS N1",
    description: "Completa el Nivel 1 de Mundo CSS.",
  },
  {
    id: "css_lvl2",
    type: "level",
    worldId: "css",
    level: 2,
    name: "Mundo CSS - Nivel 2",
    short: "CSS N2",
    description: "Completa el Nivel 2 de Mundo CSS.",
  },
  {
    id: "css_lvl3",
    type: "level",
    worldId: "css",
    level: 3,
    name: "Mundo CSS - Nivel 3",
    short: "CSS N3",
    description: "Completa el Nivel 3 de Mundo CSS.",
  },
  {
    id: "css_lvl4",
    type: "level",
    worldId: "css",
    level: 4,
    name: "Mundo CSS - Nivel 4",
    short: "CSS N4",
    description: "Completa el Nivel 4 de Mundo CSS.",
  },

  // Mundo Lógica
  {
    id: "logica_lvl1",
    type: "level",
    worldId: "logica",
    level: 1,
    name: "Mundo Lógica - Nivel 1",
    short: "Lógica N1",
    description: "Completa el Nivel 1 de Mundo Lógica.",
  },
  {
    id: "logica_lvl2",
    type: "level",
    worldId: "logica",
    level: 2,
    name: "Mundo Lógica - Nivel 2",
    short: "Lógica N2",
    description: "Completa el Nivel 2 de Mundo Lógica.",
  },
  {
    id: "logica_lvl3",
    type: "level",
    worldId: "logica",
    level: 3,
    name: "Mundo Lógica - Nivel 3",
    short: "Lógica N3",
    description: "Completa el Nivel 3 de Mundo Lógica.",
  },
  {
    id: "logica_lvl4",
    type: "level",
    worldId: "logica",
    level: 4,
    name: "Mundo Lógica - Nivel 4",
    short: "Lógica N4",
    description: "Completa el Nivel 4 de Mundo Lógica.",
  },

  // --- MUNDO COMPLETO ---

  {
    id: "digital_world_complete",
    type: "world_complete",
    worldId: "digital",
    name: "Mundo Cultura Digital Completo",
    short: "Digital OK",
    description: "Completa todos los niveles de Mundo Cultura Digital.",
  },
  {
    id: "html_world_complete",
    type: "world_complete",
    worldId: "html",
    name: "Mundo HTML Completo",
    short: "HTML OK",
    description: "Completa todos los niveles de Mundo HTML.",
  },
  {
    id: "css_world_complete",
    type: "world_complete",
    worldId: "css",
    name: "Mundo CSS Completo",
    short: "CSS OK",
    description: "Completa todos los niveles de Mundo CSS.",
  },
  {
    id: "logica_world_complete",
    type: "world_complete",
    worldId: "logica",
    name: "Mundo Lógica Completo",
    short: "Lógica OK",
    description: "Completa todos los niveles de Mundo Lógica.",
  },

  // --- MONEDAS ---

  // Primeros pequeños
  {
    id: "coins_10",
    type: "coins",
    threshold: 10,
    name: "10 Monedas",
    short: "10 monedas",
    description: "Alcanza 10 monedas acumuladas.",
  },
  {
    id: "coins_25",
    type: "coins",
    threshold: 25,
    name: "25 Monedas",
    short: "25 monedas",
    description: "Alcanza 25 monedas acumuladas.",
  },
  {
    id: "coins_50",
    type: "coins",
    threshold: 50,
    name: "50 Monedas",
    short: "50 monedas",
    description: "Alcanza 50 monedas acumuladas.",
  },

  // De 100 en 100 hasta 1000
  {
    id: "coins_100",
    type: "coins",
    threshold: 100,
    name: "100 Monedas",
    short: "100 monedas",
    description: "Alcanza 100 monedas acumuladas.",
  },
  {
    id: "coins_200",
    type: "coins",
    threshold: 200,
    name: "200 Monedas",
    short: "200 monedas",
    description: "Alcanza 200 monedas acumuladas.",
  },
  {
    id: "coins_300",
    type: "coins",
    threshold: 300,
    name: "300 Monedas",
    short: "300 monedas",
    description: "Alcanza 300 monedas acumuladas.",
  },
  {
    id: "coins_400",
    type: "coins",
    threshold: 400,
    name: "400 Monedas",
    short: "400 monedas",
    description: "Alcanza 400 monedas acumuladas.",
  },
  {
    id: "coins_500",
    type: "coins",
    threshold: 500,
    name: "500 Monedas",
    short: "500 monedas",
    description: "Alcanza 500 monedas acumuladas.",
  },
  {
    id: "coins_600",
    type: "coins",
    threshold: 600,
    name: "600 Monedas",
    short: "600 monedas",
    description: "Alcanza 600 monedas acumuladas.",
  },
  {
    id: "coins_700",
    type: "coins",
    threshold: 700,
    name: "700 Monedas",
    short: "700 monedas",
    description: "Alcanza 700 monedas acumuladas.",
  },
  {
    id: "coins_800",
    type: "coins",
    threshold: 800,
    name: "800 Monedas",
    short: "800 monedas",
    description: "Alcanza 800 monedas acumuladas.",
  },
  {
    id: "coins_900",
    type: "coins",
    threshold: 900,
    name: "900 Monedas",
    short: "900 monedas",
    description: "Alcanza 900 monedas acumuladas.",
  },
  {
    id: "coins_1000",
    type: "coins",
    threshold: 1000,
    name: "1000 Monedas",
    short: "1000 monedas",
    description: "Alcanza 1000 monedas acumuladas.",
  },

  // 3000, 5000, 7000, 10000
  {
    id: "coins_3000",
    type: "coins",
    threshold: 3000,
    name: "3000 Monedas",
    short: "3000 monedas",
    description: "Alcanza 3000 monedas acumuladas.",
  },
  {
    id: "coins_5000",
    type: "coins",
    threshold: 5000,
    name: "5000 Monedas",
    short: "5000 monedas",
    description: "Alcanza 5000 monedas acumuladas.",
  },
  {
    id: "coins_7000",
    type: "coins",
    threshold: 7000,
    name: "7000 Monedas",
    short: "7000 monedas",
    description: "Alcanza 7000 monedas acumuladas.",
  },
  {
    id: "coins_10000",
    type: "coins",
    threshold: 10000,
    name: "10000 Monedas",
    short: "10000 monedas",
    description: "Alcanza 10000 monedas acumuladas.",
  },
];

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

  checkAchievementsAfterCoins();
}

// Marca un nivel como completado
export function completeLevel(worldId, level) {
  const numericLevel = Number(level);
  const world = state.worlds.find((w) => w.id === worldId);
  if (!world) return;

  if (!world.completedLevels.includes(numericLevel)) {
    world.completedLevels.push(numericLevel);
  }

  state.stats.totalGames += 1;
  state.stats.totalWins += 1;

  checkAchievementsAfterLevel(worldId);
}

export function getAchievementsCatalog() {
  return ACHIEVEMENTS_CATALOG;
}

function unlockAchievement(id) {
  if (!state.achievements.includes(id)) {
    state.achievements.push(id);
  }
}

// Comprobar y desbloquear logros tras completar un nivel
function checkAchievementsAfterLevel(worldId) {
  const world = state.worlds.find((w) => w.id === worldId);
  if (!world) return;

  const completed = world.completedLevels || [];

  // 1) Logros de nivel individual
  ACHIEVEMENTS_CATALOG.forEach((ach) => {
    if (ach.type === "level" && ach.worldId === worldId) {
      if (completed.includes(ach.level)) {
        unlockAchievement(ach.id);
      }
    }
  });

  // 2) Logros de mundo completo
  const allLevelsCompleted = completed.length >= world.levels;
  if (allLevelsCompleted) {
    ACHIEVEMENTS_CATALOG.forEach((ach) => {
      if (ach.type === "world_complete" && ach.worldId === worldId) {
        unlockAchievement(ach.id);
      }
    });
  }
}

// Comprobar y desbloquear logros tras añadir monedas
function checkAchievementsAfterCoins() {
  const coins = state.currency.coins;

  ACHIEVEMENTS_CATALOG.forEach((ach) => {
    if (ach.type === "coins" && coins >= ach.threshold) {
      unlockAchievement(ach.id);
    }
  });
}

// Actualiza el nombre del jugador
export function setPlayerName(name) {
  state.player.name = name && name.trim() ? name.trim() : "NUEVO JUGADOR";
}

// Recalcula todos los logros (tras cargar estado)
export function recalculateAllAchievements() {
  // Aseguramos que existe el array
  if (!Array.isArray(state.achievements)) {
    state.achievements = [];
  }

  // Recalcular logros de niveles / mundos
  (state.worlds || []).forEach((world) => {
    if (world && world.id) {
      checkAchievementsAfterLevel(world.id);
    }
  });

  // Recalcular logros de monedas
  checkAchievementsAfterCoins();
}
