import { MONGODB, ID_AGGR } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.nasi_goreng.upgrade.aggregate(ID_AGGR).toArray()
  ));
}