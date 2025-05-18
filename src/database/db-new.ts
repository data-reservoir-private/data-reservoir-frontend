import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@drizzle/schema';
import * as relations from '@drizzle/relations';

export const DB_SQL = drizzle(process.env.DATABASE_URL_POSTGRES, {
  // @ts-ignore
  schema: { ...schema, ...relations }
});

