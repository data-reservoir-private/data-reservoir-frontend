import { MONGODB, ID_AGGR } from "@/database/mongodb/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.nasi_goreng.tool.aggregate(ID_AGGR).toArray()
  ));
}