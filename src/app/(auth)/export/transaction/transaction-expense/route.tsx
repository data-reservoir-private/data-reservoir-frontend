import { NextRequest } from "next/server";
import { notFound } from "next/navigation";
import { cache } from "react";
import { grabData } from "@/utilities/http";
import { API_ROUTE } from "@/constant/api-route";
import { Converter } from "@/utilities/export";
import { ExportTransactionExpenseServerSchema, FLATTENED_TYPE } from "@/shared/export-transaction-expense";

export async function GET(req: NextRequest) {
  const requestParams = await ExportTransactionExpenseServerSchema.safeParseAsync(Object.fromEntries(req.nextUrl.searchParams.entries()));
  if (!requestParams.success) return notFound();

  const isFlattened = FLATTENED_TYPE.includes(requestParams.data.type);

  const { month, year, type } = requestParams.data;
  const c = cache(async () => await grabData<object[]>(isFlattened ? API_ROUTE.TRANSACTION.EXPORT_FLATTENED : API_ROUTE.TRANSACTION.EXPORT, {
    Month: month,
    Year: year,
    Type: type,
  }));
  const { data } = await c();

  if (!isFlattened) {
    // Safe area for nested data
    if (type === 'json') {
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
    else if (type === 'ndjson') {
      return new Response(data.map(x => JSON.stringify(x)).join('\n'), {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename=transaction_expense_${month ?? 'all'}_${year ?? 'all'}.ndjson`
        }
      });
    }
    else if (type === 'xml') {
      return new Response(Converter.ToXML(data), {
        headers: {
          'Content-Type': 'application/xml',
          'Content-Disposition': `attachment; filename=transaction_expense_${month ?? 'all'}_${year ?? 'all'}.xml`
        }
      });
    }
    else if (type === 'yaml') {
      return new Response(Converter.ToYAML(data), {
        headers: {
          'Content-Type': 'application/yaml',
          'Content-Disposition': `attachment; filename=transaction_expense_${month ?? 'all'}_${year ?? 'all'}.yaml`
        }
      });
    }
  }

  if (data.length === 0) return notFound();

  // Flattened area
  if (type === 'csv' || type === 'tsv') {
    return new Response(
      type === 'csv' ? Converter.ToCSV(data) : Converter.ToTSV(data), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=transaction_expense_${month ?? 'all'}_${year ?? 'all'}.${type}`
      }
    }
    );
  }
  else if (type === 'html') {
    return new Response(await Converter.toHTMLTable(data), {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }
  else if (type === 'xlsx') {
    return new Response(await Converter.toExcel(data), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=transaction_expense_${month ?? 'all'}_${year ?? 'all'}.xlsx`
      }
    });
  }
  else if (type === 'parquet') {
    return new Response((await Converter.toParquet(
      data, {
      webName: 'Data Reservoir',
      webSite: process.env.DOMAIN,
      dataName: "Transaction Expense"
    })), {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=transaction_expense_${month ?? 'all'}_${year ?? 'all'}.parquet`
      }
    });
  }
  return notFound();
}