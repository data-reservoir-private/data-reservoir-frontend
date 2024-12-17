export const dynamic = 'force-static';

import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";
import { UUID } from 'mongodb';
import { MONGODB, ID_AGGR } from '@/database/db';

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = UUID.createFromHexString(params.id);
  return NextResponse.json(newResponse(
    (await MONGODB.pizza_frenzy.topping.aggregate([...ID_AGGR, {
      $unset: [
        'upgrades.topping_id', 'upgrades.id'
      ],
    }, { $match: { id: id } }]).toArray()).find(_ => true)
  ));
}