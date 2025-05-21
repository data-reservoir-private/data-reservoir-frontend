import { CygnusArtifactSchema, CygnusCropSchema, CygnusDishSchema } from "@/database/schema/cygnus";
import { HasID } from "./base";
import { CYGNUS_GRADE_ID } from "@/constant/enums";

type CygnusGrade = {
  price: number | null;
  energy: number | null;
  health: number | null;
  gradeId: CYGNUS_GRADE_ID;
  grade: string;
}

export type CygnusMineralResponse = {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  id: string;
}

export interface CygnusArtifactResponse extends Omit<CygnusArtifactSchema & HasID, '_id'> { }
export type CygnusCropResponse = {
  name: string;
  image: string;
  description: string;
  id: string;
  season: string[];
  seeds: {
    name: string,
    image: string,
    source: {
      name: string,
      priceGold: number | null,
      priceItems: {
        name: string,
        quantity: number
      }[]
    }[] | null;
  }
}
export interface CygnusDishResponse extends Omit<CygnusDishSchema & HasID, '_id'> { }

export type CygnusForageResponse = {
  id: string;
  name: string;
  image: string;
  description: string;
  season: string[];
  grades: CygnusGrade[]
}
export type CygnusNodeResponse = {
  image: string[];
  id: string;
  name: string;
  contains: string;
  locationMines: string;
  locationOther: string;
}

