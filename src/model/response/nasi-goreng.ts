import { NasiGorengBurnedFoodSchema, NasiGorengPlateSchema, NasiGorengToolSchema, NasiGorengUpgradeSchema } from "@/database/schema/nasi-goreng";
import { HasID } from "./base";

export interface NasiGorengBurnedFoodResponse extends Omit<NasiGorengBurnedFoodSchema & HasID, '_id'> {};
export interface NasiGorengPlateResponse extends Omit<NasiGorengPlateSchema & HasID, '_id'> {};
export interface NasiGorengRelicResponse extends HasID {
  image: string;
  name: string;
  tool: {
    tool_image: string;
    tool_name: string;
  }
};

export interface NasiGorengUpgradeResponse extends Omit<NasiGorengUpgradeSchema & HasID, '_id'> { };
export interface NasiGorengToolResponse extends Omit<NasiGorengToolSchema & HasID, '_id'> { };

export interface NasiGorengIngredientResponse extends HasID {
  category: string
  description: string
  image: string
  is_processed: boolean
  name: string
  price: number
  recipe: {
    ingredient_image: string
    ingredient_name: string
  }[]
  tool: {
    tool_image: string
    tool_name: string
  }
}

export interface NasiGorengFriedRiceResponse extends HasID {
  description: string
  name: string
  price: number
  raw_image: string
  raw_layer_number: number
  raw_x_coordinate: number
  raw_y_coordinate: number
  tool_image: string
  tool_name: string
  levels: {
    fried_rices_needed: number
    image: string
    level: number
    details: {
      flip_image_type: number
      layer_number: number
      upgrade_image: string
      upgrade_name: string
      x_coordinate: number
      y_coordinate: number
    }[],
    recipe: {
      ingredient_image: string
      ingredient_name: string
      quantity: number
    }[],
  }[],
  plate: {
    image: string
  }
  recipe: {
    ingredient_image: string
    ingredient_name: string
  }[]
}