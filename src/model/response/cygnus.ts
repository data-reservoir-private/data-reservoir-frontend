import { CygnusMineralSchema, CygnusArtifactSchema, CygnusCropSchema, CygnusDishSchema } from "@/database/mongodb/schema/cygnus";
import { HasID } from "./base";

export interface CygnusMineralResponse extends Omit<CygnusMineralSchema & HasID, '_id'> {}
export interface CygnusArtifactResponse extends Omit<CygnusArtifactSchema & HasID, '_id'> {}
export interface CygnusCropResponse extends Omit<CygnusCropSchema & HasID, '_id'> {}
export interface CygnusDishResponse extends Omit<CygnusDishSchema & HasID, '_id'> {}