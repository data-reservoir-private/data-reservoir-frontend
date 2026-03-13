import { grabData } from "@/utilities/http";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";
import { DATASETS_AVAILABLE } from "@/constant/data";
import { ITheSimsResponse } from "@/model/response/the-sims";
import { ExportType, IData } from "@/model/dto/export";
import { Converter } from "@/utilities/export";

interface IParam {
  category: string,
  data: string,
  type: string
}

const Transformer: Record<keyof typeof DATASETS_AVAILABLE, Record<string, (res: object[]) => object[]>> = {
  'the-sims': {
    'three-pc-gem': (res) => res.map(x => {
      const r = x as ITheSimsResponse['three-pc-gem'];
      return {
        id: r.id,
        image: r.image,
        name: `${r.rawGem.name} (${r.gemCut.name})`,
        rawGemID: r.rawGem.id,
        rawGemName: r.rawGem.name,
        rawGemImage: r.rawGem.image,
        gemCutID: r.gemCut.id,
        gemCutName: r.gemCut.name,
        gemCutImage: r.gemCut.image,
      };
    }),
    'three-pc-spread-dish': (res) => res.map(x => {
      const r = x as ITheSimsResponse['three-pc-spread-dish'];
      return {
        id: r.id,
        name: r.name,
        image: r.image,
        harvestableID: r.harvestable.id,
        harvestableName: r.harvestable.name,
        harvestableImage: r.harvestable.image,
      };
    }),
    'three-pc-preserve-dish': (res) => res.map(x => {
      const r = x as ITheSimsResponse['three-pc-preserve-dish'];
      return {
        id: r.id,
        name: r.name,
        image: r.image,
        harvestableID: r.harvestable.id,
        harvestableName: r.harvestable.name,
        harvestableImage: r.harvestable.image,
      };
    }),
  },
};

export async function GET(_: NextRequest, { params }: { params: Promise<IParam> }) {
  const { category: categoryStr, data: dataIDStr, type: exportType } = await params;

  const cat = DATASETS_AVAILABLE[categoryStr as keyof typeof DATASETS_AVAILABLE] as IData | undefined;
  if (!cat) return notFound();

  const d = cat.categories.find(x => x.id === dataIDStr);
  if (!d || !d.export || !d.export.exportType.includes(exportType as ExportType)) return notFound();

  const c = cache(async () => await grabData<object[]>(d.export!.route, {
    PageSize: 0
  }));

  const { data: resTemp } = await c();
  const transformer = Transformer[categoryStr as keyof typeof Transformer]?.[dataIDStr];
  const res = transformer ? transformer(resTemp) : resTemp;

  if (exportType === 'json') return NextResponse.json(res);
  if (exportType === 'ndjson') return new NextResponse(res.map(x => JSON.stringify(x)).join('\n'), {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  else if (exportType === 'xml') return new NextResponse(Converter.ToXML(res), {
    headers: {
      'Content-Type': 'application/xml',
    }
  });
  else if (exportType === 'yaml') return new NextResponse(Converter.ToYAML(res), {
    headers: {
      'Content-Type': 'application/yaml',
      'Content-Disposition': 'attachment; filename="result.yaml"'
    }
  });
  else if (exportType === 'csv' || exportType === 'tsv') return new NextResponse(
    exportType === 'csv' ? Converter.ToCSV(res) : Converter.ToTSV(res), {
    headers: {
      'Content-Type': 'application/csv',
      'Content-Disposition': `attachment; filename="result.${exportType}"`
    }
  });

  else if (exportType === 'html') {
    return new NextResponse(await Converter.toHTMLTable(res), {
      headers: {
        'Content-Type': 'text/html',
      }
    });
  }
  else if (exportType === 'xlsx') {
    return new NextResponse(await Converter.toExcel(res), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="result.xlsx"`
      }
    });
  }
  else if (exportType === 'postgresql' || exportType === 'sql_server' || exportType === 'sqlite') {
    return new NextResponse(Converter.toDatabaseInsert(res, exportType), {
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }
  else if (exportType === 'parquet') {
    return new NextResponse((await Converter.toParquet(
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
    });
  }
  return notFound();
}