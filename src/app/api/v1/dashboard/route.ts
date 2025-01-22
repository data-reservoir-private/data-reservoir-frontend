import { MONGODB } from "@/database/db";
import { DashboardResponse, DashboardTableResponse } from "@/model/response/dashboard";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? "";

  const master = await MONGODB.master.collection_category.find().toArray();
  const collections = (await MONGODB.db.listCollections().toArray()).filter(x => !x.name.startsWith('master')).map(x => x.name);

  const docs = await Promise.all(master.map(async m => {
    return {
      category: m.name,
      owner: m.owner,
      tables: await Promise.all(collections.filter(x => x.startsWith(m.prefix)).map(async t => ({
        tableName: t,
        rowCount: await MONGODB.db.collection(t).countDocuments()
      } as DashboardTableResponse)))
    } as DashboardResponse;
  }));

  return NextResponse.json(newResponse(docs.filter(x => category.length === 0 || category === x.category)));
}