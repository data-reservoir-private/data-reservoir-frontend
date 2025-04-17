import { NextResponse } from "next/server";
import { MongoDBHelper, newResponse, routeInstance } from "@/utilities/api";
import { z } from "zod";
import { PaginationSchema } from "@/model/validation/base";
import { MONGODB, ID_AGGR } from "@/database/db";
import { HayDayProductResponse } from "@/model/response/hayday";
import { supabaseServer } from "@/utilities/supabase-server";

const validationSchema = z.object({
  level: z.coerce.number().gte(0).default(0),
  category: z.string().optional(),
  keyword: z.string().optional(),
  simple: z.enum(["0", "1"]).default("0").transform(x => x === "1")
}).merge(PaginationSchema)

export const GET = routeInstance
  .query(validationSchema)
  .handler(async (_, { query }) => {
    // if (!query.simple) {
    //   const s = await supabaseServer()
    //   const { data } = await s.auth.getUser();
    //   console.log(data.user);
    //   if (!data.user) return NextResponse.json(newResponse("Unauthorized"), { status: 401 });
    // }
    const res = await MONGODB.hayday.product.aggregate(
      MongoDBHelper.createPipeline(
        ID_AGGR,
        MongoDBHelper.unset(
          'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
          'producer.building_id', 'producer.product_id', 'producer.id',
          'usage.product_id', 'usage.id'
        ),
        query.simple ? MongoDBHelper.unset(
          'usage', 'ingredients', 'producer'
        ) : undefined,
        query.category && query.category.length > 0 ? MongoDBHelper.equalString('$category', query.category) : undefined,
        query.keyword && query.keyword.length > 0 ? MongoDBHelper.like('name', query.keyword) : undefined,
        query.level > 0 ? {
          $match: {
            level: {
              $lte: query.level
            }
          }
        } : undefined,
        { $sort: { level: 1 } },
        MongoDBHelper.addPagination(query.currentPage, query.pageSize)
        
      )
    ).toArray() as HayDayProductResponse[];

    return NextResponse.json(newResponse(res))
  });