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
  },
  'hayday-order': {
    'summary': {
      acceptedOrder: number
      rejectedOrder: number
      settledOrder: number
      percentageAcceptedOrder: number
      percentageRejectedOrder: number
      coinEvent: number
      coin: number
      xpEvent: number
      xp: number
      revenueEvent: number
      revenue: number
      voucher: {
        green: number
        blue: number
        purple: number
        gold: number
      }
      materials: {
        id: string
        name: string
        image: string
        quantity: number
      }[]
    },
    'weekly': {
      date: string
      acceptedOrder: number
      rejectedOrder: number
      settledOrder: number
      percentageAcceptedOrder: number
      percentageRejectedOrder: number
      coinEvent: number
      coin: number
      xpEvent: number
      xp: number
      revenueEvent: number
      revenue: number
    },
    'distribution': {
      boxplot: {
        min: number,
        q1: number,
        median: number,
        q3: number,
        max: number,
        outliers: number[]
      },
      eventBoxplot: IHaydayResponse['hayday-order']['distribution']['boxplot']
    },
    'valuable': {
      dateAccepted: string
      clientName: string
      products: {
        id: string
        name: string
        image: string
        quantity: number
      }[]
      coin: number
      coinEvent: number
      xp: number
      xpEvent: number
      revenue: number
      revenueEvent: number
    }
  }
}