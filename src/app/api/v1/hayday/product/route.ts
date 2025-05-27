import { DB_SQL } from "@/database/db-new";
import { HayDayProductResponse, HayDaySimpleProductResponse } from "@/model/response/hayday";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { productInHayday, producerInHayday, buildingInHayday, ingredientInHayday } from "@drizzle/schema";
import { and, asc, between, eq, getTableColumns, gte, inArray, sql, lte, ilike } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  complete: z.coerce.boolean().default(false),
  category: z.string().default(""),
  name: z.string().default(""),
  level: z.coerce.number().default(0),
  minPrice: z.coerce.number().default(0),
  maxPrice: z.coerce.number().default(0),
  isRaw: z.coerce.boolean().optional(),
}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, { complete, name, level, minPrice, maxPrice, pageSize, currentPage, isRaw, category }) => {

  const conditional = and(
    name.length === 0 ? undefined : sql`SIMILARITY(${name}, ${productInHayday.name}) > 0.2`,
    category.length === 0 ? undefined : ilike(productInHayday.category, category),
    level === 0 ? undefined : lte(productInHayday.level, level),
    typeof isRaw === 'undefined' ? undefined : eq(productInHayday.isRaw, isRaw),
    minPrice > 0 && maxPrice > 0 ? between(productInHayday.price, minPrice, maxPrice) :
      minPrice > 0 ? gte(productInHayday.price, minPrice) :
        maxPrice > 0 ? lte(productInHayday.price, maxPrice) : undefined
  )

  if (complete) {
    let productsQuery = DB_SQL.select({
      ...getTableColumns(productInHayday),
      image: resolveImageSQL(productInHayday.image)
    })
      .from(productInHayday)
      .where(conditional);

    const products = (pageSize === 0) ?
      await productsQuery :
      await productsQuery
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize);
    const productIds = products.map(product => product.id);

    // Get Producer
    const buildings = await DB_SQL.select({
      id: buildingInHayday.id,
      productId: producerInHayday.productId,
      name: buildingInHayday.name,
      image: resolveImageSQL(buildingInHayday.image),
    })
      .from(producerInHayday)
      .innerJoin(buildingInHayday, eq(producerInHayday.buildingId, buildingInHayday.id))
      .where(inArray(producerInHayday.productId, productIds));

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
      .where(inArray(ingredientInHayday.productId, productIds))
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
      .where(inArray(ingredientInHayday.ingredientId, productIds))
      .orderBy(asc(productInHayday.level));

    const finalResponse = products.map(product => {
      const bT = buildings.find(x => x.productId === product.id);
      const b = bT && { ...bT, productId: undefined };

      const r = recipe.filter(x => x.productId === product.id).map(x => ({ id: x.ingredientId, ...x, ingredientId: undefined, productId: undefined }));
      const u = usage.filter(x => x.ingredientId === product.id).map(x => ({ id: x.productId, ...x, ingredientId: undefined, productId: undefined }));

      return {
        ...product,
        producer: b,
        ingredients: r,
        usage: u,
      } satisfies HayDayProductResponse;
    });
    return finalResponse satisfies HayDayProductResponse[];
  }
  else {
    return (
      await DB_SQL.query.productInHayday.findMany({
        extras: {
          image: resolveImageSQL(productInHayday.image)
        },
        limit: pageSize === 0 ? undefined : pageSize,
        offset: pageSize === 0 ? 0 : (currentPage - 1) * pageSize,
        where: conditional
      })
    ) satisfies HayDaySimpleProductResponse[];
  }
}, { cache: true });