export const dynamic = 'force-static';

import { NextResponse } from 'next/server';
import { newResponse } from '@/utilities/api';
import { ID_AGGR, MONGODB } from '@/database/db';

export async function GET() {
  return NextResponse.json(newResponse(
    await MONGODB.transjakarta.corridor.aggregate([...ID_AGGR, {
      $project: {
        id: true,
        name: true,
        code: true,
        category: true,
        color: {
          $concat: ['#', '$color']
        },
        problems: {
          $let: {
            vars: {
              'problematicArray': {
                $filter: {
                  input: '$stops',
                  as: 'stop',
                  cond: {
                    $or: [
                      { $eq: ['$$stop.latitude', 0] },
                      { $eq: ['$$stop.longitude', 0] },
                      { $eq: ['$$stop.permanently_closed', true] },
                    ]
                  }
                }
              }
            },
            in: { $size: '$$problematicArray' }
          }
        }
      }
    }]).toArray()
  ));
}