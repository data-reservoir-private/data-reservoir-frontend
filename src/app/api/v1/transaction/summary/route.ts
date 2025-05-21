import { GetSummary } from "@/service/transaction";
import { newResponse, okResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return okResponse({});
}