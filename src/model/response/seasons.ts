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
  }

}