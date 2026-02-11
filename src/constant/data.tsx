import { Route } from "next";
import { API_ROUTE } from "./api-route";
import { BsBuildingFill } from "react-icons/bs";
import 'server-only'

// Supported export types
export type ExportType = 'json' | 'csv' | 'tsv' | 'yaml' | 'xml' | 'html' | 'postgresql' | 'sql_server' | 'sqlite' | 'ndjson' | 'parquet' | 'xlsx';

const ALL_EXPORTS_COMPLETE: ExportType[] = ['json', 'ndjson', 'csv', 'tsv', 'xml', 'yaml', 'html', 'postgresql', 'sql_server', 'sqlite', 'parquet', 'xlsx'];
export interface IData {
  name: string,
  displayName?: string,
  categories: {
    id: string,
    name: string,
    description: string,
    link: Route,
    minedByMe?: true
    image?: string | (() => React.ReactNode),
    export?: {
      route: string,
      exportType: ExportType[]
    }
  }[]
}

export const DATASETS_AVAILABLE = Object.freeze(({
  'the-sims': {
    name: 'The Sims',
    categories: [
      {
        id: 'castaway-product',
        name: "Castaway Product",
        image: '/image/quick_link/ts_castaway_product.png',
        link: '/the-sims/castaway-product',
        description: 'Products gathered from The Sims Castaway console game. Including fishes and crafted products that are stored inside inventory',
        minedByMe: true,
        export: {
          route: API_ROUTE.THE_SIMS.CASTAWAY_PRODUCT,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'two-pets-console-product',
        name: "Two Pets Console Product",
        image: '/image/quick_link/ts2p_product.png',
        link: '/the-sims/two-pets-console-product',
        description: 'Ingredients gathered from fridge. Includes harvested products such as veggies, fruits, and seafood. Oh, also golden egg',
        minedByMe: true,
        export: {
          route: API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'two-pets-console-career',
        name: "Two Pets Console Career",
        image: () => (<BsBuildingFill className="text-4xl" />),
        link: '/the-sims/two-pets-console-career',
        description: 'TS 2 Pets PS2 careers available. Data sourced from my own digging and The Sims Wikia',
        minedByMe: true,
        export: {
          route: API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_CAREER,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'two-console-career',
        name: "Two Console Career",
        image: () => (<BsBuildingFill className="text-4xl" />),
        link: '/the-sims/two-console-career',
        description: 'TS 2 PS2 careers available. Data sourced from my own digging and The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.TWO_CONSOLE_CAREER,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-dish',
        name: "Three PC Dish",
        link: '/the-sims/three-pc-dish',
        image: '/image/quick_link/ts3_pc_dish.png',
        description: 'All of dishes that can be made inside TS3 PC game. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.THREE_PC_DISH,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'four-pc-dish',
        name: "Four PC Dish",
        link: '/the-sims/four-pc-dish',
        image: '/image/quick_link/ts4_pc_dish.png',
        description: 'All of dishes that can be made inside TS4 PC game. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.FOUR_PC_DISH,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'four-pc-canned-dish',
        name: "Four PC Canned Dish",
        link: '/the-sims/four-pc-canned-dish',
        image: '/image/quick_link/ts4_pc_canned_dish.png',
        description: 'All of canned dishes that can be made inside TS4 PC game',
        export: {
          route: API_ROUTE.THE_SIMS.FOUR_PC_CANNED_DISH,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'bustin-out-career',
        name: "Bustin Out Career",
        link: '/the-sims/bustin-out-career',
        image: () => (<BsBuildingFill className="text-4xl" />),
        description: 'TS Bustin Out\'s career path and job. Including the story mode and freeplay mode\'s careers',
        minedByMe: true,
        export: {
          route: `${API_ROUTE.THE_SIMS.BUSTIN_OUT_CAREER}`,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'four-pc-harvestable',
        name: "Four PC Harvestable",
        link: '/the-sims/four-pc-harvestable',
        image: '/image/quick_link/ts4_pc_harvestable.png',
        description: 'All of TS4 PC\'s harvestable product',
        export: {
          route: `${API_ROUTE.THE_SIMS.FOUR_PC_HARVESTABLE}`,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-harvestable',
        name: "Three PC Harvestable",
        link: '/the-sims/three-pc-harvestable',
        image: '/image/quick_link/ts3_pc_harvestable.png',
        description: 'All of TS3 PC\'s harvestable product',
        export: {
          route: `${API_ROUTE.THE_SIMS.THREE_PC_HARVESTABLE}`,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-gem',
        name: "Three PC Gem",
        link: '/the-sims/three-pc-gem',
        image: '/image/quick_link/ts3_pc_gem.png',
        description: 'All of TS3 PC\'s Gem product',
        export: {
          route: `${API_ROUTE.THE_SIMS.THREE_PC_GEM}`,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-gem-cut',
        name: "Three PC Gem Cut",
        link: '/the-sims/three-pc-gem-cut',
        image: '/image/quick_link/ts3_pc_gem_cut.png',
        description: 'All of TS3 PC\'s Gem Cut product',
        export: {
          route: `${API_ROUTE.THE_SIMS.THREE_PC_GEM_CUT}`,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-raw-gem',
        name: "Three PC Raw Gem",
        link: '/the-sims/three-pc-raw-gem',
        image: '/image/quick_link/ts3_pc_raw_gem.png',
        description: 'All of TS3 PC\'s Raw Gem product',
        export: {
          route: `${API_ROUTE.THE_SIMS.THREE_PC_RAW_GEM}`,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-preserve-dish',
        name: "Three PC Preserve Dish",
        link: '/the-sims/three-pc-preserve-dish',
        image: '/image/quick_link/ts3_pc_preserve_dish.png',
        description: 'All of TS3 PC\'s preserve dish collectibles. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.THREE_PC_PRESERVE_DISH,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-spread-dish',
        name: "Three PC Spread Dish",
        link: '/the-sims/three-pc-spread-dish',
        image: '/image/quick_link/ts3_pc_spread_dish.png',
        description: 'All of TS3 PC\'s spread dish collectibles. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.THREE_PC_SPREAD_DISH,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-pc-metal',
        name: "Three PC Metal",
        link: '/the-sims/three-pc-metal',
        image: '/image/quick_link/ts3_pc_metal.png',
        description: 'All of TS3 metal collectibles. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.THREE_PC_METAL,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'four-pc-metal',
        name: "Four PC Metal",
        link: '/the-sims/four-pc-metal',
        image: '/image/quick_link/ts4_pc_metal.png',
        description: 'All of TS4 metal collectibles. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.FOUR_PC_METAL,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'four-pc-element',
        name: "Four PC Element",
        link: '/the-sims/four-pc-element',
        image: '/image/quick_link/ts4_pc_element.png',
        description: 'All of TS4 element collectibles. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.FOUR_PC_ELEMENT,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'four-pc-crystal',
        name: "Four PC Crystal",
        link: '/the-sims/four-pc-crystal',
        image: '/image/quick_link/ts4_pc_crystal.png',
        description: 'All of TS4 crystal collectibles. Sourced from The Sims Wikia',
        export: {
          route: API_ROUTE.THE_SIMS.FOUR_PC_CRYSTAL,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
    ]
  } as IData,
  'hayday': {
    name: 'Hayday',
    categories: [
      {
        id: 'order',
        name: "Order",
        link: '/hayday/order',
        description: '',
      },
      {
        id: 'product',
        name: "Product",
        link: '/hayday/product',
        image: '/image/quick_link/hd_product.png',
        description: 'Every products that harvested or processed via buildings. Accurate as of July 2025. All are sourced from Hayday Wiki',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.HAY_DAY.PRODUCT
        }
      },
      {
        id: 'building',
        name: "Building",
        link: '/hayday/building',
        image: '/image/quick_link/hd_building.png',
        description: 'Hayday\'s all production buildings. Accurate as of July 2025. All are sourced from Hayday Wiki',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.HAY_DAY.BUILDING
        }
      },
    ]
  } as IData,
  'farm-frenzy': {
    name: "Farm Frenzy",
    categories: [
      {
        id: 'one-product',
        name: "One Product",
        link: '/farm-frenzy/one-product',
        image: '/image/quick_link/ff_one_product.png',
        description: 'Farm Frenzy One products',
        minedByMe: true,
        export: {
          route: API_ROUTE.FARM_FRENZY.ONE_PRODUCT,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'two-product',
        name: "Two Product",
        link: '/farm-frenzy/two-product',
        image: '/image/quick_link/ff_two_product.png',
        description: 'Farm Frenzy Two products',
        minedByMe: true,
        export: {
          route: API_ROUTE.FARM_FRENZY.TWO_PRODUCT,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'two-pizza-product',
        name: "Two Pizza Product",
        link: '/farm-frenzy/two-pizza-product',
        image: '/image/quick_link/ff_two_pizza_product.png',
        description: 'Farm Frenzy Two Pizza Party products',
        minedByMe: true,
        export: {
          route: API_ROUTE.FARM_FRENZY.TWO_PIZZA_PRODUCT,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'three-product',
        name: "Three Product",
        link: '/farm-frenzy/three-product',
        image: '/image/quick_link/ff_three_product.png',
        description: 'Farm Frenzy Three products (All franchises)',
        minedByMe: true,
        export: {
          route: API_ROUTE.FARM_FRENZY.THREE_PRODUCT,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
      {
        id: 'hurricane-product',
        name: "Hurricane Seasons Product",
        link: '/farm-frenzy/hurricane-product',
        image: '/image/quick_link/ff_hurricane_product.png',
        description: 'Farm Frenzy Hurricane Seasons products',
        minedByMe: true,
        export: {
          route: API_ROUTE.FARM_FRENZY.HURRICANE,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
    ]
  } as IData,
  'pizza-frenzy': {
    name: "Pizza Frenzy",
    categories: [
      {
        id: 'topping',
        name: "Topping",
        link: '/pizza-frenzy/topping',
        image: '/image/quick_link/pf_topping.png',
        minedByMe: true,
        description: '',
        export: {
          route: API_ROUTE.PIZZA_FRENZY.TOPPING,
          exportType: ALL_EXPORTS_COMPLETE
        }
      },
    ]
  } as IData,
  'nasi-goreng': {
    name: "Nasi Goreng",
    categories: [
      {
        id: 'ingredient',
        name: 'Ingredient',
        image: '/image/quick_link/ng_ingredient.png',
        description: 'Bahan2 yang bisa didapatkan atau dibuat',
        link: '/nasi-goreng/ingredient',
        minedByMe: true,
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.NASI_GORENG.INGREDIENT
        }
      },
      {
        id: 'fried-rice',
        name: 'Fried Rice',
        image: '/image/quick_link/ng_fried_rice.png',
        description: 'Semua nasi goreng yang bisa dimasak',
        link: '/nasi-goreng/fried-rice',
        minedByMe: true,
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.NASI_GORENG.FRIED_RICE
        }
      },
      {
        id: 'upgrade',
        name: 'Upgrade',
        image: '/image/quick_link/ng_upgrade.png',
        description: 'Pretelan2 yang biasa ditambahkan di nasi goreng. Ini cuma bentuk doang ya hehe',
        link: '/nasi-goreng/upgrade',
        minedByMe: true,
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.NASI_GORENG.UPGRADE
        }
      },
      {
        id: 'tool',
        name: 'Tool',
        image: '/image/quick_link/ng_tool.png',
        description: 'Alat2 masak yang bakal kalian pakai untuk bereksperimen',
        link: '/nasi-goreng/tool',
        minedByMe: true,
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.NASI_GORENG.TOOL
        }
      },
      {
        id: 'relic',
        name: 'Relic',
        image: '/image/quick_link/ng_relic.png',
        description: 'Burned Food versi langka because we love gacha hehe',
        link: '/nasi-goreng/relic',
        minedByMe: true,
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.NASI_GORENG.RELIC
        }
      },
      {
        id: 'burned-food',
        name: 'Burned Food',
        image: '/image/quick_link/ng_burned_food.png',
        description: 'Aduh? Salah resep kali :/',
        link: '/nasi-goreng/burned-food',
        minedByMe: true,
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.NASI_GORENG.BURNED_FOOD
        }
      },
      {
        id: 'plate',
        name: 'Plate',
        image: '/image/quick_link/ng_plate.png',
        description: 'Walau nga dimakan, tapi ingat kalau dalam culinary, plating itu faktor dalam rating makanan kalian',
        link: '/nasi-goreng/plate',
        minedByMe: true,
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.NASI_GORENG.PLATE
        }
      },
    ]
  } as IData,
  'seasons': {
    name: 'Seasons',
    displayName: 'Story of Seasons',
    categories: [
      {
        id: 'ds-mineral-recipe',
        name: 'DS Mineral Recipe',
        image: '/image/quick_link/sos_ds_mineral_recipe.png',
        description: 'Harvest Moon: Friends of Mineral Town GBA recipes. Sourced from https://fogu.com/hm4/',
        link: '/seasons/ds-mineral-recipe',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_MINERAL_RECIPE
        }
      },
      {
        id: 'ds-mineral-shippable',
        name: 'DS Mineral Shippable',
        image: '/image/quick_link/sos_ds_mineral_shippable.png',
        description: 'Harvest Moon: Friends of Mineral Town GBA shippable products (not including crops). Sourced from https://fogu.com/hm4/',
        link: '/seasons/ds-mineral-shippable',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_MINERAL_SHIPPABLE
        }
      },
      {
        id: 'ds-mineral-utensil',
        name: 'DS Mineral Utensil',
        image: '/image/quick_link/sos_ds_mineral_utensil.png',
        description: 'Harvest Moon: Friends of Mineral Town GBA utensils. Sourced from https://fogu.com/hm4/',
        link: '/seasons/ds-mineral-utensil',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_MINERAL_UTENSIL
        }
      },
      {
        id: 'ds-mineral-crop',
        name: 'DS Mineral Crop',
        image: '/image/quick_link/sos_ds_mineral_crop.png',
        description: 'Harvest Moon: Friends of Mineral Town GBA crop. Sourced from https://fogu.com/hm4/',
        link: '/seasons/ds-mineral-crop',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_MINERAL_CROP
        }
      },

      {
        id: 'ds-bazaar-crop',
        name: 'DS Bazaar Crop',
        image: '/image/quick_link/sos_ds_bazaar_crop.png',
        description: 'Harvest Moon: Grand Bazaar Town DS crops. Sourced from https://fogu.com/hm9/item-profit-list.php',
        link: '/seasons/ds-bazaar-crop',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_BAZAAR_CROP
        }
      },
      {
        id: 'ds-bazaar-recipe',
        name: 'DS Bazaar Recipe',
        image: '/image/quick_link/sos_ds_bazaar_recipe.png',
        description: 'Harvest Moon: Grand Bazaar Town DS recipes. Sourced from https://fogu.com/hm9/item-profit-list.php',
        link: '/seasons/ds-bazaar-recipe',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_BAZAAR_RECIPE
        }
      },
      {
        id: 'ds-bazaar-animal-product',
        name: 'DS Bazaar Animal Product',
        image: '/image/quick_link/sos_ds_bazaar_animal_product.png',
        description: 'Harvest Moon: Grand Bazaar Town DS animal products. Sourced from https://fogu.com/hm9/item-profit-list.php',
        link: '/seasons/ds-bazaar-animal-product',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_BAZAAR_ANIMAL_PRODUCT
        }
      },
      {
        id: 'ds-bazaar-windmill-product',
        name: 'DS Bazaar Windmill Product',
        image: '/image/quick_link/sos_ds_bazaar_windmill_product.png',
        description: 'Harvest Moon: Grand Bazaar Town DS windmill products. Sourced from https://fogu.com/hm9/item-profit-list.php',
        link: '/seasons/ds-bazaar-windmill-product',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_BAZAAR_WINDMILL_PRODUCT
        }
      },
      {
        id: 'ds-bazaar-wild-product',
        name: 'DS Bazaar Wild Product',
        image: '/image/quick_link/sos_ds_bazaar_wild_product.png',
        description: 'Harvest Moon: Grand Bazaar Town DS wild products. Sourced from https://fogu.com/hm9/item-profit-list.php',
        link: '/seasons/ds-bazaar-wild-product',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.SEASONS.DS_BAZAAR_WILD_PRODUCT
        }
      },
    ]
  } as IData,
  'cygnus': {
    name: "Cygnus",
    categories: [
      {
        id: 'artifact',
        name: 'Artifact',
        description: '',
        image: '/image/quick_link/c_artifact.png',
        link: '/cygnus/artifact'
      },
      {
        id: 'mineral',
        name: 'Mineral',
        description: 'Stardew\'s minerals that are collectible.',
        image: '/image/quick_link/c_mineral.png',
        link: '/cygnus/mineral',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.CYGNUS.MINERAL
        }
      },
      {
        id: 'forage',
        name: 'Forage',
        description: '',
        image: '/image/quick_link/c_forage.png',
        link: '/cygnus/forage'
      },
      {
        id: 'crop',
        name: 'Crop',
        description: 'Stardew\'s base vanilla crops. I will consider adding mod crops in the future, but let\'s just keep it simple hehe',
        image: '/image/quick_link/c_crop.png',
        link: '/cygnus/crop',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.CYGNUS.CROP
        }
      },
      {
        id: 'dish',
        name: 'Dish',
        description: 'Stardew\'s base vanilla dishes.',
        image: '/image/quick_link/c_dish.png',
        link: '/cygnus/dish',
        export: {
          exportType: ALL_EXPORTS_COMPLETE,
          route: API_ROUTE.CYGNUS.DISH
        }
      },
      {
        id: 'node',
        name: 'Node',
        description: '',
        image: '/image/quick_link/c_node.png',
        link: '/cygnus/node'
      }
    ]
  } as IData,
  'transaction': {
    name: 'Transaction',
    categories: [
      {
        id: 'monthly',
        name: "Monthly",
        link: '/transaction/monthly',
        description: '',
      },
    ]
  } as IData,
}) as Record<string, IData>);