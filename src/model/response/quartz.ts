export type IQuartzResponse = {
  'recipe': {
    id: string,
    name: string,
    image: string,
    recipe: string[]
  },
  'shippable': {
    id: string,
    name: string,
    image: string,
    season: string,
    location: string,
    price: number
  },
  'utensil': {
    id: string,
    name: string,
    image: string,
    price: number
  }
}