export type IPizzaFrenzyResponse = {
  'topping': {
    id: string,
    generalName: string,
    image: string
  },
  'topping-complete': IPizzaFrenzyResponse['topping'] & {
    toppingDetails: {
      id: string,
      name: string,
      description: string,
      price: number,
      level: number
    }[]
  }
}; 