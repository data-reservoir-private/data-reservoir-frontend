export type ISeasonsResponse = {
  'ds-mineral-recipe': {
    id: string,
    name: string,
    image: string,
    recipe: string[]
  },
  'ds-mineral-shippable': {
    id: string,
    name: string,
    image: string,
    season: string,
    location: string,
    price: number
  },
  'ds-mineral-utensil': {
    id: string,
    name: string,
    image: string,
    price: number
  }
}