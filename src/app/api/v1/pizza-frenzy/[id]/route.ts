import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";
import { UUID } from 'mongodb';
import { MONGODB, ID_AGGR } from '@/database/mongodb/db';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  let id = UUID.createFromHexString(params.id);
  return NextResponse.json(newResponse(
    (await MONGODB.pizza_frenzy.topping.aggregate([...ID_AGGR, {
      $unset: [
        'upgrades.topping_id', 'upgrades.id'
      ],
    }, { $match: { id: id } }]).toArray()).find(_ => true)
  ));
}