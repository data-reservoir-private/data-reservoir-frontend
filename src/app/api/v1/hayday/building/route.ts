export const dynamic = 'force-static';

import { NextRequest, NextResponse } from "next/server";
import { newResponse } from "@/utilities/api";
import { ID_AGGR, MONGODB } from "@/database/db";

export async function GET(_: NextRequest) {
  return NextResponse.json(newResponse(
    await MONGODB.hayday.building.aggregate([...ID_AGGR, {
      $unset: [
        'produces.building_id', 'produces.product_id', 'produces.id'
      ]
    }]).toArray()
  ));
}