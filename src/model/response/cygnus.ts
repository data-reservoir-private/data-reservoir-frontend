import { CygnusArtifactSchema, CygnusCropSchema, CygnusDishSchema } from "@/database/schema/cygnus";
import { HasID } from "./base";
import { CYGNUS_GRADE_ID } from "@/constant/enums";
import { CygnusCropStage, CygnusSeeds, CygnusSpecial } from "../dto/cygnus";

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

export type CygnusArtifactResponse = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export type CygnusCropResponse = {
  name: string;
  image: string;
  description: string;
  id: string;
  season: string[];
  seeds: CygnusSeeds,
  special: CygnusSpecial | null,
  stages: CygnusCropStage,
  grades: CygnusGrade[]
}
export type CygnusDishResponse = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  energy: number;
  ingredients: {[key: string]: number};
  health: number;
}

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

