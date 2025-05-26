import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL } from "@/utilities/api";
import { omitProperty } from "@/utilities/general";
import { friedRiceInNasiGoreng, friedRiceLevelDetailInNasiGoreng, friedRiceLevelInNasiGoreng, friedRiceLevelRecipeInNasiGoreng, friedRiceRecipeInNasiGoreng, ingredientInNasiGoreng, toolInNasiGoreng, upgradeInNasiGoreng } from "@drizzle/schema";
import { asc, eq, inArray, or } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({
  complete: z.coerce.boolean().default(false)
}).extend(PaginationSchema.shape);


export const GET = GETMethodRoute(schema, async (_, { complete, pageSize, currentPage }) => {
  if (!complete) {
    return (
      (
        await DB_SQL.query.friedRiceInNasiGoreng.findMany({
          extras: {
            image: resolveImageSQL(friedRiceInNasiGoreng.rawImage)
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
              where: inArray(friedRiceLevelInNasiGoreng.level, [1, 6]),
              orderBy: [asc(friedRiceLevelInNasiGoreng.level)]
            },
          },
          columns: {
            id: true,
            name: true,
            description: true,
            price: true
          },
          limit: pageSize === 0 ? undefined : pageSize,
          offset: pageSize === 0 ? 0 : (currentPage - 1) * pageSize,
        })
      ).map(fr => omitProperty({
        ...fr,
        level1Image: fr.friedRiceLevelInNasiGorengs.find(x => x.level === 1)!.image,
        level6Image: fr.friedRiceLevelInNasiGorengs.find(x => x.level === 6)!.image
      }, 'friedRiceLevelInNasiGorengs'))
    )
  }
  const friedRice = await DB_SQL.query.friedRiceInNasiGoreng.findMany({
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
    limit: pageSize === 0 ? undefined : pageSize,
    offset: pageSize === 0 ? 0 : (currentPage - 1) * pageSize,
  });

  const friedRiceIDs = friedRice.map(x => x.id);
  const friedRiceLevelIDs = friedRice.flatMap(x => x.friedRiceLevelInNasiGorengs.map(y => y.id));

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
    .where(inArray(friedRiceRecipeInNasiGoreng.friedRiceId, friedRiceIDs));

  const finalData = friedRice.map(fr => {
    const level = fr.friedRiceLevelInNasiGorengs.map(frl => {
      return {
        ...frl,
        recipe: levelRecipe.filter(x => x.levelId === frl.id).map(x => omitProperty(x, 'levelId')),
        detail: levelDetail.filter(x => x.levelId === frl.id).map(x => omitProperty(x, 'levelId')),
      }
    })

    return omitProperty({
      ...fr,
      level: level,
      ingredient: ingredient.filter(x => x.friedRiceId === fr.id).map(x => omitProperty(x, 'friedRiceId')),
      tool: fr.toolInNasiGoreng,
      plate: fr.plateInNasiGoreng,
    }, 'friedRiceLevelInNasiGorengs', 'toolInNasiGoreng', 'plateInNasiGoreng')
  });
  return (finalData);
}, { cache: true });