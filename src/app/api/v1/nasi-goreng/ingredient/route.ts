import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.nasi_goreng.ingredient.aggregate([...ID_AGGR, {
      $unset: [
        'recipe.id', 'recipe.ingredient_id',
        'tool.id', 'tool.tool_id'
      ]
    }]).toArray()
  ));
}