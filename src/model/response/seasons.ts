export type ISeasonsResponse = {
  'ds-mineral-recipe': {
    id: string,
    name: string,
    image: string,
    recipe: string
  },
  'ds-mineral-shippable': {
    id: string,
    name: string,
    image: string,
    season: string,
    location: string,
    price: number
  },
  'ds-mineral-crop': {
    id: string,
    name: string,
    image: string,
    season: string,
    location: string,
    price: number
    seedPrice: number
    harvestDays: number
    regrowthDays: number | null
  },
  'ds-mineral-utensil': {
    id: string,
    name: string,
    image: string,
    price: number
  },

  'ds-bazaar-crop': {
    id: string
    name: string
    image: string
    season: string
    lowPrice: number
    mediumPrice: number
    highPrice: number
    seedName: string
    seedImage: string
    seedSeason: string
    seedLowPrice: number
    seedMediumPrice: number
    seedHighPrice: number
    harvestMinDays: number
    harvestMaxDays: number
    regrowthMinDays: number | null;
    regrowthMaxDays: number | null;
  },
  'ds-bazaar-recipe': {
    id: string
    name: string
    image: string
    category: string
    description: string
    lowPrice: number
    mediumPrice: number
    highPrice: number
  },
  'ds-bazaar-windmill-product': {
    id: string
    name: string
    image: string
    season: string
    lowPrice: number | null
    mediumPrice: number
    highPrice: number | null
  }
  'ds-bazaar-animal-product': {
    id: string
    name: string
    image: string
    season: string
    lowPrice: number | null
    mediumPrice: number
    highPrice: number | null
  }
  'ds-bazaar-wild-product': {
    id: string
    name: string
    image: string
    season: string
    lowPrice: number | null
    mediumPrice: number
    highPrice: number | null
  },

  'ds-two-towns-crop': {
    id: string
    name: string
    image: string
    season: string
    regrow: boolean
    lowPrice: number
    mediumPrice: number
    highPrice: number
    seedPrice: number
    seedImage: string
    seedSource: string
    seedNotes: string | null
  }
  'ds-two-towns-crop-detail': ISeasonsResponse['ds-two-towns-crop'] & {
    growth: {
      image: string,
      days: number
      days_twice_watering: number | null
    }[],
    harvestImage: string
  },
  'ds-two-towns-fishing-catch': {
    id: string
    name: string
    image: string
    type: string
    category: string
    seasons: string
    time: string | null
    rod: string | null
    notes: string | null
    maxSize: number | null
    price1: number | null
    price2: number | null
    price3: number | null
    price4: number | null
    price5: number | null
  },
  'ds-two-towns-product': {
    id: string
    name: string
    image: string
    category: string
    description: string
    price1: number
    price2: number | null
    price3: number | null
    price4: number | null
    price5: number | null
  },
  'ds-two-towns-recipe': {
    id: string
    name: string
    image: string
    category: string
    utensil: string
    requiredIngredient: string
    additionalIngredient: string | null
    price1: number
    price2: number
    price3: number
    price4: number
    price5: number
    maxStamina: number
  },
  'ds-two-towns-tree': {
    id: string
    name: string
    image: string
    regrow: number
    season: string
    price1: number
    price2: number
    price3: number
    price4: number
    price5: number
    seedImage: string
    seedPrice: number
    seedSource: string
    seedNotes: string | null
  },
  'ds-two-towns-tree-detail': ISeasonsResponse['ds-two-towns-tree'] & {
    growth: {
      image: string,
      days: number
    }[],
    harvestImage: string
  }
}