import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, okResponse, resolveImage } from "@/utilities/api";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return okResponse(
    (
      await DB_SQL.query.nodeInCygnus.findMany({
        limit: query.pageSize === 0 ? undefined : query.pageSize,
        offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
      })
    ).map(x => ({...x, image: x.image.map(i => resolveImage(i))}))
  );
});