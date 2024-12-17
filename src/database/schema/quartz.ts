import { BaseSchema } from "./base";

export interface QuartzShippableSchema extends BaseSchema {
  image: string;
  name: string;
  location: string;
  price: number;
  season: string
}

export interface QuartzUtensilSchema extends BaseSchema {
  image: string;
  name: string;
  price: number;
}

export interface QuartzRecipeSchema extends BaseSchema {
  image: string;
  name: string;
  recipe: string[]
}