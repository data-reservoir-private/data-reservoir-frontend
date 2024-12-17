export const dynamic = 'force-static';

import { NextResponse } from 'next/server';
import { newResponse } from '@/utilities/api';
import { ID_AGGR, MONGODB } from '@/database/db';

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.transjakarta.bus_stop.aggregate([...ID_AGGR, {
      $project: {
        'brt': true,
        'latitude': true,
        'longitude': true,
        'name': true,
        'code': true,
        'permanentlyClosed': '$permanently_closed'
      }
    }]).toArray()
  ));
}