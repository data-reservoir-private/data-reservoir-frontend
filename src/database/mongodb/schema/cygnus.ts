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