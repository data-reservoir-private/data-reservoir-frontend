import { DB_SQL } from "@/database/db-new";
import { CygnusArtifactResponse } from "@/model/response/cygnus";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { artifactInCygnus } from "@drizzle/schema";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    await DB_SQL.query.artifactInCygnus.findMany({
      extras: {
        image: resolveImageSQL(artifactInCygnus.image)
      },
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })
  ) satisfies CygnusArtifactResponse[];
}, { cache: true });