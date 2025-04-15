import { NextResponse } from "next/server";
import { MongoDBHelper, newResponse, routeInstance } from "@/utilities/api";
import { GetHaydayProduct } from "@/service/hayday";
import { z } from "zod";
import { PaginationSchema } from "@/model/validation/base";
import { MONGODB, ID_AGGR } from "@/database/db";
import { HayDayProductResponse } from "@/model/response/hayday";

const validationSchema = z.object({
  level: z.number().gte(0).default(0),
  category: z.string().optional(),
  name: z.string().optional()
}).merge(PaginationSchema)

export const GET = routeInstance
  .query(validationSchema)
  .handler(async (_, { query }) => {
    const res = await MONGODB.hayday.product.aggregate(
      MongoDBHelper.createPipeline(
        ID_AGGR,
        MongoDBHelper.unset([
          'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
          'producer.building_id', 'producer.product_id', 'producer.id',
          'usage.product_id', 'usage.id'
        ]),
        query.category && query.category.length > 0 ? MongoDBHelper.equalString('$category', query.category) : undefined,
        query.name && query.name.length > 0 ? MongoDBHelper.like('$name', query.name) : undefined,
        query.level > 0 ? {
          $match: {
            level: {
              $gte: query.level
            }
          }
        } : undefined,
        { $sort: { level: 1 } },
        MongoDBHelper.addPagination(query.currentPage, query.pageSize)
        
      )
    ).toArray() as HayDayProductResponse[];

    return NextResponse.json(newResponse(res))
  })

/*
function GET() {
  return NextResponse.json(newResponse(GetHaydayProduct()));
}

*/