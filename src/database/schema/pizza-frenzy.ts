import { UUID } from "mongodb";
import { BaseSchema } from "./base";

export interface PizzaFrenzyToppingSchema extends BaseSchema {
  general_name: string,
  image: string,
  upgrades: {
    id: UUID,
    topping_id: UUID,
    name: string,
    level: number,
    price: number,
    description: string
  }[]
}