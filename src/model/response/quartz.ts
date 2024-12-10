import { QuartzRecipeSchema, QuartzShippableSchema, QuartzUtensilSchema } from "@/database/mongodb/schema/quartz";
import { HasID } from "./base";

export interface QuartzShippableResponse extends Omit<QuartzShippableSchema & HasID, '_id'> {}
export interface QuartzRecipeResponse extends Omit<QuartzRecipeSchema & HasID, '_id'> {}
export interface QuartzUtensilResponse extends Omit<QuartzUtensilSchema & HasID, '_id'> {}
