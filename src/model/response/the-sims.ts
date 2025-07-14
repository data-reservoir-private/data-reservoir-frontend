export type ITheSimsResponse = {
  'bustin-out-career': {
    id: string
    career: string
    level: number
    job: string
    description: string
    workStart: string
    workEnd: string
    friends: number
    salary: number
    promotion: number
    cooking: number
    mechanical: number
    charisma: number
    body: number
    logic: number
    creativity: number
  },
  'castaway-product': {
    id: string
    name: string
    image: string
    eatenRaw: boolean
    hunger: number
    bladder: number
    energy: number
    category: string
    description: string
  },
  'three-pc-dish': {
    id: string
    name: string
    image: string
    category: string
    skill: number
    types?: string[],
    flavours?: string[],
    ingredients?: string[],
    isVegetarian: boolean
    notes: string
  },
  'three-pc-gem': {
    id: string
    image: string
    gemCut: {
      id: string
      name: string
      image: string
    }
    rawGem: {
      id: string
      name: string
      image: string
      rarity: number
    }
  }
}