import { ID_AGGR, MONGODB } from "@/database/db";
import { PaginationSchema } from "@/model/validation/base";
import { MongoDBHelper, newResponse, routeInstance } from "@/utilities/api";
import { z } from 'zod';

const schema = z.object({ category: z.string().optional() }).merge(PaginationSchema);
export const GET = routeInstance
  .query(schema)
  .handler(async (_: Request, context) => {
    const { category } = context.query;
    return newResponse(
      await MONGODB.the_sims.castaway_product.aggregate(
        MongoDBHelper.createPipeline(
          ID_AGGR,
          category ? MongoDBHelper.equalString('$category', category) : undefined,
        )
      ).toArray()
    );
  });