import { grabData } from "@/utilities/http";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import * as XML from 'xml-js'
import YAML from 'yaml'
import { json2csv } from 'json-2-csv';
import { cache } from "react";
import { DATA_AVAILABLE, ExportType, IData } from "@/constant/data";

interface IParam {
  category: string,
  data: string,
  type: ExportType
}

export async function GET(_: NextRequest, { params }: { params: Promise<IParam> }) {
  const { category, data, type } = await params;

  const cat = DATA_AVAILABLE[category as keyof typeof DATA_AVAILABLE] as IData | undefined;
  if (!cat) return notFound();

  const d = cat.categories.find(x => x.id === data);
  if (!d || !d.export || !d.export.exportType.includes(type)) return notFound();

  const c = cache(async () => await grabData<object[]>(d.export!.route, {
    PageSize: 0
  }))

  const { data: res } = await c();

  if (type === 'json') return NextResponse.json(res);
  else if (type === 'xml') return new NextResponse(XML.js2xml({
    "_declaration": { "_attributes": { "version": "1.0", "encoding": "utf-8" } },
    content: { data: res }
  }, { spaces: 2, compact: true }), {
    headers: {
      'Content-Type': 'application/xml',
    }
  });
  else if (type === 'yaml') return new NextResponse(
    YAML.stringify(res, null, { indent: 2 }), {
    headers: {
      'Content-Type': 'application/yaml',
      'Content-Disposition': 'attachment; filename="result.yaml"'
    }
  });
  else if (type === 'csv') return new NextResponse(
    json2csv(res, {

    }), {
    headers: {
      'Content-Type': 'application/csv',
      'Content-Disposition': 'attachment; filename="result.csv"'
    }
  });

  // Not supported for now. Too many bugs :(
  // else if (type === 'postgres') {
  //   return new NextResponse(toPostgres(res), {
  //     headers: {
  //       'Content-Type': 'text/plain',
  //     }
  //   });
  // }

  return notFound();
}

function toPostgres(data: object[]) {
  // Make CREATE statement. Only string | int | bool are supported
  // Throw unnecessary object type
  const cs: string[] = [];
  const insS: string[] = [];
  const valS: string[] = [];
  data.forEach((obj, idx) => {
    const vs: string[] = [];
    Object.entries(obj).forEach(([key, value]) => {
      // Add this props if they are primitive
      if (!Array.isArray(value) && (
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'bigint'
      )) {
        // VALUE statement
        if (typeof value === 'string') vs.push(`'${value.replaceAll(/'{1}/g, "''")}'`);
        else if (typeof value === 'boolean') vs.push(`${value ? 1 : 0}`);
        else if (typeof value === 'number') vs.push(value.toString());
        else if (typeof value === 'bigint') vs.push(value.toString());

        // For 1st time, create CREATE TABLE statement
        if (idx === 0) {
          if (typeof value === 'string') cs.push(`  ${key}\t\tTEXT`);
          else if (typeof value === 'boolean') cs.push(`  ${key}\t\tBOOLEAN`);
          else if (typeof value === 'number') cs.push(`  ${key}\t\tINT`);
          else if (typeof value === 'bigint') cs.push(`  ${key}\t\tBIGINT`);
          insS.push(`"${key}"`);
        }
      }
    });
    valS.push(`  (${vs.join(', ')})`);
  });

  const createStatement = `CREATE TABLE myTable(
${cs.join(',\n')}
);
    `;
  const final = [createStatement]

  // Chunk into 1000
  for (let i = 0; i < valS.length; i += 1000) {
    const chunk = valS.slice(i, i + 1000);

    const ins = `
INSERT INTO myTable
  (${insS.join(', ')})
VALUES
${chunk.join(',\n')};
      `
    final.push(ins);
  }

  // Compile into one
  return final.join('\t\t');
}