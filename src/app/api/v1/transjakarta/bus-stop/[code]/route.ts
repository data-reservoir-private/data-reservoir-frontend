import { NextRequest, NextResponse } from 'next/server';
import { newResponse } from '@/utilities/api';
import { ID_AGGR, MONGODB } from '@/database/db';

export async function GET(_: NextRequest, props: { params: Promise<{ code: string }> }) {
  const { code } = await props.params;
  const intCode = parseInt(code);
  

  return NextResponse.json(newResponse(
    isNaN(intCode) ? {} : ((await MONGODB.transjakarta.bus_stop.aggregate([
      {
        $match: {
          code: intCode
        }
      },
      ...ID_AGGR,
      {
        $project: {
          'brt': true,
          'latitude': true,
          'longitude': true,
          'name': true,
          'code': true,
          'permanentlyClosed': '$permanently_closed',
          'corridors': true
        }
      }
    ]).toArray()).find(_ => true))
  ));
}