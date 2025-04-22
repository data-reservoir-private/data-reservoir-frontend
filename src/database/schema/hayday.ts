import { UUID } from "mongodb";
import { BaseSchema } from "./base";
import { HAYDAY_EVENT, HAYDAY_ORDER_STATUS, HAYDAY_VOUCHER } from "@/constant/enums";

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

export interface HaydayTruckOrderSchema extends BaseSchema {
  bonus_booster: string | null,
  client_name: string,
  coin: number,
  date_completed: string,
  event: HAYDAY_EVENT,
  hash: string,
  header_ordering_id: number,
  level: number,
  notes: string | null,
  order_status: HAYDAY_ORDER_STATUS,
  position: number,
  special: number | null,
  voucher: HAYDAY_VOUCHER,
  xp: number,
  bonus: string | null,
  orders: {
    id: UUID,
    product_id: UUID,
    product_image: string,
    product_name: string,
    quantity: number
  }[]
}

