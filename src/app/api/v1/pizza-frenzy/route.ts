export const dynamic = 'force-static';

import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  return NextResponse.json(newResponse(
    await MONGODB.pizza_frenzy.topping.aggregate([...ID_AGGR, {
      $unset: [
        'upgrades.topping_id', 'upgrades.id'
      ]
    }]).toArray()
  ));
}