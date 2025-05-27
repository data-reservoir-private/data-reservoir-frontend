import { DB_SQL } from "@/database/db-new";
import { HayDayBuildingResponse } from "@/model/response/hayday";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { omitProperty } from "@/utilities/general";
import { buildingInHayday, productInHayday } from "@drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  id: z.uuid()
});

export const GET = GETMethodRoute(schema, async (_, query) => {
  const data = await DB_SQL.query.buildingInHayday.findFirst({
    extras: {
      image: resolveImageSQL(buildingInHayday.image),
    },
    where: eq(buildingInHayday.id, query.id),
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
  });
  if (!data) return null;
  return omitProperty({
    ...data,
    produces: data.producerInHaydays.map(x => x.productInHayday),
  }, 'producerInHaydays') satisfies HayDayBuildingResponse;
}, { cache: true });