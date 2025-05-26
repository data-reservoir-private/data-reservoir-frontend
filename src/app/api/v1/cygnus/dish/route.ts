import { DB_SQL } from "@/database/db-new";
import { CygnusDishResponse } from "@/model/response/cygnus";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute } from "@/utilities/api";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    await DB_SQL.query.dishInCygnus.findMany({
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })
  ) satisfies CygnusDishResponse[];
}, { cache: true });