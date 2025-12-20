const SHOP_CATEGORY_CONFIG = {
  exterior: {
    visualClass: "shop-visual-exterior",
    resolveAsset: ({ worldId, levelNumber }) =>
      `assets/games/background/world_${worldId}/background_${levelNumber}.jpg`,
  },
  personaje: {
    visualClass: "shop-visual-character",
    resolveAsset: ({ assetIndex }) => `assets/shop/player/player_${assetIndex}.png`,
  },
};

const EXTERIOR_WORLDS = [
  {
    worldId: "digital",
    displayName: "Cultura Digital",
    levels: 3,
    locked: false,
  },
  { worldId: "html", displayName: "HTML", levels: 3, locked: true },
];

const EXTERIOR_PRICE_SEQUENCE = [
  0, 70, 90, 120, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620,
];

const createExteriorDefinitions = () => {
  let exteriorTierCounter = 0;
  return EXTERIOR_WORLDS.flatMap(
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
          levelNumber,
          tier: exteriorTierCounter,
          name: `${displayName} ${levelNumber}`,
          price,
          locked,
        };
      })
  );
};

const CHARACTER_ITEMS_DEFINITION = [
  { tier: 2, name: "Silla nivel 1", price: 20, assetIndex: 2, locked: false },
  { tier: 3, name: "Mesa nivel 1", price: 40, assetIndex: 3, locked: false },
  {
    tier: 4,
    name: "Pantalla nivel 1",
    price: 60,
    assetIndex: 4,
    locked: false,
  },
  { tier: 5, name: "Chaqueta roja", price: 120, assetIndex: 4, locked: true },
  {
    tier: 6,
    name: "Pantalón chandal",
    price: 180,
    assetIndex: 4,
    locked: true,
  },
  { tier: 7, name: "Silla nivel 2", price: 200, assetIndex: 4, locked: true },
  { tier: 8, name: "Mesa nivel 2", price: 200, assetIndex: 4, locked: true },
  {
    tier: 9,
    name: "Pantalla nivel 2",
    price: 240,
    assetIndex: 4,
    locked: true,
  },
  {
    tier: 10,
    name: "Chanqueta capucha",
    price: 300,
    assetIndex: 4,
    locked: true,
  },
];

const createCharacterDefinitions = () =>
  CHARACTER_ITEMS_DEFINITION.map((item) => ({
    id: `char_tier${item.tier}`,
    category: "personaje",
    slot: "full",
    ...item,
  }));

const UPGRADE_ITEMS_DEFINITION = [
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

const normalizeShopItem = (definition) => {
  const { locked, ...item } = definition;
  const categoryConfig = SHOP_CATEGORY_CONFIG[item.category] ?? {};

  return {
    ...item,
    status: item.status ?? (locked ? "locked" : "available"),
    visualClass: item.visualClass ?? categoryConfig.visualClass ?? "",
    visualAsset:
      item.visualAsset ??
      (categoryConfig.resolveAsset ? categoryConfig.resolveAsset(item) : undefined),
  };
};

const SHOP_ITEM_DEFINITIONS = [
  ...createExteriorDefinitions(),
  ...createCharacterDefinitions(),
  ...UPGRADE_ITEMS_DEFINITION,
];

export const SHOP_ITEMS = SHOP_ITEM_DEFINITIONS.map(normalizeShopItem);
