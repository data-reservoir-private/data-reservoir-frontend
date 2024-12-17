import { FOUR_PC_HARVESTABLE_RARITY } from "@/constant/enums";
import { BaseSchema } from "./base";

export interface TheSimsFourPCHarvestableSchema extends BaseSchema {
  name: string;
  image: string;
  description: string;
  form: string;
  growth_rate: number;
  base_value: number;
  perfect_value: number;
  rarity: FOUR_PC_HARVESTABLE_RARITY;
  vertical_garden: boolean;
}

export interface TheSimsCastawayProductSchema extends BaseSchema {
  name: string;
  image: string;
  description: string;
  category: string;
  energy: number
  hunger: number
  bladder: number
  eaten_raw: boolean;
}

export interface TheSimsTwoPetsConsoleProductSchema extends BaseSchema {
  name: string;
  image: string;
  description: string;
  category: string;
  energy: number
  hunger: number
  bladder: number
  price: number;
}

export interface TheSimsBustinOutCareerSchema extends BaseSchema {
  career: string;
  job: string;
  description: string;
  promotion: number;
  level: number;
  salary: number;
  
  friends: number;
  cooking: number;
  mechanical: number;
  charisma: number;
  body: number;
  creativity: number;
  logic: number;

  work_start: number;
  work_end: number;
}

export interface TheSimsTwoConsoleCareerSchema extends BaseSchema {
  body: number;
  career: string;
  charisma: number;
  cleanliness: number;
  cooking: number;
  creativity: number;
  description: string;
  friends: number;
  job: string;
  level: number;
  logic: number;
  mechanical: number;
  promotion: number;
  salary: number;
  work_end: number;
  work_start: number;
}

export interface TheSimsTwoPetsConsoleCareerSchema extends BaseSchema {
  body: number;
  career: string;
  charisma: number;
  cleanliness: number;
  cooking: number;
  creativity: number;
  description: string;
  friends: number;
  job: string;
  level: number;
  logic: number;
  mechanical: number;
  promotion: number;
  salary: number;
  work_end: number;
  work_start: number;
}