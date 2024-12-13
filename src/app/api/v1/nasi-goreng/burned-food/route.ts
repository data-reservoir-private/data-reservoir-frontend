import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.nasi_goreng.burned_food.aggregate(ID_AGGR).toArray()
  ));
}