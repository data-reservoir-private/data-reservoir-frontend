import { transjakartaCorridor } from './../../../../../database/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { DB } from "@/database/client";
import { transjakartaBusRoute, transjakartaBusStop } from "@/database/schema";
import { newResponse } from '@/utilities/api';
import { TransjakartaBusStopResponse } from '@/model/response/transjakarta';

export async function GET() {

  const subQueryRoute = DB.select({
    busStopCode: transjakartaBusRoute.busStopCode,
    corridors: sql`COALESCE(array_agg(DISTINCT ${transjakartaCorridor.code}) FILTER(WHERE ${transjakartaCorridor.code} IS NOT NULL), '{}')`.as('corridors')
  })
    .from(transjakartaCorridor)
    .innerJoin(transjakartaBusRoute, eq(transjakartaCorridor.code, transjakartaBusRoute.corridorCode))
    .groupBy(transjakartaBusRoute.busStopCode)
    .as('subquery1')

  const data = await DB
    .select({
      id: transjakartaBusStop.id,
      brt: transjakartaBusStop.brt,
      latitude: transjakartaBusStop.latitude,
      longitude: transjakartaBusStop.longitude,
      name: transjakartaBusStop.name,
      code: transjakartaBusStop.code,
      permanentlyClosed: transjakartaBusStop.permanentlyClosed,
      corridors: sql<string[]>`${subQueryRoute.corridors}`
    })
    .from(transjakartaBusStop)
    .innerJoin(subQueryRoute, eq(transjakartaBusStop.code, subQueryRoute.busStopCode))
    // .where(eq(transjakartaBusStop.brt, true))

  return NextResponse.json(newResponse<TransjakartaBusStopResponse[]>(data));
}