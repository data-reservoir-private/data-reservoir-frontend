import { DB } from "@/database/client";
import { transjakartaBusRoute, transjakartaCorridor, transjakartaCorridorStyle, transjakartaScheduleDetail, transjakartaScheduleHeader } from "@/database/schema";
import { TransjakartaCorridorDetailResponse } from "@/model/response/transjakarta";
import { badRequestResponse, newResponse } from "@/utilities/api";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { code: string } }) {
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
  
  let color = (await DB.select()
    .from(transjakartaCorridorStyle)
    .where(eq(transjakartaCorridorStyle.code, code)))?.[0]?.hexColor ?? "000000";
  
  let roadIDs = await DB.select({ id: transjakartaBusRoute.busStopCode })
    .from(transjakartaBusRoute)
    .where(eq(transjakartaBusRoute.corridorCode, code));
  
  return NextResponse.json(newResponse<TransjakartaCorridorDetailResponse>({
    code: main.code,
    name: main.name,
    color: `#${color}`,
    schedule: scheduleDetail.map(({ id, isDeleted, effectiveDate, code, ...rest }) => ({ ...rest })),
    busStopID: roadIDs.map(x => x.id)
  }))
}