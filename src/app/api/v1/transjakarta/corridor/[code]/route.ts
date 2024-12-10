import { TRANSJAKARTA_DIRECTION } from "@/constant/enums";
import { DB } from "@/database/client";
import { transjakartaBusRoute, transjakartaBusStop, transjakartaCorridor, transjakartaCorridorStyle, transjakartaScheduleDetail, transjakartaScheduleHeader } from "@/database/schema";
import { TransjakartaCorridorDetailResponse } from "@/model/response/transjakarta";
import { badRequestResponse, newResponse } from "@/utilities/api";
import { and, count, desc, eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_: Request, props: { params: Promise<{ code: string }> }) {
  const params = await props.params;
  let code = params.code;

  let main = (await DB.select()
    .from(transjakartaCorridor)
    .where(eq(transjakartaCorridor.code, code)))?.[0];
  if (main === null) return badRequestResponse("Cannot find code");

  let scheduleDetail = await DB.select()
    .from(transjakartaScheduleDetail)
    .where(eq(transjakartaScheduleDetail.code, code))
    .orderBy(
      desc(transjakartaScheduleDetail.weekday),
      desc(transjakartaScheduleDetail.day),
      desc(transjakartaScheduleDetail.peakDay),
  );

  let northSouth = await DB.select()
    .from(transjakartaBusRoute)
    .innerJoin(transjakartaBusStop, eq(transjakartaBusRoute.busStopCode, transjakartaBusStop.code))
    .where(and(
      eq(transjakartaBusRoute.corridorCode, code),
      eq(transjakartaBusRoute.order, 1)
    ));

  let color = (await DB.select()
    .from(transjakartaCorridorStyle)
    .where(eq(transjakartaCorridorStyle.code, code)))?.[0]?.hexColor ?? "000000";

  let roadIDs = await DB.select({ id: transjakartaBusRoute.busStopCode })
    .from(transjakartaBusRoute)
    .where(eq(transjakartaBusRoute.corridorCode, code));

  const problematicRoute = (await DB.select({
    code: transjakartaCorridor.code,
    problemCount: count()
  })
    .from(transjakartaCorridor)
    .innerJoin(transjakartaBusRoute, eq(transjakartaCorridor.code, transjakartaBusRoute.corridorCode))
    .innerJoin(transjakartaBusStop, eq(transjakartaBusRoute.busStopCode, transjakartaBusStop.code))
    .where(
      and(
        eq(transjakartaCorridor.code, code),
        or(eq(transjakartaBusStop.latitude, 0), eq(transjakartaBusStop.permanentlyClosed, true))
      )
    )
    .groupBy(transjakartaCorridor.code))?.[0]?.problemCount ?? 0;

  return NextResponse.json(newResponse<TransjakartaCorridorDetailResponse>({
    code: main.code,
    name: main.name,
    color: `#${color}`,
    northName: northSouth.find(x => x.transjakarta_bus_route.direction === TRANSJAKARTA_DIRECTION.NORTH_SOUTH)?.transjakarta_bus_stop.name ?? "",
    southName: northSouth.find(x => x.transjakarta_bus_route.direction === TRANSJAKARTA_DIRECTION.SOUTH_NORTH)?.transjakarta_bus_stop.name ?? "",
    schedule: scheduleDetail.map(({ id, isDeleted, effectiveDate, code, ...rest }) => ({ ...rest })),
    busStopCode: roadIDs.map(x => x.id),
    problem: problematicRoute
  }));
}