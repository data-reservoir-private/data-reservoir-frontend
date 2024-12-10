import { UUID } from "mongodb";
import { BaseSchema } from "./base";

export interface HaydayProductSchema extends BaseSchema {
  category: string,
  image: string,
  is_raw: boolean,
  level: number,
  name: string,
  price: number,
  time: number,
  xp: number,
  ingredients: {
    id: UUID,
    ingredient_id: UUID,
    product_id: UUID,
    ingredient_name: string,
    ingredient_image: string,
    quantity: number,
  }[],
  usage: {
    id: UUID,
    product_id: UUID,
    product_name: string,
    product_image: string,
    quantity: number,
  }[],
  producer: {
    id: UUID,
    product_id: UUID,
    building_id: UUID,
    building_name: string,
    building_image: string
  }
}

export interface HaydayBuildingSchema extends BaseSchema {
  image: string
  level: number
  name: string
  price: number
  time: number
  xp: number
  produces: {
    id: UUID
    building_id: UUID
    product_id: UUID
    product_image: string
    product_name: string
  }[]
}