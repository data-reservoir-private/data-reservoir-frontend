import { DB_SQL } from "@/database/db-new";
import { CygnusMineralResponse } from "@/model/response/cygnus";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { mineralInCygnus } from "@drizzle/schema";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    (await DB_SQL.query.mineralInCygnus.findMany({
      extras: {
        image: resolveImageSQL(mineralInCygnus.image)
      },
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })) satisfies CygnusMineralResponse[]
  );
}, { cache: true });