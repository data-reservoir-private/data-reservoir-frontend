/**
 * Untuk link fetching
 */
export const API_ROUTE = Object.freeze({
  DASHBOARD: {
    BASE: '/master/dashboard',
    THE_SIMS: '/master/dashboard/the_sims',
    HAYDAY: '/master/dashboard/hayday',
    FARM_FRENZY: '/master/dashboard/farm_frenzy',
    PIZZA_FRENZY: '/master/dashboard/pizza_frenzy',
    NASI_GORENG: '/master/dashboard/nasi_goreng',
    SEASONS: '/master/dashboard/seasons',
    CYGNUS: '/master/dashboard/cygnus',
    TRANSACTION: '/master/dashboard/transaction',
    TRANSJAKARTA: '/master/dashboard/transjakarta',
  },
  THE_SIMS: {
    BUSTIN_OUT_CAREER: '/the-sims/bustin-out-career',
    CASTAWAY_PRODUCT: {
      BASE: '/the-sims/castaway-product',
      ID: (id: string) => `/the-sims/castaway-product/${id}`
    },
    FOUR_PC_CANNED_DISH: {
      BASE: '/the-sims/four-pc-canned-dish',
      ID: (id: string) => `/the-sims/four-pc-canned-dish/${id}`
    },
    FOUR_PC_DISH: {
      BASE: '/the-sims/four-pc-dish',
      ID: (id: string) => `/the-sims/four-pc-dish/${id}`
    },
    FOUR_PC_ELEMENT: {
      BASE: '/the-sims/four-pc-element',
      ID: (id: string) => `/the-sims/four-pc-element/${id}`
    },
    FOUR_PC_METAL: {
      BASE: '/the-sims/four-pc-metal',
      ID: (id: string) => `/the-sims/four-pc-metal/${id}`
    },
    FOUR_PC_CRYSTAL: {
      BASE: '/the-sims/four-pc-crystal',
      ID: (id: string) => `/the-sims/four-pc-crystal/${id}`
    },
    FOUR_PC_HARVESTABLE: {
      BASE: '/the-sims/four-pc-harvestable',
      ID: (id: string) => `/the-sims/four-pc-harvestable/${id}`
    },
    THREE_PC_DISH: {
      BASE: '/the-sims/three-pc-dish',
      ID: (id: string) => `/the-sims/three-pc-dish/${id}`
    },
    THREE_PC_GEM_CUT: {
      BASE: '/the-sims/three-pc-gem-cut',
      ID: (id: string) => `/the-sims/three-pc-gem-cut/${id}`
    },
    THREE_PC_GEM: {
      BASE: '/the-sims/three-pc-gem',
      ID: (id: string) => `/the-sims/three-pc-gem/${id}`
    },
    THREE_PC_HARVESTABLE: {
      BASE: '/the-sims/three-pc-harvestable',
      ID: (id: string) => `/the-sims/three-pc-harvestable/${id}`
    },
    THREE_PC_METAL: {
      BASE: '/the-sims/three-pc-metal',
      ID: (id: string) => `/the-sims/three-pc-metal/${id}`
    },
    THREE_PC_PRESERVE_DISH: {
      BASE: '/the-sims/three-pc-preserve-dish',
      ID: (id: string) => `/the-sims/three-pc-preserve-dish/${id}`
    },
    THREE_PC_RAW_GEM: {
      BASE: '/the-sims/three-pc-raw-gem',
      ID: (id: string) => `/the-sims/three-pc-raw-gem/${id}`
    },
    THREE_PC_SPREAD_DISH: {
      BASE: '/the-sims/three-pc-spread-dish',
      ID: (id: string) => `/the-sims/three-pc-spread-dish/${id}`
    },
    TWO_CONSOLE_CAREER: '/the-sims/two-console-career',
    TWO_PETS_CONSOLE_CAREER: '/the-sims/two-pets-console-career',
    TWO_PETS_CONSOLE_PRODUCT: {
      BASE: '/the-sims/two-pets-console-product',
      ID: (id: string) => `/the-sims/two-pets-console-product/${id}`
    },
  },
  HAY_DAY: {
    PRODUCT: {
      BASE: '/hayday/product',
      ID: (id: string) => `/hayday/product/${id}`
    },
    BUILDING: {
      BASE: '/hayday/building',
      ID: (id: string) => `/hayday/building/${id}`
    },
    ORDER: {
      SUMMARY: '/hayday/order/summary',
      CLIENT: '/hayday/order/client',
      DISTRIBUTION: '/hayday/order/distribution',
      PRODUCT: '/hayday/order/product',
      VALUABLE: '/hayday/order/valuable',
      WEEKLY: '/hayday/order/weekly',
      MONTHLY: '/hayday/order/monthly',
      DAILY: '/hayday/order/daily',
      EXPORT: '/hayday/order/export'
    }
  },
  FARM_FRENZY: {
    ONE_PRODUCT: {
      BASE: '/farm-frenzy/one-product',
      ID: (id: string) => `/farm-frenzy/one-product/${id}`
    },
    TWO_PRODUCT: {
      BASE: '/farm-frenzy/two-product',
      ID: (id: string) => `/farm-frenzy/two-product/${id}`
    },
    TWO_PIZZA_PRODUCT: {
      BASE: '/farm-frenzy/two-pizza-product',
      ID: (id: string) => `/farm-frenzy/two-pizza-product/${id}`
    },
    HURRICANE: {
      BASE: '/farm-frenzy/hurricane',
      ID: (id: string) => `/farm-frenzy/hurricane/${id}`
    },
    THREE_PRODUCT: {
      BASE: '/farm-frenzy/three-product',
      ID: (id: string) => `/farm-frenzy/three-product/${id}`
    },
  },
  PIZZA_FRENZY: {
    TOPPING: {
      BASE: '/pizza-frenzy/topping',
      ID: (id: string) => `/pizza-frenzy/topping/${id}`
    }
  },
  NASI_GORENG: {
    BURNED_FOOD: {
      BASE: '/nasi-goreng/burned-food',
      ID: (id: string) => `/nasi-goreng/burned-food/${id}`
    },
    INGREDIENT: {
      BASE: '/nasi-goreng/ingredient',
      ID: (id: string) => `/nasi-goreng/ingredient/${id}`
    },
    PLATE: {
      BASE: '/nasi-goreng/plate',
      ID: (id: string) => `/nasi-goreng/plate/${id}`
    },
    RELIC: {
      BASE: '/nasi-goreng/relic',
      ID: (id: string) => `/nasi-goreng/relic/${id}`
    },
    TOOL: {
      BASE: '/nasi-goreng/tool',
      ID: (id: string) => `/nasi-goreng/tool/${id}`
    },
    FRIED_RICE: {
      BASE: '/nasi-goreng/fried-rice',
      ID: (id: string) => `/nasi-goreng/fried-rice/${id}`
    },
    UPGRADE: {
      BASE: '/nasi-goreng/upgrade',
      ID: (id: string) => `/nasi-goreng/upgrade/${id}`
    }
  },
  PERIODIC_TABLE_ELEMENT: '/periodic-table/element',
  SEASONS: {
    DS_MINERAL_SHIPPABLE: {
      BASE: '/seasons/ds-mineral-shippable',
      ID: (id: string) => `/seasons/ds-mineral-shippable/${id}`
    },
    DS_MINERAL_CROP: {
      BASE: '/seasons/ds-mineral-crop',
      ID: (id: string) => `/seasons/ds-mineral-crop/${id}`
    },
    DS_MINERAL_RECIPE: {
      BASE: '/seasons/ds-mineral-recipe',
      ID: (id: string) => `/seasons/ds-mineral-recipe/${id}`
    },
    DS_MINERAL_UTENSIL: {
      BASE: '/seasons/ds-mineral-utensil',
      ID: (id: string) => `/seasons/ds-mineral-utensil/${id}`
    },

    DS_BAZAAR_RECIPE: {
      BASE: '/seasons/ds-bazaar-recipe',
      ID: (id: string) => `/seasons/ds-bazaar-recipe/${id}`
    },
    DS_BAZAAR_SEED: '/seasons/ds-bazaar-seed',
    DS_BAZAAR_CROP: {
      BASE: '/seasons/ds-bazaar-crop',
      ID: (id: string) => `/seasons/ds-bazaar-crop/${id}`
    },
    DS_BAZAAR_WINDMILL_PRODUCT: {
      BASE: '/seasons/ds-bazaar-windmill-product',
      ID: (id: string) => `/seasons/ds-bazaar-windmill-product/${id}`
    },
    DS_BAZAAR_ANIMAL_PRODUCT: {
      BASE: '/seasons/ds-bazaar-animal-product',
      ID: (id: string) => `/seasons/ds-bazaar-animal-product/${id}`
    },
    DS_BAZAAR_WILD_PRODUCT: {
      BASE: '/seasons/ds-bazaar-wild-product',
      ID: (id: string) => `/seasons/ds-bazaar-wild-product/${id}`
    },

    DS_TWO_TOWNS_CROP: {
      BASE: '/seasons/ds-two-towns-crop',
      ID: (id: string) => `/seasons/ds-two-towns-crop/${id}`
    },
    DS_TWO_TOWNS_FISHING_CATCH: {
      BASE: '/seasons/ds-two-towns-fishing-catch',
      ID: (id: string) => `/seasons/ds-two-towns-fishing-catch/${id}`
    },
    DS_TWO_TOWNS_PRODUCT: {
      BASE: '/seasons/ds-two-towns-product',
      ID: (id: string) => `/seasons/ds-two-towns-product/${id}`
    },
    DS_TWO_TOWNS_RECIPE: {
      BASE: '/seasons/ds-two-towns-recipe',
      ID: (id: string) => `/seasons/ds-two-towns-recipe/${id}`
    },
    DS_TWO_TOWNS_TREE: {
      BASE: '/seasons/ds-two-towns-tree',
      ID: (id: string) => `/seasons/ds-two-towns-tree/${id}`
    },
  },
  CYGNUS: {
    ARTIFACT: {
      BASE: '/cygnus/artifact',
      ID: (id: string) => `/cygnus/artifact/${id}`
    },
    MINERAL: {
      BASE: '/cygnus/mineral',
      ID: (id: string) => `/cygnus/mineral/${id}`
    },
    CROP: {
      BASE: '/cygnus/crop',
      ID: (id: string) => `/cygnus/crop/${id}`
    },
    DISH: {
      BASE: '/cygnus/dish',
      ID: (id: string) => `/cygnus/dish/${id}`
    },
    FORAGE: {
      BASE: '/cygnus/forage',
      ID: (id: string) => `/cygnus/forage/${id}`
    },
    NODE: {
      BASE: '/cygnus/node',
      ID: (id: string) => `/cygnus/node/${id}`
    }
  },
  TRANSACTION: {
    ANNUAL: '/transaction/annual',
    EXPORT: '/transaction/export',
    EXPORT_FLATTENED: '/transaction/export-flat',
    BREAKDOWN: {
      TOP: '/transaction/breakdown/top',
      INCOME: '/transaction/breakdown/income',
      DAILY: '/transaction/breakdown/daily',
      MONTHLY: '/transaction/breakdown/monthly',
      CATEGORY: '/transaction/breakdown/category',
    }
  },
  TRANSJAKARTA: {
    CORRIDOR: {
      BASE: '/transjakarta/corridor',
      ID: (id: string) => `/transjakarta/corridor/${id}`
    },
  }
} as const);
