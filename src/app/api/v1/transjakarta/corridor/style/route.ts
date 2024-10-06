import { DB } from "@/database/client";
import { transjakartaCorridorStyle } from "@/database/schema";
import { TransjakartaCorridorStyleResponse } from "@/model/response/transjakarta";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  const rawData = await DB.select({
    corridorHexColor: transjakartaCorridorStyle.hexColor,
    corridorCode: transjakartaCorridorStyle.code
  }).from(transjakartaCorridorStyle);

  return NextResponse.json(newResponse<TransjakartaCorridorStyleResponse[]>(rawData))
}