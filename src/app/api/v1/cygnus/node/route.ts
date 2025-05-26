import { DB_SQL } from "@/database/db-new";
import { CygnusNodeResponse } from "@/model/response/cygnus";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImage } from "@/utilities/api";
import { nodeInCygnus } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    (
      await DB_SQL.query.nodeInCygnus.findMany({
        extras: {
          nodes: sql<string>`${nodeInCygnus.id}`.as("nodes")
        },
        limit: query.pageSize === 0 ? undefined : query.pageSize,
        offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
      })
    ).map(x => ({...x, image: x.image.map(i => resolveImage(i))})) satisfies CygnusNodeResponse[]
  );
}, { cache: true });