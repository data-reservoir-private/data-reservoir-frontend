import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { ingredientInNasiGoreng, ingredientRecipeInNasiGoreng, ingredientToolInNasiGoreng, toolInNasiGoreng } from "@drizzle/schema";
import { eq, getTableColumns, inArray } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  complete: z.coerce.boolean().default(false)
}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, { complete, pageSize, currentPage }) => {
  if (complete) {
    const ingredientQuery = DB_SQL.select({
      ...getTableColumns(ingredientInNasiGoreng),
      image: resolveImageSQL(ingredientInNasiGoreng.image)
    }).from(ingredientInNasiGoreng);

    const ingredient = (pageSize === 0) ?
      await ingredientQuery :
      await ingredientQuery
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize);
    const ingredientID = ingredient.map(x => x.id);

    const tool = await DB_SQL.select({
      ingredientId: ingredientToolInNasiGoreng.resultId,
      toolId: toolInNasiGoreng.id,
      toolName: toolInNasiGoreng.name,
      toolImage: resolveImageSQL(toolInNasiGoreng.image)
    })
      .from(ingredientToolInNasiGoreng)
      .innerJoin(toolInNasiGoreng, eq(ingredientToolInNasiGoreng.toolId, toolInNasiGoreng.id))
      .where(inArray(ingredientToolInNasiGoreng.resultId, ingredientID));

    const recipe = await DB_SQL.select({
      ingredientId: ingredientRecipeInNasiGoreng.resultId,
      recipeId: ingredientInNasiGoreng.id,
      recipeName: ingredientInNasiGoreng.name,
      recipeImage: resolveImageSQL(ingredientInNasiGoreng.image)
    })
      .from(ingredientRecipeInNasiGoreng)
      .innerJoin(ingredientInNasiGoreng, eq(ingredientRecipeInNasiGoreng.ingredientNeededId, ingredientInNasiGoreng.id))
      .where(inArray(ingredientRecipeInNasiGoreng.resultId, ingredientID));

    return (
      (
        ingredient.map(i => {
          const t = tool.find(x => x.ingredientId === i.id);
          return {
            ...i,
            tool: t ? { ...t, ingredientId: undefined } : null,
            recipe: recipe.filter(r => r.ingredientId === i.id).map(r => ({
              ...r,
              ingredientId: undefined,
            }))
          }
        })
      )
    );
  }

  else {
    return (
      await DB_SQL.query.ingredientInNasiGoreng.findMany({
        extras: {
          image: resolveImageSQL(ingredientInNasiGoreng.image)
        },
        limit: pageSize === 0 ? undefined : pageSize,
        offset: pageSize === 0 ? 0 : (currentPage - 1) * pageSize,
      })
    );
  }
}, { cache: true });