import { grabData } from "@/utilities/http";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import * as XML from 'xml-js'
import YAML from 'yaml'
import { json2csv } from 'json-2-csv';
import { cache } from "react";
import { DATASETS_AVAILABLE, ExportType, IData } from "@/constant/data";
import { ByteWriter, ColumnSource, parquetWrite } from 'hyparquet-writer';
import * as ExcelJS from 'exceljs'

interface IParam {
  category: string,
  data: string,
  type: string
}

export async function GET(_: NextRequest, { params }: { params: Promise<IParam> }) {
  const { category, data, type } = await params;

  const cat = DATASETS_AVAILABLE[category as keyof typeof DATASETS_AVAILABLE] as IData | undefined;
  if (!cat) return notFound();

  const d = cat.categories.find(x => x.id === data);
  if (!d || !d.export || !d.export.exportType.includes(type as ExportType)) return notFound();

  const c = cache(async () => await grabData<object[]>(d.export!.route, {
    PageSize: 0
  }))

  const { data: res } = await c();

  if (type === 'json') return NextResponse.json(res);
  if (type === 'ndjson') return new NextResponse(res.map(x => JSON.stringify(x)).join('\n'), {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
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
  else if (type === 'csv' || type === 'tsv') return new NextResponse(
    json2csv(res, {
      delimiter: {
        field: type === 'csv' ? ',' : '\t'
      },
      expandNestedObjects: false,
      expandArrayObjects: false
    }), {
    headers: {
      'Content-Type': 'application/csv',
      'Content-Disposition': `attachment; filename="result.${type}"`
    }
  });

  else if (type === 'html') {
    return new NextResponse(await toHtmlTable(res), {
      headers: {
        'Content-Type': 'text/html',
      }
    });
  }
  else if (type === 'xlsx') {
    return new NextResponse(await toExcel(res), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="result.xlsx"`
      }
    });
  }
  else if (type === 'postgresql' || type === 'sql_server' || type === 'sqlite') {
    return new NextResponse(toDatabase(res, type), {
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }
  else if (type === 'parquet') {
    return new NextResponse((await toParquet(
      res as Record<string, any>[],
      {
        webName: 'Data Reservoir',
        webSite: process.env.DOMAIN,
        dataName: d.name
      }
    )) as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.apache.parquet',
        'Content-Disposition': 'attachment; filename="result.parquet"'
      }
    })
  }

  return notFound();
}

async function toHtmlTable(data: object[]) {
  const ReactDOMServer = (await import('react-dom/server')).default

  const comp = ReactDOMServer.renderToStaticMarkup(
    <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {
            Object.keys(data[0]).map(x => (<th style={{ border: '1px solid black', borderCollapse: 'collapse', padding: '.5rem' }} key={x}>{x}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((row, idx) => (
            <tr key={idx}>
              {
                Object.values(row).map((v, idx) => (
                  <td style={{ border: '1px solid black', borderCollapse: 'collapse', padding: '.5rem' }} key={idx}>{
                    (typeof v === 'string' && v.startsWith('http')) ?
                      (<img width={50} src={v} />) : (typeof v === 'boolean') ? (<input type="checkbox" disabled checked={v} />) :
                        typeof v === 'object' && !Array.isArray(v) ? (
                          <ul style={{ margin: 0 }}>
                            {
                              Object.entries(v).map(([key, value]) => (
                                <li key={key}>
                                  <span>{key}: {value as any}</span>
                                </li>
                              ))
                            }
                          </ul>
                        ) : Array.isArray(v) ? (v.join(", ")) : v
                  }</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
  return comp
}

function toDatabase(data: object[], flavour: Extract<ExportType, 'postgresql' | 'sql_server' | 'sqlite'>) {
  // Make CREATE statement. Only string | int | bool are supported
  // Throw unnecessary object type
  const STATEMENTS: string[] = [];
  const INSERT_STATEMENT_COLS: string[] = [];
  const VALUES: string[] = [];
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
        if (typeof value === 'string') {
          if (flavour === 'postgresql' || flavour === 'sqlite') vs.push(`'${value.replaceAll(/'{1}/g, "''")}'`);
          else if (flavour === 'sql_server') vs.push(`N'${value.replaceAll(/'{1}/g, "''")}'`);
        }
        else if (typeof value === 'boolean') vs.push(`${value ? 1 : 0}`);
        else if (typeof value === 'number') vs.push(value.toString());
        else if (typeof value === 'bigint') vs.push(value.toString());

        // For 1st time, create CREATE TABLE statement
        if (idx === 0) {
          if (flavour === 'postgresql') {
            if (typeof value === 'string') STATEMENTS.push(`  "${key}" TEXT`);
            else if (typeof value === 'boolean') STATEMENTS.push(`  "${key}" BOOLEAN`);
            else if (typeof value === 'number') {
              if (data.map(x => (x as Record<string, number>)[key]).some(x => !Number.isInteger(x))) STATEMENTS.push(`  "${key}" DOUBLE PRECISION`);
              else STATEMENTS.push(`  "${key}" INT`)
            }
            else if (typeof value === 'bigint') STATEMENTS.push(`  "${key}" BIGINT`);
            INSERT_STATEMENT_COLS.push(`"${key}"`);
          }
          if (flavour === 'sqlite') {
            if (typeof value === 'string') STATEMENTS.push(`  "${key}" TEXT`);
            else if (typeof value === 'boolean') STATEMENTS.push(`  "${key}" INT`);
            else if (typeof value === 'number') {
              if (data.map(x => (x as Record<string, number>)[key]).some(x => !Number.isInteger(x))) STATEMENTS.push(`  "${key}" REAL`);
              else STATEMENTS.push(`  "${key}" INT`)
            }
            else if (typeof value === 'bigint') STATEMENTS.push(`  "${key}" INT`);
            INSERT_STATEMENT_COLS.push(`"${key}"`);
          }
          else if (flavour === 'sql_server') {
            if (typeof value === 'string') STATEMENTS.push(`  [${key}] NVARCHAR(4000)`);
            else if (typeof value === 'boolean') STATEMENTS.push(`  [${key}] BIT`);
            else if (typeof value === 'number') {
              if (data.map(x => (x as Record<string, number>)[key]).some(x => !Number.isInteger(x))) STATEMENTS.push(`  [${key}] FLOAT`);
              else STATEMENTS.push(`  [${key}] INT`)
            }
            else if (typeof value === 'bigint') STATEMENTS.push(`  [${key}] BIGINT`);
            INSERT_STATEMENT_COLS.push(`[${key}]`);
          }
        }
      }
    });
    VALUES.push(`  (${vs.join(', ')})`);
  });

  if (flavour === 'postgresql') {
    const createStatement = `CREATE TABLE "myTable" (\n${STATEMENTS.join(',\n')}\n);\n`;
    const final = [createStatement]

    // Chunk into 1000
    for (let i = 0; i < VALUES.length; i += 1000) {
      const chunk = VALUES.slice(i, i + 1000);

      const ins = `INSERT INTO "myTable"\n  (${INSERT_STATEMENT_COLS.join(', ')})\nVALUES\n${chunk.join(',\n')};\n`
      final.push(ins);
    }

    // Compile into one
    return final.join('\n\n');
  }
  else if (flavour === 'sqlite') {
    const createStatement = `CREATE TABLE "myTable" (\n${STATEMENTS.join(',\n')}\n);\n`;
    const final = [createStatement]

    // Chunk into 1000
    for (let i = 0; i < VALUES.length; i += 1000) {
      const chunk = VALUES.slice(i, i + 1000);

      const ins = `INSERT INTO "myTable"\n  (${INSERT_STATEMENT_COLS.join(', ')})\nVALUES\n${chunk.join(',\n')};\n`
      final.push(ins);
    }

    // Compile into one
    return final.join('\n\n');
  }
  else if (flavour === 'sql_server') {
    const createStatement = `CREATE TABLE [myTable] (\n${STATEMENTS.join(',\n')}\n);\n`;
    const final = [createStatement]

    // Chunk into 1000
    for (let i = 0; i < VALUES.length; i += 1000) {
      const chunk = VALUES.slice(i, i + 1000);

      const ins = `INSERT INTO [myTable]\n  (${INSERT_STATEMENT_COLS.join(', ')})\nVALUES\n${chunk.join(',\n')};\n`
      final.push(ins);
    }

    // Compile into one
    return final.join('\n\n');
  }

  return '';
}

async function toParquet(data: Record<string, any>[], metadata: Record<string, string>) {
  const writer = new ByteWriter();
  const schema = Object.keys(data[0]).map(key => {
    const values = data.map(x => x[key]);
    return {
      name: key,
      data: values
    } satisfies ColumnSource
  });

  parquetWrite({
    writer,
    columnData: schema,
    kvMetadata: Object.entries(metadata).map(([k, v]) => ({ key: k, value: v }))
  });

  return writer.getBuffer();
}

async function toExcel(data: Record<string, any>[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Data');

  sheet.addTable({
    name: 'Data',
    ref: 'A1',
    headerRow: true,
    style: {
      theme: 'TableStyleMedium2',
      showRowStripes: true,
    },
    columns: Object.keys(data[0]).map(x => ({ name: x })),
    rows: data.map(row => Object.values(row).map(x => {
      if (typeof x === 'object') return JSON.stringify(x);
      return x;
    })),
  }).commit();
  return await workbook.xlsx.writeBuffer();
}