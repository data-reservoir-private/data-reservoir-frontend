import { HasID } from "./base";

export interface HayDayProductResponse extends HasID {
  category: string,
  image: string,
  is_raw: boolean,
  level: number,
  name: string,
  price: number,
  time: number,
  xp: number,
  ingredients: {
    ingredient_name: string,
    ingredient_image: string,
    quantity: number,
  }[],
  usage: {
    product_name: string,
    product_image: string,
    quantity: number,
  }[],
  producer: {
    building_name: string,
    building_image: string
  }
}

export interface HayDayBuildingResponse extends HasID {
  image: string
  level: number
  name: string
  price: number
  time: number
  xp: number
  produces: {
    product_image: string
    product_name: string
  }[]
}

export interface HayDayOrderSummaryResponse {
  income: {
    non_event: {
      coin: number,
      xp: number
    },
    event: {
      coin: number,
      xp: number
    }
  },
  revenue: {
    event: number[],
    non_event: number[],
    combined: number[]
  },
  voucher: {
    green: number,
    blue: number,
    purple: number,
    gold: number
  },
  ratio: {
    accept: number,
    reject: number,
    ongoing: number
  },
  objects: {
    id: string,
    image: string,
    name: string,
    quantity: number
  }[],
  clients: {
    name: string,
    total: number,
    count: number,
    income: {
      coin: number,
      xp: number
    }
  }[],
  
}