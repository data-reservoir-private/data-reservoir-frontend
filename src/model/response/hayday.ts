export type IHaydayResponse = {
  'hayday-product': {
    id: string
    name: string
    image: string
    category: string
    price: number
    isRaw: boolean
    time: number
    level: number
    xp: number
    effort: number
    effortLn: number
  },
  'hayday-building': {
    id: string
    name: string
    image: string
    price: number
    level: number
    time: number
    xp: number
  },
  'hayday-product-complete': {
    id: string
    name: string
    image: string
    category: string
    price: number
    isRaw: boolean
    time: number
    level: number
    xp: number
    effort: number
    effortLn: number
    ingredients: {
      id: string
      name: string
      image: string
      quantity: number
    }[],
    usedIn: {
      id: string
      name: string
      image: string
      quantity: number
    }[],
    building?: {
      id: string
      name: string
      image: string
    }
  },
  'hayday-building-complete': {
    id: string
    name: string
    image: string
    price: number
    level: number
    time: number
    xp: number,
    productsMade: {
      id: string
      name: string
      image: string
      level: string
      ingredients: {
        id: string
        name: string
        image: string
        quantity: number
      }[]
    }[]
  }
}