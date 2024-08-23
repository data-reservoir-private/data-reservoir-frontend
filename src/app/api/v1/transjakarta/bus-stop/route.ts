import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { DB } from "@/database/client";
import { transjakartaBusStop } from "@/database/schema";
import { newResponse } from '@/utilities/api';
import { TransjakartaBusStopResponse } from '@/model/response/transjakarta';

export async function GET() {
  const data = await DB
    .select({
      id: transjakartaBusStop.id,
      brt: transjakartaBusStop.brt,
      latitude: transjakartaBusStop.latitude,
      longitude: transjakartaBusStop.longitude,
      name: transjakartaBusStop.name,
      code: transjakartaBusStop.code
    })
    .from(transjakartaBusStop)
    .where(eq(transjakartaBusStop.brt, true))

  return NextResponse.json(newResponse<TransjakartaBusStopResponse[]>(data));
}