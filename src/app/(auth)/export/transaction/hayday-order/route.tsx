import { NextRequest } from "next/server";
import { notFound } from "next/navigation";
import { cache } from "react";
import { grabData } from "@/utilities/http";
import { API_ROUTE } from "@/constant/api-route";
import { IHaydayResponse } from "@/model/response/hayday";
import { Converter } from "@/utilities/export";
import { z } from "zod";
import { ALL_EXPORTS_TRANSACTION } from "@/utilities/export-icon";

// Should only have 6 products at max
type HaydayExportFlattened = Omit<IHaydayResponse['hayday-order']['export'], 'details'> & {
  totalProducts: number,
  product1Name: string,
  product1Price: number,
  product1Quantity: number,
  product2Name: string | null,
  product2Price: number | null,
  product2Quantity: number | null,
  product3Name: string | null,
  product3Price: number | null,
  product3Quantity: number | null,
  product4Name: string | null,
  product4Price: number | null,
  product4Quantity: number | null,
  product5Name: string | null,
  product5Price: number | null,
  product5Quantity: number | null,
  product6Name: string | null,
  product6Price: number | null,
  product6Quantity: number | null,
}

const ExportHaydayOrderSchema = z.object({
  month: z.coerce.number().gte(1).lte(12).nullable(),
  year: z.coerce.number().gte(2020).nullable(),
  type: z.enum(ALL_EXPORTS_TRANSACTION),
  acceptedOnly: z.coerce.boolean(),
  includeDetail: z.coerce.boolean()
});

export async function GET(req: NextRequest) {
  const requestParams = await ExportHaydayOrderSchema.safeParseAsync(Object.fromEntries(req.nextUrl.searchParams.entries()));
  if (!requestParams.success) return notFound();

  const { month, year, type, acceptedOnly, includeDetail } = requestParams.data;
  const c = cache(async () => await grabData<IHaydayResponse['hayday-order']['export'][]>(API_ROUTE.HAY_DAY.ORDER.EXPORT, {
    Month: month,
    Year: year,
    Type: type,
    AcceptedOnly: acceptedOnly,
    IncludeDetail: includeDetail
  }));
  const { data } = await c();

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
        'Content-Disposition': `attachment; filename=hayday_order_${month ?? 'all'}_${year ?? 'all'}.ndjson`
      }
    });
  }
  else if (type === 'xml') {
    return new Response(Converter.ToXML(data), {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': `attachment; filename=hayday_order_${month ?? 'all'}_${year ?? 'all'}.xml`
      }
    });
  }
  else if (type === 'yaml') {
    return new Response(Converter.ToYAML(data), {
      headers: {
        'Content-Type': 'application/yaml',
        'Content-Disposition': `attachment; filename=hayday_order_${month ?? 'all'}_${year ?? 'all'}.yaml`
      }
    });
  }

  if (data.length === 0) return notFound();

  // if detail not included, omit detail
  // if detail included, flatten into HaydayExportFlattened
  const newData: object[] = includeDetail ? data.map(x => {
    const { details, ...rest } = x;
    const d = details ?? [];
    const flattened: HaydayExportFlattened = {
      ...rest,
      totalProducts: d.length,
      product1Name: d[0]?.productName ?? null,
      product1Price: d[0]?.productPrice ?? null,
      product1Quantity: d[0]?.quantity ?? null,
      product2Name: d[1]?.productName ?? null,
      product2Price: d[1]?.productPrice ?? null,
      product2Quantity: d[1]?.quantity ?? null,
      product3Name: d[2]?.productName ?? null,
      product3Price: d[2]?.productPrice ?? null,
      product3Quantity: d[2]?.quantity ?? null,
      product4Name: d[3]?.productName ?? null,
      product4Price: d[3]?.productPrice ?? null,
      product4Quantity: d[3]?.quantity ?? null,
      product5Name: d[4]?.productName ?? null,
      product5Price: d[4]?.productPrice ?? null,
      product5Quantity: d[4]?.quantity ?? null,
      product6Name: d[5]?.productName ?? null,
      product6Price: d[5]?.productPrice ?? null,
      product6Quantity: d[5]?.quantity ?? null,
    };
    return flattened;
  }) : data.map(x => {
    const { details: _, ...rest } = x;
    return rest;
  });

  // Now csv and other types can be safely generated
  if (type === 'csv' || type === 'tsv') {
    return new Response(
      type === 'csv' ? Converter.ToCSV(newData) : Converter.ToTSV(newData), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=hayday_order_${month ?? 'all'}_${year ?? 'all'}.${type}`
      }
    }
    );
  }
  else if (type === 'html') {
    return new Response(await Converter.toHTMLTable(newData), {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }
  else if (type === 'xlsx') {
    return new Response(await Converter.toExcel(newData), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=hayday_order_${month ?? 'all'}_${year ?? 'all'}.xlsx`
      }
    });
  }
  else if (type === 'parquet') {
    return new Response((await Converter.toParquet(
      newData, {
      webName: 'Data Reservoir',
      webSite: process.env.DOMAIN,
      dataName: "Hayday Order"
    })), {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=hayday_order_${month ?? 'all'}_${year ?? 'all'}.parquet`
      }
    });
  }
  return notFound();
}