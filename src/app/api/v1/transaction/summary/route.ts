import { GetSummary } from "@/service/transaction";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(newResponse(await GetSummary()));
}