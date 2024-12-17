import { Row, Table } from "@tanstack/react-table";

/**
 * Sorting function untuk react-table. Mirip 'arrIncludesSome', tapi bisa untuk string / number
 * 
 * @param row Row dari tanstack
 * @param columnId Column ID
 * @param selectValue Value yang dipilih pada combobox
 * @returns Boolean, apakah row ini mau dimasukkan atau nga
 */
export function multiSelectFilter<TData>(row: Row<TData>, columnId: string, selectValue: (string | number)[]) {
  const v = row.getValue(columnId);
  return selectValue.length === 0 || selectValue.includes(v as (string | number));
}

export function getStaticIndex<TData>(row: Row<TData>, table: Table<TData>) {
  return (table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1;
}