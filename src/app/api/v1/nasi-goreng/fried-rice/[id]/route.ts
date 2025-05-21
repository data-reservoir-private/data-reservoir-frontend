import { DB_SQL } from "@/database/db-new";
import { GETMethodRoute, okResponse, resolveImageSQL } from "@/utilities/api";
import { omitProperty } from "@/utilities/general";
import { friedRiceInNasiGoreng, friedRiceLevelDetailInNasiGoreng, friedRiceLevelInNasiGoreng, friedRiceLevelRecipeInNasiGoreng, friedRiceRecipeInNasiGoreng, ingredientInNasiGoreng, plateInNasiGoreng, toolInNasiGoreng, upgradeInNasiGoreng } from "@drizzle/schema";
import { asc, eq, inArray } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  id: z.uuid()
});

export const GET = GETMethodRoute(schema, async (_, { id }) => {
  const friedRice = await DB_SQL.query.friedRiceInNasiGoreng.findFirst({
    extras: {
      image: resolveImageSQL(friedRiceInNasiGoreng.rawImage)
    },
    columns: {
      id: true,
      name: true,
      description: true,
      price: true
    },
    with: {
      friedRiceLevelInNasiGorengs: {
        extras: {
          image: resolveImageSQL(friedRiceLevelInNasiGoreng.image)
        },
        columns: {
          id: true,
          friedRicesNeeded: true,
          level: true,
        },
        orderBy: [asc(friedRiceLevelInNasiGoreng.level)]
      },
      toolInNasiGoreng: {
        extras: {
          image: resolveImageSQL(toolInNasiGoreng.image)
        },
        columns: {
          name: true,
          price: true
        }
      },
      plateInNasiGoreng: {
        extras: {
          image: resolveImageSQL(toolInNasiGoreng.image)
        },
        columns: {
          id: true
        }
      }
    },
    where: eq(friedRiceInNasiGoreng.id, id)
  });

  if (!friedRice) return okResponse(null);
  const friedRiceLevelIDs = friedRice.friedRiceLevelInNasiGorengs.map(x => x.id);

  const levelDetail = await DB_SQL.select({
    id: upgradeInNasiGoreng.id,
    image: resolveImageSQL(upgradeInNasiGoreng.image),
    name: upgradeInNasiGoreng.name,
    levelId: friedRiceLevelDetailInNasiGoreng.friedRiceLevelId
  })
    .from(friedRiceLevelDetailInNasiGoreng)
    .innerJoin(upgradeInNasiGoreng, eq(friedRiceLevelDetailInNasiGoreng.upgradeId, upgradeInNasiGoreng.id))
    .where(inArray(friedRiceLevelDetailInNasiGoreng.friedRiceLevelId, friedRiceLevelIDs));

  const levelRecipe = await DB_SQL.select({
    id: ingredientInNasiGoreng.id,
    image: resolveImageSQL(ingredientInNasiGoreng.image),
    name: ingredientInNasiGoreng.name,
    quantity: friedRiceLevelRecipeInNasiGoreng.quantity,
    levelId: friedRiceLevelRecipeInNasiGoreng.friedRiceLevelId
  })
    .from(friedRiceLevelRecipeInNasiGoreng)
    .innerJoin(ingredientInNasiGoreng, eq(friedRiceLevelRecipeInNasiGoreng.ingredientId, ingredientInNasiGoreng.id))
    .where(inArray(friedRiceLevelRecipeInNasiGoreng.friedRiceLevelId, friedRiceLevelIDs));

  const ingredient = await DB_SQL.select({
    id: ingredientInNasiGoreng.id,
    image: resolveImageSQL(ingredientInNasiGoreng.image),
    name: ingredientInNasiGoreng.name,
    friedRiceId: friedRiceRecipeInNasiGoreng.friedRiceId
  })
    .from(friedRiceRecipeInNasiGoreng)
    .innerJoin(ingredientInNasiGoreng, eq(friedRiceRecipeInNasiGoreng.ingredientId, ingredientInNasiGoreng.id))
    .where(eq(friedRiceRecipeInNasiGoreng.friedRiceId, friedRice.id));

  const level = friedRice.friedRiceLevelInNasiGorengs.map(frl => {
    return {
      ...frl,
      recipe: levelRecipe.filter(x => x.levelId === frl.id).map(x => omitProperty(x, 'levelId')),
      detail: levelDetail.filter(x => x.levelId === frl.id).map(x => omitProperty(x, 'levelId')),
    }
  })

  const finalData = omitProperty({
    ...friedRice,
    level: level,
    ingredient: ingredient.filter(x => x.friedRiceId === friedRice.id).map(x => omitProperty(x, 'friedRiceId')),
    tool: friedRice.toolInNasiGoreng,
    plate: friedRice.plateInNasiGoreng,
  }, 'friedRiceLevelInNasiGorengs', 'toolInNasiGoreng', 'plateInNasiGoreng')
  return okResponse(finalData);
});