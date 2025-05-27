import { HasID } from "./base";

export type HayDayProductResponse = {
  id: string,
  category: string,
  image: string,
  isRaw: boolean,
  level: number,
  name: string,
  price: number,
  time: number,
  xp: number,
  ingredients: {
    id: string,
    name: string,
    image: string,
    quantity: number,
  }[],
  usage: {
    id: string,
    name: string,
    image: string,
    quantity: number,
  }[],
  producer: {
    id: string,
    name: string,
    image: string
  } | undefined
}
export type HayDaySimpleProductResponse = Omit<HayDayProductResponse, 'ingredients' | 'usage' | 'producer'>;

export type HayDayBuildingResponse = {
  id: string
  image: string
  level: number
  name: string
  price: number
  time: number
  xp: number
  produces: {
    id: string,
    image: string
    name: string
  }[]
}
export type HayDaySimpleBuildingResponse = Omit<HayDayBuildingResponse, 'produces'>;

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
    non_event: number[]
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
  topProducts: {
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