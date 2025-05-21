
import { DB_SQL } from "@/database/db-new";
import { DashboardResponse } from "@/model/response/dashboard";
import { GETMethodRoute, okResponse } from "@/utilities/api";
import { tableCategoryInMaster } from "@drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  category: z.string().default("")
})

export const GET = GETMethodRoute(schema, async (_, { category }) => {
  const sq = DB_SQL.select({
    schema: sql<string>`schemaname`.as('schema'),
    table: sql<string>`relname`.as('table'),
    rows: sql<number>`n_live_tup`.mapWith(Number).as('rows')
  }).from(sql`pg_stat_user_tables`).as('sq');

  const master = await DB_SQL.select({
    category: tableCategoryInMaster.name,
    owner: tableCategoryInMaster.owner,
    prefix: tableCategoryInMaster.prefix,
    table: sq.table,
    row: sq.rows
  })
    .from(tableCategoryInMaster)
    .innerJoin(sq, eq(tableCategoryInMaster.prefix, sq.schema))
    .orderBy(desc(sq.rows));

  const final = master.reduce((acc, curr) => {
    const res = structuredClone(acc);
    const existing = res.find(x => x.category === curr.category);
    if (!existing) res.push({
      category: curr.category,
      owner: curr.owner,
      prefix: curr.prefix,
      tables: [
        {
          tableName: curr.table,
          tableUrl: "",
          rowCount: curr.row,
        }
      ]
    });
    else existing.tables.push({
      tableName: curr.table,
      tableUrl: "",
      rowCount: curr.row,
    });
    return res;
  }, [] as DashboardResponse[]);

  return okResponse(final);
});