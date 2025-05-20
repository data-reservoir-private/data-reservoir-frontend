import { DB_SQL } from "@/database/db-new";
import { GETMethodRoute, okResponse } from "@/utilities/api";
import { toppingInPizzaFrenzy } from "@drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  id: z.uuid()
});

export const GET = GETMethodRoute(schema, async (_, query) => {
  const data = await DB_SQL.query.toppingInPizzaFrenzy.findFirst({
    where: eq(toppingInPizzaFrenzy.id, query.id),
    extras: {
      image: sql<string>`${process.env.IMAGE_URL} || ${toppingInPizzaFrenzy.image}`.as("image"),
    },
    with: {
      toppingUpgradeInPizzaFrenzies: true
    }
  })
  return okResponse(
    data ? {
      ...data,
      toppingUpgradeInPizzaFrenzies: undefined,
      toppings: data?.toppingUpgradeInPizzaFrenzies
    } : null
  );
});