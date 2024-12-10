import { and, eq, ne } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { DB } from "@/database/client";
import { newResponse } from '@/utilities/api';
import { TransjakartaBusStopResponse } from '@/model/response/transjakarta';
import { transjakartaBusStop } from '@/database/schema';

export async function GET() {
  const data = await DB
    .select({
      brt: transjakartaBusStop.brt,
      latitude: transjakartaBusStop.latitude,
      longitude: transjakartaBusStop.longitude,
      name: transjakartaBusStop.name,
      code: transjakartaBusStop.code,
      permanentlyClosed: transjakartaBusStop.permanentlyClosed,
    })
    .from(transjakartaBusStop)
    .where(and(
      // eq(transjakartaBusStop.permanentlyClosed, false),
      ne(transjakartaBusStop.latitude, 0),
      ne(transjakartaBusStop.longitude, 0),
    ));
    // .limit(1000);

  return NextResponse.json(newResponse<TransjakartaBusStopResponse[]>(data));
}