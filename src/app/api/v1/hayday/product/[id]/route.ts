import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET(_: Request, props: { params : Promise<{ id: string }>}) {
  const params = await props.params;

  return NextResponse.json(newResponse(
    (await MONGODB.hayday.product.aggregate([
      ...ID_AGGR,
      {
        $unset: [
          'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
          'producer.building_id', 'producer.product_id', 'producer.id',
          'usage.product_id', 'usage.id'
        ]
      },
      { $match: { id: params.id } }
    ]).toArray()).find(_ => true)
  ));
}