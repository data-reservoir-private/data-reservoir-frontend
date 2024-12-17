import { BaseSchema } from "./base";

export interface MasterCollectionCategorySchema extends BaseSchema {
  name: string;
  prefix: string;
  owner: string;
}