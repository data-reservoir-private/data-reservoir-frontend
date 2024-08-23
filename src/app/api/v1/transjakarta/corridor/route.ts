import { NextResponse } from 'next/server';
import { DB } from "@/database/client";
import { transjakartaCorridor, transjakartaCorridorStyle } from "@/database/schema";
import { newResponse } from '@/utilities/api';
import { and, eq, max, not } from 'drizzle-orm';
import { TransjakartaCorridorResponse } from '@/model/response/transjakarta';

export async function GET() {

  const maxDate = DB.select({
    code: transjakartaCorridor.code,
    max_date: max(transjakartaCorridor.effectiveDate).as('max_date')
  })
    .from(transjakartaCorridor)
    .groupBy(transjakartaCorridor.code)
    .as('maxDate')
  

  const data = await DB
    .select()
    .from(transjakartaCorridor)
    .innerJoin(maxDate, and(
      eq(transjakartaCorridor.code, maxDate.code),
      eq(transjakartaCorridor.effectiveDate, maxDate.max_date)
    ))
    .innerJoin(transjakartaCorridorStyle, eq(transjakartaCorridor.code, transjakartaCorridorStyle.code))
    .where(not(eq(transjakartaCorridor.category, 'Tidak Beroperasi')));

  return NextResponse.json(newResponse<TransjakartaCorridorResponse[]>(data.map(x => ({
    id: x.transjakarta_corridor.id,
    name: x.transjakarta_corridor.name,
    code: x.transjakarta_corridor.code,
    category: x.transjakarta_corridor.category,
    color: '#' + x.transjakarta_corridor_style.hexColor
  }))));
}