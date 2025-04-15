import { MONGODB, ID_AGGR } from "@/database/db";
import { HayDayProductResponse } from "@/model/response/hayday";
import { MongoDBHelper } from "@/utilities/api";

export async function GetHaydayProduct(limit: number) {
  return await MONGODB.hayday.product.aggregate(
    MongoDBHelper.createPipeline(
      ID_AGGR,
      MongoDBHelper.unset([
        'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
        'producer.building_id', 'producer.product_id', 'producer.id',
        'usage.product_id', 'usage.id'
      ]),
      { $sort: { level: 1 } },
      limit === 0 ? undefined : { $limit: limit }
    )
  ).toArray() as HayDayProductResponse[];
}