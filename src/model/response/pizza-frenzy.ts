import { HasID } from "./base";

export interface PizzaFrenzyToppingResponse extends HasID {
  general_name: string,
  image: string,
  upgrades: {
    name: string,
    level: number,
    price: number,
    description: string
  }[]
}