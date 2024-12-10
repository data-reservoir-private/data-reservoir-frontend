import { NextResponse } from 'next/server';
import { DB } from "@/database/client";
import { transjakartaBusRoute, transjakartaBusStop, transjakartaCorridor, transjakartaCorridorStyle } from "@/database/schema";
import { newResponse } from '@/utilities/api';
import { and, count, eq, max, not, or } from 'drizzle-orm';
import { TransjakartaCorridorResponse } from '@/model/response/transjakarta';

export async function GET() {
  const problematicRoute = await DB.select({
    code: transjakartaCorridor.code,
    problemCount: count()
  })
    .from(transjakartaCorridor)
    .innerJoin(transjakartaBusRoute, eq(transjakartaCorridor.code, transjakartaBusRoute.corridorCode))
    .innerJoin(transjakartaBusStop, eq(transjakartaBusRoute.busStopCode, transjakartaBusStop.code))
    .where(or(eq(transjakartaBusStop.latitude, 0), eq(transjakartaBusStop.permanentlyClosed, true)))
    .groupBy(transjakartaCorridor.code);

  const data = await DB
    .select()
    .from(transjakartaCorridor)
    .innerJoin(transjakartaCorridorStyle, eq(transjakartaCorridor.code, transjakartaCorridorStyle.code));

  return NextResponse.json(newResponse<TransjakartaCorridorResponse[]>(data.map(x => ({
    id: x.transjakarta_corridor.id,
    name: x.transjakarta_corridor.name,
    code: x.transjakarta_corridor.code,
    category: x.transjakarta_corridor.category,
    color: '#' + x.transjakarta_corridor_style.hexColor,
    beroperasi: x.transjakarta_corridor.category === 'Tidak Beroperasi',
    problem: problematicRoute.find(y => y.code === x.transjakarta_corridor.code)?.problemCount ?? 0
  }))));
}