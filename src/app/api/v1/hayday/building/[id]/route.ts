import { ID_AGGR, MONGODB } from "@/database/mongodb/db";
import { newResponse } from "@/utilities/api";
import { UUID } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(_: Request, props: { params : Promise<{ id: string }>}) {
  const params = await props.params;
  const id = UUID.createFromHexString(params.id);
  return NextResponse.json(newResponse(
    await MONGODB.hayday.building.aggregate(
      [...ID_AGGR,
        {
          $unset: [
            'produces.building_id', 'produces.product_id', 'produces.id'
          ]
        },
        {
          $match: { id: id }
        }
      ]
    ).toArray()
  ));
}