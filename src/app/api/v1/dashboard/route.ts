import { DB } from "@/database/client";
import { DashboardResponse } from "@/model/response/dashboard";
import { newResponse } from "@/utilities/api";
import { sql } from "drizzle-orm";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? "";
  const result = (
    await DB.execute<{
      category: string,
      owner: string,
      tableName: string,
      rowCount: number
    }>(sql`
      SELECT
        m.name AS "category",
        m.owner,
        tc.name AS "tableName",
        tc.row_count AS "rowCount"
      FROM (
        SELECT
          "table_name" AS "name", 
          (xpath('/row/cnt/text()', xml_count))[1]::text::int AS row_count
        FROM (
        SELECT 
          "table_name",
          table_schema, 
          QUERY_TO_XML(FORMAT('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') AS xml_count
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ) t
      ) tc
      JOIN master_table_category m
        ON STRPOS(tc.name, m.prefix) > 0
        AND (${category ?? ""} = '' OR ${category ?? ""} = m.prefix OR ${category ?? ""} = m.name)
    `)
  );

  const conv = _.chain(result)
    .groupBy(x => x.category)
    .map((value, key) => ({
      category: key,
      owner: value[0].owner,
      tables: value.map(v => ({ rowCount: v.rowCount, tableName: v.tableName }))
    } as DashboardResponse))
    .toArray();
  return NextResponse.json(newResponse(conv.value()));
}