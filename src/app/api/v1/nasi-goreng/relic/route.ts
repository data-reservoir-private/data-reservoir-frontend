import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute } from "@/utilities/api";
import { relicInNasiGoreng } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    (await DB_SQL.query.relicInNasiGoreng.findMany({
      extras: {
        image: sql<string>`${process.env.IMAGE_URL} || ${relicInNasiGoreng.image}`.as("image")
      },
      columns: {
        toolId: false
      },
      with: {
        toolInNasiGoreng: {
          extras: {
            image: sql<string>`${process.env.IMAGE_URL} || ${relicInNasiGoreng.image}`.as("image")
          },
          columns: {
            id: true,
            name: true
          }
        }
      },
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })).map(x => ({...x, tool: x.toolInNasiGoreng, toolInNasiGoreng: undefined}))
  );
}, { cache: true });