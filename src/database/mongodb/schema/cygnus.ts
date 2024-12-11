import { CYGNUS_GRADE_ID, CYGNUS_GRADE_STR } from "@/constant/enums";
import { BaseSchema } from "./base";

export interface CygnusArtifactSchema extends BaseSchema {
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface CygnusMineralSchema extends BaseSchema {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
}

export interface CygnusDishSchema extends BaseSchema {
  description: string
  energy: number
  health: number
  image: string
  ingredients: {[key: string] : number}
  name: string
  price: number
}

export interface CygnusCropSchema extends BaseSchema {
  description: string
  image: string
  name: string
  season: string[]
  grades: {
    energy: number | null
    grade: CYGNUS_GRADE_STR
    health: number | null
    id: CYGNUS_GRADE_ID
    price: number
  }[],
  seeds: {
    image: string
    name: string
    source: {
      name: string
      price_gold: number | null
      price_items: {
        name: string,
        quantity: number
      }[] | null
    }[]
  }
  special: {
    extra: boolean
    giant: string | null
    irrigation: boolean | null
    regrowth: number | null
    trellis: boolean | null
    byproduct: {
      name: string,
      possible_quantities: number[]
    }[] | null
  } | null,
  stages: {
    done: {
      harvest: string
      regrowth: string | null
    }
    ongoing: {
      duration: number
      duration_irrigated: number | null
      image: string
    }[]
  }
}