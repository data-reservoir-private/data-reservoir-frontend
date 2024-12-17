export const dynamic = 'force-static';

import { NextResponse } from "next/server";
import { newResponse } from "@/utilities/api";
import { ID_AGGR, MONGODB } from "@/database/db";

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.hayday.product.aggregate([...ID_AGGR, {
      $unset: [
        'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
        'producer.building_id', 'producer.product_id', 'producer.id',
        'usage.product_id', 'usage.id'
      ]
    }]).toArray()
  ));
}