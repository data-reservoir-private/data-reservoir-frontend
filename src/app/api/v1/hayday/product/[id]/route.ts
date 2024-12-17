export const dynamic = 'force-static';

import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { UUID } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(_: Request, props: { params : Promise<{ id: string }>}) {
  const params = await props.params;
  const id = UUID.createFromHexString(params.id);

  return NextResponse.json(newResponse(
    (await MONGODB.hayday.product.aggregate([...ID_AGGR,
      {
        $unset: [
          'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
          'producer.building_id', 'producer.product_id', 'producer.id',
          'usage.product_id', 'usage.id'
        ]
      },
      { $match: { id: id } }
    ]).toArray()).find(_ => true)
  ));

  // let product = await DB
  //   .select()
  //   .from(haydayProduct)
  //   .where(eq(haydayProduct.id, id))
  //   .limit(1);

  // if (product.length === 0) return NextResponse.json({
  //   "message": "not found"
  // }, {
  //   status: 400
  // });
  // let actualProduct = product[0];

  // let ingredient = await DB
  //   .select()
  //   .from(haydayIngredient)
  //   .innerJoin(haydayProduct, eq(haydayIngredient.ingredientId, haydayProduct.id))
  //   .where(eq(haydayIngredient.productId, id));

  // let usage = await DB
  //   .select()
  //   .from(haydayIngredient)
  //   .innerJoin(haydayProduct, eq(haydayIngredient.productId, haydayProduct.id))
  //   .where(eq(haydayIngredient.ingredientId, id));

  // let producer = await DB
  //   .select()
  //   .from(haydayProducer)
  //   .innerJoin(haydayBuilding, eq(haydayProducer.buildingId, haydayBuilding.id))
  //   .where(eq(haydayProducer.productId, id))
  //   .limit(1);

  // let actualProducer = producer?.[0];

  // return NextResponse.json(newResponse<HayDayProductDetailResponse>({
  //   ...actualProduct,
  //   ingredient: ingredient.map(x => ({
  //     category: x.hayday_product.category,
  //     image: x.hayday_product.image,
  //     name: x.hayday_product.name,
  //     quantity: x.hayday_ingredient.quantity
  //   })),
  //   usedBy: usage.map(x => ({
  //     category: x.hayday_product.category,
  //     image: x.hayday_product.image,
  //     name: x.hayday_product.name,
  //     quantity: x.hayday_ingredient.quantity
  //   })),
  //   producer: actualProducer && {
  //     id: actualProducer.hayday_building.id,
  //     image: actualProducer.hayday_building.image,
  //     name: actualProducer.hayday_building.name,
  //   },
  //   ...product[0],
  // }));
}