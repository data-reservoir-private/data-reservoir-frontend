import { UUID } from "mongodb";
import { BaseSchema } from "./base";

export interface TransactionMasterSchema extends BaseSchema {
  date: Date;
  restaurant_tax: number;
  service_tax: number;
  tax_discount: number;
  tenant: string;
  details: {
    category: string;
    id: UUID;
    order: string;
    price: number;
    quantity: number;
  }[]
}

export interface TransactionTransportSchema extends BaseSchema {
  company: string
  date_end: Date;
  date_start: Date;
  notes: string;
  position_end: string;
  position_start: string;
  price: number;
  subtype: string;
  type: string;
}