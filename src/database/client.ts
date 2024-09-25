import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from './schema'
import * as relations from './relations'

const sql = postgres(process.env.POSTGRES as string, {
  max: 2,
  idle_timeout: 3
});
export const DB = drizzle(sql, { schema: { ...schema, ...relations } });