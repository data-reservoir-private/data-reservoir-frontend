import { json2csv } from "json-2-csv"; import { js2xml } from "xml-js";
import YAML from 'yaml';
import { z } from "zod";
import { ByteWriter, ColumnSource, parquetWrite } from 'hyparquet-writer';
import ExcelJS from "exceljs";
import { ExportType } from "@/model/dto/export";

export class Converter {
  public static ToXML(input: object[]) {
    return js2xml({
      "_declaration": { "_attributes": { "version": "1.0", "encoding": "utf-8" } },
      content: { data: input }
    }, { spaces: 2, compact: true });
  }
  public static ToYAML(input: object[]) {
    return YAML.stringify(input, null, { indent: 2 });
  }
  public static ToCSV(input: object[]) {
    return json2csv(input, {
      delimiter: {
        field: ','
      },
      expandNestedObjects: false,
      expandArrayObjects: false
    });
  }
  public static ToTSV(input: object[]) {
    return json2csv(input, {
      delimiter: {
        field: '\t'
      },
      expandNestedObjects: false,
      expandArrayObjects: false
    });
  }
  public static async toHTMLTable(data: object[]) {
    const ReactDOMServer = (await import('react-dom/server')).default;

    if (data.length === 0) {
      return '<p>No data</p>';
    }

    const convertToString = (v: any) => {
      if (v === null || v === undefined) return '';
      if (z.guid().safeParse(v).success) {
        return <span style={{ fontFamily: 'consolas' }}>{v}</span>;
      }
      if (typeof v === 'number' || typeof v === 'bigint') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ textAlign: 'center' }}>{v}</span>
          </div>
        );
      }
      if (typeof v === 'string' && v.startsWith('http')) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img width={50} src={v} alt="Image" />
        </div>
      );
      if (typeof v === 'boolean') return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input type="checkbox" style={{ width: '1.25rem', height: '1.25rem' }} disabled checked={v} />
        </div>
      );
      if (typeof v === 'object' && !Array.isArray(v)) {
        return (
          <ul style={{ margin: 0 }}>
            {
              Object.entries(v).map(([key, value]) => (
                <li key={key}>
                  <span>{key}: {value as any}</span>
                </li>
              ))
            }
          </ul>
        );
      }
      if (Array.isArray(v)) return v.join(", ");
      return v;
    };

    const comp = ReactDOMServer.renderToStaticMarkup(
      <>
        <html lang="en">
          {/* eslint-disable-next-line @next/next/no-head-element */}
          <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Exported Data</title>
          </head>
          <body>
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
                          <td style={{ border: '1px solid black', borderCollapse: 'collapse', padding: '.5rem' }} key={idx}>
                            {convertToString(v)}
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </body>
        </html>

      </>
    );
    return comp;
  }
  public static async toParquet(input: object[], metadata: Record<string, string>) {
    const data = this._removeComplexProperty(input);
    const writer = new ByteWriter();
    const schema = Object.keys(data[0]).map(key => {
      const values = data.map(x => x[key]);
      return {
        name: key,
        data: values
      } satisfies ColumnSource;
    });

    parquetWrite({
      writer,
      columnData: schema,
      kvMetadata: Object.entries(metadata).map(([k, v]) => ({ key: k, value: v }))
    });

    return writer.getBuffer();
  }
  public static async toExcel(input: object[]) {
    const data = this._removeComplexProperty(input);
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
        if (typeof x === 'object' && x !== null) return JSON.stringify(x);
        return x;
      })),
    }).commit();
    return await workbook.xlsx.writeBuffer();
  }

  public static toDatabaseInsert(data: object[], flavour: Extract<ExportType, 'postgresql' | 'sql_server' | 'sqlite'>) {
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
                else STATEMENTS.push(`  "${key}" INT`);
              }
              else if (typeof value === 'bigint') STATEMENTS.push(`  "${key}" BIGINT`);
              INSERT_STATEMENT_COLS.push(`"${key}"`);
            }
            if (flavour === 'sqlite') {
              if (typeof value === 'string') STATEMENTS.push(`  "${key}" TEXT`);
              else if (typeof value === 'boolean') STATEMENTS.push(`  "${key}" INT`);
              else if (typeof value === 'number') {
                if (data.map(x => (x as Record<string, number>)[key]).some(x => !Number.isInteger(x))) STATEMENTS.push(`  "${key}" REAL`);
                else STATEMENTS.push(`  "${key}" INT`);
              }
              else if (typeof value === 'bigint') STATEMENTS.push(`  "${key}" INT`);
              INSERT_STATEMENT_COLS.push(`"${key}"`);
            }
            else if (flavour === 'sql_server') {
              if (typeof value === 'string') STATEMENTS.push(`  [${key}] NVARCHAR(4000)`);
              else if (typeof value === 'boolean') STATEMENTS.push(`  [${key}] BIT`);
              else if (typeof value === 'number') {
                if (data.map(x => (x as Record<string, number>)[key]).some(x => !Number.isInteger(x))) STATEMENTS.push(`  [${key}] FLOAT`);
                else STATEMENTS.push(`  [${key}] INT`);
              }
              else if (typeof value === 'bigint') STATEMENTS.push(`  [${key}] BIGINT`);
              INSERT_STATEMENT_COLS.push(`[${key}]`);
            }
          }
        }
      });
      VALUES.push(`  (${vs.join(', ')})`);
    });

    const createStatement = flavour === 'sql_server' ? `CREATE TABLE [myTable] (\n${STATEMENTS.join(',\n')}\n);\n` :
      `CREATE TABLE "myTable" (\n${STATEMENTS.join(',\n')}\n);\n`;

    const final = [createStatement];
    for (let i = 0; i < VALUES.length; i += 1000) {
      const chunk = VALUES.slice(i, i + 1000);

      const ins = flavour === 'sql_server' ?
        `INSERT INTO [myTable]\n  (${INSERT_STATEMENT_COLS.join(', ')})\nVALUES\n${chunk.join(',\n')};\n` :
        `INSERT INTO "myTable"\n  (${INSERT_STATEMENT_COLS.join(', ')})\nVALUES\n${chunk.join(',\n')};\n`;

      final.push(ins);
    }
    return final.join('\n\n');
  }

  // Only string | number | bigint | boolean | null are supported, complex object will be removed to simplify the data
  private static _removeComplexProperty(input: object[]) {
    return input.map(row => {
      const newRow: Record<string, any> = {};
      Object.entries(row).forEach(([key, value]) => {
        if (typeof value !== 'object' || value === null) newRow[key] = value;
      });
      return newRow;
    });
  }
} 