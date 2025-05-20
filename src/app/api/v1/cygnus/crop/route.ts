import { DB_SQL } from "@/database/db-new";
import { CygnusCropStage, CygnusSeeds, CygnusSpecial } from "@/model/dto/cygnus";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute, resolveImageSQL, okResponse, resolveImage } from "@/utilities/api";
import { cropInCygnus } from "@drizzle/schema";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {

  const data = await DB_SQL.query.cropInCygnus.findMany({
    extras: {
      image: resolveImageSQL(cropInCygnus.image)
    },
    with: {
      cropGradeInCygnuses: {
        columns: {
          cropId: false,
          id: false
        }
      }
    },
    limit: query.pageSize === 0 ? undefined : query.pageSize,
    offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
  });

  // Resolve Images
  const complete = data.map(x => {

    const seed = x.seeds as CygnusSeeds;
    seed.Image = resolveImage(seed.Image);

    const special = x.special as CygnusSpecial | null;
    if (special && special.Giant) special.Giant = resolveImage(special?.Giant ?? "");

    const stage = x.stages as CygnusCropStage;
    if(stage.Done.Regrowth) stage.Done.Regrowth = resolveImage(stage.Done.Regrowth);
    stage.Ongoing = stage.Ongoing.map(s => ({ ...s, Image: resolveImage(s.Image) }));
    stage.Done.Harvest = resolveImage(stage.Done.Harvest);

    return {
      ...x,
      seeds: seed,
      special: special,
      stages: stage,
      grades: x.cropGradeInCygnuses,
      cropGradeInCygnuses: undefined
    };
  });

  return okResponse(complete);
});