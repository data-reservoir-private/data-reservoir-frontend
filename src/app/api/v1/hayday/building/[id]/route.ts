import { DB_SQL } from "@/database/db-new";
import { newResponse, GETMethodRoute } from "@/utilities/api";
import { buildingInHayday, productInHayday } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

const schema = z.object({
  complete: z.coerce.boolean().default(false)
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
  return NextResponse.json(newResponse(
    data ? {
      ...data,
      products: data.producerInHaydays.map(x => ({
        ...x,
        product: x.productInHayday,
        productInHayday: undefined
      })),
      producerInHaydays: undefined
    } : null
  ));
});