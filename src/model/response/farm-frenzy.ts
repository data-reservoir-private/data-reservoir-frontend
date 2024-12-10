import { HasID } from "./base";
import { FarmFrenzyOneProductSchema, FarmFrenzyThreeProductSchema, FarmFrenzyTwoPizzaProductSchema, FarmFrenzyTwoProductSchema } from "@/database/mongodb/schema/farm-frenzy";

export interface FarmFrenzyOneProductResponse extends Omit<FarmFrenzyOneProductSchema & HasID, '_id'> {}
export interface FarmFrenzyTwoProductResponse extends Omit<FarmFrenzyTwoProductSchema & HasID, '_id'> {}
export interface FarmFrenzyTwoPizzaProductResponse extends Omit<FarmFrenzyTwoPizzaProductSchema & HasID, '_id'> {}
export interface FarmFrenzyThreeProductResponse extends Omit<FarmFrenzyThreeProductSchema & HasID, '_id'> { }

export interface FarmFrenzyProductResponse extends HasID {
  name: string,
  image: string,
  price: number
}

