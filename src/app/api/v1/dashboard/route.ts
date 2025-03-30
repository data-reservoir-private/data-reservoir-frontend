import { GetDashboardData } from "@/service/dashboard";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? "";

  return NextResponse.json(newResponse(await GetDashboardData(category)));
}