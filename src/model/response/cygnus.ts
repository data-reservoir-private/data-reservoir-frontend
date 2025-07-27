export type ICygnusResponse = {
  'mineral': {
    id: string,
    name: string,
    image: string,
    category: string,
    description: string,
    price: number
  },
  'artifact': {
    id: string,
    name: string,
    image: string,
    description: string,
    price: number
  },
  'node': {
    id: string,
    name: string,
    image: string[],
    contains: string,
    locationMines: string,
    locationOther: string,
  },
  'dish': {
    id: string,
    name: string,
    image: string,
    description: string,
    ingredients: Record<string, number>,
    energy: number
    health: number
    price: number
  },
  'forage': {
    id: string
    name: string
    image: string
    description: string
    category: string[],
    grades: {
      id: string
      gradeID: number
      forageID: string
      grade: string
      price: number
      energy?: number
      health?: number
    }[]
  },
  'crop': {
    id: string
    name: string
    image: string
    description: string
    season: string[]
  },
  'crop-complete': ICygnusResponse['crop'] & {
    seeds: {
      name: string
      image: string
      source: {
        name: string
        price_gold?: number
        price_items: {
          name: string
          quantity: number
        }[]
      }[]
    }
    special?: {
      regrowth?: number
      extra?: boolean
      trellis?: boolean
      irrigation?: boolean
      harvest?: number
      giant?: string
      byproduct: {
        name: string
        possible_quantities: number[]
      }[]
    }
    stages: {
      ongoing: {
        duration: number
        duration_irrigated?: number
        image: string
      }[]
      done: {
        harvest: string
        regrowth?: string
      }
    },
    grades: {
      id: string
      gradeID: number
      cropID: string
      grade: string
      price: number
      energy?: number
      health?: number
    }[]
  }
}