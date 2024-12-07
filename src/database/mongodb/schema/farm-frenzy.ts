import { BaseSchema } from "./base"

export interface FarmFrenzyOneProductSchema extends BaseSchema {
  name: string,
  image: string,
  price: number
}

export interface FarmFrenzyTwoProductSchema extends BaseSchema {
  name: string,
  image: string,
  price: number
}

export interface FarmFrenzyTwoPizzaProductSchema extends BaseSchema {
  name: string,
  image: string,
  price: number
}

export interface FarmFrenzyThreeProductSchema extends BaseSchema {
  name: string,
  image: string,
  price: number
}