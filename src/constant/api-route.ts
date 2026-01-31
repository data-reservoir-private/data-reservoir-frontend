/**
 * Shorthand2 untuk validasi API route
 */
const API_SHORTHAND = Object.freeze({
  THE_SIMS: {
    BUSTIN_OUT_CAREER: `bustin-out-career`,
    CASTAWAY_PRODUCT: `castaway-product`,
    FOUR_PC_CANNED_DISH: `four-pc-canned-dish`,
    FOUR_PC_DISH: `four-pc-dish`,
    FOUR_PC_ELEMENT: `four-pc-element`,
    FOUR_PC_METAL: `four-pc-metal`,
    FOUR_PC_CRYSTAL: `four-pc-crystal`,
    FOUR_PC_HARVESTABLE: `four-pc-harvestable`,
    THREE_PC_DISH: `three-pc-dish`,
    THREE_PC_GEM_CUT: `three-pc-gem-cut`,
    THREE_PC_GEM: `three-pc-gem`,
    THREE_PC_HARVESTABLE: `three-pc-harvestable`,
    THREE_PC_METAL: `three-pc-metal`,
    THREE_PC_PRESERVE_DISH: `three-pc-preserve-dish`,
    THREE_PC_RAW_GEM: `three-pc-raw-gem`,
    THREE_PC_SPREAD_DISH: `three-pc-spread-dish`,
    TWO_CONSOLE_CAREER: `two-console-career`,
    TWO_PETS_CONSOLE_CAREER: `two-pets-console-career`,
    TWO_PETS_CONSOLE_PRODUCT: `two-pets-console-product`,
  },
  HAY_DAY: {
    PRODUCT: 'product',
    BUILDING: 'building',
    ORDER: {
      SUMMARY: 'summary',
      CLIENT: 'client',
      DISTRIBUTION: 'distribution',
      PRODUCT: 'product',
      VALUABLE: 'valuable',
      WEEKLY: 'weekly',
      DAILY: 'daily',
    }
  },
  FARM_FRENZY: {
    ONE_PRODUCT: 'one-product',
    TWO_PRODUCT: 'two-product',
    TWO_PIZZA_PRODUCT: 'two-pizza-product',
    THREE_PRODUCT: 'three-product',
    HURRICANE: 'hurricane',
  },
  PIZZA_FRENZY: {
    TOPPING: 'topping'
  },
  NASI_GORENG: {
    BURNED_FOOD: 'burned-food',
    INGREDIENT: 'ingredient',
    PLATE: 'plate',
    RELIC: 'relic',
    TOOL: 'tool',
    FRIED_RICE: 'fried-rice',
    UPGRADE: 'upgrade'
  },
  PERIODIC_TABLE_ELEMENT: 'element',
  TRANSJAKARTA: {
    CORRIDOR: 'corridor',
    BUS_STOP: 'bus-stop',
    STYLE: 'style'
  },
  SEASONS: {
    DS_MINERAL_SHIPPABLE: 'ds-mineral-shippable',
    DS_MINERAL_CROP: 'ds-mineral-crop',
    DS_MINERAL_RECIPE: 'ds-mineral-recipe',
    DS_MINERAL_UTENSIL: 'ds-mineral-utensil',
    DS_BAZAAR_RECIPE: 'ds-bazaar-recipe',
    DS_BAZAAR_SEED: 'ds-bazaar-seed',
    DS_BAZAAR_CROP: 'ds-bazaar-crop',
    DS_BAZAAR_WINDMILL_PRODUCT: 'ds-bazaar-windmill-product',
    DS_BAZAAR_ANIMAL_PRODUCT: 'ds-bazaar-animal-product',
    DS_BAZAAR_WILD_PRODUCT: 'ds-bazaar-wild-product',
  },
  CYGNUS: {
    ARTIFACT: 'artifact',
    MINERAL: 'mineral',
    CROP: 'crop',
    DISH: 'dish',
    FORAGE: 'forage',
    NODE: 'node'
  },
  TRANSACTION: {
    ANNUAL: 'annual',
    MONTHLY: {
      TOP: 'top',
      INCOME: 'income',
      DAILY: 'daily',
      CATEGORY: 'category',
    },
  }
} as const);

/**
 * Untuk link fetching
 */
export const API_ROUTE = Object.freeze({
  DASHBOARD: `/master/dashboard`,
  THE_SIMS: {
    BUSTIN_OUT_CAREER: `/the-sims/${API_SHORTHAND.THE_SIMS.BUSTIN_OUT_CAREER}`,
    CASTAWAY_PRODUCT: `/the-sims/${API_SHORTHAND.THE_SIMS.CASTAWAY_PRODUCT}`,
    FOUR_PC_CANNED_DISH: `/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_CANNED_DISH}`,
    FOUR_PC_DISH: `/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_DISH}`,
    FOUR_PC_ELEMENT: `/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_ELEMENT}`,
    FOUR_PC_METAL: `/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_METAL}`,
    FOUR_PC_CRYSTAL: `/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_CRYSTAL}`,
    FOUR_PC_HARVESTABLE: `/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_HARVESTABLE}`,
    THREE_PC_DISH: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_DISH}`,
    THREE_PC_GEM_CUT: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_GEM_CUT}`,
    THREE_PC_GEM: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_GEM}`,
    THREE_PC_HARVESTABLE: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_HARVESTABLE}`,
    THREE_PC_METAL: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_METAL}`,
    THREE_PC_PRESERVE_DISH: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_PRESERVE_DISH}`,
    THREE_PC_RAW_GEM: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_RAW_GEM}`,
    THREE_PC_SPREAD_DISH: `/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_SPREAD_DISH}`,
    TWO_CONSOLE_CAREER: `/the-sims/${API_SHORTHAND.THE_SIMS.TWO_CONSOLE_CAREER}`,
    TWO_PETS_CONSOLE_CAREER: `/the-sims/${API_SHORTHAND.THE_SIMS.TWO_PETS_CONSOLE_CAREER}`,
    TWO_PETS_CONSOLE_PRODUCT: `/the-sims/${API_SHORTHAND.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT}`,
  },
  HAY_DAY: {
    PRODUCT: `/hayday/${API_SHORTHAND.HAY_DAY.PRODUCT}`,
    BUILDING: `/hayday/${API_SHORTHAND.HAY_DAY.BUILDING}`,
    ORDER: {
      SUMMARY: `/hayday/order/${API_SHORTHAND.HAY_DAY.ORDER.SUMMARY}`,
      CLIENT: `/hayday/order/${API_SHORTHAND.HAY_DAY.ORDER.CLIENT}`,
      DISTRIBUTION: `/hayday/order/${API_SHORTHAND.HAY_DAY.ORDER.DISTRIBUTION}`,
      PRODUCT: `/hayday/order/${API_SHORTHAND.HAY_DAY.ORDER.PRODUCT}`,
      VALUABLE: `/hayday/order/${API_SHORTHAND.HAY_DAY.ORDER.VALUABLE}`,
      WEEKLY: `/hayday/order/${API_SHORTHAND.HAY_DAY.ORDER.WEEKLY}`,
      DAILY: `/hayday/order/${API_SHORTHAND.HAY_DAY.ORDER.DAILY}`,
    }
  },
  FARM_FRENZY: {
    ONE_PRODUCT: `/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.ONE_PRODUCT}`,
    TWO_PRODUCT: `/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.TWO_PRODUCT}`,
    TWO_PIZZA_PRODUCT: `/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.TWO_PIZZA_PRODUCT}`,
    HURRICANE: `/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.HURRICANE}`,
    THREE_PRODUCT: `/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.THREE_PRODUCT}`,
  },
  PIZZA_FRENZY: {
    TOPPING: `/pizza-frenzy/${API_SHORTHAND.PIZZA_FRENZY.TOPPING}`
  },
  NASI_GORENG: {
    BURNED_FOOD: `/nasi-goreng/${API_SHORTHAND.NASI_GORENG.BURNED_FOOD}`,
    INGREDIENT: `/nasi-goreng/${API_SHORTHAND.NASI_GORENG.INGREDIENT}`,
    PLATE: `/nasi-goreng/${API_SHORTHAND.NASI_GORENG.PLATE}`,
    RELIC: `/nasi-goreng/${API_SHORTHAND.NASI_GORENG.RELIC}`,
    TOOL: `/nasi-goreng/${API_SHORTHAND.NASI_GORENG.TOOL}`,
    FRIED_RICE: `/nasi-goreng/${API_SHORTHAND.NASI_GORENG.FRIED_RICE}`,
    UPGRADE: `/nasi-goreng/${API_SHORTHAND.NASI_GORENG.UPGRADE}`
  },
  PERIODIC_TABLE_ELEMENT: `/periodic-table/${API_SHORTHAND.PERIODIC_TABLE_ELEMENT}`,
  TRANSJAKARTA: {
    CORRIDOR: `/transjakarta/${API_SHORTHAND.TRANSJAKARTA.CORRIDOR}`,
    BUS_STOP: `/transjakarta/${API_SHORTHAND.TRANSJAKARTA.BUS_STOP}`,
    STYLE: `/transjakarta/${API_SHORTHAND.TRANSJAKARTA.CORRIDOR}/${API_SHORTHAND.TRANSJAKARTA.STYLE}`
  },
  SEASONS: {
    DS_MINERAL_SHIPPABLE: `/seasons/${API_SHORTHAND.SEASONS.DS_MINERAL_SHIPPABLE}`,
    DS_MINERAL_CROP: `/seasons/${API_SHORTHAND.SEASONS.DS_MINERAL_CROP}`,
    DS_MINERAL_RECIPE: `/seasons/${API_SHORTHAND.SEASONS.DS_MINERAL_RECIPE}`,
    DS_MINERAL_UTENSIL: `/seasons/${API_SHORTHAND.SEASONS.DS_MINERAL_UTENSIL}`,

    DS_BAZAAR_RECIPE: `/seasons/${API_SHORTHAND.SEASONS.DS_BAZAAR_RECIPE}`,
    DS_BAZAAR_SEED: `/seasons/${API_SHORTHAND.SEASONS.DS_BAZAAR_SEED}`,
    DS_BAZAAR_CROP: `/seasons/${API_SHORTHAND.SEASONS.DS_BAZAAR_CROP}`,
    DS_BAZAAR_WINDMILL_PRODUCT: `/seasons/${API_SHORTHAND.SEASONS.DS_BAZAAR_WINDMILL_PRODUCT}`,
    DS_BAZAAR_ANIMAL_PRODUCT: `/seasons/${API_SHORTHAND.SEASONS.DS_BAZAAR_ANIMAL_PRODUCT}`,
    DS_BAZAAR_WILD_PRODUCT: `/seasons/${API_SHORTHAND.SEASONS.DS_BAZAAR_WILD_PRODUCT}`,
  },
  CYGNUS: {
    ARTIFACT: `/cygnus/${API_SHORTHAND.CYGNUS.ARTIFACT}`,
    MINERAL: `/cygnus/${API_SHORTHAND.CYGNUS.MINERAL}`,
    CROP: `/cygnus/${API_SHORTHAND.CYGNUS.CROP}`,
    DISH: `/cygnus/${API_SHORTHAND.CYGNUS.DISH}`,
    FORAGE: `/cygnus/${API_SHORTHAND.CYGNUS.FORAGE}`,
    NODE: `/cygnus/${API_SHORTHAND.CYGNUS.NODE}`
  },
  TRANSACTION: {
    ANNUAL: `/transaction/${API_SHORTHAND.TRANSACTION.ANNUAL}`,
    MONTHLY: {
      TOP: `/transaction/monthly/${API_SHORTHAND.TRANSACTION.MONTHLY.TOP}`,
      INCOME: `/transaction/monthly/${API_SHORTHAND.TRANSACTION.MONTHLY.INCOME}`,
      DAILY: `/transaction/monthly/${API_SHORTHAND.TRANSACTION.MONTHLY.DAILY}`,
      CATEGORY: `/transaction/monthly/${API_SHORTHAND.TRANSACTION.MONTHLY.CATEGORY}`,
    }
  }
} as const);
