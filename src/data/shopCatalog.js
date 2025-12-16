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
        visualAsset: `assets/games/background/world_${worldId}/background_${levelNumber}.jpg`,
      };
    })
);

const CHARACTER_ITEMS_DEFINITION = [
  { tier: 2, name: "Silla nivel 1", price: 120, assetIndex: 2, locked: false },
  { tier: 3, name: "Mesa nivel 1", price: 180, assetIndex: 3, locked: false },
  { tier: 4, name: "Pantalla nivel 1", price: 240, assetIndex: 4, locked: false },
  { tier: 5, name: "Chaqueta roja", price: 320, assetIndex: 4, locked: true },
  { tier: 6, name: "Pantalón chandal", price: 360, assetIndex: 4, locked: true },
  { tier: 7, name: "Silla nivel 2", price: 400, assetIndex: 4, locked: true },
  { tier: 8, name: "Mesa nivel 2", price: 440, assetIndex: 4, locked: true },
  { tier: 9, name: "Pantalla nivel 2", price: 480, assetIndex: 4, locked: true },
  { tier: 10, name: "Chanqueta capucha", price: 520, assetIndex: 4, locked: true },
];

const characterItems = CHARACTER_ITEMS_DEFINITION.map(
  ({ tier, name, price, assetIndex, locked }) => ({
    id: `char_tier${tier}`,
    category: "personaje",
    tier,
    name,
    price,
    status: locked ? "locked" : "available",
    slot: "full",
    visualClass: "shop-visual-character",
    visualAsset: `assets/shop/player/player_${assetIndex}.png`,
  })
);

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
