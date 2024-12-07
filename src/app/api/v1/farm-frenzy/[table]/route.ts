import { API_SHORTHAND } from "@/constant/api-route"
import { ID_AGGR, MONGODB } from "@/database/mongodb/db";
import { FarmFrenzyOneProductResponse, FarmFrenzyThreeProductResponse, FarmFrenzyTwoPizzaProductResponse, FarmFrenzyTwoProductResponse } from "@/model/response/farm-frenzy";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

type RouteEndpoint = typeof API_SHORTHAND.FARM_FRENZY[keyof typeof API_SHORTHAND.FARM_FRENZY]
const routeEndpoint = (Object.values(API_SHORTHAND.FARM_FRENZY));

export async function GET(_: NextRequest, { params } : { params : { table: string } }){

  // Cek apakah table masuk dalam type
  if (!routeEndpoint.includes(params.table as RouteEndpoint)) return new NextResponse(null, {
    status: 404
  });

  switch (params.table as RouteEndpoint) {
    case 'one-product':
      return NextResponse.json(newResponse(
        await MONGODB.farm_frenzy.one_product.aggregate<FarmFrenzyOneProductResponse[]>(ID_AGGR).toArray()
      ));
    case 'two-product':
      return NextResponse.json(newResponse(
        await MONGODB.farm_frenzy.two_product.aggregate<FarmFrenzyTwoProductResponse[]>(ID_AGGR).toArray()
      ));
    case 'two-pizza-product':
      return NextResponse.json(newResponse(
        await MONGODB.farm_frenzy.two_pizza_product.aggregate<FarmFrenzyTwoPizzaProductResponse[]>(ID_AGGR).toArray()
      ));
    case 'three-product':
      return NextResponse.json(newResponse(
        await MONGODB.farm_frenzy.three_product.aggregate<FarmFrenzyThreeProductResponse[]>(ID_AGGR).toArray()
      ));
  }
}