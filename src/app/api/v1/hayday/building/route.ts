import { DB_SQL } from "@/database/db-new";
import { HayDayBuildingResponse, HayDaySimpleBuildingResponse } from "@/model/response/hayday";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute } from "@/utilities/api";
import { omitProperty } from "@/utilities/general";
import { buildingInHayday, productInHayday } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  complete: z.coerce.boolean().default(false)
}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  if (query.complete) {
    return (
      (await DB_SQL.query.buildingInHayday.findMany({
        extras: {
          image: sql<string>`${process.env.IMAGE_URL} || ${buildingInHayday.image}`.as("image"),
        },
        limit: query.pageSize === 0 ? undefined : query.pageSize,
        offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize,
        with: {
          producerInHaydays: {
            with: {
              productInHayday: {
                extras: {
                  image: sql<string>`${process.env.IMAGE_URL} || ${productInHayday.image}`.as("image"),
                },
                columns: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      })).map(data => omitProperty({
        ...data,
        produces: data.producerInHaydays.map(x => x.productInHayday),
      }, 'producerInHaydays') satisfies HayDayBuildingResponse) satisfies HayDayBuildingResponse[]
    );
  }
  else {
  return (
    await DB_SQL.query.buildingInHayday.findMany({
      extras: {
        image: sql<string>`${process.env.IMAGE_URL} || ${buildingInHayday.image}`.as("image")
      },
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })
  ) satisfies HayDaySimpleBuildingResponse[];
}
}, { cache: true });