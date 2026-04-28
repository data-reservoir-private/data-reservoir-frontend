import { ExportType } from "@/model/dto/export";
import { ALL_EXPORTS_TRANSACTION } from "@/utilities/export-icon";
import z from "zod";

export const ExportTransactionExpenseClientSchema = z.object({
  month: z.number().gte(1).lte(12).nullable(),
  year: z.number().gte(2020).nullable(),
  type: z.enum(ALL_EXPORTS_TRANSACTION),
});

export const ExportTransactionExpenseServerSchema = z.object({
  month: z.coerce.number().gte(1).lte(12).optional().default(undefined),
  year: z.coerce.number().gte(2020).optional(),
  type: z.enum(ALL_EXPORTS_TRANSACTION)
}).refine(d => d.month === undefined || d.year !== undefined, {
  message: 'Month must be filled if year is filled',
});

export const FLATTENED_TYPE: ExportType[] = [
  'csv', 'tsv', 'html', 'parquet', 'xlsx'
];