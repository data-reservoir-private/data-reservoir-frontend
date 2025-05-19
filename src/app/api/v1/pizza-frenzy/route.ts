import { DB_SQL } from "@/database/db-new";
import { newResponse, GETMethodRoute } from "@/utilities/api";
import { toppingInPizzaFrenzy } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

const schema = z.object({
  complete: z.coerce.boolean().default(false)
});

export const GET = GETMethodRoute(schema, async (_, query) => {
  if (query.complete) {
    return NextResponse.json(newResponse(
      (await DB_SQL.query.toppingInPizzaFrenzy.findMany({
        extras: {
          image: sql<string>`${process.env.IMAGE_URL} || ${toppingInPizzaFrenzy.image}`.as("image"),
        },
        with: {
          toppingUpgradeInPizzaFrenzies: true
        }
      })).map(x => ({
        ...x,
        toppings: x.toppingUpgradeInPizzaFrenzies,
        toppingUpgradeInPizzaFrenzies: undefined
      }))
    ));
  }
  else {
    return NextResponse.json(newResponse(
      await DB_SQL.query.toppingInPizzaFrenzy.findMany({
        extras: {
          image: sql<string>`${process.env.IMAGE_URL} || ${toppingInPizzaFrenzy.image}`.as("image")
        },
      })
    ));
  }
});