import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { DB } from "@/database/client";
import { transjakartaBusRoute, transjakartaBusStop, transjakartaCorridor, transjakartaCorridorStyle } from "@/database/schema";
import { newResponse } from '@/utilities/api';
import { TransjakartaBusStopDetailResponse } from '@/model/response/transjakarta';

export async function GET(_: Request, { params }: { params: { code: number } }) {

  const subQueryRoute = DB.select({
    busStopCode: transjakartaBusRoute.busStopCode,
    corridors: sql`COALESCE(array_agg(DISTINCT ${transjakartaCorridor.code}) FILTER(WHERE ${transjakartaCorridor.code} IS NOT NULL), '{}')`.as('corridors')
  })
    .from(transjakartaCorridor)
    .innerJoin(transjakartaBusRoute, eq(transjakartaCorridor.code, transjakartaBusRoute.corridorCode))
    .where(eq(transjakartaBusRoute.busStopCode, params.code))
    .groupBy(transjakartaBusRoute.busStopCode)
    .as('subquery1');

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
    .innerJoin(subQueryRoute, eq(transjakartaBusStop.code, subQueryRoute.busStopCode));

  return NextResponse.json(newResponse<TransjakartaBusStopDetailResponse>(data[0] ?? {}));
}