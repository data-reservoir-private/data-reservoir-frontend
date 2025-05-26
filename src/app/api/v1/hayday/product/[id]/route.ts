import { DB_SQL } from "@/database/db-new";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { productInHayday, buildingInHayday, producerInHayday, ingredientInHayday } from "@drizzle/schema";
import { getTableColumns, eq, asc } from "drizzle-orm";
import _ from "lodash";
import { z } from "zod/v4";

const schema = z.object({
  id: z.uuid()
});

export const GET = GETMethodRoute(schema, async (_, query) => {
  const productT = await DB_SQL.select({
    ...getTableColumns(productInHayday),
    image: resolveImageSQL(productInHayday.image)
  })
    .from(productInHayday)
    .where(eq(productInHayday.id, query.id))
    .limit(1);

  if (productT.length !== 1) return null;
  const product = productT[0];

  // Get Producer
  const buildings = await DB_SQL.select({
    id: buildingInHayday.id,
    productId: producerInHayday.productId,
    name: buildingInHayday.name,
    image: resolveImageSQL(buildingInHayday.image),
  })
    .from(producerInHayday)
    .innerJoin(buildingInHayday, eq(producerInHayday.buildingId, buildingInHayday.id))
    .where(eq(producerInHayday.productId, product.id))

  // Get Recipe
  const recipe = await DB_SQL.select({
    ingredientId: productInHayday.id,
    productId: ingredientInHayday.productId,
    name: productInHayday.name,
    image: resolveImageSQL(productInHayday.image),
    quantity: ingredientInHayday.quantity
  })
    .from(ingredientInHayday)
    .innerJoin(productInHayday, eq(ingredientInHayday.ingredientId, productInHayday.id))
    .where(eq(ingredientInHayday.productId, product.id))
    .orderBy(asc(productInHayday.level));

  // Get Usage
  const usage = await DB_SQL.select({
    ingredientId: ingredientInHayday.ingredientId,
    productId: ingredientInHayday.productId,
    name: productInHayday.name,
    image: resolveImageSQL(productInHayday.image),
    quantity: ingredientInHayday.quantity
  })
    .from(ingredientInHayday)
    .innerJoin(productInHayday, eq(ingredientInHayday.productId, productInHayday.id))
    .where(eq(ingredientInHayday.ingredientId, product.id))
    .orderBy(asc(productInHayday.level));

  const bT = buildings.find(x => x.productId === product.id);
  const b = bT && { ...bT, productId: undefined };

  const r = recipe.filter(x => x.productId === product.id).map(x => ({ id: x.ingredientId, ...x, ingredientId: undefined, productId: undefined }));
  const u = usage.filter(x => x.ingredientId === product.id).map(x => ({ id: x.productId, ...x, ingredientId: undefined, productId: undefined }));

  return ({
    ...product,
    producer: b,
    recipe: r,
    usage: u,
  });
}, { cache: true });