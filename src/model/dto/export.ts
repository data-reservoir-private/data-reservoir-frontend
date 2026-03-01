import { Route } from "next";

export type ExportType = 'json' | 'csv' | 'tsv' | 'yaml' | 'xml' | 'html' | 'postgresql' | 'sql_server' | 'sqlite' | 'ndjson' | 'parquet' | 'xlsx';

export interface IData {
  name: string,
  displayName?: string,
  categories: {
    id: string,
    name: string,
    description: string,
    link: Route,
    minedByMe?: true
    image: string | 'building',
    export?: {
      route: string,
      exportType: ExportType[]
    }
  }[]
}