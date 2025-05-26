import { DB_SQL } from "@/database/db-new";
import { CygnusForageResponse } from "@/model/response/cygnus";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { omitProperty } from "@/utilities/general";
import { forageInCygnus } from "@drizzle/schema";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {

  const data = await DB_SQL.query.forageInCygnus.findMany({
    extras: {
      image: resolveImageSQL(forageInCygnus.image)
    },
    with: {
      forageGradeInCygnuses: {
        columns: {
          forageId: false,
          id: false
        }
      }
    },
    limit: query.pageSize === 0 ? undefined : query.pageSize,
    offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
  });

  // Resolve Images
  const complete = data.map(x => {
    return omitProperty({
      ...x,
      grades: x.forageGradeInCygnuses,
    }, 'forageGradeInCygnuses');
  });

  return (complete satisfies CygnusForageResponse[]);
}, { cache: true });