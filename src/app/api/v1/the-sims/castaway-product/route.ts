import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { castawayProductInTheSims } from "@drizzle/schema";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    await DB_SQL.query.castawayProductInTheSims.findMany({
      extras: {
        image: resolveImageSQL(castawayProductInTheSims.image)
      },
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })
  );
}, { cache: true });