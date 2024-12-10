import { API_SHORTHAND } from "@/constant/api-route";
import { ID_AGGR, MONGODB } from "@/database/mongodb/db";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

type RouteEndpoint = typeof API_SHORTHAND.THE_SIMS[keyof typeof API_SHORTHAND.THE_SIMS]
const routeEndpoint = (Object.values(API_SHORTHAND.THE_SIMS));

export async function GET(_: NextRequest, { params } : { params : { table: string } }){

  // Cek apakah table masuk dalam type
  if (!routeEndpoint.includes(params.table as RouteEndpoint)) return new NextResponse(null, {
    status: 404
  });

  switch (params.table as RouteEndpoint) {
    case 'castaway-product':
      return NextResponse.json(newResponse(
        await MONGODB.the_sims.castaway_product.aggregate(ID_AGGR).toArray()
      ));
    case 'four-pc-harvestable':
      return NextResponse.json(newResponse(
        await MONGODB.the_sims.four_pc_harvestable.aggregate(ID_AGGR).toArray()
      ));
    case 'two-pets-console-product':
      return NextResponse.json(newResponse(
        await MONGODB.the_sims.two_pets_console_product.aggregate(ID_AGGR).toArray()
      ));
    case 'bustin-out-career':
      return NextResponse.json(newResponse(
        await MONGODB.the_sims.the_sims_bustin_out_career.aggregate(ID_AGGR).toArray()
      ));
    case 'two-console-career':
      return NextResponse.json(newResponse(
        await MONGODB.the_sims.two_console_career.aggregate(ID_AGGR).toArray()
      ));
    case 'two-pets-console-career':
      return NextResponse.json(newResponse(
        await MONGODB.the_sims.two_pets_console_career.aggregate(ID_AGGR).toArray()
      ));
  }
}