export const dynamic = 'force-static';

import { API_SHORTHAND } from "@/constant/api-route";
import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

type RouteEndpoint = typeof API_SHORTHAND.CYGNUS[keyof typeof API_SHORTHAND.CYGNUS]
const routeEndpoint = (Object.values(API_SHORTHAND.CYGNUS));

export async function GET(_: NextRequest, props: { params : Promise<{ table: string }> }) {
  const params = await props.params;
  if (!routeEndpoint.includes(params.table as RouteEndpoint)) return new NextResponse(null, {
    status: 404
  });

  switch (params.table as RouteEndpoint) {
    case 'artifact':
      return NextResponse.json(newResponse(
        await MONGODB.cygnus.artifact.aggregate(ID_AGGR).toArray()
      ));
    case 'mineral':
      return NextResponse.json(newResponse(
        await MONGODB.cygnus.mineral.aggregate(ID_AGGR).toArray()
      ));
    case 'crop':
      return NextResponse.json(newResponse(
        await MONGODB.cygnus.crop.aggregate(ID_AGGR).toArray()
      ));
    case 'dish':
      return NextResponse.json(newResponse(
        await MONGODB.cygnus.dish.aggregate(ID_AGGR).toArray()
      ));
    case 'node':
      return NextResponse.json(newResponse(
        await MONGODB.cygnus.node.aggregate(ID_AGGR).toArray()
      ));
  }
}