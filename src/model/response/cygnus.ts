import { CygnusMineralSchema, CygnusArtifactSchema } from "@/database/mongodb/schema/cygnus";
import { HasID } from "./base";

export interface CygnusMineralResponse extends Omit<CygnusMineralSchema & HasID, '_id'> {}
export interface CygnusArtifactResponse extends Omit<CygnusArtifactSchema & HasID, '_id'> {}