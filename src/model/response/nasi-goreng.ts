export type INasiGorengResponse = {
  'ingredient': {
    id: string
    name: string
    image: string
    description: string
    isProcessed: boolean
    price: number
    category: string
  },
  'ingredient-complete': (INasiGorengResponse['ingredient'] & {
    recipe: {
      id: string
      name: string
      image: string
    }[];
    usage: {
      id: string
      name: string
      image: string
    }[];
    friedRice: {
      id: string
      name: string
      image: string
    }[];
    tool?: {
      id: string
      name: string
      image: string
    },
    friedRiceLevel: {
      id: string
      friedRiceID: string
      name: string
      image: string
      level: number,
      quantity: number
    }[]
  }),
  'fried-rice': {
    id: string
    name: string
    imageLevel1: string
    imageLevel6: string
    description: string
    price: number
  },
  'fried-rice-complete': INasiGorengResponse['fried-rice'] & {
    tool: {
      id: string
      name: string
      image: string
    }
    recipe: {
      id: string
      name: string
      image: string
    }[]
    level: {
      id: string
      level: number
      image: string
      amountNeeded: number
      upgrades: {
        id: string
        name: string
        image: string
      }[],
      recipe: {
        id: string
        name: string
        image: string,
        quantity: number
      }[]
    }[]
  },
  'upgrade': {
    id: string,
    name: string,
    image: string
  },
  'upgrade-complete': INasiGorengResponse['upgrade'] & {
    friedRice: {
      id: string,
      name: string,
      image: string
    }[]
  },
  'tool': {
    id: string,
    name: string,
    image: string,
    longDescription: string,
    shortDescription: string,
    price: string,
  },
  'tool-complete': INasiGorengResponse['tool'] & {
    usage: {
      id: string,
      name: string,
      image: string
    }[]
  },
  'burned-food': {
    id: string,
    name: string,
    image: string,
    category: string
  },
  'relic': {
    id: string,
    name: string,
    image: string,
    tool: {
      id: string,
      name: string,
      image: string
    }
  },
  'plate': {
    id: string,
    image: string
  },
  'plate-complete': INasiGorengResponse['plate'] & {
    friedRices: {
      id: string,
      name: string,
      image: string
    }[]
  }
}