import { MONGODB } from "@/database/db";
import { DashboardResponse, DashboardTableResponse } from "@/model/response/dashboard";
import 'server-only';

export async function GetDashboardData(category: string = ""){
  const master = await MONGODB.master.collection_category
    .find(category.length === 0 ? {} : { name: category })
    .toArray();
  const collections = (await MONGODB.db.listCollections().toArray())
    .filter(x => !x.name.startsWith('master')).map(x => x.name);

  const docs = await Promise.all(master.map(async m => {
    return {
      category: m.name,
      owner: m.owner,
      prefix: m.prefix,
      tables: await Promise.all(collections.filter(x => x.startsWith(m.prefix)).map(async t => ({
        tableName: t,
        tableUrl: (`/${m.prefix}/${t.replace(m.prefix + '_', '')}`).replaceAll('_', '-'),
        rowCount: await MONGODB.db.collection(t).countDocuments()
      } as DashboardTableResponse)))
    } as DashboardResponse;
  }));

  return docs.filter(x => category.length === 0 || category === x.category);
}