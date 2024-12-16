export const dynamic = 'force-static';

import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";
import { ID_AGGR, MONGODB } from '@/database/db';

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.nasi_goreng.fried_rice.aggregate([...ID_AGGR, {
      $unset: [
        'levels.id', 'recipe.id', 'recipe.ingredient_id',
        'levels.recipe.id', 'levels.recipe.ingredient_id',
        'plate.id', 'levels.details.upgrade_id', 'tool_id'
      ]
    }]).toArray()
  ));
}