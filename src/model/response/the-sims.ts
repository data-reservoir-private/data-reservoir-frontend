import { TheSimsBustinOutCareerSchema, TheSimsCastawayProductSchema, TheSimsFourPCHarvestableSchema, TheSimsTwoConsoleCareerSchema, TheSimsTwoPetsConsoleCareerSchema, TheSimsTwoPetsConsoleProductSchema } from "@/database/mongodb/schema/the-sims";
import { HasID } from "./base";

export interface TheSimsCastawayProductResponse extends Omit<TheSimsCastawayProductSchema & HasID, '_id'> {}
export interface TheSimsFourPCHarvestableResponse extends Omit<TheSimsFourPCHarvestableSchema & HasID, '_id'> {}
export interface TheSimsTwoPetsConsoleProductResponse extends Omit<TheSimsTwoPetsConsoleProductSchema & HasID, '_id'> {}
export interface TheSimsBustinOutCareerResponse extends Omit<TheSimsBustinOutCareerSchema & HasID, '_id'> {}
export interface TheSimsTwoPetsConsoleCareerResponse extends Omit<TheSimsTwoPetsConsoleCareerSchema & HasID, '_id'> {}
export interface TheSimsTwoConsoleCareerResponse extends Omit<TheSimsTwoConsoleCareerSchema & HasID, '_id'> {}