import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { fourPcHarvestableInTheSims } from "@drizzle/schema";
import { z } from "zod/v4";

const schema = z.object({
  field: z.string()
}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    await DB_SQL.query.fourPcHarvestableInTheSims.findMany({
      extras: {
        image: resolveImageSQL(fourPcHarvestableInTheSims.image)
      },
      limit: query.pageSize,
      offset: query.currentPage * query.pageSize
    })
  );
}, { cache: true });