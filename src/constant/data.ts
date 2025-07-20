import { API_ROUTE } from "./api-route";
import 'server-only'

export type ExportType = 'json' | 'csv' | 'yaml' | 'xml';

interface IData {
  name: string,
  categories: {
    id: string,
    name: string,
    description: string,
    link: string,
    image?: string | (() => React.ReactNode),
    export?: {
      route: string,
      exportType: ExportType[]
    }
  }[]
}

export const DATA_AVAILABLE = Object.freeze(({
  'the-sims': {
    name: 'The Sims',
    categories: [
      {
        id: 'castaway-product',
        name: "Castaway Product",
        image: '/image/quick_link/ts_castaway_product.png',
        link: '/the-sims/castaway-product',
        description: 'Products gathered from The Sims Castaway console game. Including fishes and crafted products that are stored inside inventory',
        export: {
          route: `${API_ROUTE.THE_SIMS.CASTAWAY_PRODUCT}`,
          exportType: ['json', 'csv', 'xml', 'yaml']
        }
      },
      {
        id: 'two-pets-console-product',
        name: "Two Pets Console Product",
        image: '/image/quick_link/ts2p_product.png',
        link: '/the-sims/two-pets-console-product',
        description: 'Ingredients gathered from fridge. Includes harvested products such as veggies, fruits, and seafood. Oh, also golden egg',
        export: {
          route: `${API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT}`,
          exportType: ['json', 'csv', 'xml', 'yaml']
        }
      },
      {
        id: 'three-pc-dish',
        name: "Three PC Dish",
        link: '/the-sims/three-pc-dish',
        image: '/image/quick_link/ts3_pc_dish.png',
        description: ''
      },
      {
        id: 'bustin-out-career',
        name: "Bustin Out Career",
        link: '/the-sims/bustin-out-career',
        description: ''
      },
      {
        id: 'four-pc-harvestable',
        name: "Four PC Harvestable",
        link: '/the-sims/four-pc-harvestable',
        image: '/image/quick_link/ts4_pc_harvestable.png',
        description: ''
      },
      {
        id: 'four-pc-metal',
        name: "Four PC Metal",
        link: '/the-sims/four-pc-metal',
        image: '/image/quick_link/ts4_pc_metal.png',
        description: ''
      },
      {
        id: 'four-pc-element',
        name: "Four PC Element",
        link: '/the-sims/four-pc-element',
        image: '/image/quick_link/ts4_pc_element.png',
        description: ''
      },
      {
        id: 'four-pc-crystal',
        name: "Four PC Crystal",
        link: '/the-sims/four-pc-crystal',
        image: '/image/quick_link/ts4_pc_crystal.png',
        description: ''
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
        description: '',
      },
      {
        id: 'building',
        name: "Building",
        link: '/hayday/building',
        image: '/image/quick_link/hd_building.png',
        description: '',
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
        description: '',
      },
      {
        id: 'two-product',
        name: "Two Product",
        link: '/farm-frenzy/two-product',
        image: '/image/quick_link/ff_two_product.png',
        description: ''
      },
      {
        id: 'two-pizza-product',
        name: "Two Pizza Product",
        link: '/farm-frenzy/two-pizza-product',
        image: '/image/quick_link/ff_two_pizza_product.png',
        description: ''
      },
      {
        id: 'three-product',
        name: "Three Product",
        link: '/farm-frenzy/three-product',
        image: '/image/quick_link/ff_three_product.png',
        description: ''
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
        description: ''
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
        
      },
      {
        id: 'fried-rice',
        name: 'Fried Rice',
        image: '/image/quick_link/ng_fried_rice.png',
        description: 'Semua nasi goreng yang bisa dimasak',
        link: '/nasi-goreng/fried-rice',
      },
      {
        id: 'upgrade',
        name: 'Upgrade',
        image: '/image/quick_link/ng_upgrade.png',
        description: 'Pretelan2 yang biasa ditambahkan di nasi goreng. Ini cuma bentuk doang ya hehe',
        link: '/nasi-goreng/upgrade',
      },
      {
        id: 'tool',
        name: 'Tool',
        image: '/image/quick_link/ng_tool.png',
        description: 'Alat2 masak yang bakal kalian pakai untuk bereksperimen',
        link: '/nasi-goreng/tool',
      },
      {
        id: 'relic',
        name: 'Relic',
        image: '/image/quick_link/ng_relic.png',
        description: 'Burned Food versi langka because we love gacha hehe',
        link: '/nasi-goreng/relic',
      },
      {
        id: 'burned-food',
        name: 'Burned Food',
        image: '/image/quick_link/ng_burned_food.png',
        description: 'Aduh? Salah resep kali :/',
        link: '/nasi-goreng/burned-food',
      },
      {
        id: 'plate',
        name: 'Plate',
        image: '/image/quick_link/ng_plate.png',
        description: 'Walau nga dimakan, tapi ingat kalau dalam culinary, plating itu faktor dalam rating makanan kalian',
        link: '/nasi-goreng/plate',
      },
    ]
  } as IData
}))