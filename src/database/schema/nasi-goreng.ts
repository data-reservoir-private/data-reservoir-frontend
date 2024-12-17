import { UUID } from 'mongodb';
import { BaseSchema } from './base';

export interface NasiGorengBurnedFoodSchema extends BaseSchema {
  name: string;
  category: string;
  image: string;
}

export interface NasiGorengPlateSchema extends BaseSchema {
  image: string;
  index: number;
}

export interface NasiGorengUpgradeSchema extends BaseSchema {
  image: string;
  name: string;
}

export interface NasiGorengRelicSchema extends BaseSchema {
  image: string;
  name: string;
  tool: {
    tool_id: UUID;
    tool_image: string;
    tool_name: string;
  }
}

export interface NasiGorengToolSchema extends BaseSchema {
  image: string;
  name: string;
  price: number;
  long_description: string;
  short_description: string;
}

export interface NasiGorengIngredientSchema extends BaseSchema {
  category: string
  description: string
  image: string
  is_processed: boolean
  name: string
  price: number
  recipe: {
    id: UUID,
    ingredient_id: UUID,
    ingredient_image: string
    ingredient_name: string
  }[]
  tool: {
    id: UUID,
    tool_id: UUID,
    tool_image: string
    tool_name: string
  }
}

export interface NasiGorengFriedRiceSchema extends BaseSchema {
  description: string
  name: string
  price: number
  raw_image: string
  raw_layer_number: number
  raw_x_coordinate: number
  raw_y_coordinate: number
  tool_id: UUID,
  tool_image: string
  tool_name: string
  levels: {
    fried_rices_needed: number
    id: UUID,
    image: string
    level: number
    details: {
      flip_image_type: number
      layer_number: number
      upgrade_id: UUID,
      upgrade_image: string
      upgrade_name: string
      x_coordinate: number
      y_coordinate: number
    }[],
    recipe: {
      id: UUID,
      ingredient_id: UUID,
      ingredient_image: string
      ingredient_name: string
      quantity: number
    }[],
  }[],
  plate: {
    id: UUID,
    image: string
  }
  recipe: {
    id: UUID,
    ingredient_id: UUID,
    ingredient_image: string
    ingredient_name: string
  }[]
}