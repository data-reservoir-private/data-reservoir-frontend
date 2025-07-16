
// https://stackoverflow.com/questions/68657274/create-type-using-objects-value

const HOST = process.env.NEXT_PUBLIC_API;
/**
 * Shorthand2 untuk validasi API route
 */
export const API_SHORTHAND = Object.freeze({
  THE_SIMS: {
    BUSTIN_OUT_CAREER: `bustin-out-career`,
    CASTAWAY_PRODUCT: `castaway-product`,
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
    BUILDING: 'building'
  },
  FARM_FRENZY: {
    ONE_PRODUCT: 'one-product',
    TWO_PRODUCT: 'two-product',
    TWO_PIZZA_PRODUCT: 'two-pizza-product',
    THREE_PRODUCT: 'three-product',
  },
  PIZZA_FRENZY: '',
  NASI_GORENG: {
    BURNED_FOOD: 'burned-food',
    INGREDIENT: 'ingredient',
    PLATE: 'plate',
    RELIC: 'relic',
    TOOL: 'tool',
    FRIED_RICE: 'fried-rice',
    UPGRADE: 'upgrade'
  },
  TRANSJAKARTA: {
    CORRIDOR: 'corridor',
    BUS_STOP: 'bus-stop',
    STYLE: 'style'
  },
  QUARTZ: {
    SHIPPABLE: 'shippable',
    RECIPE: 'recipe',
    UTENSIL: 'utensil'
  },
  CYGNUS: {
    ARTIFACT: 'artifact',
    MINERAL: 'mineral',
    CROP: 'crop',
    DISH: 'dish',
    NODE: 'node'
  },
  TRANSACTION: {
    SUMMARY: 'summary',
    CATEGORY: 'category',
    MONTHLY: 'monthly',
  }
} as const);

/**
 * Untuk link fetching
 */
export const API_ROUTE = Object.freeze({
  DASHBOARD: `${HOST}/master/dashboard`,
  THE_SIMS: {
    BUSTIN_OUT_CAREER: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.BUSTIN_OUT_CAREER}`,
    CASTAWAY_PRODUCT: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.CASTAWAY_PRODUCT}`,
    FOUR_PC_DISH: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_DISH}`,
    FOUR_PC_ELEMENT: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_ELEMENT}`,
    FOUR_PC_METAL: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_METAL}`,
    FOUR_PC_CRYSTAL: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_CRYSTAL}`,
    FOUR_PC_HARVESTABLE: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_HARVESTABLE}`,
    THREE_PC_DISH: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_DISH}`,
    THREE_PC_GEM_CUT: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_GEM_CUT}`,
    THREE_PC_GEM: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_GEM}`,
    THREE_PC_HARVESTABLE: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_HARVESTABLE}`,
    THREE_PC_METAL: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_METAL}`,
    THREE_PC_PRESERVE_DISH: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_PRESERVE_DISH}`,
    THREE_PC_RAW_GEM: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_RAW_GEM}`,
    THREE_PC_SPREAD_DISH: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.THREE_PC_SPREAD_DISH}`,
    TWO_CONSOLE_CAREER: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.TWO_CONSOLE_CAREER}`,
    TWO_PETS_CONSOLE_CAREER: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.TWO_PETS_CONSOLE_CAREER}`,
    TWO_PETS_CONSOLE_PRODUCT: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT}`,
  },
  HAY_DAY: {
    PRODUCT: `${HOST}/hayday/${API_SHORTHAND.HAY_DAY.PRODUCT}`,
    BUILDING: `${HOST}/hayday/${API_SHORTHAND.HAY_DAY.BUILDING}`
  },
  FARM_FRENZY: {
    ONE_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.ONE_PRODUCT}`,
    TWO_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.TWO_PRODUCT}`,
    TWO_PIZZA_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.TWO_PIZZA_PRODUCT}`,
    THREE_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.THREE_PRODUCT}`,
  },
  PIZZA_FRENZY: `${HOST}/pizza-frenzy/`,
  NASI_GORENG: {
    BURNED_FOOD: `${HOST}/nasi-goreng/${API_SHORTHAND.NASI_GORENG.BURNED_FOOD}`,
    INGREDIENT: `${HOST}/nasi-goreng/${API_SHORTHAND.NASI_GORENG.INGREDIENT}`,
    PLATE: `${HOST}/nasi-goreng/${API_SHORTHAND.NASI_GORENG.PLATE}`,
    RELIC: `${HOST}/nasi-goreng/${API_SHORTHAND.NASI_GORENG.RELIC}`,
    TOOL: `${HOST}/nasi-goreng/${API_SHORTHAND.NASI_GORENG.TOOL}`,
    FRIED_RICE: `${HOST}/nasi-goreng/${API_SHORTHAND.NASI_GORENG.FRIED_RICE}`,
    UPGRADE: `${HOST}/nasi-goreng/${API_SHORTHAND.NASI_GORENG.UPGRADE}`
  },
  TRANSJAKARTA: {
    CORRIDOR: `${HOST}/transjakarta/${API_SHORTHAND.TRANSJAKARTA.CORRIDOR}`,
    BUS_STOP: `${HOST}/transjakarta/${API_SHORTHAND.TRANSJAKARTA.BUS_STOP}`,
    STYLE: `${HOST}/transjakarta/${API_SHORTHAND.TRANSJAKARTA.CORRIDOR}/${API_SHORTHAND.TRANSJAKARTA.STYLE}`
  },
  QUARTZ: {
    SHIPPABLE: `${HOST}/quartz/${API_SHORTHAND.QUARTZ.SHIPPABLE}`,
    RECIPE: `${HOST}/quartz/${API_SHORTHAND.QUARTZ.RECIPE}`,
    UTENSIL: `${HOST}/quartz/${API_SHORTHAND.QUARTZ.UTENSIL}`
  },
  CYGNUS: {
    ARTIFACT: `${HOST}/cygnus/${API_SHORTHAND.CYGNUS.ARTIFACT}`,
    MINERAL: `${HOST}/cygnus/${API_SHORTHAND.CYGNUS.MINERAL}`,
    CROP: `${HOST}/cygnus/${API_SHORTHAND.CYGNUS.CROP}`,
    DISH: `${HOST}/cygnus/${API_SHORTHAND.CYGNUS.DISH}`,
    NODE: `${HOST}/cygnus/${API_SHORTHAND.CYGNUS.NODE}`
  },
  TRANSACTION: {
    SUMMARY: `${HOST}/transaction/${API_SHORTHAND.TRANSACTION.SUMMARY}`,
    CATEGORY: `${HOST}/transaction/${API_SHORTHAND.TRANSACTION.CATEGORY}`,
    MONTHLY: `${HOST}/transaction/${API_SHORTHAND.TRANSACTION.MONTHLY}`,
  }
} as const);
