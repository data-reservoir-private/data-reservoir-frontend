export const dynamic = 'force-static';

import { API_SHORTHAND } from "@/constant/api-route";
import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

type RouteEndpoint = typeof API_SHORTHAND.QUARTZ[keyof typeof API_SHORTHAND.QUARTZ]
const routeEndpoint = (Object.values(API_SHORTHAND.QUARTZ));

export async function GET(_: NextRequest, props: { params : Promise<{ table: string }> }) {
  const params = await props.params;
  if (!routeEndpoint.includes(params.table as RouteEndpoint)) return new NextResponse(null, {
    status: 404
  });

  switch (params.table as RouteEndpoint) {
    case 'recipe':
      return NextResponse.json(newResponse(
        await MONGODB.quartz.recipe.aggregate(ID_AGGR).toArray()
      ));
    case 'shippable':
      return NextResponse.json(newResponse(
        await MONGODB.quartz.shippable.aggregate(ID_AGGR).toArray()
      ));
    case 'utensil':
      return NextResponse.json(newResponse(
        await MONGODB.quartz.utensil.aggregate(ID_AGGR).toArray()
      ));
  }
}