import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET(_: Request, props: { params: Promise<{ code: string }> }) {
  const { code } = await props.params;
  return NextResponse.json(newResponse(
    (await MONGODB.transjakarta.corridor.aggregate([...ID_AGGR,
      { $match: { code: code } },
      {
        $unset: [
          'stops.id',
          'schedule.id'
        ]
      },
      {
        $project: {
          id: true,
          name: true,
          code: true,
          category: true,
          schedule: true,
          stops: true,
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
      }
    ]).toArray()).find(_ => true)
  ));
}