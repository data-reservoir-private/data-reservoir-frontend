import { DB_SQL } from "@/database/db-new";
import { GETMethodRoute } from "@/utilities/api";
import { buildingInHayday, productInHayday } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  id: z.uuid()
});

export const GET = GETMethodRoute(schema, async (_, query) => {
  const data = await DB_SQL.query.buildingInHayday.findFirst({
    extras: {
      image: sql<string>`${process.env.IMAGE_URL} || ${buildingInHayday.image}`.as("image"),
    },
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
  return (
    data ? {
      ...data,
      products: data.producerInHaydays.map(x => ({
        ...x,
        product: x.productInHayday,
        productInHayday: undefined
      })),
      producerInHaydays: undefined
    } : null
  );
}, { cache: true });