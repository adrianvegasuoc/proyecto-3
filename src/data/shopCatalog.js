const EXTERIOR_WORLDS = [
  { worldId: "digital", displayName: "Cultura Digital", levels: 3, locked: false },
  { worldId: "html", displayName: "HTML", levels: 3, locked: true },
];

const EXTERIOR_PRICE_SEQUENCE = [
  0, 120, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620,
];

let exteriorTierCounter = 0;
const exteriorItems = EXTERIOR_WORLDS.flatMap(
  ({ worldId, displayName, levels, locked }) =>
    Array.from({ length: levels }).map((_, index) => {
      exteriorTierCounter += 1;
      const levelNumber = index + 1;
      const price =
        EXTERIOR_PRICE_SEQUENCE[exteriorTierCounter - 1] ??
        EXTERIOR_PRICE_SEQUENCE[EXTERIOR_PRICE_SEQUENCE.length - 1] +
          (exteriorTierCounter - EXTERIOR_PRICE_SEQUENCE.length) * 40;

      return {
        id: `ext_${worldId}_${levelNumber}`,
        category: "exterior",
        worldId,
        tier: exteriorTierCounter,
        name: `${displayName} ${levelNumber}`,
        price,
        status: locked ? "locked" : "available",
        visualClass: "shop-visual-exterior",
        visualAsset: `/assets/games/background/world_${worldId}/background_${levelNumber}.jpg`,
      };
    })
);

const characterItems = [
  {
    id: "char_tier1",
    category: "personaje",
    tier: 1,
    name: "Explorador Base",
    price: 0,
    status: "available",
    slot: "full",
    visualClass: "shop-visual-character",
    visualAsset: "/assets/shop/player/player_1.png",
  },
  {
    id: "char_tier2",
    category: "personaje",
    tier: 2,
    name: "Analista Urbano",
    price: 90,
    status: "available",
    slot: "full",
    visualClass: "shop-visual-character",
    visualAsset: "/assets/shop/player/player_2.png",
  },
  {
    id: "char_tier3",
    category: "personaje",
    tier: 3,
    name: "Centinela Holo",
    price: 140,
    status: "available",
    slot: "full",
    visualClass: "shop-visual-character",
    visualAsset: "/assets/shop/player/player_3.png",
  },
];

const upgradeItems = [
  {
    id: "upgrade_coin_magnet",
    category: "mejoras",
    name: "Imán de Monedas",
    price: 200,
    status: "locked",
    visualClass: "shop-visual-magnet",
  },
  {
    id: "upgrade_time_dilator",
    category: "mejoras",
    name: "Dilatar Tiempo",
    price: 240,
    status: "locked",
    visualClass: "shop-visual-time",
  },
  {
    id: "upgrade_xp_booster",
    category: "mejoras",
    name: "Booster de XP",
    price: 260,
    status: "locked",
    visualClass: "shop-visual-xp",
  },
];

export const SHOP_ITEMS = [...exteriorItems, ...characterItems, ...upgradeItems];
