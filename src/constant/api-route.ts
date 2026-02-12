/**
 * Untuk link fetching
 */
export const API_ROUTE = Object.freeze({
  DASHBOARD: '/master/dashboard',
  THE_SIMS: {
    BUSTIN_OUT_CAREER: '/the-sims/bustin-out-career',
    CASTAWAY_PRODUCT: '/the-sims/castaway-product',
    FOUR_PC_CANNED_DISH: '/the-sims/four-pc-canned-dish',
    FOUR_PC_DISH: '/the-sims/four-pc-dish',
    FOUR_PC_ELEMENT: '/the-sims/four-pc-element',
    FOUR_PC_METAL: '/the-sims/four-pc-metal',
    FOUR_PC_CRYSTAL: '/the-sims/four-pc-crystal',
    FOUR_PC_HARVESTABLE: '/the-sims/four-pc-harvestable',
    THREE_PC_DISH: '/the-sims/three-pc-dish',
    THREE_PC_GEM_CUT: '/the-sims/three-pc-gem-cut',
    THREE_PC_GEM: '/the-sims/three-pc-gem',
    THREE_PC_HARVESTABLE: '/the-sims/three-pc-harvestable',
    THREE_PC_METAL: '/the-sims/three-pc-metal',
    THREE_PC_PRESERVE_DISH: '/the-sims/three-pc-preserve-dish',
    THREE_PC_RAW_GEM: '/the-sims/three-pc-raw-gem',
    THREE_PC_SPREAD_DISH: '/the-sims/three-pc-spread-dish',
    TWO_CONSOLE_CAREER: '/the-sims/two-console-career',
    TWO_PETS_CONSOLE_CAREER: '/the-sims/two-pets-console-career',
    TWO_PETS_CONSOLE_PRODUCT: '/the-sims/two-pets-console-product',
  },
  HAY_DAY: {
    PRODUCT: '/hayday/product',
    BUILDING: '/hayday/building',
    ORDER: {
      SUMMARY: '/hayday/order/summary',
      CLIENT: '/hayday/order/client',
      DISTRIBUTION: '/hayday/order/distribution',
      PRODUCT: '/hayday/order/product',
      VALUABLE: '/hayday/order/valuable',
      WEEKLY: '/hayday/order/weekly',
      DAILY: '/hayday/order/daily',
    }
  },
  FARM_FRENZY: {
    ONE_PRODUCT: '/farm-frenzy/one-product',
    TWO_PRODUCT: '/farm-frenzy/two-product',
    TWO_PIZZA_PRODUCT: '/farm-frenzy/two-pizza-product',
    HURRICANE: '/farm-frenzy/hurricane',
    THREE_PRODUCT: '/farm-frenzy/three-product',
  },
  PIZZA_FRENZY: {
    TOPPING: '/pizza-frenzy/topping'
  },
  NASI_GORENG: {
    BURNED_FOOD: '/nasi-goreng/burned-food',
    INGREDIENT: '/nasi-goreng/ingredient',
    PLATE: '/nasi-goreng/plate',
    RELIC: '/nasi-goreng/relic',
    TOOL: '/nasi-goreng/tool',
    FRIED_RICE: '/nasi-goreng/fried-rice',
    UPGRADE: '/nasi-goreng/upgrade'
  },
  PERIODIC_TABLE_ELEMENT: '/periodic-table/element',
  TRANSJAKARTA: {
    CORRIDOR: '/transjakarta/corridor',
    BUS_STOP: '/transjakarta/bus-stop',
    STYLE: '/transjakarta/corridor/style'
  },
  SEASONS: {
    DS_MINERAL_SHIPPABLE: '/seasons/ds-mineral-shippable',
    DS_MINERAL_CROP: '/seasons/ds-mineral-crop',
    DS_MINERAL_RECIPE: '/seasons/ds-mineral-recipe',
    DS_MINERAL_UTENSIL: '/seasons/ds-mineral-utensil',

    DS_BAZAAR_RECIPE: '/seasons/ds-bazaar-recipe',
    DS_BAZAAR_SEED: '/seasons/ds-bazaar-seed',
    DS_BAZAAR_CROP: '/seasons/ds-bazaar-crop',
    DS_BAZAAR_WINDMILL_PRODUCT: '/seasons/ds-bazaar-windmill-product',
    DS_BAZAAR_ANIMAL_PRODUCT: '/seasons/ds-bazaar-animal-product',
    DS_BAZAAR_WILD_PRODUCT: '/seasons/ds-bazaar-wild-product',
  },
  CYGNUS: {
    ARTIFACT: '/cygnus/artifact',
    MINERAL: '/cygnus/mineral',
    CROP: '/cygnus/crop',
    DISH: '/cygnus/dish',
    FORAGE: '/cygnus/forage',
    NODE: '/cygnus/node'
  },
  TRANSACTION: {
    ANNUAL: '/transaction/annual',
    MONTHLY: {
      TOP: '/transaction/monthly/top',
      INCOME: '/transaction/monthly/income',
      DAILY: '/transaction/monthly/daily',
      CATEGORY: '/transaction/monthly/category',
    }
  }
} as const);
